import { defineConfig } from "vite";
import "dotenv/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: process.env.SSL_KEY,
      cert: process.env.SSL_CERT,
    },
    host: "127.0.0.1",
    open: true,
  },
  preview: {
    host: "0.0.0.0",
  },
});
