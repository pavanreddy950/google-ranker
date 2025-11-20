#!/bin/bash

# Azure Container Instances Deployment Script
# For Google Ranker Backend

set -e

echo "========================================="
echo "Azure Container Instance Deployment"
echo "========================================="
echo ""

# Configuration
RESOURCE_GROUP="google-ranker-rg"
LOCATION="eastus"
CONTAINER_NAME="google-ranker"
IMAGE="scale112/google-ranker:latest"
DNS_LABEL="google-ranker"
PORT=5000
CPU=1
MEMORY=1.5

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step 1: Logging into Azure...${NC}"
az login

echo ""
echo -e "${BLUE}Step 2: Creating Resource Group...${NC}"
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION

echo ""
echo -e "${BLUE}Step 3: Deploying Container Instance...${NC}"
az container create \
  --resource-group $RESOURCE_GROUP \
  --name $CONTAINER_NAME \
  --image $IMAGE \
  --dns-name-label $DNS_LABEL \
  --ports $PORT \
  --cpu $CPU \
  --memory $MEMORY \
  --restart-policy Always \
  --protocol TCP

echo ""
echo -e "${BLUE}Step 4: Getting Container Details...${NC}"
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

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}Deployment Successful!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "${YELLOW}Container Details:${NC}"
echo "  Name: $CONTAINER_NAME"
echo "  Resource Group: $RESOURCE_GROUP"
echo "  Location: $LOCATION"
echo ""
echo -e "${YELLOW}Access URLs:${NC}"
echo "  FQDN: http://$FQDN:$PORT"
echo "  IP: http://$IP:$PORT"
echo "  Health Check: http://$FQDN:$PORT/health"
echo ""
echo -e "${YELLOW}Management Commands:${NC}"
echo "  View Logs: az container logs --resource-group $RESOURCE_GROUP --name $CONTAINER_NAME --follow"
echo "  Container Status: az container show --resource-group $RESOURCE_GROUP --name $CONTAINER_NAME"
echo "  Delete Container: az container delete --resource-group $RESOURCE_GROUP --name $CONTAINER_NAME --yes"
echo ""

# Test health endpoint
echo -e "${BLUE}Testing health endpoint...${NC}"
sleep 10 # Wait for container to start
curl -f "http://$FQDN:$PORT/health" && echo -e "${GREEN}✓ Health check passed!${NC}" || echo -e "${YELLOW}⚠ Health check failed (container may still be starting)${NC}"

echo ""
echo -e "${GREEN}Deployment complete!${NC}"
