#!/bin/bash

# Production Deployment Script for Google Ranker
# Deploys to Azure Container Instances with Hybrid Mode

set -e

echo "========================================"
echo "Google Ranker - Production Deployment"
echo "========================================"
echo ""

# Configuration
RESOURCE_GROUP="google-ranker-rg"
LOCATION="canadacentral"
CONTAINER_NAME="google-ranker"
IMAGE="scale112/google-ranker:v2.0-production"
DNS_LABEL="google-ranker"
PORT=5000
CPU=1
MEMORY=1.5

# Production URLs
FRONTEND_URL="https://happy-forest-0fe6bb90f.3.azurestaticapps.net"
BACKEND_URL="https://google-ranker-g5h9g6edawdhbjcw.canadacentral-01.azurewebsites.net"
REDIRECT_URI="https://happy-forest-0fe6bb90f.3.azurestaticapps.net/auth/google/callback"
ALLOWED_ORIGINS="https://happy-forest-0fe6bb90f.3.azurestaticapps.net,http://localhost:3000,http://localhost:5173"
TOKEN_KEY="gmb-boost-pro-2024-secure-encryption-key-change-this-in-production-32chars"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step 1: Logging into Azure...${NC}"
az login

echo ""
echo -e "${BLUE}Step 2: Creating Resource Group (if not exists)...${NC}"
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION

echo ""
echo -e "${YELLOW}Step 3: Deleting existing container (if exists)...${NC}"
az container delete \
  --resource-group $RESOURCE_GROUP \
  --name $CONTAINER_NAME \
  --yes || true

echo ""
echo -e "${BLUE}Step 4: Deploying production container...${NC}"
echo "Image: $IMAGE"
echo "Frontend: $FRONTEND_URL"
echo "Backend: $BACKEND_URL"
echo ""

az container create \
  --resource-group $RESOURCE_GROUP \
  --name $CONTAINER_NAME \
  --image $IMAGE \
  --dns-name-label $DNS_LABEL \
  --ports $PORT \
  --cpu $CPU \
  --memory $MEMORY \
  --restart-policy Always \
  --location $LOCATION \
  --environment-variables \
    TOKEN_ENCRYPTION_KEY="$TOKEN_KEY" \
    FRONTEND_URL="$FRONTEND_URL" \
    BACKEND_URL="$BACKEND_URL" \
    GOOGLE_REDIRECT_URI="$REDIRECT_URI" \
    ALLOWED_ORIGINS="$ALLOWED_ORIGINS"

echo ""
echo -e "${BLUE}Step 5: Waiting for container to start...${NC}"
sleep 30

echo ""
echo -e "${BLUE}Step 6: Getting container details...${NC}"
FQDN=$(az container show \
  --resource-group $RESOURCE_GROUP \
  --name $CONTAINER_NAME \
  --query ipAddress.fqdn \
  --output tsv)

IP=$(az container show \
  --resource-group $RESOURCE_GROUP \
  --name $CONTAINER_NAME \
  --query ipAddress.ip \
  --output tsv)

STATE=$(az container show \
  --resource-group $RESOURCE_GROUP \
  --name $CONTAINER_NAME \
  --query instanceView.state \
  --output tsv)

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment Successful!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Container Details:${NC}"
echo "  Name: $CONTAINER_NAME"
echo "  Resource Group: $RESOURCE_GROUP"
echo "  Location: $LOCATION"
echo "  State: $STATE"
echo ""
echo -e "${YELLOW}Access URLs:${NC}"
echo "  FQDN: https://$FQDN:$PORT"
echo "  IP: http://$IP:$PORT"
echo "  Health: https://$FQDN:$PORT/health"
echo "  Config: https://$FQDN:$PORT/config"
echo ""
echo -e "${YELLOW}Production URLs:${NC}"
echo "  Frontend: $FRONTEND_URL"
echo "  Backend: $BACKEND_URL"
echo ""

# Test health endpoint
echo -e "${BLUE}Testing health endpoint...${NC}"
sleep 5
HEALTH_RESPONSE=$(curl -s "https://$FQDN:$PORT/health" || echo "FAILED")

if echo "$HEALTH_RESPONSE" | grep -q "OK"; then
    echo -e "${GREEN}✓ Health check passed!${NC}"
    echo "$HEALTH_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$HEALTH_RESPONSE"
else
    echo -e "${RED}⚠ Health check failed (container may still be starting)${NC}"
    echo "$HEALTH_RESPONSE"
fi

echo ""
echo -e "${YELLOW}Management Commands:${NC}"
echo "  View Logs: az container logs --resource-group $RESOURCE_GROUP --name $CONTAINER_NAME --follow"
echo "  Container Status: az container show --resource-group $RESOURCE_GROUP --name $CONTAINER_NAME"
echo "  Delete Container: az container delete --resource-group $RESOURCE_GROUP --name $CONTAINER_NAME --yes"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "  1. Add redirect URI to Google OAuth Console:"
echo "     $REDIRECT_URI"
echo "  2. Update frontend to point to backend:"
echo "     $BACKEND_URL"
echo "  3. Test OAuth flow on:"
echo "     $FRONTEND_URL"
echo ""
echo -e "${GREEN}Production deployment complete!${NC}"
