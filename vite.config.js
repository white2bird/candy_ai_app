import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
  },
  plugins: [vue()],
  css:{
    preprocessorOptions: {
      less: {
       
        javascriptEnabled: true

      },
    },
  },
  // 处理别名
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
     proxy: {
       '/api': {
         target: 'http://127.0.0.1:8000',
         changeOrigin: true,
         rewrite: (path) => path.replace(/^\/api/, '')
       }
     },
	 fs: {
	    strict: false
	  }
   },
})
