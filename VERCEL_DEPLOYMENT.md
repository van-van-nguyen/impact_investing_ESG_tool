# Vercel Deployment Guide

## 🚀 **Deploying ESG Classification Tool to Vercel**

### **Step 1: Remove Environment Variable from vercel.json**

The `vercel.json` file has been updated to remove the environment variable reference. Environment variables should be set directly in the Vercel dashboard, not in the configuration file.

### **Step 2: Deploy to Vercel**

#### **Option A: Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variable
vercel env add OPENAI_API_KEY
```

#### **Option B: GitHub Integration**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Deploy

### **Step 3: Set Environment Variable in Vercel Dashboard**

1. **Go to your project** in Vercel dashboard
2. **Click on "Settings"** tab
3. **Click on "Environment Variables"** in the sidebar
4. **Add new variable:**
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your actual OpenAI API key (starts with `sk-`)
   - **Environment**: Select all environments (Production, Preview, Development)
5. **Click "Save"**

### **Step 4: Redeploy**

After adding the environment variable:
1. Go to the "Deployments" tab
2. Click the three dots on your latest deployment
3. Click "Redeploy"

Or trigger a new deployment by pushing a commit to your repository.

## 🔧 **Environment Variable Setup**

### **In Vercel Dashboard:**
```
Name: OPENAI_API_KEY
Value: sk-your-actual-openai-api-key-here
Environment: Production, Preview, Development
```

### **For Local Development:**
Create `.env.local` file:
```
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

## ✅ **Verification Steps**

1. **Check Environment Variables**: In Vercel dashboard, verify `OPENAI_API_KEY` is set
2. **Test Deployment**: Visit your deployed URL
3. **Test Classification**: Try classifying some text
4. **Check Logs**: If errors occur, check Vercel function logs

## 🐛 **Troubleshooting**

### **Error: "Environment Variable OPENAI_API_KEY references Secret openai_api_key, which does not exist"**
- **Solution**: Remove the `env` section from `vercel.json` (already done)
- **Action**: Set the environment variable directly in Vercel dashboard

### **Error: "Failed to classify text"**
- **Check**: Environment variable is set correctly in Vercel
- **Check**: API key is valid and has credits
- **Check**: Vercel function logs for detailed error messages

### **Error: "API route not found"**
- **Check**: File structure includes `app/api/classify/route.js`
- **Check**: Next.js version supports App Router
- **Action**: Redeploy after ensuring correct file structure

## 📋 **Pre-Deployment Checklist**

- [ ] Code pushed to GitHub
- [ ] `vercel.json` updated (no env section)
- [ ] Environment variable set in Vercel dashboard
- [ ] OpenAI API key is valid
- [ ] Build passes locally (`npm run build`)

## 🎯 **Expected Result**

After successful deployment:
- ✅ Application loads without errors
- ✅ Login works with demo credentials
- ✅ Classification works with real OpenAI API
- ✅ CSV download functions properly
- ✅ All features work as expected

The application should now deploy successfully to Vercel!
