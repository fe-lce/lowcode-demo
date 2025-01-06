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
      input: {
        'demo-general/index': './demo-general/src/index.ts',
        'demo-general/preview': './demo-general/src/preview.tsx',

        'demo-basic-antd/index': './demo-basic-antd/src/index.ts',
        'demo-basic-antd/preview': './demo-basic-antd/src/preview.tsx',

        'demo-basic-fusion/index': './demo-basic-fusion/src/index.ts',
        'demo-basic-fusion/preview': './demo-basic-fusion/src/preview.tsx',

        'demo-next-pro/index': './demo-next-pro/src/index.ts',
        'demo-next-pro/preview': './demo-next-pro/src/preview.tsx',

        'demo-node-extended-actions/index': './demo-node-extended-actions/src/index.ts',
        'demo-node-extended-actions/preview': './demo-node-extended-actions/src/preview.tsx',

        'demo-lowcode-component/index': './demo-lowcode-component/src/index.ts',
        'demo-lowcode-component/preview': './demo-lowcode-component/src/preview.tsx',

        'demo-workspace/index': './demo-workspace/src/index.ts',
        'demo-workspace/preview': './demo-workspace/src/preview.tsx',

        'demo-graph-x6/index': './demo-graph-x6/src/index.ts',
      },
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
});
