import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/dachshund-care-app/',
  plugins: [react()],
})
