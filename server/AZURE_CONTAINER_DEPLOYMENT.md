# Azure Container Instances Deployment Configuration

## Complete Deployment Details for Google Ranker Backend

### 🎯 Basic Configuration

**Container Name**: `google-ranker`

**Image Source**: `Other container registries`

**Image and Tag**: `scale112/google-ranker:latest`

**OS Type**: `Linux`

**Port**: `5000`

**Protocol**: `TCP`

**DNS Name Label**: `google-ranker` (optional, makes it accessible at google-ranker.region.azurecontainer.io)

---

## 📋 Azure Portal Configuration

### Step 1: Basic Settings

| Field | Value |
|-------|-------|
| **Subscription** | Your Azure Subscription |
| **Resource Group** | `google-ranker-rg` (create new or use existing) |
| **Container Name** | `google-ranker` |
| **Region** | Select your preferred region (e.g., East US, Central India) |
| **Availability Zones** | None (optional) |
| **SKU** | Standard |

### Step 2: Container Settings

| Field | Value |
|-------|-------|
| **Image Source** | `Other container registries` |
| **Image Type** | Public |
| **Image** | `scale112/google-ranker:latest` |
| **OS Type** | Linux |
| **Size** | |
| - **CPU** | `1` cores |
| - **Memory** | `1.5` GB |

### Step 3: Networking

| Field | Value |
|-------|-------|
| **Networking Type** | Public |
| **DNS Name Label** | `google-ranker` |
| **Ports** | |
| - **Port** | `5000` |
| - **Protocol** | `TCP` |

### Step 4: Environment Variables (All Hardcoded in Image)

| Variable | Value | Note |
|----------|-------|------|
| PORT | 5000 | Already in image |
| NODE_ENV | production | Already in image |
| GOOGLE_CLIENT_ID | ✅ Configured | Hardcoded |
| GOOGLE_CLIENT_SECRET | ✅ Configured | Hardcoded |
| SUPABASE_URL | ✅ Configured | Hardcoded |
| SUPABASE_SERVICE_KEY | ✅ Configured | Hardcoded |
| RAZORPAY_KEY_ID | ✅ Configured | Hardcoded |
| RAZORPAY_KEY_SECRET | ✅ Configured | Hardcoded |
| AZURE_OPENAI_API_KEY | ✅ Configured | Hardcoded |

**Note**: All environment variables are hardcoded in the Docker image. No additional configuration needed.

### Step 5: Advanced (Optional)

| Field | Value |
|-------|-------|
| **Restart Policy** | Always |
| **Container Restart** | On Failure |

---

## 🚀 Deployment Methods

### Method 1: Azure Portal (GUI)

1. Go to Azure Portal: https://portal.azure.com
2. Click **"Create a resource"**
3. Search for **"Container Instances"**
4. Click **"Create"**
5. Fill in the configuration:

```
Basics:
  Subscription: [Your Subscription]
  Resource Group: google-ranker-rg (Create new)
  Container Name: google-ranker
  Region: East US (or your preferred region)
  Image Source: Other container registries
  Image: scale112/google-ranker:latest
  OS Type: Linux
  Size: 1 vCPU, 1.5 GB memory

Networking:
  Networking Type: Public
  DNS Name Label: google-ranker
  Ports: 5000 (TCP)

Advanced:
  Restart Policy: Always
  
Tags: (Optional)
  Environment: Production
  App: GoogleRanker
```

6. Click **"Review + Create"**
7. Click **"Create"**

### Method 2: Azure CLI

```bash
# Login to Azure
az login

# Create Resource Group
az group create \
  --name google-ranker-rg \
  --location eastus

# Create Container Instance
az container create \
  --resource-group google-ranker-rg \
  --name google-ranker \
  --image scale112/google-ranker:latest \
  --dns-name-label google-ranker \
  --ports 5000 \
  --cpu 1 \
  --memory 1.5 \
  --restart-policy Always \
  --protocol TCP
```

### Method 3: Azure PowerShell

```powershell
# Login to Azure
Connect-AzAccount

# Create Resource Group
New-AzResourceGroup -Name google-ranker-rg -Location eastus

# Create Container Instance
New-AzContainerGroup `
  -ResourceGroupName google-ranker-rg `
  -Name google-ranker `
  -Image scale112/google-ranker:latest `
  -DnsNameLabel google-ranker `
  -Port 5000 `
  -Cpu 1 `
  -MemoryInGB 1.5 `
  -RestartPolicy Always `
  -OsType Linux
