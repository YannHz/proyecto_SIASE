import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    host: true,
    proxy: {
      '/login': 'http://192.168.255.59:3000',
      '/api': 'http://192.168.255.59:3000'
    }
  }
})
