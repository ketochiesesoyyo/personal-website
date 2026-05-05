import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/projects" }),
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
    categories: z.array(z.string()).default([]),
    metrics: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    topic: z.enum(["AI", "Engineering", "Product", "Industry", "GTM"]).default("AI"),
    sourceUrls: z.array(z.string().url()).default([]),
    keywords: z.array(z.string()).default([]),
    about: z.array(z.string()).default([]),
    faqs: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .default([]),
    coverImage: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
