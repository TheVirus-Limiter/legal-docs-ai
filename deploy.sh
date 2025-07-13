#!/bin/bash

# GitHub Pages Deployment Script for LegalDocs AI
# This script builds the frontend and prepares it for GitHub Pages deployment

echo "🚀 Preparing LegalDocs AI for GitHub Pages deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the frontend for production
echo "🔨 Building frontend..."
npm run build

# Create GitHub Pages deployment directory
echo "📁 Preparing GitHub Pages files..."
rm -rf gh-pages
mkdir -p gh-pages

# Copy built frontend to gh-pages directory
cp -r dist/* gh-pages/

# Create .nojekyll file to prevent Jekyll processing
touch gh-pages/.nojekyll

# Create CNAME file if custom domain is needed (uncomment and modify)
# echo "yourdomain.com" > gh-pages/CNAME

# Create 404.html for SPA routing
cp gh-pages/index.html gh-pages/404.html

echo "✅ GitHub Pages deployment files ready in gh-pages/ directory"
echo ""
echo "📋 Next steps:"
echo "1. Initialize git repo: git init"
echo "2. Add files: git add ."
echo "3. Commit: git commit -m 'Initial commit'"
echo "4. Add GitHub remote: git remote add origin https://github.com/USERNAME/REPO.git"
echo "5. Push to main: git push -u origin main"
echo "6. Enable GitHub Pages in repository settings"
echo ""
echo "🌐 Your site will be available at: https://USERNAME.github.io/REPO"