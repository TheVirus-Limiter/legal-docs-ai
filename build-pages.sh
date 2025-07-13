#!/bin/bash

echo "Building LegalDocs AI for GitHub Pages..."

# Clean dist directory
rm -rf dist
mkdir -p dist

# Build client with GitHub Pages config
echo "Building client application..."
npx vite build --config vite.config.pages.ts --mode production

# Copy public files to dist
echo "Copying static files..."
cp client/public/sitemap.xml dist/ 2>/dev/null || echo "sitemap.xml not found, skipping"
cp client/public/robots.txt dist/ 2>/dev/null || echo "robots.txt not found, skipping" 
cp client/public/manifest.json dist/ 2>/dev/null || echo "manifest.json not found, skipping"

# Create favicon.svg
echo "Creating favicon..."
cat > dist/favicon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#2563eb"/>
  <path d="M8 10h16v2H8zm0 4h16v2H8zm0 4h12v2H8z" fill="white"/>
  <circle cx="20" cy="20" r="3" fill="#fbbf24"/>
</svg>
EOF

# Create 404.html for SPA routing - copy main index.html for proper SPA support
echo "Creating 404.html for SPA routing..."
if [ -f "dist/index.html" ]; then
  cp dist/index.html dist/404.html
  echo "✓ 404.html created as copy of index.html for SPA routing"
else
  echo "⚠ Warning: index.html not found, creating fallback 404.html"
  cat > dist/404.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LegalDocs AI - Loading...</title>
    <script>
      // Redirect to main app for SPA routing
      window.location.href = '/legal-docs-ai/';
    </script>
  </head>
  <body>
    <div>Loading...</div>
  </body>
</html>
EOF
fi

# Create .nojekyll file
touch dist/.nojekyll

echo "✅ Build completed successfully!"
echo "📁 Output directory: dist/"
echo "🚀 Ready for GitHub Pages deployment!"