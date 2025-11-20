# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all server files
COPY . .

# Set hardcoded environment variables
ENV PORT=5000
ENV NODE_ENV=production

# Frontend URL (for CORS)
ENV FRONTEND_URL=https://happy-forest-0fe6bb90f.3.azurestaticapps.net

# Google OAuth Configuration
ENV GOOGLE_CLIENT_ID=574451618275-vl5r928f5pj6ogj4le1o75tilhiagmfu.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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
ENV GOOGLE_REDIRECT_URI=https://happy-forest-0fe6bb90f.3.azurestaticapps.net/auth/google/callback
ENV HARDCODED_ACCOUNT_ID=114365245834970891636

# Supabase Configuration
ENV SUPABASE_URL=https://eyrkxpodgqileiqxblpr.supabase.co
ENV SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5cmt4cG9kZ3FpbGVpcXhibHByIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzA5MDM0NCwiZXhwIjoyMDc4NjY2MzQ0fQ.AuLJmmco5NR8d2Ueax9qNjPMWbdxIZenzOANqgJp0ww

# Razorpay Configuration
ENV RAZORPAY_KEY_ID=rzp_live_RWwON57KV1LaJn
ENV RAZORPAY_KEY_SECRET=7AWWs351asukoB0uUHOViu7b
ENV RAZORPAY_WEBHOOK_SECRET=gmb_boost_pro_webhook_secret_2024

# Azure OpenAI Configuration
ENV AZURE_OPENAI_ENDPOINT=https://agentplus.openai.azure.com/
ENV AZURE_OPENAI_API_KEY=1TPW16ifwPJccSiQPSHq63nU7IcT6R9DrduIHBYwCm5jbUWiSbkLJQQJ99BDACYeBjFXJ3w3AAABACOG3Yia
ENV AZURE_OPENAI_DEPLOYMENT=gpt-4o
ENV AZURE_OPENAI_API_VERSION=2024-02-15-preview

# Token Encryption Key (CRITICAL for OAuth tokens)
ENV TOKEN_ENCRYPTION_KEY=gmb-boost-pro-2024-secure-encryption-key-change-this-in-production-32chars

# Backend URL (Azure Container Instance)
ENV BACKEND_URL=https://google-ranker-g5h9g6edawdhbjcw.canadacentral-01.azurewebsites.net

# Hybrid Mode - Support both Azure Static Web Apps and local dev
ENV ALLOWED_ORIGINS=https://happy-forest-0fe6bb90f.3.azurestaticapps.net,http://localhost:3000,http://localhost:5173

# Email Service (Optional - SendGrid)
ENV SENDGRID_API_KEY=

# SMS Service (Optional - Twilio)
ENV TWILIO_ACCOUNT_SID=
ENV TWILIO_AUTH_TOKEN=
ENV TWILIO_PHONE_NUMBER=

# Expose the port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the server
CMD ["node", "server.js"]
