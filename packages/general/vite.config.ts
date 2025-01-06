import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react({ tsDecorators: true })],
  define: {
    'process.env': {},
  },
  server: {
    port: 5556,
  },
  build: {
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
  // https://cn.vite.dev/guide/migration.html#sass-now-uses-modern-api-by-default
  css: {
    preprocessorOptions: {
      scss: {
        api: 'legacy',
      },
    },
  },
  resolve: {
    alias: {
      // sass解析错误，使用此方式解决
      '~@alifd': '@alifd',
      // '@alilc/lowcode-plugin-schema': 'http://localhost:4173/src/index.ts',
      // '@alilc/lowcode-plugin-schema': 'http://localhost:4173/index.es.js',
      '@alilc/lowcode-engine': '@felce/lowcode-engine',
      '@alilc/lowcode-types': '@felce/lowcode-types',
      '@alilc/lowcode-utils': '@felce/lowcode-utils',
      '@alilc/lowcode-designer': '@felce/lowcode-designer',
      '@alilc/lowcode-editor-core': '@felce/lowcode-core',
      '@alilc/lowcode-editor-skeleton': '@felce/lowcode-skeleton',
      '@alilc/lowcode-engine-ext': '@felce/lowcode-engine-ext',
    },
  },
});
