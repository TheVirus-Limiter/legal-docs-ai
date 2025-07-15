# Custom Domain Setup Guide for legaldocs-ai.com

## Issue Diagnosis
Your custom domain `legaldocs-ai.com` is configured correctly, but the assets are trying to load from `/legal-docs-ai/` path (GitHub Pages subdirectory) instead of the root path `/`.

## Quick Solution Steps

### 1. Update GitHub Pages Settings
1. Go to your GitHub repository settings
2. Navigate to "Pages" section
3. Under "Custom domain", ensure `legaldocs-ai.com` is entered
4. Make sure "Enforce HTTPS" is checked

### 2. Create CNAME File
Create a file named `CNAME` in your repository root with just:
```
legaldocs-ai.com
```

### 3. Update Base Path for Production
The issue is in your Vite configuration. The GitHub Pages build uses `/legal-docs-ai/` as base path, but your custom domain needs `/`.

### 4. Files Ready for Upload
I've created these files in `dist-domain/` directory:
- `sitemap.xml` - Updated with your domain URLs
- `robots.txt` - SEO optimized for your domain  
- `manifest.json` - PWA configuration
- `.nojekyll` - Disables Jekyll processing

## Immediate Fix Options

### Option A: Update GitHub Pages Base Path (Recommended)
1. In `vite.config.pages.ts`, change:
   ```ts
   base: "/legal-docs-ai/"
   ```
   to:
   ```ts
   base: "/"
   ```

2. Rebuild and deploy

### Option B: Alternative Hosting
Upload the files to a web hosting service that supports SPA routing:
- Netlify (free tier available)
- Vercel (free tier available) 
- Your own hosting provider

## Files Created for Custom Domain
- Sitemap with correct domain URLs
- Robots.txt optimized for SEO
- Manifest.json for PWA features
- All assets configured for root path deployment

The files are ready in the `dist-domain/` directory for deployment to any hosting service that supports your custom domain.