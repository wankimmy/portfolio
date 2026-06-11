import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  // OLLAMA_API_KEY is deliberately NOT prefixed with VITE_ so it never ships in the client
  // bundle. The dev server injects it into proxied requests; nginx does the same in prod.
  const env = loadEnv(mode, process.cwd(), '')
  const ollamaKey = env.OLLAMA_API_KEY || process.env.OLLAMA_API_KEY || ''

  return {
    plugins: [vue()],
    base: './',
    build: {
      outDir: 'dist',
      assetsDir: 'assets'
    },
    server: {
      watch: {
        usePolling: true
      },
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
