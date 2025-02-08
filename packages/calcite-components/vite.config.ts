import { defineConfig } from "vite";
import { useLumina } from "@arcgis/lumina-compiler";

export default defineConfig({
  plugins: [useLumina()],
});
