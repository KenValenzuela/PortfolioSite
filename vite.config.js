import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";        // <‑‑ responsive ↔ .webp/avif
import viteImagemin from "vite-plugin-imagemin";      // <‑‑ lossless + lazy decode

export default defineConfig({
  plugins: [
    react(),
    imagetools({ defaultDirectives: new URLSearchParams("format=webp;avif") }),
    viteImagemin({ mozjpeg: { quality: 82 } }),
    splitVendorChunkPlugin(),                         // auto‑vendor split
  ],

  build: {
    target: "es2018",          // drop legacy code
    sourcemap: true,
    cssMinify: "lighter",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          motion: ["framer-motion"],
          spline: ["@splinetool/react-spline", "@splinetool/runtime"],
        },
      },
    },
  },
});
