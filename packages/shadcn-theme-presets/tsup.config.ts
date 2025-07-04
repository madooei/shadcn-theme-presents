import { defineConfig } from "tsup";

export default defineConfig([
  // Main bundle with all components
  {
    entry: ["src/index.ts"],
    outDir: "dist",
    format: ["esm", "cjs"],
    sourcemap: true,
    clean: true,
    dts: true,
    splitting: false,
    treeshake: true,
    external: ["react", "react-dom"],
    esbuildOptions(options) {
      options.alias = {
        "@": "./src",
      };
      options.jsx = "automatic";
    },
  },
]);
