import { defineConfig  } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path');

import pluginEnv from 'vite-plugin-vue-env';
import svgLoader from 'vite-svg-loader'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    pluginEnv(),
    vue(),
    svgLoader(), 
  ],
 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  
  css: {
    loaderOptions: {
      scss: {
        sourceMap: true,
        implementation: require('sass'),
        webpackImporter: true,
        sassOptions: {},
        additionalData: ``,
      },
    },
  },
})