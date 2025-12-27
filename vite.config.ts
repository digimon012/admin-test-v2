
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.org/config/
export default defineConfig({
  plugins: [react()],
  // Replace 'repo-name' with your actual repository name
  // If deploying to username.github.io, set base to '/'
  base: './', 
  build: {
    outDir: 'dist',
  }
});
