import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
};

