import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'sockjs-client': '/node_modules/sockjs-client/dist/sockjs.min.js',
    }
  }
})
