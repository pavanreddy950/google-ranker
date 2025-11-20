# 🚀 Production Deployment Guide - Hybrid Mode

## ✅ Updated Configuration

### Production URLs
- **Frontend**: `https://happy-forest-0fe6bb90f.3.azurestaticapps.net`
- **Backend**: `https://google-ranker-g5h9g6edawdhbjcw.canadacentral-01.azurewebsites.net`

### Docker Hub
- **Latest Image**: `scale112/google-ranker:latest`
- **Production Tag**: `scale112/google-ranker:v2.0-production`
- **Digest**: `sha256:0aa0e550514e1f93814a1eed1ae7c5af19610005f8aaa3cfc46d258e94269bd4`

---

## 🔧 What Was Fixed

### 1. Production URLs
✅ Frontend URL updated to Azure Static Web Apps  
✅ Backend URL updated to Azure Container Instance  
✅ Google OAuth redirect URI updated  
✅ TOKEN_ENCRYPTION_KEY added (fixes decryption errors)  

### 2. Hybrid Mode CORS
✅ Supports multiple origins:
- `https://happy-forest-0fe6bb90f.3.azurestaticapps.net` (Production)
- `http://localhost:3000` (Local dev - Vite)
- `http://localhost:5173` (Local dev - Vite alternative port)

### 3. Environment Variables
All critical variables now included:
- `TOKEN_ENCRYPTION_KEY` ✅
- `FRONTEND_URL` ✅
- `BACKEND_URL` ✅
- `GOOGLE_REDIRECT_URI` ✅
- `ALLOWED_ORIGINS` ✅

---

## 📋 Pre-Deployment Checklist

### ☐ Step 1: Update Google OAuth Console

1. Go to: https://console.cloud.google.com/apis/credentials
2. Select your project
3. Click on your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, add:
   ```
   https://happy-forest-0fe6bb90f.3.azurestaticapps.net/auth/google/callback
   ```
5. Click **Save**

**Important**: Keep `http://localhost:3000/auth/google/callback` for local development!

### ☐ Step 2: Verify Frontend Configuration

Make sure your frontend (`happy-forest-0fe6bb90f.3.azurestaticapps.net`) is configured to call:
```javascript
// API Base URL
const API_URL = 'https://google-ranker-g5h9g6edawdhbjcw.canadacentral-01.azurewebsites.net';
```

---

## 🚀 Deployment Methods

### Method 1: Azure CLI (Recommended - Fastest)

```bash
# Delete existing container
az container delete \
  --resource-group google-ranker-rg \
  --name google-ranker \
  --yes

# Deploy updated container with production configuration
az container create \
  --resource-group google-ranker-rg \
  --name google-ranker \
  --image scale112/google-ranker:v2.0-production \
  --dns-name-label google-ranker \
  --ports 5000 \
  --cpu 1 \
  --memory 1.5 \
  --restart-policy Always \
  --location canadacentral \
  --environment-variables \
    TOKEN_ENCRYPTION_KEY='gmb-boost-pro-2024-secure-encryption-key-change-this-in-production-32chars' \
    FRONTEND_URL='https://happy-forest-0fe6bb90f.3.azurestaticapps.net' \
    BACKEND_URL='https://google-ranker-g5h9g6edawdhbjcw.canadacentral-01.azurewebsites.net' \
    GOOGLE_REDIRECT_URI='https://happy-forest-0fe6bb90f.3.azurestaticapps.net/auth/google/callback' \
    ALLOWED_ORIGINS='https://happy-forest-0fe6bb90f.3.azurestaticapps.net,http://localhost:3000,http://localhost:5173'

# Wait for deployment (takes 2-3 minutes)
echo "Waiting for container to start..."
sleep 30

# Get container details
az container show \
  --resource-group google-ranker-rg \
  --name google-ranker \
  --query "{FQDN:ipAddress.fqdn,IP:ipAddress.ip,State:instanceView.state}" \
  --output table

# View logs
az container logs \
  --resource-group google-ranker-rg \
  --name google-ranker \
  --follow
```

### Method 2: ARM Template

```bash
# Deploy using the updated ARM template
az deployment group create \
  --resource-group google-ranker-rg \
  --template-file azure-deploy.json \
  --parameters azure-deploy-parameters.json
```

### Method 3: Azure Portal (GUI)

