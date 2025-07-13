#!/usr/bin/env node

/**
 * Generate favicon and icons for GitHub Pages deployment
 * This script creates minimal placeholder icons since we can't generate actual icons
 */

import fs from 'fs';
import path from 'path';

const distDir = 'dist';

// SVG favicon content
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#2563eb"/>
  <path d="M8 10h16v2H8zm0 4h16v2H8zm0 4h12v2H8z" fill="white"/>
  <circle cx="20" cy="20" r="3" fill="#fbbf24"/>
</svg>`;

// Create basic HTML for 404 page (GitHub Pages requirement)
const html404 = `<!DOCTYPE html>
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
      // Redirect to homepage with proper routing for SPA
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
</html>`;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function main() {
  console.log('Generating icons and additional files for GitHub Pages...');
  
  // Ensure dist directory exists
  ensureDir(distDir);
  
  try {
    // Create SVG favicon
    fs.writeFileSync(path.join(distDir, 'favicon.svg'), faviconSvg);
    console.log('✓ Generated favicon.svg');
    
    // Create 404 page for GitHub Pages SPA routing
    fs.writeFileSync(path.join(distDir, '404.html'), html404);
    console.log('✓ Generated 404.html for SPA routing');
    
    // Create CNAME file if needed (uncomment and modify for custom domain)
    // fs.writeFileSync(path.join(distDir, 'CNAME'), 'yourdomain.com');
    // console.log('✓ Generated CNAME file');
    
    // Create .nojekyll file to prevent Jekyll processing
    fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
    console.log('✓ Generated .nojekyll file');
    
    console.log('🎉 All GitHub Pages files generated successfully!');
    
  } catch (error) {
    console.error('❌ Error generating files:', error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main };