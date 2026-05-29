import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    
    // 1. React Compiler goes here
    babel({
      presets: [reactCompilerPreset()]
    }),
    
    // 2. Tailwind v4 goes here
    tailwindcss(),
  ],
})