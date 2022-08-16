// @ts-nocheck
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { visualizer } from 'rollup-plugin-visualizer'

module.exports = defineConfig(({ mode }) => {
  const ENV = { ...process.env, ...loadEnv(mode, process.cwd(), '') }
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    build: {
      watch: ENV.DIY_ENV === 'dev' ? {} : null,
      target: 'es2015',
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: '@leafvein/uidemo',
        fileName: (format) => `index.${format}.js`
      },
      rollupOptions: {
        external: ['react', 'react-dom']
      },
      minify: 'terser',
      outDir: path.resolve(__dirname, 'lib')
    },
    plugins: [
      ENV.DIY_ENV === 'prod'
        ? dts({
            outputDir: './types'
          })
        : null,
      react(),
      ENV.DIY_ENV === 'analysis' ? visualizer({ open: false }) : null
    ]
  }
})
