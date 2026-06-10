import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },

  // السماح لدومين Render بالعمل بدون Blocked Request
  vite: {
    preview: {
      allowedHosts: ["www-relaxfixuae-com.onrender.com"],
    },
  },
});
