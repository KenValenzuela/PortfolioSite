// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";     // responsive + webp/avif
import viteImagemin from "vite-plugin-imagemin";  // lossless compression

export default defineConfig({
  plugins: [
    react(),
    imagetools({ defaultDirectives: new URLSearchParams("format=webp;avif") }),
    viteImagemin({ mozjpeg: { quality: 82 } })
  ],

  build: {
    target: "es2018",          // no legacy bundle
    sourcemap: true,
    cssMinify: "lighter",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react")) return "react";
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("@spline tool")) return "spline";
          return "vendor";
        }
      }
    }
  }
});
