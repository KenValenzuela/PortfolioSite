// vite.config.js ─ Vite 7 + React  ────────────────
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";   // v7.1.0 works with this API
import viteImagemin from "vite-plugin-imagemin"; // 0.6.1 – lossless compression

export default defineConfig({
  plugins: [
    react(),

    // ─ Responsive <picture> support + auto‑WebP/AVIF ─
    imagetools({
      defaultDirectives: new URLSearchParams("format=webp;avif"),
    }),

    // ─ Extra compression for hero/portfolio PNG/JPG/SVG ─
    viteImagemin({
      mozjpeg: { quality: 82 },
      pngquant: { quality: [0.7, 0.85], speed: 3 },
      svgo: true,
    }),
  ],

  build: {
    target: "es2018",     // ship modern code only
    sourcemap: true,
    cssMinify: "lighter",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react"))         return "react";
          if (id.includes("framer-motion")) return "motion";
          return "vendor";
        },
      },
    },
  },
});