1. **Delete existing container**:
   - Go to Azure Portal → Container Instances
   - Find `google-ranker`
   - Click **Delete**

2. **Create new container**:
   - Click **Create** → Container Instances
   - Fill in the details:

```
Basics:
  Resource Group: google-ranker-rg
  Container Name: google-ranker
  Region: Canada Central
  Image Source: Other container registries
  Image: scale112/google-ranker:v2.0-production
  OS Type: Linux
  Size: 1 vCPU, 1.5 GB memory

Networking:
  Networking Type: Public
  DNS Name Label: google-ranker
  Ports: 5000 (TCP)

Advanced → Environment Variables:
  Add these variables (NOT SECURE):
  
  TOKEN_ENCRYPTION_KEY = gmb-boost-pro-2024-secure-encryption-key-change-this-in-production-32chars
  FRONTEND_URL = https://happy-forest-0fe6bb90f.3.azurestaticapps.net
  BACKEND_URL = https://google-ranker-g5h9g6edawdhbjcw.canadacentral-01.azurewebsites.net
  GOOGLE_REDIRECT_URI = https://happy-forest-0fe6bb90f.3.azurestaticapps.net/auth/google/callback
  ALLOWED_ORIGINS = https://happy-forest-0fe6bb90f.3.azurestaticapps.net,http://localhost:3000,http://localhost:5173

Advanced → Restart Policy:
  Always
```

3. Click **Review + Create** → **Create**

---

## ✅ Post-Deployment Verification

### Step 1: Check Container Health

```bash
# Wait 30 seconds for startup
sleep 30

# Test health endpoint
curl https://google-ranker-g5h9g6edawdhbjcw.canadacentral-01.azurewebsites.net/health
```

**Expected Response**:
```json
{
  "status": "OK",
  "message": "Google Business Profile Backend Server is running",
  "timestamp": "2025-11-20T..."
}
```

### Step 2: Verify Configuration

```bash
curl https://google-ranker-g5h9g6edawdhbjcw.canadacentral-01.azurewebsites.net/config
```

**Expected Response**:
```json
{
  "mode": "AZURE",
  "environment": "production",
  "frontendUrl": "https://happy-forest-0fe6bb90f.3.azurestaticapps.net",
  "backendUrl": "https://google-ranker-g5h9g6edawdhbjcw.canadacentral-01.azurewebsites.net",
  "redirectUri": "https://happy-forest-0fe6bb90f.3.azurestaticapps.net/auth/google/callback",
  "allowedOrigins": [
    "https://happy-forest-0fe6bb90f.3.azurestaticapps.net",
    "http://localhost:3000",
    "http://localhost:5173"
  ],
  "hasGoogleClientId": true,
  "hasGoogleClientSecret": true
}
```

### Step 3: Check Logs for Errors

```bash
az container logs \
  --resource-group google-ranker-rg \
  --name google-ranker \
  --tail 100
```

**Should NOT see**:
- ❌ `Decryption error: bad decrypt`
- ❌ `401 UNAUTHENTICATED`
- ❌ `Could not load .env`

**Should see**:
- ✅ `✅ Firebase Admin SDK initialized successfully`
- ✅ `✅ Supabase initialized successfully`
- ✅ `✅ Razorpay initialized successfully`
- ✅ `🚀 Backend server running on`
- ✅ `✅ Token is valid for user`

### Step 4: Test OAuth Flow

1. Open your frontend: `https://happy-forest-0fe6bb90f.3.azurestaticapps.net`
2. Click **Sign in with Google**
3. Complete OAuth flow
4. Should redirect back to your app successfully

---

## 🔄 Rolling Back (If Issues Occur)

```bash
# Delete problematic container
az container delete --resource-group google-ranker-rg --name google-ranker --yes

# Deploy previous version
az container create \
  --resource-group google-ranker-rg \
  --name google-ranker \
  --image scale112/google-ranker:v1.1 \
  --dns-name-label google-ranker \
  --ports 5000 \
  --cpu 1 \
  --memory 1.5 \
  --restart-policy Always
```

---

## 📊 Environment Comparison

### Before (Broken)
```
FRONTEND_URL: http://localhost:3000 ❌
BACKEND_URL: https://google-ranker-g5h9g6edawdhbjcw... ❌
GOOGLE_REDIRECT_URI: http://localhost:3000/auth/... ❌
TOKEN_ENCRYPTION_KEY: [Missing] ❌
ALLOWED_ORIGINS: [Not set] ❌
```

