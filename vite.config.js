import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/guifier/index.ts'),
      name: 'Guifier',
      fileName: 'guifier',
    },
  },
});