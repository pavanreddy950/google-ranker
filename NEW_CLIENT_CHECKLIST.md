# New Client Setup Checklist

Quick checklist of what you need to collect from your new client.

---

## ✅ REQUIRED CREDENTIALS

### 1. Firebase (Frontend Authentication)
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```
**Get from:** Firebase Console > Project Settings

---

### 2. Google Cloud OAuth
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_BUSINESS_ACCOUNT_ID=
```
**Get from:** Google Cloud Console > APIs & Services > Credentials

**Required APIs to enable:**
- Google My Business API
- Google Business Profile API
- Google My Business Business Information API
- Google My Business Account Management API

---

### 3. Razorpay Payment Gateway
```
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
```
**Get from:** Razorpay Dashboard > Settings > API Keys

---

### 4. Supabase Database (PRIMARY DATABASE)
```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```
**Get from:** Supabase Dashboard > Project Settings > API

**IMPORTANT:**
- Use Service Role Key (not anon key)
- Run `server/database/schema.sql` in Supabase SQL Editor
- This is REQUIRED - app won't work without it

---

### 5. Azure OpenAI (AI Features)
```
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_DEPLOYMENT=gpt-4o
AZURE_OPENAI_API_VERSION=2024-02-15-preview
```
**Get from:** Azure Portal > Azure OpenAI Resource > Keys and Endpoint

**IMPORTANT:** This is REQUIRED for AI features (review responses, content generation)

---

## 📋 Setup Steps

1. **Collect all credentials above**
2. **Copy environment files:**
   ```bash
   cp .env.example .env
   cp server/.env.example server/.env
   ```
3. **Fill in all credentials** in both .env files
4. **Deploy Supabase schema:**
   - Open Supabase Dashboard
   - Go to SQL Editor
   - Copy content from `server/database/schema.sql`
   - Run in Supabase
5. **Install dependencies:**
   ```bash
   npm install
   cd server && npm install
   ```
6. **Test locally:**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   npm run dev
   ```
7. **Verify everything works:**
   - Firebase authentication
   - Google OAuth connection
   - Razorpay test payment
   - Supabase data storage
   - AI review responses

---

## ⚠️ Critical Notes

1. **Supabase is REQUIRED** - The app uses Supabase as the primary database
2. **Azure OpenAI is REQUIRED** - AI features won't work without it
3. **Run database schema** - Must deploy `schema.sql` in Supabase before first run
4. **Use Service Role Key** - For Supabase backend access (not anon key)
5. **Test mode first** - Use Razorpay test keys before going live
6. **New projects** - Create NEW Firebase and Google Cloud projects for the client

---

## 🚀 Ready to Deploy?

- [ ] All required credentials collected
- [ ] Both .env files configured
- [ ] Supabase schema deployed
- [ ] Application tested locally
- [ ] Google OAuth working
- [ ] Razorpay test payment successful
- [ ] AI features working

**Once checklist is complete, you're ready for production deployment!**
