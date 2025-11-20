# GitHub Secrets Setup Guide

To enable automated deployment via GitHub Actions, you need to configure the following secrets in your GitHub repository.

## How to Add Secrets

1. Go to your GitHub repository
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret listed below

## Required Secrets

### Azure Deployment Token
- **Name:** `AZURE_STATIC_WEB_APPS_API_TOKEN_HAPPY_FOREST_0FE6BB90F`
- **Value:** Your Azure Static Web Apps deployment token
- **Note:** This should already be configured. If not, get it from Azure Portal → Your Static Web App → Manage deployment token

### Firebase Configuration
- **Name:** `VITE_FIREBASE_API_KEY`
- **Value:** `AIzaSyBIR-zpFHJMDurVpWCtFT2C5HRZLw4-8mU`

- **Name:** `VITE_FIREBASE_AUTH_DOMAIN`
- **Value:** `gmb-automation-474209-549ee.firebaseapp.com`

- **Name:** `VITE_FIREBASE_PROJECT_ID`
- **Value:** `gmb-automation-474209-549ee`

- **Name:** `VITE_FIREBASE_STORAGE_BUCKET`
- **Value:** `gmb-automation-474209-549ee.firebasestorage.app`

- **Name:** `VITE_FIREBASE_MESSAGING_SENDER_ID`
- **Value:** `317153753727`

- **Name:** `VITE_FIREBASE_APP_ID`
- **Value:** `1:317153753727:web:8281f982a8e7a05f885d4a`

### Google OAuth Configuration
- **Name:** `VITE_GOOGLE_CLIENT_ID`
- **Value:** `574451618275-vl5r928f5pj6ogj4le1o75tilhiagmfu.apps.googleusercontent.com`

### Backend Configuration
- **Name:** `VITE_BACKEND_URL`
- **Value:** Your production backend URL (e.g., `https://your-backend.azurewebsites.net`)
- **Note:** Change from `http://localhost:5000` to your actual production backend URL

### Azure OpenAI Configuration
- **Name:** `VITE_AZURE_OPENAI_ENDPOINT`
- **Value:** `https://agentplus.openai.azure.com/`

- **Name:** `VITE_AZURE_OPENAI_API_KEY`
- **Value:** `1TPW16ifwPJccSiQPSHq63nU7IcT6R9DrduIHBYwCm5jbUWiSbkLJQQJ99BDACYeBjFXJ3w3AAABACOG3Yia`

- **Name:** `VITE_AZURE_OPENAI_DEPLOYMENT`
- **Value:** `gpt-4o`

- **Name:** `VITE_AZURE_OPENAI_API_VERSION`
- **Value:** `2024-02-15-preview`

### Payment Configuration
- **Name:** `VITE_RAZORPAY_KEY_ID`
- **Value:** `rzp_live_RWwON57KV1LaJn`

## Security Notes

⚠️ **IMPORTANT:** The values listed above are from your `.env` file and should be reviewed for security:

1. **API Keys:** Some of these keys (especially Firebase API key and Razorpay key) are already public in your repository. While Firebase API keys are designed to be public, ensure you have proper security rules configured.

2. **Azure OpenAI Key:** This is a sensitive credential and should be rotated if it has been exposed.

3. **Backend URL:** Make sure to update this to your production backend URL, not localhost.

## Verification

After adding all secrets:

1. Go to **Actions** tab in your GitHub repository
2. Push a commit to the `main` branch
3. Watch the workflow run
4. If successful, your app will be deployed to Azure Static Web Apps

## Troubleshooting

If the deployment fails:

1. Check the **Actions** tab for error messages
2. Verify all secrets are added correctly (no extra spaces, correct names)
3. Ensure the Azure deployment token is valid
4. Check that your backend URL is accessible from the internet

## Local Development

For local development, continue using the `.env` file in the root directory. The GitHub secrets are only used for CI/CD deployments.
