import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vite.dev/config/
export default defineConfig({
  // Use relative paths so assets resolve correctly on Power Apps CDN
  base: './',
  plugins: [react(), cssInjectedByJsPlugin()],
  server: {
    port: 3000,
    hmr: {
      overlay: true,
      timeout: 5000,
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        manualChunks: undefined,
        inlineDynamicImports: true,
      },
    },
  },
})
