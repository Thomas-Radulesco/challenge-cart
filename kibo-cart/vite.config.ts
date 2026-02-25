import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from "vitest/config";
import path from "path";

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
  test: {
    reporters: ["verbose"],
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts", "./src/tests/setup-router-mock.ts"],
    include: ["src/tests/**/*.{test,spec}.{ts,tsx}"],
    exclude: [...configDefaults.exclude, "dist", "build"],
    coverage: {
      reporter: ["text", "html"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

});
