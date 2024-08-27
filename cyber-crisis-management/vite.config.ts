import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/apps/cyber-crisis-management",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Add your preloaded image paths here
        manualChunks: {
          images: [
            "src/constants/asset/triage-phase/Action power up small icon.svg",
            "src/constants/asset/triage-phase/Communication power up small icon.svg",
            "src/constants/asset/triage-phase/CSIRT power up small icon.svg",
          ],
        },
      },
    },
  },
});
