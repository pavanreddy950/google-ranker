#!/usr/bin/env node

/**
 * Environment switcher for local and Azure deployments
 * Usage: node switch-env.js [local|azure|status]
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0] || 'status';

const ENV_FILE = path.join(__dirname, '.env');
const ENV_LOCAL = path.join(__dirname, '.env.local');
const ENV_AZURE = path.join(__dirname, '.env.azure');
const ENV_EXAMPLE = path.join(__dirname, '.env.example');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getEnvironmentStatus() {
  const exists = fs.existsSync(ENV_FILE);
  if (!exists) {
    return 'No .env file found';
  }

  const content = fs.readFileSync(ENV_FILE, 'utf8');
  
  // Check for Azure-specific config
  if (content.includes('azure') || content.includes('Azure')) {
    return 'Azure';
  }
  
  // Check for localhost
  if (content.includes('localhost')) {
    return 'Local';
  }
  
  return 'Unknown';
}

function switchEnvironment(target) {
  const targetFile = target === 'local' ? ENV_LOCAL : ENV_AZURE;
  
  // If specific env file doesn't exist, use the current .env
  if (!fs.existsSync(targetFile)) {
    log(`⚠ ${target === 'local' ? '.env.local' : '.env.azure'} not found, using current .env`, 'yellow');
    
    // For Azure builds, just ensure .env exists
    if (target === 'azure' && fs.existsSync(ENV_FILE)) {
      log('✓ Using existing .env for Azure deployment', 'green');
      return true;
    }
    
    // For local, if .env exists, use it
    if (target === 'local' && fs.existsSync(ENV_FILE)) {
      log('✓ Using existing .env for local development', 'green');
      return true;
    }
    
    // If no .env exists, create from example
    if (fs.existsSync(ENV_EXAMPLE)) {
      fs.copyFileSync(ENV_EXAMPLE, ENV_FILE);
      log(`✓ Created .env from .env.example`, 'green');
      return true;
    }
    
    log('✗ No .env configuration found', 'red');
    return false;
  }
  
  try {
    // Backup current .env if it exists
    if (fs.existsSync(ENV_FILE)) {
      const backupFile = `${ENV_FILE}.backup`;
      fs.copyFileSync(ENV_FILE, backupFile);
      log(`✓ Backed up current .env to ${path.basename(backupFile)}`, 'blue');
    }
    
    // Copy target environment file to .env
    fs.copyFileSync(targetFile, ENV_FILE);
    log(`✓ Switched to ${target} environment`, 'green');
    return true;
  } catch (error) {
    log(`✗ Error switching environment: ${error.message}`, 'red');
    return false;
  }
}

function showStatus() {
  const status = getEnvironmentStatus();
  log('\n=== Environment Status ===', 'blue');
  log(`Current: ${status}`, 'yellow');
  log(`\nAvailable files:`, 'blue');
  log(`  .env: ${fs.existsSync(ENV_FILE) ? '✓' : '✗'}`);
  log(`  .env.local: ${fs.existsSync(ENV_LOCAL) ? '✓' : '✗'}`);
  log(`  .env.azure: ${fs.existsSync(ENV_AZURE) ? '✓' : '✗'}`);
  log(`  .env.example: ${fs.existsSync(ENV_EXAMPLE) ? '✓' : '✗'}`);
  log('');
}

// Main execution
switch (command) {
  case 'local':
    log('\n→ Switching to LOCAL environment...', 'blue');
    process.exit(switchEnvironment('local') ? 0 : 1);
    break;
    
  case 'azure':
    log('\n→ Switching to AZURE environment...', 'blue');
    process.exit(switchEnvironment('azure') ? 0 : 1);
    break;
    
  case 'status':
    showStatus();
    break;
    
  default:
    log(`\n✗ Unknown command: ${command}`, 'red');
    log('\nUsage: node switch-env.js [local|azure|status]', 'yellow');
    process.exit(1);
}
