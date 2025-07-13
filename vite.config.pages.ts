import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // GitHub Pages specific configuration
  base: '/legal-docs-ai/',
  
  // Build configuration optimized for GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2015',
    
    // Optimize chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', '@radix-ui/react-slot'],
          router: ['wouter'],
          query: ['@tanstack/react-query'],
          forms: ['react-hook-form', 'zod']
        },
        // Ensure consistent chunk names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[ext]/[name]-[hash][extname]`;
        }
      }
    },
    
    // Compression and optimization
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000
  },
  
  // Path resolution for absolute imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@assets': path.resolve(__dirname, './attached_assets')
    }
  },
  
  // CSS optimization
  css: {
    postcss: './postcss.config.js'
  },
  
  // Development server (not used for GitHub Pages but good for testing)
  server: {
    port: 3000,
    host: true,
    open: true
  },
  
  // Preview configuration for testing production builds
  preview: {
    port: 3000,
    host: true,
    open: true
  },
  
  // Define environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString())
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-hook-form',
      'zod',
      'wouter',
      '@tanstack/react-query',
      'lucide-react'
    ]
  }
});