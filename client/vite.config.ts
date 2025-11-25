import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // This block ensures Tailwind and PostCSS are loaded correctly before CSS is processed
  css: {
    postcss: {
      plugins: [
        // CRITICAL FIX: Importing the functions and calling them to satisfy TypeScript
        tailwindcss(), 
        autoprefixer(),
      ],
    },
  },
});