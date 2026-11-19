import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: resolve(import.meta.dirname, "src/site"),
  base: "./",
  plugins: [react()],
  // The standalone reader ships its own runtime. The public React component
  // is built by vite.config.ts with its existing React peer dependency.
  resolve: {
    alias: [
      { find: /^react-dom\/client$/, replacement: "preact/compat/client" },
      { find: /^react-dom$/, replacement: "preact/compat" },
      { find: /^react\/jsx-runtime$/, replacement: "preact/jsx-runtime" },
      {
        find: /^react\/jsx-dev-runtime$/,
        replacement: "preact/jsx-dev-runtime",
      },
      { find: /^react$/, replacement: "preact/compat" },
    ],
  },
  build: {
    outDir: resolve(import.meta.dirname, "dist/site"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.endsWith("/three/build/three.core.js")) return "three-core";
        },
      },
    },
  },
});
