import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 8080, // Ensure it runs on Azure's expected port
  //   host: true, // This allows external access (needed for Azure)
  // },
  // preview: {
  //   port: 8080,
  //   host: true,
  // }
})
