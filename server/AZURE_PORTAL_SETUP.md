# Azure Portal Container Instance Setup Guide

## 📋 Complete Form Fill Guide for Azure Portal

### Navigate to: https://portal.azure.com → Create a resource → Container Instances

---

## 1️⃣ BASICS Tab

### Project Details
```
Subscription: [Select your Azure subscription]
Resource Group: google-ranker-rg (Create new)
```

### Container Details
```
Container name: google-ranker
Region: East US (or your preferred region)
Availability zones: None
SKU: Standard
```

---

## 2️⃣ CONTAINER Tab

### Image Source
```
○ Quickstart
○ Azure Container Registry
● Other container registries
```

### Image Settings
```
Image type: ● Public  ○ Private
Image: scale112/google-ranker:latest
OS type: ● Linux  ○ Windows
```

### Size
```
Number of CPU cores: 1
Memory (GB): 1.5
```

### Quickstart Options (Not Used)
```
Sample: [Ignore - using custom image]
```

---

## 3️⃣ NETWORKING Tab

### Networking Type
```
● Public  ○ Private
```

### DNS Name Label
```
DNS name label: google-ranker
(Results in: google-ranker.eastus.azurecontainer.io)
```

### Ports
```
Port 1:
  Port: 5000
  Protocol: ● TCP  ○ UDP
```

---

## 4️⃣ ADVANCED Tab

### Restart Policy
```
● Always
○ On failure
○ Never
```

### Environment Variables (Optional - Already in Image)
```
[Skip this section - all variables are hardcoded in the Docker image]

If you want to override, add:
Name                    Value                Secure
PORT                    5000                 ○
NODE_ENV                production           ○
```

### Command Override
```
[Leave empty - use default CMD from Dockerfile]
```

---

## 5️⃣ TAGS Tab (Optional)

```
Name                Value
Environment         Production
Application         GoogleRanker
ManagedBy          Azure
```

---

## 6️⃣ REVIEW + CREATE Tab

### Summary
```
✓ Validation passed

Basics:
  Resource group: google-ranker-rg
  Container name: google-ranker
  Region: East US
  
Container:
  Image: scale112/google-ranker:latest
  OS: Linux
  Size: 1 vCPU, 1.5 GB
  
Networking:
  Type: Public
  DNS: google-ranker.eastus.azurecontainer.io
  Port: 5000/TCP
  
Advanced:
  Restart policy: Always

Estimated cost: ~$30/month
```

Click **[Create]**

---

## ✅ After Deployment

### Access URLs
Once deployed (takes 2-3 minutes):

```
Backend URL:
http://google-ranker.eastus.azurecontainer.io:5000

Health Check:
http://google-ranker.eastus.azurecontainer.io:5000/health

API Endpoints:
http://google-ranker.eastus.azurecontainer.io:5000/api/...
```

### View Container Logs
1. Go to your Container Instance in Azure Portal
2. Click "Containers" in left menu
3. Click "Logs" tab
4. View real-time logs

### Monitor Container
1. Click "Metrics" in left menu
2. View CPU, Memory, Network usage

---

## 🎯 Quick Copy-Paste Values

```
Container Name:     google-ranker
Image Source:       Other container registries
Image:             scale112/google-ranker:latest
OS Type:           Linux
CPU:               1
Memory:            1.5 GB
DNS Label:         google-ranker
Port:              5000
Protocol:          TCP
Restart Policy:    Always
```

---

## 🔧 Sidecar Support (Multi-Container)

If you want to add NGINX as reverse proxy:

### In CONTAINER Tab, click "+ Add" to add second container:

**Container 1: Backend**
```
Name: google-ranker-backend
Image: scale112/google-ranker:latest
Port: 5000
CPU: 1
Memory: 1.5 GB
```

**Container 2: NGINX (Sidecar)**
```
Name: nginx-proxy
Image: nginx:latest
Port: 80
CPU: 0.5
Memory: 0.5 GB
```

Total Resources: 1.5 CPU, 2 GB Memory

---

## 📊 Size Recommendations

| Environment | CPU | Memory | Estimated Cost |
|-------------|-----|--------|----------------|
| Development | 0.5 | 1 GB   | ~$15/month    |
| **Production (Recommended)** | **1** | **1.5 GB** | **~$30/month** |
| High Traffic | 2 | 3.5 GB | ~$60/month    |
| Enterprise | 4 | 8 GB   | ~$120/month   |

---

## 🌍 Region Selection

Choose region closest to your users:

**US Regions:**
- East US (Virginia)
- West US (California)
- Central US (Iowa)

**Europe:**
- West Europe (Netherlands)
- North Europe (Ireland)

**Asia:**
- Southeast Asia (Singapore)
- East Asia (Hong Kong)
- Central India (Pune)

**Choose**: `East US` or `Central India` for best latency

---

## 🚀 One-Click Deploy

Instead of manual setup, use this button:

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fyour-repo%2Fazure-deploy.json)

Or use CLI:
```bash
az container create \
  --resource-group google-ranker-rg \
  --name google-ranker \
  --image scale112/google-ranker:latest \
  --dns-name-label google-ranker \
  --ports 5000 \
  --cpu 1 \
  --memory 1.5 \
  --restart-policy Always
```

---

## 📝 Complete Configuration Checklist

- [x] Image Source: Other container registries
- [x] Image: scale112/google-ranker:latest
- [x] Container Name: google-ranker
- [x] OS Type: Linux
- [x] CPU: 1 core
- [x] Memory: 1.5 GB
- [x] Port: 5000 (TCP)
- [x] DNS Label: google-ranker
- [x] Restart Policy: Always
- [x] Networking: Public
- [x] All environment variables: Hardcoded in image ✓

**Ready to deploy!** 🎉
