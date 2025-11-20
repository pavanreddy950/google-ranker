# Setup Guide for New Client

Welcome! This guide will help you set up the Google Business Profile Management application.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Google Cloud Console account
- Razorpay account (for payment processing)
- Azure OpenAI account (optional, for AI features)

## Quick Start

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
```

### 2. Configure Environment Variables

#### Frontend Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Firebase credentials:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select existing
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Copy the Firebase config values

3. Add your Google OAuth Client ID

#### Backend Configuration

1. Copy `server/.env.example` to `server/.env`:
   ```bash
   cd server
   cp .env.example .env
   ```

2. Fill in the required credentials (see sections below)

### 3. Required Configurations

#### A. Firebase Setup

1. **Firebase Console** (https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication > Google sign-in provider
   - Enable Firestore Database (optional, for token storage)
   - Enable Storage (for file uploads)

2. **Get Firebase Credentials:**
   - Project Settings > General > Your apps
   - Copy all config values to frontend `.env`

3. **Firebase Admin SDK (Optional):**
   - Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the JSON file as `server/serviceAccountKey.json`
   - OR copy the entire JSON content to `FIREBASE_SERVICE_ACCOUNT_KEY` in `server/.env`

#### B. Google Cloud Console Setup

1. **Create Google Cloud Project** (https://console.cloud.google.com/)
   - Create new project or use existing
   - Enable required APIs:
     - Google My Business API
     - Google My Business Business Information API
     - Google My Business Account Management API
     - Google Business Profile API

2. **OAuth 2.0 Credentials:**
   - Go to APIs & Services > Credentials
   - Create OAuth 2.0 Client ID (Web application)
   - Add authorized redirect URIs:
     - `http://localhost:5000/auth/google/callback` (development)
     - `http://localhost:3000/auth/google/callback` (development)
     - Your production URLs (when deploying)
   - Copy Client ID and Client Secret to both `.env` files

3. **Get Google Business Account ID:**
   - After OAuth setup, run the app and connect your Google account
   - The account ID will be displayed in the console
   - Add it to `HARDCODED_ACCOUNT_ID` in `server/.env`

#### C. Razorpay Payment Gateway

1. **Razorpay Dashboard** (https://dashboard.razorpay.com/)
   - Sign up or log in
   - Go to Settings > API Keys
   - Generate keys (use Test Mode for development, Live Mode for production)
   - Copy Key ID and Key Secret to `server/.env`

2. **Webhook Setup:**
   - Go to Settings > Webhooks
   - Add webhook URL: `https://your-backend-url.com/api/payment/webhook`
   - Select events: `payment.captured`, `subscription.charged`, etc.
   - Create a secret key and add to `RAZORPAY_WEBHOOK_SECRET`

#### D. Supabase Database (REQUIRED)

1. **Supabase Dashboard** (https://supabase.com/dashboard)
   - Create a new project or use existing
   - Wait for project to be fully provisioned
   - Go to Project Settings > API
   - Copy:
     - Project URL
     - Service Role Key (NOT the anon key)
   - Add both to `server/.env`

2. **Run Database Schema:**
   - In Supabase Dashboard, go to SQL Editor
   - Click "New Query"
   - Open `server/database/schema.sql` from the project
   - Copy and paste the entire schema
   - Click "Run" to create all required tables
   - Verify tables were created in Table Editor

**Important:** The app will not work without Supabase configured and schema deployed!

---

#### E. Azure OpenAI (REQUIRED - for AI Features)

1. **Azure Portal** (https://portal.azure.com/)
   - Create Azure OpenAI resource
   - Deploy a model (e.g., GPT-4 or GPT-4o)
   - Copy:
     - Endpoint URL
     - API Key
     - Deployment name
   - Add to `server/.env`

**Note:** This is required for AI-powered review responses and content generation

### 4. Running the Application

**Development Mode:**

1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```
   Backend will run on http://localhost:5000

2. Start the frontend (in a new terminal):
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:3000

3. Open http://localhost:3000 in your browser

**Production Build:**

```bash
# Frontend
npm run build

# Backend
cd server
npm start
```

## Configuration Checklist

### Must Have:
- [ ] Firebase project created
- [ ] Firebase config added to frontend `.env`
- [ ] Google Cloud project created
- [ ] Required Google APIs enabled
- [ ] OAuth 2.0 credentials created
- [ ] Google Client ID & Secret added to both `.env` files
- [ ] Razorpay account created
- [ ] Razorpay keys added to backend `.env`
- [ ] **Supabase project created**
- [ ] **Supabase credentials added to backend `.env`**
- [ ] **Database schema deployed in Supabase**
- [ ] **Azure OpenAI configured (for AI features)**

### Optional:
- [ ] Firebase Admin SDK configured (only if NOT using Supabase)

## Database Setup

**This app uses Supabase as the primary database.**

Supabase provides:
- **OAuth token storage** - Persistent storage of Google OAuth tokens
- **User management** - User accounts, subscriptions, and preferences
- **Payment tracking** - Razorpay payment and subscription data
- **Automation settings** - Auto-posting and auto-reply configurations

**Required Setup Steps:**

1. Create a Supabase project at https://supabase.com
2. Copy the project URL and Service Role Key
3. Add credentials to `server/.env`
4. **Deploy the database schema:**
   - Open `server/database/schema.sql`
   - Copy the entire SQL content
   - Go to Supabase Dashboard > SQL Editor
   - Paste and run the schema
   - Verify all tables are created

**Alternative:** You can use Firestore instead by configuring Firebase Admin SDK, but Supabase is recommended.

## Troubleshooting

### Common Issues:

1. **"Firebase not initialized" error:**
   - Check if all Firebase env variables are set correctly
   - Verify Firebase project ID matches

2. **Google OAuth redirect error:**
   - Verify redirect URIs are added in Google Cloud Console
   - Check if Client ID and Secret are correct
   - Ensure URIs match exactly (http vs https, trailing slashes)

3. **Razorpay payment fails:**
   - Check if using correct keys (test/live mode)
   - Verify webhook URL is accessible
   - Check webhook signature validation

4. **CORS errors:**
   - Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
   - Check if both servers are running
   - Clear browser cache

## Support

For issues or questions:
1. Check the console logs (browser & server)
2. Verify all environment variables are set
3. Ensure all required services are running
4. Check API quotas and limits

## Next Steps

1. Test the application with development credentials
2. Create test Google Business Profile listings
3. Test payment integration with Razorpay test mode
4. When ready, switch to production credentials
5. Deploy to your hosting platform

Good luck with your deployment! 🚀
