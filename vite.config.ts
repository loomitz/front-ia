import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import viteSvgLoader from 'vite-svg-loader'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  server: {
    host: true,
    port: 3535,
    strictPort: true,
    origin: "https://urolog-ia.loo.casa",
    hmr: {
      clientPort: 443,
      timeout: 3,
    },
  },
  plugins: [
    viteSvgLoader(),
    vue()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})