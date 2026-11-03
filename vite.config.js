import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Copies dist/index.html to dist/404.html so that GitHub Pages serves the
// SPA shell for deep links (e.g. /about) instead of a 404. React Router then
// resolves the route client-side.
function spaFallback() {
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), spaFallback()],
  server: {
    port: 5175,
    host: true
  }
})
