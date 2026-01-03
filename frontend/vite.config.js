import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  //Best Practice to hide localhost when dealing with fetching data
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000"
      }
    } 
  }
});
