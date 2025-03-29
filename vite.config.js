import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/langchain-js-bundle.ts'),
      name: 'langchain-js-bundle',
      fileName: 'langchain-js-bundle',
      formats: ['es'],
    },
    rollupOptions: {
      external: [], // bundle ALL dependencies
      output: {
        manualChunks: undefined, // ensure single file output
        inlineDynamicImports: true, // inline all dynamic imports
        preserveModules: false, // don't preserve module structure
      },
      treeshake: {
        moduleSideEffects: false, // enable aggressive tree shaking
        propertyReadSideEffects: false
      }
    },
    sourcemap: true,
    emptyOutDir: true,
    outDir: 'dist',
    target: 'esnext', // modern browser target
    minify: 'esbuild', // minify the output
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/],
      extensions: ['.js', '.cjs', '.mjs'],
      esmExternals: false, // treat ESM as non-external
      requireReturnsDefault: 'auto', // better CommonJS compatibility
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      skipDiagnostics: false,
      logDiagnostics: true,
    }),
    nodePolyfills({
      // Enable all polyfills for maximum compatibility
      protocolImports: true,
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
    // Custom plugin to handle AsyncLocalStorage and other Node.js-specific modules
    {
      name: 'node-module-shims',
      resolveId(id) {
        // Create shims for Node.js-specific modules
        if (id === 'node:async_hooks' || id === 'async_hooks') {
          return 'virtual:async_hooks';
        }
        return null;
      },
      load(id) {
        if (id === 'virtual:async_hooks') {
          // Simple shim for AsyncLocalStorage
          return `
            export class AsyncLocalStorage {
              constructor() {
                this.store = new Map();
              }
              getStore() {
                return this.store;
              }
              run(store, callback) {
                this.store = store;
                try {
                  return callback();
                } finally {
                  this.store = null;
                }
              }
              exit(callback) {
                const prev = this.store;
                this.store = null;
                try {
                  return callback();
                } finally {
                  this.store = prev;
                }
              }
            }
          `;
        }
        return null;
      }
    }
  ],
  resolve: {
    preserveSymlinks: true,
    // don't resolve Node.js built-in modules
    browserField: true,
    mainFields: ['browser', 'module', 'main'],
    // Add aliases for problematic Node.js modules
    alias: {
      'node:async_hooks': 'virtual:async_hooks',
      'async_hooks': 'virtual:async_hooks',
      // Add more aliases for other Node.js modules if needed
    }
  },
  optimizeDeps: {
    // include all dependencies here to ensure they're bundled
    include: [
      'uuid',
      '@langchain/core',
      '@langchain/openai',
      '@langchain/anthropic',
      '@langchain/mistralai',
      '@langchain/ollama',
      '@langchain/cerebras',
      '@langchain/community',
      '@langchain/langgraph',
      'langchain'
    ],
    esbuildOptions: {
      target: 'esnext', // modern browser target
      define: { // Node.js global to browser globalThis
        global: 'globalThis',
      },
      platform: 'browser', // ignore Node.js built-ins
    },
  },
  // define browser environment to help with tree-shaking
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.BROWSER': JSON.stringify(true),
    'process.versions': JSON.stringify({ node:'16.0.0' })
  },
});