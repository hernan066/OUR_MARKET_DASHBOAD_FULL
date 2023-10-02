/* eslint-disable no-undef */
import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    // Workaround
    {
      name: "load+transform-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) {
          return null;
        }

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic", // 👈 this is important
        });
      },
    },
    // End workaround
  ],

  // Workaround before renaming .js to .jsx
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  // End workaround
  resolve: {
    alias: {
      components: `${path.resolve(__dirname, "./src/components/")}`,

      pages: path.resolve(__dirname, "./src/pages"),
      assets: path.resolve(__dirname, "./src/assets"),
      examples: path.resolve(__dirname, "./src/examples"),
      layouts: path.resolve(__dirname, "./src/layouts"),
      context: path.resolve(__dirname, "./src/context"),
      utils: path.resolve(__dirname, "./src/utils"),
      api: path.resolve(__dirname, "./src/api"),
      router: path.resolve(__dirname, "./src/router"),
      reduxToolkit: path.resolve(__dirname, "./src/reduxToolkit"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      data: path.resolve(__dirname, "./src/data"),
      validations: path.resolve(__dirname, "./src/validations"),
    },
  },
});
