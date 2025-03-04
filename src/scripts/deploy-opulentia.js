#!/usr/bin/env node
// @ts-check
// @ts-ignore -- Adding empty export to make this a module
export {};

/**
 * Deployment script for OPULENTIA on Vercel
 * This script helps set up and deploy the OPULENTIA application to Vercel
 */

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Get the project root directory
const projectRoot = path.resolve(__dirname, '../../');

// Required environment variables
const requiredEnvVars = [
  'OPENAI_API_KEY',
  'ANTHROPIC_API_KEY',
  'XAI_API_KEY',
  'FIN_DATASETS_API_KEY',
  'JINA_API_KEY',
  'JINA_ENDPOINT',
  'DEFAULT_PROVIDER',
];

// Function to check if Vercel CLI is installed
function checkVercelCLI() {
  try {
    execSync('vercel --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Function to prompt for environment variables
function promptForEnvVars() {
  return new Promise((resolve) => {
    /** @type {Record<string, string>} */
    const envVars = {};

    let currentVar = 0;

    function promptNext() {
      if (currentVar >= requiredEnvVars.length) {
        rl.close();
        resolve(envVars);
        return;
      }

      const envVar = requiredEnvVars[currentVar];
      rl.question(`Enter value for ${envVar} (or leave blank to skip): `, (answer) => {
        if (answer.trim() !== '') {
          envVars[envVar] = answer.trim();
        }
        currentVar++;
        promptNext();
      });
    }

    promptNext();
  });
}

// Main deployment function
async function deploy() {
  console.log('OPULENTIA Deployment Script');
  console.log('==========================');

  // Check if Vercel CLI is installed
  if (!checkVercelCLI()) {
    console.error('Error: Vercel CLI is not installed. Please install it using:');
    console.error('npm install -g vercel');
    process.exit(1);
  }

  console.log('✅ Vercel CLI is installed');

  // Check if the user is logged in to Vercel
  try {
    execSync('vercel whoami', { stdio: 'ignore' });
    console.log('✅ Logged in to Vercel');
  } catch {
    console.log('⚠️ Not logged in to Vercel. Please log in:');
    try {
      execSync('vercel login', { stdio: 'inherit' });
    } catch {
      console.error('Error: Failed to log in to Vercel');
      process.exit(1);
    }
  }

  // Get environment variables from user
  console.log('\nPlease provide the following environment variables:');
  console.log('(These will be securely stored in your Vercel project)');
  const envVars = await promptForEnvVars();

  // Create a temporary .env file for deployment
  const envFilePath = path.join(projectRoot, '.env.opulentia.vercel');
  const envFileContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${String(value)}`)
    .join('\n');

  fs.writeFileSync(envFilePath, envFileContent);
  console.log('✅ Environment variables prepared');

  // Deploy to Vercel
  console.log('\nDeploying to Vercel...');
  try {
    execSync(`vercel deploy --prod --env-file ${envFilePath}`, {
      cwd: projectRoot,
      stdio: 'inherit',
    });
    console.log('✅ Deployment successful');
  } catch {
    console.error('Error: Deployment failed');
    process.exit(1);
  } finally {
    // Clean up the temporary env file
    fs.unlinkSync(envFilePath);
  }
}

// Run the deployment script
try {
  await deploy();
} catch (error) {
  console.error('Deployment failed:', error);
  process.exit(1);
}
