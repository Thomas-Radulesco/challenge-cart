import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: true,
              fileName: false,
              minify: false,
              pure: true,
            },
          ],
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    strictPort: true, // fail if 5173 is in use instead of picking another port
  },
});
