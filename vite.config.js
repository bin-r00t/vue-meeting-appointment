import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "http://10.53.123.12:9000", // 后端接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/mmapi"),
      },
    },
  },
  resolve: {
    alias: {
      "@com": path.resolve(__dirname, "src/components"),
      "@": path.resolve(__dirname, "src"),
    },
  },
});
