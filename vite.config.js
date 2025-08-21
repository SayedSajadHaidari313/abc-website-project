import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/download-user": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/download": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/user_photos": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
