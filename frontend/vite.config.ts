import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    host: true,
    proxy: {
      '/login': 'http://80.241.217.53:3000',
      '/api': 'http://80.241.217.53:3000'
    }
  }
})
