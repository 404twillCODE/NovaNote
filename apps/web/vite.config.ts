import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@novanote/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
    },
  },
  base: process.env.GITHUB_ACTIONS ? '/novanote/' : '/',
});
