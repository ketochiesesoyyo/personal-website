import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    type: z.enum(["product", "client"]),
    role: z.string(),
    year: z.string(),
    status: z.enum(["live", "in-development", "archived"]).default("live"),
    url: z.string().url().optional(),
    cover: z.string().optional(),
    stack: z.array(z.string()).default([]),
    metrics: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { projects };
