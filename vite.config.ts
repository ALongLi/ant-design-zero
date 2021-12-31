import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname) as ImportMetaEnv
  return {
    base: env.VITE_BASE_URL,
    plugins: [
      react(),
      vitePluginImp({
        optimize: true,
        libList: [
          {
            libName: 'antd',
            style: (name) => `antd/es/${name}/style`,
          },
        ],
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: true,
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // modifyVars: { 'primary-color': '#168843' },
        },
      },
    },
    resolve: {
      alias: [
        // fix less import by: @import ~
        { find: /^~/, replacement: '' },
        { find: '$/', replacement: resolve(__dirname, '.') + '/' },
        { find: '@/', replacement: resolve(__dirname, 'src') + '/' },
      ],
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
      include: [
        'antd/es/spin/style',
        'antd/es/message/style',
        'antd/es/layout/style',
        'antd/es/menu/style',
        'antd/es/breadcrumb/style',
        'antd/es/dropdown/style',
        'antd/es/card/style',
      ],
    },
  }
})
