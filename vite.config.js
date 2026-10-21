import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // /api/* diteruskan ke server AI (npm run server)
  server: { proxy: { "/api": "http://localhost:3001" } },
});
