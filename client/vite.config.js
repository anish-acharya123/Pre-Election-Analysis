import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // optimizeDeps: {
  //   include: ["react-chartjs-2", "axios", "chart.js"],
  // },
  // build: {
  //   rollupOptions: {
  //     external: ["chart.js"],
  //   },
  // },
});
