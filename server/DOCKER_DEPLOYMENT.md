# Docker Deployment Guide

This guide explains how to deploy the GMB Boost Pro backend using Docker.

## 🐳 Docker Files

- **Dockerfile** - Container configuration with hardcoded environment variables
- **docker-compose.yml** - Development deployment
- **docker-compose.production.yml** - Production deployment with resource limits
- **.dockerignore** - Files to exclude from Docker build

## 🚀 Quick Start

### Development Deployment

```bash
# Build and run the container
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop the container
docker-compose down
```

### Production Deployment

```bash
# Build and run production container
docker-compose -f docker-compose.production.yml up -d --build

# View logs
docker-compose -f docker-compose.production.yml logs -f backend

# Stop the container
docker-compose -f docker-compose.production.yml down
```

## 📦 Manual Docker Commands

### Build the Image

```bash
docker build -t gmb-boost-pro-backend:latest .
```

### Run the Container

```bash
docker run -d \
  --name gmb-boost-pro-backend \
  -p 5000:5000 \
  --restart unless-stopped \
  gmb-boost-pro-backend:latest
```

### View Logs

```bash
docker logs -f gmb-boost-pro-backend
```

### Stop and Remove

```bash
docker stop gmb-boost-pro-backend
docker rm gmb-boost-pro-backend
```

## 🔧 Configuration

All environment variables are **hardcoded** in the Dockerfile and docker-compose files:

### Server Configuration
- `PORT=5000`
- `NODE_ENV=production`

### Google OAuth
- `GOOGLE_CLIENT_ID` - Configured
- `GOOGLE_CLIENT_SECRET` - Configured
- `GOOGLE_REDIRECT_URI` - Configured
- `HARDCODED_ACCOUNT_ID` - Configured

### Supabase
- `SUPABASE_URL` - Configured
- `SUPABASE_SERVICE_KEY` - Configured

### Razorpay
- `RAZORPAY_KEY_ID` - Configured
- `RAZORPAY_KEY_SECRET` - Configured
- `RAZORPAY_WEBHOOK_SECRET` - Configured

### Azure OpenAI
- `AZURE_OPENAI_ENDPOINT` - Configured
- `AZURE_OPENAI_API_KEY` - Configured
- `AZURE_OPENAI_DEPLOYMENT` - Configured
- `AZURE_OPENAI_API_VERSION` - Configured

## 📊 Health Check

The container includes a health check that runs every 30 seconds:

```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' gmb-boost-pro-backend
```

## 🔍 Troubleshooting

### View Container Status
```bash
docker ps -a
```

### View Real-time Logs
```bash
docker logs -f gmb-boost-pro-backend
```

### Restart Container
```bash
docker restart gmb-boost-pro-backend
```

### Execute Commands Inside Container
```bash
docker exec -it gmb-boost-pro-backend sh
```

### Check Resource Usage
```bash
docker stats gmb-boost-pro-backend
```

## 🌐 Production Deployment

For production deployment, update the following in `docker-compose.production.yml`:

1. **Frontend URL** - Change to your production domain
2. **Google Redirect URI** - Update to production callback URL
3. **Resource Limits** - Adjust CPU and memory as needed

## 📁 Persistent Data

The Docker setup includes volumes for:
- **Logs** - `/app/logs` - Persistent log storage
- **Data** - `/app/data` - Persistent data storage

## 🔐 Security Notes

⚠️ **WARNING**: This Docker configuration has hardcoded credentials. For production:
- Use Docker secrets or environment variable files
- Implement proper secrets management
- Rotate credentials regularly
- Use encrypted volumes for sensitive data

## 🚢 Deployment to Cloud

### Docker Hub
```bash
# Tag the image
docker tag gmb-boost-pro-backend:latest yourusername/gmb-boost-pro-backend:latest

# Push to Docker Hub
docker push yourusername/gmb-boost-pro-backend:latest
```

### AWS ECR
```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Tag and push
docker tag gmb-boost-pro-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/gmb-boost-pro-backend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/gmb-boost-pro-backend:latest
```

### Azure Container Registry
```bash
# Login to ACR
az acr login --name <registry-name>

# Tag and push
docker tag gmb-boost-pro-backend:latest <registry-name>.azurecr.io/gmb-boost-pro-backend:latest
docker push <registry-name>.azurecr.io/gmb-boost-pro-backend:latest
```

## 📝 Notes

- The container runs on port 5000 by default
- Health checks ensure the service is running properly
- Logs are stored in the mounted volumes
- The service automatically restarts if it crashes
