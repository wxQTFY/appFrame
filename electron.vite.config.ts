import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const srcPath = resolve(__dirname, 'src')

export default defineConfig({
  main: {
    envDir: resolve(__dirname),
    build: {
      rollupOptions: {
        external: []
      }
    }
  },
  preload: {
    envDir: resolve(__dirname)
  },
  renderer: {
    envDir: resolve(__dirname),
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '@common': resolve('src/common')
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        resolvers: [ElementPlusResolver()],
        dts: resolve(srcPath, 'renderer/auto-imports.d.ts')
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: resolve(srcPath, 'renderer/components.d.ts')
      })
    ],
    build: {
      rollupOptions: {
        input: resolve('src/renderer/index.html')
      }
    }
  }
})
