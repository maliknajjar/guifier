import { resolve } from 'path';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/guifier/index.ts'),
      name: 'Guifier',
      fileName: 'guifier',
    },
    rollupOptions: {
      plugins: [
        cssInjectedByJsPlugin()
      ],
      output: {
        manualChunks: undefined,
      },
    },
  },
});