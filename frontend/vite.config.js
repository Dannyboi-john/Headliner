import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    watch: {
      usePolling: true,  // To be sure changes are detected in Docker.
    },
    host: true,  // Allows access from different network interfaces.
    strictPort: true  // Prevents port conflicts.
  },
})
