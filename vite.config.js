import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/guify/index.ts'),
      name: 'guify',
      fileName: 'guify',
    },
  },
});