```

### Method 4: ARM Template (JSON)

Save as `azure-deploy.json`:

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "containerName": {
      "type": "string",
      "defaultValue": "google-ranker",
      "metadata": {
        "description": "Name of the container"
      }
    },
    "location": {
      "type": "string",
      "defaultValue": "[resourceGroup().location]",
      "metadata": {
        "description": "Location for all resources"
      }
    }
  },
  "resources": [
    {
      "type": "Microsoft.ContainerInstance/containerGroups",
      "apiVersion": "2021-09-01",
      "name": "[parameters('containerName')]",
      "location": "[parameters('location')]",
      "properties": {
        "containers": [
          {
            "name": "google-ranker",
            "properties": {
              "image": "scale112/google-ranker:latest",
              "ports": [
                {
                  "port": 5000,
                  "protocol": "TCP"
                }
              ],
              "resources": {
                "requests": {
                  "cpu": 1,
                  "memoryInGB": 1.5
                }
              }
            }
          }
        ],
        "osType": "Linux",
        "restartPolicy": "Always",
        "ipAddress": {
          "type": "Public",
          "ports": [
            {
              "port": 5000,
              "protocol": "TCP"
            }
          ],
          "dnsNameLabel": "google-ranker"
        }
      }
    }
  ],
  "outputs": {
    "containerUrl": {
      "type": "string",
      "value": "[concat('http://', reference(resourceId('Microsoft.ContainerInstance/containerGroups', parameters('containerName'))).ipAddress.fqdn, ':5000')]"
    }
  }
}
```

Deploy the template:
```bash
az deployment group create \
  --resource-group google-ranker-rg \
  --template-file azure-deploy.json
```

---

## 🌐 Sidecar Container Support (Optional)

### Add NGINX as Sidecar (Reverse Proxy)

```bash
az container create \
  --resource-group google-ranker-rg \
  --name google-ranker-with-nginx \
  --image scale112/google-ranker:latest \
  --dns-name-label google-ranker \
  --cpu 1 \
  --memory 1.5 \
  --restart-policy Always \
  --ports 80 5000 \
  --protocol TCP \
  --environment-variables \
    PORT=5000 \
    NODE_ENV=production
```

### Sidecar Configuration (Multi-Container Group)

For NGINX sidecar with Google Ranker:

```yaml
# docker-compose-azure.yml
version: '3.8'

services:
  google-ranker:
    image: scale112/google-ranker:latest
    container_name: google-ranker-backend
    ports:
      - "5000:5000"
    restart: always
    
  nginx:
    image: nginx:latest
    container_name: nginx-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - google-ranker
    restart: always
```

---

## 📊 Resource Specifications

### Recommended Sizes

| Workload | CPU | Memory | Cost/Month (Est.) |
|----------|-----|--------|-------------------|
| **Dev/Test** | 0.5 cores | 1 GB | ~$15 |
| **Small Production** | 1 core | 1.5 GB | ~$30 |
| **Medium Production** | 2 cores | 3.5 GB | ~$60 |
| **Large Production** | 4 cores | 8 GB | ~$120 |

---

## 🔍 Post-Deployment

### Get Container Details

```bash
# Get container status
az container show \
  --resource-group google-ranker-rg \
  --name google-ranker \
  --query "{FQDN:ipAddress.fqdn,IP:ipAddress.ip,State:instanceView.state}" \
  --output table
```

### View Logs

```bash
# Real-time logs
az container logs \
  --resource-group google-ranker-rg \
  --name google-ranker \
  --follow

# One-time logs
az container logs \
  --resource-group google-ranker-rg \
  --name google-ranker
```

### Access Your Application

After deployment, your backend will be available at:
- **FQDN**: `http://google-ranker.[region].azurecontainer.io:5000`
- **Health Check**: `http://google-ranker.[region].azurecontainer.io:5000/health`

### Test Health Endpoint

```bash
# Get the FQDN
FQDN=$(az container show \
  --resource-group google-ranker-rg \
  --name google-ranker \
  --query ipAddress.fqdn \
  --output tsv)

# Test health endpoint
curl http://$FQDN:5000/health
```

---

## 🔄 Update Container

```bash
# Delete old container
az container delete \
  --resource-group google-ranker-rg \
  --name google-ranker \
  --yes

# Pull latest image and recreate
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

## 📈 Monitoring

### Enable Container Insights

```bash
az container create \
  --resource-group google-ranker-rg \
  --name google-ranker \
  --image scale112/google-ranker:latest \
  --dns-name-label google-ranker \
  --ports 5000 \
  --cpu 1 \
  --memory 1.5 \
  --restart-policy Always \
  --log-analytics-workspace [workspace-id] \
  --log-analytics-workspace-key [workspace-key]
```

---

## 🗑️ Cleanup

```bash
# Delete container
az container delete \
  --resource-group google-ranker-rg \
  --name google-ranker \
  --yes

# Delete resource group
az group delete \
  --name google-ranker-rg \
  --yes
```

---

## 🎯 Quick Reference Summary

**Container Details:**
- **Name**: google-ranker
- **Image**: scale112/google-ranker:latest
- **Port**: 5000
- **CPU**: 1 core
- **Memory**: 1.5 GB
- **Restart Policy**: Always
- **OS**: Linux

**All credentials are hardcoded in the image - no environment variables needed!**
