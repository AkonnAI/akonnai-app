# AKMIND — Production Deployment Guide
## Live URL: www.akmind.com

## Stack
- Next.js 16 + TypeScript
- AWS DynamoDB (database)
- AWS Cognito (authentication)
- AWS SES (email — hello@akmind.com)
- AWS Amplify (hosting)
- Rate limiting: DynamoDB TTL

## Environment Variables (11 required)

| Variable | Source / Description |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM user `akmind-app` → Security credentials → Access keys |
| `AWS_SECRET_ACCESS_KEY` | Same IAM access key creation (shown once — save it) |
| `AWS_REGION` | AWS region for all services (e.g. `ap-south-1`) |
| `DYNAMODB_USERS_TABLE` | DynamoDB table name for user accounts (e.g. `akmind-users`) |
| `DYNAMODB_BOOKINGS_TABLE` | DynamoDB table name for demo bookings (e.g. `akmind-bookings`) |
| `COGNITO_USER_POOL_ID` | Cognito console → User Pools → your pool → Pool ID |
| `COGNITO_CLIENT_ID` | Cognito pool → App clients → client ID |
| `SES_FROM_EMAIL` | Verified sender address in SES (e.g. `hello@akmind.com`) |
| `SES_ADMIN_EMAIL` | Admin notification recipient in SES (e.g. `admin@akmind.com`) |
| `GAS_WEBHOOK_URL` | Google Apps Script deployment URL for booking forwarding |
| `AUTH_SESSION_SECRET` | Random 32+ char hex string — run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |

## AWS Setup Checklist

- [ ] Route 53: akmind.com hosted zone created
- [ ] GoDaddy: nameservers updated to AWS Route 53 nameservers
- [ ] DynamoDB: users table with email-index GSI (On-demand)
- [ ] DynamoDB: bookings table (On-demand)
- [ ] DynamoDB: akmind-rate-limits table with TTL on "ttl" attribute
- [ ] IAM: akmind-app user with DynamoDBFullAccess + CognitoPowerUser + SESFullAccess
- [ ] IAM: access keys generated and saved
- [ ] Cognito: akmind-users pool with email+password sign-in
- [ ] SES: akmind.com domain verified (click Publish to Route 53)
- [ ] SES: hello@akmind.com and admin@akmind.com verified
- [ ] SES: Production access requested (removes sandbox)
- [ ] Amplify: app connected to GitHub main branch
- [ ] Amplify: all 11 env vars added
- [ ] Amplify: domain management — www.akmind.com connected

## Pre-Launch Test Checklist

- [ ] www.akmind.com loads (HTTPS, no certificate errors)
- [ ] akmind.com redirects to www.akmind.com
- [ ] Sign up → user appears in DynamoDB users table
- [ ] Login → session cookie set
- [ ] Book demo → booking appears in DynamoDB bookings table
- [ ] Confirmation page loads from ?id= URL param
- [ ] admin@akmind.com receives booking notification from hello@akmind.com
- [ ] Parent receives booking confirmation from hello@akmind.com
- [ ] 5 rapid login attempts → 429 Too Many Requests response
