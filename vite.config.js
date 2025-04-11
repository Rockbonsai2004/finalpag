import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Asegura que la base sea correcta
  build: {
    outDir: 'dist' // Asegura la carpeta de salida correcta
  },
  server: {
    historyApiFallback: true // Permite navegación en Vercel
  }
});
