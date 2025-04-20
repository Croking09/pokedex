import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/pokeapi\.co\/api\/v2\/pokemon/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'pokeapi-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 7 * 24 * 60 * 60 // 7 días
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: {
        name: 'PokeDex',
        short_name: 'PokeDex',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffcb05',
        icons: [
          {
            src: "../icons/icon-192.png",
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: "../icons/icon-512.png",
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      }
    })
  ],
  base: '/pokedex/'
})
