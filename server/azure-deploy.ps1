# Azure Container Instances Deployment Script (PowerShell)
# For Google Ranker Backend

# Configuration
$ResourceGroup = "google-ranker-rg"
$Location = "eastus"
$ContainerName = "google-ranker"
$Image = "googleranker/google-ranker:latest"
$DnsLabel = "google-ranker"
$Port = 5000
$Cpu = 1
$Memory = 1.5

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Azure Container Instance Deployment" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Login to Azure
Write-Host "Step 1: Logging into Azure..." -ForegroundColor Blue
Connect-AzAccount

# Step 2: Create Resource Group
Write-Host ""
Write-Host "Step 2: Creating Resource Group..." -ForegroundColor Blue
New-AzResourceGroup -Name $ResourceGroup -Location $Location -Force

# Step 3: Deploy Container Instance
Write-Host ""
Write-Host "Step 3: Deploying Container Instance..." -ForegroundColor Blue
$container = New-AzContainerGroup `
  -ResourceGroupName $ResourceGroup `
  -Name $ContainerName `
  -Image $Image `
  -DnsNameLabel $DnsLabel `
  -Port $Port `
  -Cpu $Cpu `
  -MemoryInGB $Memory `
  -RestartPolicy Always `
  -OsType Linux

# Step 4: Get Container Details
Write-Host ""
Write-Host "Step 4: Getting Container Details..." -ForegroundColor Blue
$containerInfo = Get-AzContainerGroup -ResourceGroupName $ResourceGroup -Name $ContainerName

$FQDN = $containerInfo.IpAddress
$IP = $containerInfo.IpAddress

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "Deployment Successful!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Container Details:" -ForegroundColor Yellow
Write-Host "  Name: $ContainerName"
Write-Host "  Resource Group: $ResourceGroup"
Write-Host "  Location: $Location"
Write-Host ""
Write-Host "Access URLs:" -ForegroundColor Yellow
Write-Host "  FQDN: http://$($containerInfo.Fqdn):$Port"
Write-Host "  IP: http://$IP`:$Port"
Write-Host "  Health Check: http://$($containerInfo.Fqdn):$Port/health"
Write-Host ""
Write-Host "Management Commands:" -ForegroundColor Yellow
Write-Host "  View Logs: Get-AzContainerInstanceLog -ResourceGroupName $ResourceGroup -ContainerGroupName $ContainerName -Name $ContainerName"
Write-Host "  Container Status: Get-AzContainerGroup -ResourceGroupName $ResourceGroup -Name $ContainerName"
Write-Host "  Delete Container: Remove-AzContainerGroup -ResourceGroupName $ResourceGroup -Name $ContainerName"
Write-Host ""

# Test health endpoint
Write-Host "Testing health endpoint..." -ForegroundColor Blue
Start-Sleep -Seconds 10
try {
    $response = Invoke-WebRequest -Uri "http://$($containerInfo.Fqdn):$Port/health" -UseBasicParsing
    Write-Host "✓ Health check passed!" -ForegroundColor Green
} catch {
    Write-Host "⚠ Health check failed (container may still be starting)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Deployment complete!" -ForegroundColor Green
