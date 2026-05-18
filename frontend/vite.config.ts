import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

const BACKEND = 'http://localhost:3000';

export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    port: 4000,
    host: true,
    proxy: {
      '/login': {
        target: BACKEND,
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: BACKEND,
        changeOrigin: true,
        secure: false,
      }
    }
  },
  preview: {
    port: 4000,
    host: true,
    proxy: {
      '/login': {
        target: BACKEND,
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: BACKEND,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})

