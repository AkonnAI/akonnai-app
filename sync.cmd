@echo off
:: ============================================================
::  AKMIND — Git Sync Script
::  Double-click this file to commit & push all changes to:
::  https://github.com/AkonnAI/akmind-app.git
:: ============================================================

cd /d "%~dp0"

echo.
echo ============================================================
echo   AKMIND Git Sync
echo ============================================================
echo.

:: Check if there are any changes to commit
git status --short > "%TEMP%\gitstatus.txt"
for %%A in ("%TEMP%\gitstatus.txt") do if %%~zA==0 (
  echo No changes detected. Everything is already up to date.
  echo.
  pause
  exit /b 0
)

:: Show what changed
echo Changes to be committed:
echo.
git status --short
echo.

:: Ask for commit message
set /p COMMIT_MSG=Enter commit message (or press Enter for auto-message):

:: Use auto-message if none provided
if "%COMMIT_MSG%"=="" (
  for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set DT=%%I
  set COMMIT_MSG=update: changes on %DT:~0,4%-%DT:~4,2%-%DT:~6,2% %DT:~8,2%:%DT:~10,2%
)

echo.
echo Staging all changes...
git add -A

echo Committing: "%COMMIT_MSG%"
git commit -m "%COMMIT_MSG%"

echo.
echo Pushing to AkonnAI/akmind-app (akmind remote)...
git push akmind master

if %ERRORLEVEL%==0 (
  echo.
  echo  Done! Changes are live at:
  echo  https://github.com/AkonnAI/akmind-app
) else (
  echo.
  echo  Push failed. Check the error above.
  echo  Make sure the repo exists at https://github.com/AkonnAI/akmind-app
)

echo.
pause
