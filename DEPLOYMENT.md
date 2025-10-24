# Deployment Guide

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment**:
   ```bash
   node setup.js
   ```

3. **Add your OpenAI API key** to `.env.local`:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

4. **Run locally**:
   ```bash
   npm run dev
   ```

## Deploy to Vercel

### Method 1: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Add environment variable**:
   ```bash
   vercel env add OPENAI_API_KEY
   ```

### Method 2: GitHub Integration

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/esg-classification.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable: `OPENAI_API_KEY`
   - Deploy

## Environment Variables

### Required
- `OPENAI_API_KEY`: Your OpenAI API key

### Optional
- `DEMO_USERNAME`: Login username (default: admin)
- `DEMO_PASSWORD`: Login password (default: esg2024)

## Production Checklist

- [ ] OpenAI API key is set
- [ ] Environment variables are configured
- [ ] Domain is configured (if custom)
- [ ] SSL certificate is active
- [ ] Performance monitoring is set up

## Troubleshooting

### Common Issues

1. **"OpenAI API Error"**:
   - Check your API key is correct
   - Ensure you have credits in your OpenAI account
   - Verify the key has GPT-4 access

2. **"Failed to classify text"**:
   - Check network connection
   - Verify API key permissions
   - Try with shorter text input

3. **Download not working**:
   - Check browser popup blockers
   - Ensure JavaScript is enabled
   - Try different browser

### Support

For issues with:
- **OpenAI API**: Check [OpenAI Documentation](https://platform.openai.com/docs)
- **Vercel Deployment**: Check [Vercel Documentation](https://vercel.com/docs)
- **Next.js**: Check [Next.js Documentation](https://nextjs.org/docs)

