@echo off
setlocal enabledelayedexpansion
title AKMind - Setup & Start

echo.
echo  =============================================
echo   AKMind v1.0 - Setup ^& Start Script
echo  =============================================
echo.

:: ─────────────────────────────────────────────
:: 1. CHECK NODE.JS
:: ─────────────────────────────────────────────
echo [1/3] Checking Node.js...
where node >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo  Node.js not found. Attempting to install via winget...
    winget install --id OpenJS.NodeJS.LTS -e --accept-source-agreements --accept-package-agreements
    if !ERRORLEVEL! neq 0 (
        echo.
        echo  ERROR: Automatic install failed.
        echo  Please install Node.js manually from: https://nodejs.org
        echo  Then re-run this script.
        pause
        exit /b 1
    )
    :: Refresh PATH so node is available in this session
    for /f "tokens=*" %%i in ('where node 2^>nul') do set NODE_PATH=%%i
    if "!NODE_PATH!"=="" (
        echo.
        echo  Node.js was installed but requires a terminal restart.
        echo  Please close this window, open a new one, and run start_all.cmd again.
        pause
        exit /b 1
    )
    echo  Node.js installed successfully.
) else (
    for /f "tokens=*" %%v in ('node --version') do echo  Found Node.js %%v
)

:: ─────────────────────────────────────────────
:: 2. CHECK NPM
:: ─────────────────────────────────────────────
where npm >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo.
    echo  ERROR: npm not found. It should come bundled with Node.js.
    echo  Please reinstall Node.js from: https://nodejs.org
    pause
    exit /b 1
)
for /f "tokens=*" %%v in ('npm --version') do echo  Found npm v%%v

:: ─────────────────────────────────────────────
:: 3. INSTALL DEPENDENCIES (if needed)
:: ─────────────────────────────────────────────
echo.
echo [2/3] Checking dependencies...
if not exist "%~dp0node_modules\" (
    echo  node_modules not found. Running npm install...
    echo.
    pushd "%~dp0"
    npm install
    if !ERRORLEVEL! neq 0 (
        echo.
        echo  ERROR: npm install failed. See output above for details.
        popd
        pause
        exit /b 1
    )
    popd
    echo.
    echo  Dependencies installed successfully.
) else (
    echo  node_modules found - skipping install.
)

:: ─────────────────────────────────────────────
:: 4. START DEV SERVER
:: ─────────────────────────────────────────────
echo.
echo [3/3] Starting AKMind development server...
echo.
echo  App will be available at: http://localhost:3000
echo  Press Ctrl+C to stop the server.
echo.
pushd "%~dp0"
npm run dev
popd

pause