### After (Fixed - Hybrid Mode)
```
FRONTEND_URL: https://happy-forest-0fe6bb90f.3.azurestaticapps.net ✅
BACKEND_URL: https://google-ranker-g5h9g6edawdhbjcw... ✅
GOOGLE_REDIRECT_URI: https://happy-forest-0fe6bb90f.3.azurestaticapps.net/auth/... ✅
TOKEN_ENCRYPTION_KEY: gmb-boost-pro-2024-secure... ✅
ALLOWED_ORIGINS: [Production + Dev URLs] ✅
```

---

## 🎯 Features Enabled

After deployment, these features will work:

✅ **Google OAuth Authentication** - Users can sign in  
✅ **Token Encryption/Decryption** - OAuth tokens stored securely  
✅ **Auto-posting** - Scheduled posts to Google Business Profile  
✅ **Auto-reply** - Automatic review responses  
✅ **Review Fetching** - Get reviews from Google  
✅ **Hybrid CORS** - Works with production AND local development  
✅ **Payment Integration** - Razorpay payments  
✅ **AI Features** - Azure OpenAI for content generation  

---

## 🔐 Security Notes

### Production Recommendations

1. **Use Azure Key Vault** for secrets instead of environment variables
2. **Rotate encryption key** periodically
3. **Enable HTTPS** only (already done)
4. **Monitor logs** for suspicious activity
5. **Set up alerts** for failed authentications

### Current Setup
- ⚠️ Secrets are in environment variables (not ideal but functional)
- ✅ All traffic over HTTPS
- ✅ CORS properly configured
- ✅ Token encryption enabled

---

## 📱 Frontend Integration

Update your frontend environment variables:

```javascript
// .env.production
VITE_API_URL=https://google-ranker-g5h9g6edawdhbjcw.canadacentral-01.azurewebsites.net
VITE_GOOGLE_CLIENT_ID=574451618275-vl5r928f5pj6ogj4le1o75tilhiagmfu.apps.googleusercontent.com
```

Or in your staticwebapp.config.json:
```json
{
  "environmentVariables": {
    "API_URL": "https://google-ranker-g5h9g6edawdhbjcw.canadacentral-01.azurewebsites.net"
  }
}
```

---

## 🆘 Troubleshooting

### Issue: 401 Unauthorized

**Cause**: OAuth redirect URI mismatch  
**Fix**: Verify Google OAuth Console has correct redirect URI

### Issue: CORS Error

**Cause**: Frontend URL not in ALLOWED_ORIGINS  
**Fix**: Check environment variable includes your frontend URL

### Issue: Token Decryption Error

**Cause**: TOKEN_ENCRYPTION_KEY mismatch or missing  
**Fix**: Ensure environment variable is set correctly

### Issue: Container Won't Start

**Cause**: Resource constraints or invalid configuration  
**Fix**: Check logs with `az container logs`

---

## 📞 Quick Commands Reference

```bash
# View container status
az container show --resource-group google-ranker-rg --name google-ranker

# View logs (real-time)
az container logs --resource-group google-ranker-rg --name google-ranker --follow

# Restart container
az container restart --resource-group google-ranker-rg --name google-ranker

# Delete container
az container delete --resource-group google-ranker-rg --name google-ranker --yes

# Get container URL
az container show \
  --resource-group google-ranker-rg \
  --name google-ranker \
  --query ipAddress.fqdn \
  --output tsv
```

---

## ✨ Summary

**Changes Made**:
1. ✅ Updated all URLs to production values
2. ✅ Added TOKEN_ENCRYPTION_KEY
3. ✅ Configured hybrid CORS for prod + dev
4. ✅ Rebuilt and pushed Docker image
5. ✅ Created deployment scripts

**Next Steps**:
1. Update Google OAuth Console
2. Deploy to Azure using CLI command above
3. Verify health endpoints
4. Test OAuth flow
5. Monitor logs for errors

**Your production deployment is ready! 🚀**

**Backend**: https://google-ranker-g5h9g6edawdhbjcw.canadacentral-01.azurewebsites.net  
**Frontend**: https://happy-forest-0fe6bb90f.3.azurestaticapps.net  
**Docker Image**: scale112/google-ranker:v2.0-production
