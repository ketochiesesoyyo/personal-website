import categories from "~/content/homepage/categories.json";

export const prerender = true;

export const GET = () =>
  new Response(JSON.stringify(categories), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=60",
    },
  });
