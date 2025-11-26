# Docker Hub Configuration Reference

## 📋 Complete Docker Hub Settings for Google Ranker

---

## 🐳 Docker Hub Options

### Access Type
```
● Public
○ Private
```
**Selected**: `Public`

### Registry Server URL
```
docker.io
```
OR
```
index.docker.io
```
OR leave empty (defaults to Docker Hub)

### Image and Tag
```
googleranker/google-ranker:latest
```

Alternative versions:
```
googleranker/google-ranker:v1.0
googleranker/google-ranker:stable
```

### Port
```
5000
```

Protocol: `TCP`

### Startup Command
```
[Leave empty - uses default from Dockerfile]
```

Default command from Dockerfile:
```
node server.js
```

Custom override (if needed):
```
node server.js
```

---

## 🔐 Authentication Settings

### For Public Image (No Auth Required)
```
Username: [Not needed]
Password: [Not needed]
```

### For Private Image (If using private registry)
```
Username: googleranker
Password: [Your Docker Hub password/token]
Registry: docker.io
```

---

## 📦 Complete Configuration Details

### Docker Hub Public Registry

| Field | Value |
|-------|-------|
| **Access Type** | Public |
| **Registry Server URL** | `docker.io` or leave empty |
| **Image** | `googleranker/google-ranker` |
| **Tag** | `latest` |
| **Full Image Path** | `googleranker/google-ranker:latest` |
| **Port** | `5000` |
| **Protocol** | `TCP` |
| **Startup Command** | [Empty - uses default] |
| **Working Directory** | `/app` |
| **Authentication** | Not required (public image) |

---

## 🌐 Azure Container Instance Configuration

### Container Settings

```yaml
Image Source: Other container registries
Access Type: Public
Registry Server: docker.io (or leave empty)
Image and Tag: googleranker/google-ranker:latest
OS Type: Linux
Size:
  CPU: 1 cores
  Memory: 1.5 GB

Networking:
  Port: 5000
  Protocol: TCP
  DNS Label: google-ranker

Advanced:
  Startup Command: [Leave empty]
  Restart Policy: Always
```

---

## 🚢 AWS ECS/Fargate Configuration

### Task Definition

```json
{
  "family": "google-ranker",
  "containerDefinitions": [
    {
      "name": "google-ranker",
      "image": "googleranker/google-ranker:latest",
      "portMappings": [
        {
          "containerPort": 5000,
          "hostPort": 5000,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "memory": 1536,
      "cpu": 1024
    }
  ],
  "requiresCompatibilities": ["FARGATE"],
  "networkMode": "awsvpc",
  "cpu": "1024",
  "memory": "1536"
}
```

### Image Details
```
Registry: Docker Hub (Public)
Repository: googleranker/google-ranker
Tag: latest
Pull Behavior: Always pull latest
Authentication: None (public image)
```

---

## ☁️ Google Cloud Run Configuration

### Service Settings

```yaml
Container Image URL: googleranker/google-ranker:latest
Container Port: 5000

Registry Type: Docker Hub
Registry Server: docker.io
Access: Public (no authentication)

Resources:
  CPU: 1
  Memory: 1.5 GiB
  
Startup:
  Command: [default from image]
  Args: [none]
```

### Deployment Command
```bash
gcloud run deploy google-ranker \
  --image=googleranker/google-ranker:latest \
  --port=5000 \
  --platform=managed \
  --allow-unauthenticated \
  --region=us-central1 \
  --memory=1.5Gi \
  --cpu=1
```

---

## 🔷 DigitalOcean App Platform

### App Spec

```yaml
name: google-ranker
services:
  - name: backend
    image:
      registry_type: DOCKER_HUB
      registry: googleranker
      repository: google-ranker
      tag: latest
    http_port: 5000
    instance_count: 1
    instance_size_slug: basic-xs
    routes:
      - path: /
```

### Container Settings
```
Registry Type: Docker Hub
Image: googleranker/google-ranker:latest
Port: 5000
Access Type: Public
Authentication: Not required
```

---

## 🐙 Kubernetes Deployment

### deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: google-ranker
spec:
  replicas: 1
  selector:
    matchLabels:
      app: google-ranker
  template:
    metadata:
      labels:
        app: google-ranker
    spec:
      containers:
      - name: google-ranker
        image: googleranker/google-ranker:latest
        ports:
        - containerPort: 5000
          protocol: TCP
        resources:
          requests:
            memory: "1.5Gi"
            cpu: "1000m"
          limits:
            memory: "2Gi"
            cpu: "1500m"
        imagePullPolicy: Always
---
apiVersion: v1
kind: Service
metadata:
  name: google-ranker-service
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 5000
    protocol: TCP
  selector:
    app: google-ranker
