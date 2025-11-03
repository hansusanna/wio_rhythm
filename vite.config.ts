import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import svgr from 'vite-plugin-svgr';

// http://wiorhythm.dothome.co.kr/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});

