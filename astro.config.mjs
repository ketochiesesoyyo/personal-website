import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import keystatic from "@keystatic/astro";
import markdoc from "@astrojs/markdoc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.henrickf.com",
  trailingSlash: "ignore",
  output: "static",
  adapter: vercel(),
  redirects: {
    "/admin": "/keystatic",
  },
  integrations: [
    react(),
    markdoc(),
    keystatic(),
    sitemap({
      lastmod: new Date(),
      changefreq: "weekly",
      priority: 0.7,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
