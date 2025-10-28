import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// http://wiorhythm.dothome.co.kr/
export default defineConfig({
  base: '/',
  plugins: [react()],
})