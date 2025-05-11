import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

// vite.config.js
export default defineConfig({
  plugins: [
    react(), // Activates the React plugin for Vite
    compression() // Activates gzip compression for your production build
  ],
  build: {
    chunkSizeWarningLimit: 1000, // Augments chunk size warning limit to 1MB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Groups all code from node_modules into a single vendor chunk
          }
        }
      }
    }
  }
})
