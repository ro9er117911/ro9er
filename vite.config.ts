import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  root: "app",
  base: "./",
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
    fs: {
      allow: [path.resolve(__dirname)]
    }
  },
  preview: {
    port: 4174,
    strictPort: false
  },
  build: {
    outDir: "..",
    emptyOutDir: false,
    assetsDir: "assets",
    sourcemap: false,
    chunkSizeWarningLimit: 1700
  }
});
