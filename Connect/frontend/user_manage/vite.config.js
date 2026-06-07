import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true // Enable source maps for debugging
  },
  server: {
    port: 5173, // Optional: Ensure this matches your debug configuration
    open: true  // Optional: Automatically open the browser
  }
})
