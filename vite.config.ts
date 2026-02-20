import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libs into separate chunks
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["@radix-ui/react-dialog", "@radix-ui/react-tooltip", "@radix-ui/react-switch", "@radix-ui/react-progress", "@radix-ui/react-tabs"],
          "query-vendor": ["@tanstack/react-query"],
          "babel-vendor": ["@babel/parser", "@babel/traverse"],
        },
      },
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env": JSON.stringify({}),
    "process.platform": JSON.stringify("browser"),
    "process.stdout": "null",
    "process.stderr": "null",
    "process.version": JSON.stringify(""),
    "process.browser": "true",
  },
}));
