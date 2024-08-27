import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// base: "/apps/[project_name]",

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/apps/security-principle-2",
});
