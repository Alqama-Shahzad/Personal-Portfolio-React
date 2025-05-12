import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    // Generate bundle visualization in stats.html
    mode === 'production' && visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'stats.html'
    }),
    // Generate gzip compressed assets
    mode === 'production' && viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Generate brotli compressed assets for even better compression
    mode === 'production' && viteCompression({
      algorithm: 'brotli',
      ext: '.br',
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Generate source maps for production builds
    sourcemap: mode === 'production',
    // Optimize build size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true // Remove debugger statements in production
      }
    },
    // Configure chunk splitting for optimal browser caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Group vendor chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['lucide-react', 'tailwindcss', 'framer-motion', '@radix-ui/react-icons'],
        },
        // Chunk naming with content hash for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
}));
