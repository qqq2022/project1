import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import raw from 'vite-raw-plugin'
import UnoCSS from 'unocss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    raw({
      fileRegex: /\.md$/
    }),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use '@/styles/naive-variables.scss' as *;`
      }
    }
  }
})
