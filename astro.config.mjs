import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import keystatic from "@keystatic/astro";
import markdoc from "@astrojs/markdoc";
import tailwindcss from "@tailwindcss/vite";

// src/pages/keystatic/[...params].astro owns the admin page (it adds the admin
// toolbar without middleware), so skip the integration's duplicate of that
// route. Everything else the integration sets up, including the API route,
// stays as is.
const keystaticWithOwnAdminPage = () => {
  const integration = keystatic();
  const setup = integration.hooks["astro:config:setup"];
  return {
    ...integration,
    hooks: {
      ...integration.hooks,
      "astro:config:setup": (params) =>
        setup({
          ...params,
          injectRoute: (route) => {
            if (route.pattern !== "/keystatic/[...params]") params.injectRoute(route);
          },
        }),
    },
  };
};

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
    keystaticWithOwnAdminPage(),
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
