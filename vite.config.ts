import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000,
  },
  preview: {
    port: 3000,
    host: "::",
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Configure for SPA routing
  build: {
    chunkSizeWarningLimit: 1000, // Increase limit to 1000 kB
    rollupOptions: {
      output: {
        // Simplify chunking to avoid cross-dependency issues
        manualChunks: {
          // Keep React in its own chunk - loaded via modulepreload
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
}));
