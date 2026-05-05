import { config, fields, collection, singleton } from "@keystatic/core";
import categoriesData from "./src/content/homepage/categories.json";

// Read the master list at config-load time so the project picker is populated
// from the same source that drives the homepage filter chips. Adding a brand-
// new category requires adding it to the Categories singleton and reloading
// the admin (Keystatic doesn't support truly dynamic field options).
const CATEGORY_OPTIONS = (
  Array.isArray(categoriesData?.items) && categoriesData.items.length > 0
    ? categoriesData.items
    : [{ value: "category", label: "Category" }]
).map((it) => ({ value: String(it.value), label: String(it.label) }));

const SERVICE_ICON_OPTIONS = [
  { label: "Hammer (build)", value: "hammer" },
  { label: "Zap (sprint)", value: "zap" },
  { label: "Compass (advisory)", value: "compass" },
  { label: "Search-check (audit)", value: "searchCheck" },
];

const SPECIALTY_ICON_OPTIONS = [
  { label: "Sparkles (AI)", value: "sparkles" },
  { label: "Layers (tools/ERP)", value: "layers" },
  { label: "Workflow (integration)", value: "workflow" },
  { label: "Message (chat)", value: "message" },
  { label: "Card (payments)", value: "card" },
  { label: "Package (inventory)", value: "package" },
  { label: "Compass (GEO)", value: "compass" },
  { label: "Globe (web)", value: "globe" },
];

const useGithubStorage =
  import.meta.env.PROD ||
  import.meta.env.PUBLIC_KEYSTATIC_FORCE_GITHUB === "1";

