#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌱 Setting up ESG Classification Tool...\n');

// Create .env.local file if it doesn't exist
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  const envContent = `# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Hardcoded credentials for demo
DEMO_USERNAME=admin
DEMO_PASSWORD=esg2024
`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file');
} else {
  console.log('✅ .env.local already exists');
}

console.log('\n📋 Setup Instructions:');
console.log('1. Add your OpenAI API key to .env.local');
console.log('2. Run: npm install');
console.log('3. Run: npm run dev');
console.log('4. Open: http://localhost:3000');
console.log('\n🔑 Demo Credentials:');
console.log('Username: admin');
console.log('Password: esg2024');
console.log('\n🚀 Ready to classify ESG resolutions!');

