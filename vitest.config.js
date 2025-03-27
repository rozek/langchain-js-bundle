import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
    globals: true,
    testTimeout: 30000, // 30 seconds timeout for tests
  },
  resolve: {
    alias: {
      'langchain-js-bundle': resolve(__dirname, 'dist/index.js')
    }
  }
});