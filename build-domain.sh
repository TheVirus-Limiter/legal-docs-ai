#!/bin/bash

echo "Building LegalDocs AI for Custom Domain (legaldocs-ai.com)..."

# Clean dist directory
rm -rf dist-domain
mkdir -p dist-domain

# Build client with custom domain config
echo "Building client application for custom domain..."
npx vite build --config vite.config.domain.ts --mode production

# Copy public files to dist-domain
echo "Copying static files..."
cp client/public/sitemap.xml dist-domain/ 2>/dev/null || echo "sitemap.xml not found, creating..."
cp client/public/robots.txt dist-domain/ 2>/dev/null || echo "robots.txt not found, creating..."
cp client/public/manifest.json dist-domain/ 2>/dev/null || echo "manifest.json not found, creating..."
cp client/public/favicon.ico dist-domain/ 2>/dev/null || echo "favicon.ico not found, creating fallback"
cp client/public/favicon.svg dist-domain/ 2>/dev/null || echo "favicon.svg not found, creating fallback"

# Create sitemap.xml for custom domain
echo "Creating sitemap.xml for custom domain..."
cat > dist-domain/sitemap.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://legaldocs-ai.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://legaldocs-ai.com/templates</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://legaldocs-ai.com/blog</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://legaldocs-ai.com/about</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://legaldocs-ai.com/contact</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://legaldocs-ai.com/privacy</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://legaldocs-ai.com/terms</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
EOF

# Create robots.txt for custom domain
echo "Creating robots.txt for custom domain..."
cat > dist-domain/robots.txt << 'EOF'
User-agent: *
Allow: /

# Sitemaps
Sitemap: https://legaldocs-ai.com/sitemap.xml

# SEO optimizations
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Block irrelevant crawlers
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /
EOF

# Create manifest.json for custom domain
echo "Creating manifest.json for custom domain..."
cat > dist-domain/manifest.json << 'EOF'
{
  "name": "LegalDocs AI - Professional Legal Document Generator",
  "short_name": "LegalDocs AI",
  "description": "AI-powered legal document generation platform for businesses. Create professional contracts, NDAs, and legal documents instantly.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/favicon.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ],
  "categories": ["business", "legal", "productivity"],
  "lang": "en-US",
  "scope": "/",
  "prefer_related_applications": false
}
EOF

# Create favicon files
echo "Creating favicon..."
cat > dist-domain/favicon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" fill="#2563eb" rx="4"/>
  <path d="M8 10h16v2H8zm0 4h16v2H8zm0 4h12v2H8z" fill="white"/>
  <circle cx="22" cy="20" r="2.5" fill="#fbbf24"/>
</svg>
EOF

# Create 404.html for SPA routing - copy main index.html for proper SPA support
echo "Creating 404.html for SPA routing..."
if [ -f "dist-domain/index.html" ]; then
  cp dist-domain/index.html dist-domain/404.html
  echo "✓ 404.html created as copy of index.html for SPA routing"
else
  echo "⚠ Warning: index.html not found, creating fallback 404.html"
  cat > dist-domain/404.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LegalDocs AI - Loading...</title>
    <script>
      // Redirect to main app for SPA routing
      window.location.href = '/';
    </script>
  </head>
  <body>
    <div>Loading...</div>
  </body>
</html>
EOF
fi

# Create .nojekyll file
touch dist-domain/.nojekyll

echo ""
echo "✅ Build complete for custom domain!"
echo "📁 Files are in dist-domain/ directory"
echo "🌐 Upload dist-domain/* to your web hosting provider"
echo "🔗 Configure your domain to point to the hosting service"
echo ""
echo "Files created:"
echo "- Static site files optimized for legaldocs-ai.com"
echo "- Sitemap with correct domain URLs"
echo "- Robots.txt for SEO"
echo "- Manifest.json for PWA features"
echo "- 404.html for SPA routing support"