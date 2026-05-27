import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Đổi 'car-sale-web' thành tên GitHub repo của bạn
  base: '/car-sale-web/',
})
