/*
 * @Author: yucongcong lxydft@163.com
 * @Date: 2022-12-06 16:15:34
 * @LastEditors: yucongcong lxydft@163.com
 * @LastEditTime: 2022-12-19 16:29:04
 * @FilePath: \cesiumDemo\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // reactRefresh()
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      },
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    hmr:true,
    proxy: {
      '/api': 'http://192.168.1.99:8103'
    }
  }
})
