import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 這裡設定 @ 對應到 src 資料夾
      "@": path.resolve(__dirname, "src"),
    },
  },
})
