import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig({
  base: "/Melodia",
  plugins: [react(),
  VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Melodia MSA',
        short_name: 'Melodia',
        description: 'Melodia Music Streaming App',
        background_color: '#121212', 
        display: 'standalone', 
        start_url: '/Melodia',
        scope: '/',
        orientation: 'portrait',
        theme_color: '#121212',
        icons: [
		{
			src: "pwa-64x64.png",
			sizes: "64x64",
			type: "image/png"
		},
		{
			src: "pwa-192x192.png",
			sizes: "192x192",
			type: "image/png"
		},
  		{
    			src: "pwa-512x512.png",
    			sizes: "512x512",
    			type: "image/png"
  		},
  		{
    			src: "maskable-icon-512x512.png",
    			sizes: "512x512",
    			type: "image/png",
    			purpose: "maskable"
  		}
	]
      }
    })
  ],
  assetsInclude: ["**/*.{JPG,PNG,jpg,png}"],
  optimizeDeps:{
    override: true
  }
})
