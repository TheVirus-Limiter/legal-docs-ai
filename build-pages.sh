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

# Create 404.html for SPA routing
echo "Creating 404.html for SPA routing..."
cat > dist/404.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Not Found - LegalDocs AI</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 2rem; text-align: center; background: #f8fafc; }
      .container { max-width: 600px; margin: 0 auto; }
      h1 { color: #1e293b; margin-bottom: 1rem; }
      p { color: #64748b; margin-bottom: 2rem; }
      a { color: #2563eb; text-decoration: none; }
      a:hover { text-decoration: underline; }
    </style>
    <script>
      const path = window.location.pathname.replace('/legal-docs-ai', '');
      if (path && path !== '/') {
        window.location.href = '/legal-docs-ai/#' + path;
      }
    </script>
  </head>
  <body>
    <div class="container">
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <a href="/legal-docs-ai/">Return to Homepage</a>
    </div>
  </body>
</html>
EOF

# Create .nojekyll file
touch dist/.nojekyll

echo "✅ Build completed successfully!"
echo "📁 Output directory: dist/"
echo "🚀 Ready for GitHub Pages deployment!"