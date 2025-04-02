import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,  // To be sure changes are detected in Docker.
    },
    host: true,  // Allows access from different network interfaces.
    strictPort: true  // Prevents port conflicts.
  },
})