export default config({
  storage: useGithubStorage
    ? {
        kind: "github",
        repo: "ketochiesesoyyo/personal-website",
        branchPrefix: "keystatic/",
      }
    : { kind: "local" },
  ui: {
    brand: { name: "henrickf.com" },
  },
  singletons: {
    hero: singleton({
      label: "Hero",
      path: "src/content/homepage/hero",
      format: { data: "json" },
      schema: {
        headlineLine1: fields.text({
          label: "Headline · line 1",
          validation: { length: { min: 1 } },
        }),
        headlineLine2: fields.text({
          label: "Headline · line 2",
          validation: { length: { min: 1 } },
        }),
        headlineAccent: fields.text({
          label: "Headline · accent line",
          description: "Italic, accent-coloured.",
          validation: { length: { min: 1 } },
        }),
        subheadline: fields.text({
          label: "Subheadline",
          multiline: true,
          validation: { length: { min: 1, max: 400 } },
        }),
        primaryCta: fields.object({
          label: fields.text({ label: "Label", validation: { length: { min: 1 } } }),
          href: fields.text({ label: "Link", validation: { length: { min: 1 } } }),
        }, { label: "Primary CTA" }),
        secondaryCta: fields.object({
          label: fields.text({ label: "Label", validation: { length: { min: 1 } } }),
          href: fields.text({ label: "Link", validation: { length: { min: 1 } } }),
        }, { label: "Secondary CTA" }),
        stats: fields.array(
          fields.object({
            value: fields.text({ label: "Value", validation: { length: { min: 1 } } }),
            label: fields.text({ label: "Label", validation: { length: { min: 1 } } }),
          }),
          {
            label: "Stats strip",
            itemLabel: (props) =>
              props.fields.value.value
                ? `${props.fields.value.value} — ${props.fields.label.value}`
                : "Stat",
          }
        ),
      },
    }),

    services: singleton({
      label: "Services",
      path: "src/content/homepage/services",
      format: { data: "json" },
      schema: {
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { min: 1 } } }),
        heading: fields.text({ label: "Heading", validation: { length: { min: 1 } } }),
        intro: fields.text({
          label: "Intro paragraph",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        items: fields.array(
          fields.object({
            icon: fields.select({
              label: "Icon",
              options: SERVICE_ICON_OPTIONS,
              defaultValue: "hammer",
            }),
            format: fields.text({ label: "Format line", validation: { length: { min: 1 } } }),
            title: fields.text({ label: "Title", validation: { length: { min: 1 } } }),
            description: fields.text({
              label: "Description",
              multiline: true,
              validation: { length: { min: 1 } },
            }),
          }),
          {
            label: "Service cards",
            itemLabel: (props) => props.fields.title.value || "Service",
          }
        ),
        ctaText: fields.text({
          label: "Footer CTA text",
          validation: { length: { min: 1 } },
        }),
        ctaButton: fields.object({
          label: fields.text({ label: "Label", validation: { length: { min: 1 } } }),
          href: fields.text({ label: "Link", validation: { length: { min: 1 } } }),
        }, { label: "Footer CTA button" }),
      },
    }),

    specialties: singleton({
      label: "Focus areas",
      path: "src/content/homepage/specialties",
      format: { data: "json" },
      schema: {
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { min: 1 } } }),
        heading: fields.text({ label: "Heading", validation: { length: { min: 1 } } }),
        intro: fields.text({
          label: "Intro paragraph",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        items: fields.array(
          fields.object({
            icon: fields.select({
              label: "Icon",
              options: SPECIALTY_ICON_OPTIONS,
              defaultValue: "sparkles",
            }),
            title: fields.text({ label: "Title", validation: { length: { min: 1 } } }),
            description: fields.text({
              label: "Description",
              multiline: true,
              validation: { length: { min: 1 } },
            }),
            evidence: fields.text({
              label: "Evidence line",
              description: "Project names that demonstrate this depth.",
              validation: { length: { min: 1 } },
            }),
          }),
          {
            label: "Focus area cards",
            itemLabel: (props) => props.fields.title.value || "Focus area",
          }
        ),
      },
    }),

    about: singleton({
      label: "About",
      path: "src/content/homepage/about",
      format: { data: "json" },
      schema: {
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { min: 1 } } }),
        heading: fields.text({ label: "Heading", validation: { length: { min: 1 } } }),
        portrait: fields.text({
          label: "Portrait image path",
          description: "Path under /public, e.g. /henrick.jpg",
          validation: { length: { min: 1 } },
        }),
        portraitAlt: fields.text({
          label: "Portrait alt text",
          validation: { length: { min: 1 } },
        }),
        paragraphs: fields.array(
          fields.text({
            label: "Paragraph",
            multiline: true,
            validation: { length: { min: 1 } },
          }),
          {
            label: "Paragraphs",
            description: "First paragraph is the lead bio. Following paragraphs render in muted style.",
            itemLabel: (props) =>
              props.value ? props.value.slice(0, 60) + (props.value.length > 60 ? "…" : "") : "Paragraph",
          }
        ),
      },
    }),

    career: singleton({
      label: "Career",
      path: "src/content/homepage/career",
      format: { data: "json" },
      schema: {
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { min: 1 } } }),
        heading: fields.text({ label: "Heading", validation: { length: { min: 1 } } }),
        education: fields.text({
          label: "Education line",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        roles: fields.array(
          fields.object({
            year: fields.text({ label: "Year(s)", validation: { length: { min: 1 } } }),
            title: fields.text({ label: "Role title", validation: { length: { min: 1 } } }),
            company: fields.text({ label: "Company", validation: { length: { min: 1 } } }),
            description: fields.text({
              label: "Description",
              multiline: true,
              validation: { length: { min: 1 } },
            }),
          }),
          {
            label: "Roles",
            itemLabel: (props) =>
              props.fields.title.value && props.fields.company.value
                ? `${props.fields.title.value} — ${props.fields.company.value}`
                : "Role",
          }
        ),
      },
    }),

    trackRecord: singleton({
      label: "Track record",
      path: "src/content/homepage/trackRecord",
      format: { data: "json" },
      schema: {
        eyebrow: fields.text({ label: "Eyebrow", validation: { length: { min: 1 } } }),
        heading: fields.text({ label: "Heading", validation: { length: { min: 1 } } }),
        intro: fields.text({
          label: "Intro line",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        companies: fields.array(
          fields.object({
            name: fields.text({ label: "Company", validation: { length: { min: 1 } } }),
            url: fields.url({ label: "URL" }),
          }),
          {
            label: "Companies",
            itemLabel: (props) => props.fields.name.value || "Company",
          }
        ),
        footnote: fields.text({
          label: "Footnote",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
      },
    }),

    categories: singleton({
      label: "Categories",
      path: "src/content/homepage/categories",
      format: { data: "json" },
      schema: {
        allLabel: fields.text({
          label: "\"All\" chip label",
          description: "Text on the first chip (the one that shows every project).",
          defaultValue: "All",
          validation: { length: { min: 1 } },
        }),
        items: fields.array(
          fields.object({
            label: fields.text({
              label: "Display label",
              description:
                "Shown on the homepage filter chip and on the per-project picker. Safe to rename anytime.",
              validation: { length: { min: 1 } },
            }),
            value: fields.text({
              label: "Slug (permanent ID — do not change)",
              description:
                "Stable identifier saved into project frontmatter. Lowercase, no spaces (e.g. website, app, platform). Renaming this AFTER you have tagged any project will break those tags. Only edit when first creating the entry.",
              validation: {
                length: { min: 1 },
                pattern: {
                  regex: /^[a-z0-9][a-z0-9-]*$/,
                  message:
                    "Use lowercase letters, digits, and hyphens only (no spaces). Treat this as a permanent ID.",
                },
              },
            }),
          }),
          {
            label: "Categories",
            description:
              "Master list of project categories. To rename a chip, change its label only — never the slug.",
            itemLabel: (props) =>
              props.fields.label.value && props.fields.value.value
                ? `${props.fields.label.value}  ·  ${props.fields.value.value}`
                : "Category",
          }
        ),
      },
    }),

    footerCopy: singleton({
      label: "Footer copy",
      path: "src/content/homepage/footer",
      format: { data: "json" },
      schema: {
        bio: fields.text({
          label: "Footer bio",
          description: "One-sentence pitch shown under your name in the footer.",
          multiline: true,
          validation: { length: { min: 1, max: 280 } },
        }),
        solidarity: fields.text({
          label: "Solidarity line",
          description: "Centre line in the bottom strip.",
          validation: { length: { min: 1 } },
        }),
      },
    }),
  },
  collections: {
    posts: collection({
      label: "Writing",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "publishedAt"],
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { length: { min: 1 } } },
          slug: {
            label: "URL slug",
            description: "The URL path under /writing/",
          },
        }),
        excerpt: fields.text({
          label: "Excerpt",
          description: "One-sentence dek shown on the writing index and in OG cards.",
          multiline: true,
          validation: { length: { min: 1, max: 400 } },
        }),
        publishedAt: fields.date({
          label: "Published date",
          validation: { isRequired: true },
        }),
        updatedAt: fields.date({
          label: "Updated date",
          description: "Optional. Set when you make a substantive revision.",
        }),
        topic: fields.select({
          label: "Topic",
          options: [
            { label: "AI", value: "AI" },
            { label: "Engineering", value: "Engineering" },
            { label: "Product", value: "Product" },
            { label: "Industry", value: "Industry" },
            { label: "GTM", value: "GTM" },
          ],
          defaultValue: "AI",
        }),
        sourceUrls: fields.array(
          fields.url({
            label: "Source URL",
            validation: { isRequired: true },
          }),
          {
            label: "Source URLs",
            description: "External sources cited in the post (used for GEO citability).",
            itemLabel: (props) => props.value || "Source",
          }
        ),
        keywords: fields.array(
          fields.text({ label: "Keyword", validation: { length: { min: 1 } } }),
          {
            label: "Keywords",
            description: "Search keywords. Used in JSON-LD and meta tags.",
            itemLabel: (props) => props.value || "Keyword",
          }
        ),
        about: fields.array(
          fields.text({ label: "Topic", validation: { length: { min: 1 } } }),
          {
            label: "About (topics)",
            description: "Schema.org about[] entries. High-level subject tags.",
            itemLabel: (props) => props.value || "Topic",
          }
        ),
        faqs: fields.array(
          fields.object({
            q: fields.text({
              label: "Question",
              validation: { length: { min: 1 } },
            }),
            a: fields.text({
              label: "Answer",
              multiline: true,
              validation: { length: { min: 1 } },
            }),
          }),
          {
            label: "FAQs",
            description: "Used for AI citability + Schema.org FAQPage block.",
            itemLabel: (props) => props.fields.q.value || "FAQ",
          }
        ),
        coverImage: fields.text({
          label: "Cover image URL",
          description: "Optional path or URL.",
        }),
        featured: fields.checkbox({
          label: "Featured",
          description: "Show in Recent Writing on the homepage.",
        }),
        draft: fields.checkbox({
          label: "Draft",
          description: "Hide from /writing index and sitemap.",
        }),
        content: fields.markdoc({
          label: "Body",
          options: {
            image: {
              directory: "public/images/posts",
              publicPath: "/images/posts/",
            },
          },
        }),
      },
    }),

    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/projects/*",
      format: { contentField: "content" },
      entryLayout: "content",
      // @ts-expect-error — Keystatic's column type formally rejects array fields,
      // but at runtime arrays render via String(value) (comma-joined). Works as a
      // read-only summary column; clicking the row opens the detail editor.
      columns: ["title", "year", "status", "categories"],
      schema: {
        title: fields.slug({
          name: { label: "Project name", validation: { length: { min: 1 } } },
          slug: { label: "URL slug" },
        }),
        tagline: fields.text({
          label: "Tagline",
          multiline: true,
          validation: { length: { min: 1, max: 280 } },
        }),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Product (mine)", value: "product" },
            { label: "Client work", value: "client" },
          ],
          defaultValue: "client",
        }),
        role: fields.text({
          label: "Role",
          validation: { length: { min: 1 } },
        }),
        year: fields.text({
          label: "Year(s)",
          description: "e.g. 2025 or 2024-2025",
          validation: { length: { min: 1 } },
        }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Live", value: "live" },
            { label: "In development", value: "in-development" },
            { label: "Archived", value: "archived" },
          ],
          defaultValue: "live",
        }),
        url: fields.url({ label: "External URL" }),
        cover: fields.text({ label: "Cover image URL" }),
        stack: fields.array(
          fields.text({
            label: "Tech",
            validation: { length: { min: 1 } },
          }),
          {
            label: "Tech stack",
            itemLabel: (props) => props.value || "Tech",
          }
        ),
        categories: fields.multiselect({
          label: "Categories",
          description:
            "Tick the categories that apply. To add a brand-new category, edit the Categories singleton in the sidebar and reload the admin.",
          options: CATEGORY_OPTIONS,
          defaultValue: [],
        }),
        metrics: fields.array(
          fields.object({
            label: fields.text({
              label: "Label",
              validation: { length: { min: 1 } },
            }),
            value: fields.text({
              label: "Value",
              validation: { length: { min: 1 } },
            }),
          }),
          {
            label: "Metrics",
            itemLabel: (props) =>
              props.fields.label.value
                ? `${props.fields.label.value}: ${props.fields.value.value}`
                : "Metric",
          }
        ),
        featured: fields.checkbox({
          label: "Featured",
          description: "Show in featured Work block on the homepage.",
        }),
        order: fields.integer({
          label: "Display order",
          description: "Lower = earlier. Used to sort projects on the homepage.",
          defaultValue: 0,
        }),
        content: fields.markdoc({
          label: "Body",
          options: {
            image: {
              directory: "public/images/projects",
              publicPath: "/images/projects/",
            },
          },
        }),
      },
    }),
  },
});
