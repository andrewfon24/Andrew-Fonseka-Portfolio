import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { purgeCSSPlugin as purgecss } from "@fullhuman/postcss-purgecss";

export default defineConfig({
  site: "https://andrewfonseka.com",
  output: "static",
  trailingSlash: "always",
  integrations: [react()],
  build: { inlineStylesheets: "always" },
  vite: {
    css: {
      postcss: {
        plugins: [
          purgecss({
            content: ["./src/**/*.{astro,jsx,js,json}"],
            safelist: {
              standard: ["active", "revealed", "motion-arrived"],
              // Runtime variants and dynamically selected dashboard states.
              greedy: [/^case-/, /^stack-/, /^overview-/, /^project-open$/],
            },
          }),
        ],
      },
    },
  },
});
