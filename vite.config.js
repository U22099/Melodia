import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Melodia",
  plugins: [react()],
  assetsInclude: ["**/*.{JPG,PNG,jpg,png}"],
  server: {
    headers: {
      '**/*.css': {
        'Content-Type': 'text/css',
      },
    },
  },
  optimizeDeps:{
    override: true,
  }
})