```

### Image Pull Configuration
```yaml
Image: googleranker/google-ranker:latest
ImagePullPolicy: Always
ImagePullSecrets: [] # Not needed for public image

# If private, add:
# imagePullSecrets:
# - name: dockerhub-secret
```

---

## 🎯 Docker Compose (Any Platform)

### docker-compose.yml

```yaml
version: '3.8'

services:
  google-ranker:
    image: googleranker/google-ranker:latest
    container_name: google-ranker
    ports:
      - "5000:5000"
    restart: unless-stopped
    
    # Image settings
    pull_policy: always
    
    # No command override needed
    # command: node server.js
    
    # No environment variables needed (all hardcoded)
    # But can override if needed:
    # environment:
    #   - PORT=5000
    #   - NODE_ENV=production
```

---

## 📊 Platform-Specific Quick Reference

### Azure Container Instances
```
Image Source: Other container registries
Access Type: Public
Image: googleranker/google-ranker:latest
Port: 5000
Command: [Leave empty]
```

### AWS Elastic Container Service (ECS)
```
Image: googleranker/google-ranker:latest
Port Mappings: 5000:5000
Launch Type: Fargate
Command: [Leave empty]
```

### Google Cloud Run
```
Container Image: googleranker/google-ranker:latest
Port: 5000
CPU: 1
Memory: 1.5 GiB
Command: [default]
```

### Heroku Container Registry
```bash
# Pull from Docker Hub and push to Heroku
docker pull googleranker/google-ranker:latest
docker tag googleranker/google-ranker:latest registry.heroku.com/your-app/web
docker push registry.heroku.com/your-app/web
heroku container:release web -a your-app
```

### Railway
```
Source: Docker Hub
Image: googleranker/google-ranker:latest
Port: 5000
Start Command: [default]
```

### Render
```
Type: Web Service
Image URL: googleranker/google-ranker:latest
Port: 5000
Health Check Path: /health
```

---

## 🔧 Advanced Configuration Options

### Pull Policy
```
Always - Pull on every deployment (recommended for :latest)
IfNotPresent - Pull only if not cached
Never - Use cached image only
```

**Recommended**: `Always` (for latest tag)

### Restart Policy
```
Always - Restart on failure (recommended)
OnFailure - Restart only on error
Never - Don't restart
```

**Recommended**: `Always`

### Health Check
```
Path: /health
Port: 5000
Protocol: HTTP
Interval: 30s
Timeout: 10s
Retries: 3
```

---

## 🌟 Complete Example: All Platforms

### Docker Hub Settings (Universal)
```
═══════════════════════════════════════
DOCKER HUB CONFIGURATION
═══════════════════════════════════════

Access Type:           Public
Registry Server:       docker.io
Image and Tag:         googleranker/google-ranker:latest
Port:                  5000
Protocol:              TCP
Startup Command:       [Leave empty]
Working Directory:     /app
Environment Variables: [All hardcoded in image]

Authentication:        Not Required (Public Image)

Pull Command:
docker pull googleranker/google-ranker:latest

Run Command:
docker run -d --name google-ranker -p 5000:5000 googleranker/google-ranker:latest

Health Check:
curl http://localhost:5000/health
═══════════════════════════════════════
```

---

## 📝 Copy-Paste Values

**For any deployment platform:**

```
Image: googleranker/google-ranker:latest
Port: 5000
Protocol: TCP
Registry: docker.io (or leave empty)
Access: Public
Auth: Not required
Command: [Leave empty - uses default]
CPU: 1 core (minimum)
Memory: 1.5 GB (minimum)
Restart: Always
Health: /health endpoint on port 5000
```

---

## 🎯 Quick Deployment Commands

### Pull Image
```bash
docker pull googleranker/google-ranker:latest
```

### Run Container
```bash
docker run -d \
  --name google-ranker \
  -p 5000:5000 \
  --restart unless-stopped \
  googleranker/google-ranker:latest
```

### Verify Running
```bash
docker ps
docker logs google-ranker
curl http://localhost:5000/health
```

### Update to Latest
```bash
docker pull googleranker/google-ranker:latest
docker stop google-ranker
docker rm google-ranker
docker run -d --name google-ranker -p 5000:5000 googleranker/google-ranker:latest
```

---

## ✅ Configuration Checklist

- [x] Image Source: Docker Hub (Public)
- [x] Registry: docker.io
- [x] Image: googleranker/google-ranker:latest
- [x] Port: 5000 TCP
- [x] Command: Default (node server.js)
- [x] Authentication: Not required
- [x] Environment Variables: Hardcoded in image
- [x] Health Check: Available at /health
- [x] All credentials: Included in image

**Your image is ready to deploy on any platform!** 🚀
