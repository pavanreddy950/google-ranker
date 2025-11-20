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
        manualChunks(id) {
          // Split node_modules into vendor chunks
          if (id.includes('node_modules')) {
            // React and React ecosystem - MUST be first to load
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            
            // Firebase - handle modular imports
            if (id.includes('firebase') || id.includes('@firebase')) {
              return 'vendor-firebase';
            }
            
            // Radix UI components (depends on React)
            if (id.includes('@radix-ui')) {
              return 'vendor-ui';
            }
            
            // Charts (depends on React)
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
            
            // Icons
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'vendor-icons';
            }
            
            // Form libraries
            if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
              return 'vendor-form';
            }
            
            // Utilities
            if (id.includes('date-fns') || id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
              return 'vendor-utils';
            }
            
            // Keep googleapis and other large libraries in main vendor chunk
            // to avoid cross-chunk dependency issues
            return 'vendor';
          }
        },
      },
    },
  },
}));
