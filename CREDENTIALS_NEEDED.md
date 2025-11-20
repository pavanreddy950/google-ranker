# Credentials Needed for New Client Setup

This document lists ALL the credentials and configuration details you need to collect from the new client to set up this application.

---

## ✅ REQUIRED Credentials (Must Have)

### 1. Firebase Configuration
**Purpose:** User authentication, database, and file storage

You need to create a NEW Firebase project for this client. Then collect:

- [ ] `VITE_FIREBASE_API_KEY` - Firebase API Key
- [ ] `VITE_FIREBASE_AUTH_DOMAIN` - Firebase Auth Domain (e.g., `your-project.firebaseapp.com`)
- [ ] `VITE_FIREBASE_PROJECT_ID` - Firebase Project ID
- [ ] `VITE_FIREBASE_STORAGE_BUCKET` - Firebase Storage Bucket
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase Messaging Sender ID
- [ ] `VITE_FIREBASE_APP_ID` - Firebase App ID

**Where to get:** Firebase Console > Project Settings > General > Your apps

---

### 2. Google Cloud OAuth Credentials
**Purpose:** Google Business Profile API access and user authentication

You need to create a NEW Google Cloud project for this client. Then collect:

- [ ] `GOOGLE_CLIENT_ID` - OAuth 2.0 Client ID (e.g., `xxx.apps.googleusercontent.com`)
- [ ] `GOOGLE_CLIENT_SECRET` - OAuth 2.0 Client Secret (e.g., `GOCSPX-xxx`)

**Where to get:** Google Cloud Console > APIs & Services > Credentials

**Important:** Make sure these APIs are enabled:
- Google My Business API
- Google My Business Business Information API
- Google My Business Account Management API
- Google Business Profile API

---

### 3. Google Business Account ID
**Purpose:** Connect to the client's Google Business Profile

- [ ] `HARDCODED_ACCOUNT_ID` - The client's Google Business Account ID

**How to get:**
1. After setting up OAuth, run the app once
2. Connect the client's Google account
3. The account ID will be displayed in the server console
4. OR ask the client to provide their Google Business Profile Account ID

---

### 4. Razorpay Payment Gateway
**Purpose:** Subscription payments and billing

You need the client's Razorpay account credentials:

- [ ] `RAZORPAY_KEY_ID` - Razorpay Key ID (e.g., `rzp_live_xxx` or `rzp_test_xxx`)
- [ ] `RAZORPAY_KEY_SECRET` - Razorpay Key Secret
- [ ] `RAZORPAY_WEBHOOK_SECRET` - Razorpay Webhook Secret (create a custom secret)

**Where to get:** Razorpay Dashboard > Settings > API Keys

**Note:** Use Test Mode keys for development, Live Mode keys for production

---

## 🔵 REQUIRED Database Configuration

### 5. Supabase Database
**Purpose:** Primary database for token storage, subscriptions, and user data

You need the client's Supabase project credentials:

- [ ] `SUPABASE_URL` - Supabase project URL (e.g., `https://xxx.supabase.co`)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for backend)

**Where to get:** Supabase Dashboard > Project Settings > API

**Important:**
- Use the **Service Role Key** (not the anon key) for the backend
- Make sure to run the database schema from `server/database/schema.sql` in Supabase SQL Editor
- This is REQUIRED - the app will not work without it

---

## 🔵 REQUIRED for Azure OpenAI (AI Features)

### 6. Azure OpenAI Service
**Purpose:** AI-powered review responses and content generation

You need the client's Azure OpenAI credentials:

- [ ] `AZURE_OPENAI_ENDPOINT` - Azure OpenAI Endpoint URL (e.g., `https://xxx.openai.azure.com/`)
- [ ] `AZURE_OPENAI_API_KEY` - Azure OpenAI API Key
- [ ] `AZURE_OPENAI_DEPLOYMENT` - Deployment name (e.g., `gpt-4o`, `gpt-4`, `gpt-35-turbo`)
- [ ] `AZURE_OPENAI_API_VERSION` - API Version (default: `2024-02-15-preview`)

**Where to get:** Azure Portal > Azure OpenAI Resource > Keys and Endpoint

**Note:** This is REQUIRED if you want AI features to work (auto-review responses, content generation, etc.)

---

## 📋 OPTIONAL Credentials

### 7. Firebase Admin SDK (Optional - Only if NOT using Supabase)
**Purpose:** Alternative to Supabase for token storage using Firestore

- [ ] `FIREBASE_SERVICE_ACCOUNT_KEY` - Full JSON service account key
  OR
- [ ] `GOOGLE_APPLICATION_CREDENTIALS` - Path to service account JSON file

**Where to get:** Firebase Console > Project Settings > Service Accounts > Generate new private key

**Note:** You are already using Supabase, so this is NOT needed unless you want to switch to Firestore

---

## 🌐 Deployment Configuration

### 8. Production URLs
**Purpose:** CORS configuration and OAuth redirects for production

- [ ] `FRONTEND_URL` - Production frontend URL (e.g., `https://yourdomain.com`)
- [ ] `BACKEND_URL` - Production backend URL (e.g., `https://api.yourdomain.com`)
- [ ] `GOOGLE_REDIRECT_URI` - OAuth callback URL (usually `${FRONTEND_URL}/auth/google/callback`)

**When to collect:** Before deploying to production

---

## 📝 Summary Checklist

Copy and fill this checklist:

```
REQUIRED CREDENTIALS:
[ ] Firebase API Key
[ ] Firebase Auth Domain
[ ] Firebase Project ID
[ ] Firebase Storage Bucket
[ ] Firebase Messaging Sender ID
[ ] Firebase App ID
[ ] Google OAuth Client ID
[ ] Google OAuth Client Secret
[ ] Google Business Account ID
[ ] Razorpay Key ID
[ ] Razorpay Key Secret
[ ] Razorpay Webhook Secret
[ ] Supabase URL
[ ] Supabase Service Role Key
[ ] Azure OpenAI Endpoint
[ ] Azure OpenAI API Key
[ ] Azure OpenAI Deployment Name

OPTIONAL:
[ ] Production Frontend URL
[ ] Production Backend URL

DEPLOYMENT READY:
[ ] All required credentials collected
[ ] Environment files configured (.env for frontend, server/.env for backend)
[ ] All APIs enabled in Google Cloud Console
[ ] OAuth redirect URIs configured
[ ] Razorpay webhook configured
[ ] Supabase database schema deployed (run server/database/schema.sql)
[ ] Application tested locally
```

---

## 🚀 Next Steps After Collecting Credentials

1. Copy `.env.example` to `.env` in the root folder
2. Copy `server/.env.example` to `server/.env`
3. Fill in ALL the credentials you collected above
4. Follow the `SETUP.md` guide to complete the setup
5. Test the application locally before deploying

---

## ⚠️ Important Notes

1. **Keep credentials SECRET** - Never commit .env files to Git
2. **Use separate credentials for dev and production** - Test with test keys first
3. **Create NEW Firebase and Google Cloud projects** - Don't reuse old project credentials
4. **Supabase is REQUIRED** - The app uses Supabase as the primary database
5. **Azure OpenAI is REQUIRED** - Without it, AI features won't work
6. **Razorpay must match environment** - Use test keys in development, live keys in production
7. **Run Supabase schema** - Execute `server/database/schema.sql` in Supabase SQL Editor before first run

---

## 💡 Tips

- Set up everything in a test environment first before going to production
- Keep a secure backup of all credentials
- Use a password manager to share credentials securely
- Test OAuth flow with the client's Google Business account before launch
- Verify all features work with the new credentials before delivering to client
