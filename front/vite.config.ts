import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      external: ['icofont/css/icofont.min.css'],
    },
  },
  server: {
    fs: {
      allow: ['src', 'node_modules'],
    },
    port: 3000
  },
  
})
