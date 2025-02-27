import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
// import { VitePWA } from "vite-plugin-pwa";
// import { PWAconfig } from "./PWAconfig";

// https://vite.dev/config/
export default defineConfig({
   envPrefix: "SABAODY",
   server: {
      host: true
   },
   plugins: [
      react(),
      tailwindcss(),
      tsconfigPaths()
      // VitePWA(PWAconfig)
   ]
});
