# Docker Hub Deployment Guide

Your Google Ranker backend is now available on Docker Hub!

## 🐳 Docker Hub Repository

**Image**: `scale112/google-ranker`

**Available Tags**:
- `scale112/google-ranker:latest` - Latest version
- `scale112/google-ranker:v1.0` - Version 1.0

## 📥 Pull from Docker Hub

### Quick Deploy (Any Machine)

```bash
# Pull the image
docker pull scale112/google-ranker:latest

# Run the container
docker run -d \
  --name google-ranker \
  -p 5000:5000 \
  --restart unless-stopped \
  scale112/google-ranker:latest
```

### Using Docker Compose (Recommended)

```bash
# Use the hub configuration
docker-compose -f docker-compose.hub.yml up -d

# View logs
docker-compose -f docker-compose.hub.yml logs -f

# Stop
docker-compose -f docker-compose.hub.yml down
```

### Using Batch Scripts (Windows)

```bash
# Pull latest image
.\docker-pull.bat

# Run with docker-compose
docker-compose -f docker-compose.hub.yml up -d
```

## 🚀 Deploy on Any Server

### Step 1: Install Docker

**Ubuntu/Debian:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

**Windows:**
- Install Docker Desktop from docker.com

### Step 2: Pull and Run

```bash
# Pull the image
docker pull scale112/google-ranker:latest

# Run the container
docker run -d \
  --name google-ranker \
  -p 5000:5000 \
  --restart unless-stopped \
  scale112/google-ranker:latest
```

### Step 3: Verify

```bash
# Check container status
docker ps

# View logs
docker logs -f google-ranker

# Test health endpoint
curl http://localhost:5000/health
```

## 🔄 Update to Latest Version

```bash
# Stop current container
docker stop google-ranker
docker rm google-ranker

# Pull latest image
docker pull scale112/google-ranker:latest

# Run new container
docker run -d \
  --name google-ranker \
  -p 5000:5000 \
  --restart unless-stopped \
  scale112/google-ranker:latest
```

Or with docker-compose:
```bash
docker-compose -f docker-compose.hub.yml pull
docker-compose -f docker-compose.hub.yml up -d
```

## 📤 Push New Version

When you make changes and want to update Docker Hub:

```bash
# Build new image
docker build -t google-ranker:latest .

# Tag for Docker Hub
docker tag google-ranker:latest scale112/google-ranker:latest
docker tag google-ranker:latest scale112/google-ranker:v1.1

# Push to Docker Hub
docker push scale112/google-ranker:latest
docker push scale112/google-ranker:v1.1
```

Or use the batch script:
```bash
.\docker-push.bat
```

## 🌐 Cloud Deployment Examples

### AWS EC2

```bash
# SSH into EC2 instance
ssh -i key.pem ubuntu@your-ec2-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Pull and run
sudo docker pull scale112/google-ranker:latest
sudo docker run -d \
  --name google-ranker \
  -p 5000:5000 \
  --restart unless-stopped \
  scale112/google-ranker:latest
```

### Azure Container Instances

```bash
az container create \
  --resource-group myResourceGroup \
  --name google-ranker \
  --image scale112/google-ranker:latest \
  --dns-name-label google-ranker \
  --ports 5000
```

### Google Cloud Run

```bash
gcloud run deploy google-ranker \
  --image scale112/google-ranker:latest \
  --platform managed \
  --port 5000 \
  --allow-unauthenticated
```

### DigitalOcean

```bash
# Create Droplet with Docker
# SSH into droplet

# Pull and run
docker pull scale112/google-ranker:latest
docker run -d \
  --name google-ranker \
  -p 5000:5000 \
  --restart unless-stopped \
  scale112/google-ranker:latest
```

## 🔧 Environment Variables

All environment variables are **hardcoded** in the image:
- Google OAuth credentials
- Supabase configuration
- Razorpay payment settings
- Azure OpenAI settings

No additional configuration needed!

## 📊 Image Information

```bash
# View image details
docker inspect scale112/google-ranker:latest

# Check image size
docker images scale112/google-ranker

# View image layers
docker history scale112/google-ranker:latest
```

## 🔐 Security Notes

⚠️ **Important**: This image contains hardcoded credentials. 

For production:
- Consider using environment variable overrides
- Implement secrets management
- Use private Docker registry for sensitive deployments

## 📝 Quick Reference

**Pull Image:**
```bash
docker pull scale112/google-ranker:latest
```

**Run Container:**
```bash
docker run -d --name google-ranker -p 5000:5000 scale112/google-ranker:latest
```

**View Logs:**
```bash
docker logs -f google-ranker
```

**Stop Container:**
```bash
docker stop google-ranker
```

**Remove Container:**
```bash
docker rm google-ranker
```

**Update to Latest:**
```bash
docker pull scale112/google-ranker:latest && docker stop google-ranker && docker rm google-ranker && docker run -d --name google-ranker -p 5000:5000 scale112/google-ranker:latest
```

## 🌟 Access Your Backend

Once deployed, your backend will be accessible at:
- **Local**: http://localhost:5000
- **Server**: http://your-server-ip:5000
- **Health Check**: http://your-server-ip:5000/health

## 🆘 Troubleshooting

**Container won't start:**
```bash
docker logs google-ranker
```

**Port already in use:**
```bash
# Use different port
docker run -d --name google-ranker -p 8080:5000 scale112/google-ranker:latest
```

**Need to reset:**
```bash
docker stop google-ranker
docker rm google-ranker
docker pull scale112/google-ranker:latest
docker run -d --name google-ranker -p 5000:5000 scale112/google-ranker:latest
```
