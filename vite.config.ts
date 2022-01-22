import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    //この部分を追加
    outDir: "./build",
  },
  server: {
    host: "0.0.0.0",
  },
});
