import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative assets work on both localhost and GitHub Pages project sites.
  base: './',
})