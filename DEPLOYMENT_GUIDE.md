# 🚀 GitHub Pages Deployment Guide for LegalDocs AI

This guide will help you deploy your AI-powered legal document platform to GitHub Pages for free hosting with unlimited traffic.

## 📋 Prerequisites

- GitHub account
- OpenAI API key
- Google Analytics Measurement ID (optional)
- Google AdSense account (for monetization)

## 🔧 Step 1: Prepare Your Repository

### 1.1 Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `legal-docs-ai` (or your preferred name)
3. Make it **public** (required for free GitHub Pages)
4. Don't initialize with README, .gitignore, or license

### 1.2 Clone and Setup Locally
```bash
# Download your project files from Replit
# Then in your local directory:

git init
git add .
git commit -m "Initial commit: LegalDocs AI platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/legal-docs-ai.git
git push -u origin main
```

## ⚙️ Step 2: Configure for GitHub Pages

### 2.1 Update Vite Configuration
The project includes `vite.config.pages.ts` for GitHub Pages deployment. Update the base path:

```typescript
// In vite.config.pages.ts, change this line:
base: process.env.NODE_ENV === 'production' ? '/YOUR_REPO_NAME/' : '/',
```

Replace `YOUR_REPO_NAME` with your actual repository name.

### 2.2 Environment Variables
Create these GitHub Secrets in your repository:

1. Go to Repository Settings → Secrets and variables → Actions
2. Add these secrets:
   - `VITE_GA_MEASUREMENT_ID`: Your Google Analytics ID (starts with G-)
   - `OPENAI_API_KEY`: Your OpenAI API key (for server-side features)

## 🏗️ Step 3: Frontend-Only Build

Since GitHub Pages only hosts static sites, we'll create a frontend-only version:

### 3.1 Create Frontend-Only Configuration
```bash
# Build for GitHub Pages
npm run build:pages
```

### 3.2 Configure Routing
The build process automatically creates:
- `.nojekyll` file (prevents Jekyll processing)
- `404.html` (enables SPA routing)
- Optimized static assets

## 🚀 Step 4: Enable GitHub Pages

### 4.1 Repository Settings
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Source: Deploy from a branch
5. Branch: `main` 
6. Folder: `/ (root)`

### 4.2 Automatic Deployment
The included GitHub Action (`.github/workflows/deploy.yml`) will:
- Automatically build your site on every push
- Deploy to GitHub Pages
- Handle all optimizations

## 🌐 Step 5: Custom Domain (Optional)

### 5.1 Add Custom Domain
1. Buy a domain from any registrar
2. In GitHub Pages settings, add your custom domain
3. Enable "Enforce HTTPS"

### 5.2 DNS Configuration
Point your domain to GitHub Pages:
```
CNAME: your-domain.com → username.github.io
```

## 📊 Step 6: Analytics Setup

### 6.1 Google Analytics
1. Create Google Analytics account
2. Set up GA4 property
3. Get Measurement ID (G-XXXXXXXXXX)
4. Add to GitHub Secrets as `VITE_GA_MEASUREMENT_ID`

### 6.2 Verification
Your site will be available at:
- `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
- Or your custom domain if configured

## 🔧 Frontend-Only Limitations

Since GitHub Pages only hosts static files, some features are modified:

### ✅ What Works:
- Document templates display
- UI components and forms  
- Google Analytics tracking
- AdSense advertisements
- State guides and blog content
- PDF generation (client-side)

### ❌ What Requires Adaptation:
- **AI Document Generation**: Needs to call external API directly from frontend
- **Data Storage**: Uses localStorage instead of database
- **User Authentication**: Simplified or removed

## 🔄 Alternative: Full-Stack Deployment

For full functionality including AI generation, consider these alternatives:

1. **Vercel** (Recommended)
   - Fork repository to Vercel
   - Add environment variables
   - Automatic deployments

2. **Netlify**
   - Connect GitHub repository
   - Configure build settings
   - Add environment variables

3. **Railway**
   - Deploy full-stack application
   - Built-in database support
   - Custom domain included

## 🚨 Troubleshooting

### Common Issues:

**1. Site Not Loading**
- Check repository is public
- Verify GitHub Pages is enabled
- Wait 5-10 minutes for deployment

**2. 404 Errors on Routes**
- Ensure 404.html exists
- Check .nojekyll file is present
- Verify SPA routing configuration

**3. Assets Not Loading**
- Check base path in vite.config.pages.ts
- Verify all paths are relative
- Check console for 404 errors

**4. AdSense Not Showing**
- Verify site is approved by AdSense
- Check ad units are properly configured
- Ensure sufficient content for approval

## 📈 Performance Optimization

The build automatically includes:
- Code splitting
- Asset optimization
- Gzip compression
- Lazy loading
- SEO optimization

## 🎯 Next Steps

1. Deploy to GitHub Pages
2. Submit to Google AdSense
3. Apply for Google Analytics
4. Set up Google Search Console
5. Submit sitemap for SEO

Your legal document platform is now ready for production deployment!