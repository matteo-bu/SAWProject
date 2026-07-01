import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['logo192.png'],
      registerType: 'autoUpdate',
      srcDir: 'public',
      base: './',
      strategies: "injectManifest",
      filename: "sw.js",
      manifestFilename: 'manifest.json',
      devOptions: { enabled: true },
      manifest: {
        name: "SAWProject",
        short_name: "SAWp",
        start_url: "/",
        scope: "/",
        display: "standalone",
        theme_color: "#1976d2",
        background_color: "#ffffff",
        icons: [
          {
            src: "/logo192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
})