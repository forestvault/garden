import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const PORT = parseInt(process.env.FRONTEND_PORT ?? '5173', 10);
const TARGET = (process.env.SERVER_TARGET ?? 'http://localhost:8081');

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: PORT,
    host: true,
    proxy: {
      // Catch the absolute '/api' requests coming from your service layer
      '/api': {
        target: `${TARGET}`,
        changeOrigin: true,
        rewrite: (path) => {
          // Rewrites '/api/**' into '${TARGET}/homelab/api/**'
          return `/homelab${path}`;
        },
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // This prints the final absolute URL the proxy is hitting on your backend target
            console.log(`[Vite Proxy] Forwarding request -> ${options.target}${proxyReq.path}`);
          });
        },
      }
    }
  },
});
