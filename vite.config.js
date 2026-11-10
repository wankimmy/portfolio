import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  // OLLAMA_API_KEY is deliberately NOT prefixed with VITE_ so it never ships in the client
  // bundle. The dev server injects it into proxied requests; nginx does the same in prod.
  const env = loadEnv(mode, process.cwd(), '')
  const ollamaKey = env.OLLAMA_API_KEY || process.env.OLLAMA_API_KEY || ''
  const usePolling =
    process.env.CHOKIDAR_USEPOLLING === 'true' || env.CHOKIDAR_USEPOLLING === 'true'

  return {
    plugins: [vue()],
    // Domain-root deploy (Hostinger public_html). Relative "./" breaks CSS/JS on
    // any path with a trailing slash: LiteSpeed SPA-fallback then serves HTML
    // as the stylesheet, and X-Content-Type-Options: nosniff blocks it.
    // Subdirectory deploys can override: VITE_BASE=./ npm run build
    base: env.VITE_BASE || '/',
    // Only the site entry: without this the dev scanner crawls every .html
    // under tools/ (the Python venv ships some) and fails on their imports.
    optimizeDeps: { entries: ['index.html'] },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          // function form: Vite 8 (rolldown) no longer takes the object form
          manualChunks(id) {
            if (id.includes('node_modules/three/')) return 'three'
            if (id.includes('node_modules/gsap/')) return 'gsap'
          },
        },
      },
    },
    server: {
      watch: usePolling ? { usePolling: true } : undefined,
      proxy: {
        '/api/ollama': {
          target: 'https://ollama.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/ollama/, '/api'),
          headers: ollamaKey ? { Authorization: `Bearer ${ollamaKey}` } : {}
        }
      }
    }
  }
})
