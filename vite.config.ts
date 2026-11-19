import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const pkg = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8")
);
const external = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies });

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(import.meta.dirname, "src/index.ts"),
        "components/index": resolve(
          import.meta.dirname,
          "src/components/index.ts"
        ),
      },
      formats: ["es"],
    },
    rolldownOptions: {
      external: (id) =>
        external.some(
          (dependency) => id === dependency || id.startsWith(`${dependency}/`)
        ),
    },
  },
});
