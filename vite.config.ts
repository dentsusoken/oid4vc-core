import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: {
        main: './lib/index.ts',
        utils: './lib/utils/index.ts',
        dynamodb: './lib/dynamodb/index.ts',
      },
      name: 'oid4vc-core',
      fileName: (format, entry) => {
        const ext = format === 'es' ? 'mjs' : format;
        const indexFile = `index.${ext}`;

        return entry === 'main' ? indexFile : `${entry}/${indexFile}`;
      },
    },
    rollupOptions: {
      external: ['@aws-sdk/lib-dynamodb'],
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  plugins: [
    nodePolyfills({
      globals: {
        Buffer: 'build',
        global: 'build',
        process: 'build',
      },
      overrides: {
        fs: 'memfs',
      },
    }),
    dts({
      rollupTypes: false,
      exclude: ['**/__tests__/**', '**/*.spec.ts', '**/*.test.ts'],
    }),
  ],
});
