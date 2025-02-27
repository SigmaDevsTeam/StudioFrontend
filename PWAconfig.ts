import { VitePWAOptions } from "vite-plugin-pwa";

export const PWAconfig: Partial<VitePWAOptions> = {
   registerType: "autoUpdate",
   manifest: {
      name: "Sabaody",
      short_name: "Sabaody",
      description: "Sabaody the future of the web is here",
      theme_color: "#111113",
      background_color: "#111113",
      orientation: "any",
      display: "standalone",
      lang: "en-GB",
      icons: [
         {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
         },
         {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
         },
         {
            src: "/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
         },
         {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
         }
      ]
   }
};
