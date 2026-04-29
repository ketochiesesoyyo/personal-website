# [STUDIO] — personal site

Personal portfolio + studio site built with Astro + Tailwind. Designed to evolve from a personal portfolio into a full studio/agency site without a rebuild.

## Run

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to ./dist
npm run preview  # preview the build locally
```

## Where to edit

| Want to change | Edit |
|---|---|
| Studio name, founder name, bio, socials, nav | `src/site.config.ts` |
| A project / case study | `src/content/projects/<slug>.md` |
| Add a new project | new `.md` file in `src/content/projects/` (schema in `src/content.config.ts`) |
| Career timeline | `src/components/sections/Career.astro` |
| Skills | `src/components/sections/Skills.astro` |
| Services | `src/components/sections/Services.astro` |
| FAQ | `src/components/sections/FAQ.astro` |
| Colors / typography | `src/styles/global.css` (`@theme` block) |
| Section order on homepage | `src/pages/index.astro` |

## Replace `[STUDIO]`

Search-replace `[STUDIO]` across the repo once you pick the brand name (config + content files only — no build/code references).

## Deploy

Push to GitHub, import to Vercel, accept defaults. It's a static Astro site.
