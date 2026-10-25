import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://andrewfonseka.com",
  output: "static",
  trailingSlash: "always",
  integrations: [react()],
});
