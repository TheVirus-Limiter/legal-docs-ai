import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  root: "client",
  base: "/", // Root path for custom domain
  build: {
    outDir: "../dist-domain",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-slot', '@radix-ui/react-select', '@radix-ui/react-dialog'],
          query: ['@tanstack/react-query'],
          router: ['wouter'],
          forms: ['react-hook-form', 'zod']
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./client/src"),
      "@assets": resolve(__dirname, "./attached_assets")
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
});