---
title: Mexico por el Clima
tagline: Year-round digital platform for the NGO behind Mexico's Climate Action Week.
type: client
role: Lead Developer & Solutions Architect
year: "2026"
status: in-development
stack: ["Next.js 16", "React 19", "Supabase", "NextAuth", "Vercel", "RAG / LLM"]
metrics:
  - { label: "Climate Action Week", value: "10,000+ attendees · 200+ orgs" }
  - { label: "Capital catalyzed", value: "$100M+" }
  - { label: "Modules", value: "5 — network, accountability, knowledge, AI assistant, capital" }
featured: false
order: 6
---

## The problem
Mexico por el Clima is the NGO behind Climate Action Week — the largest climate-action gathering in Mexico, drawing 10,000+ attendees, 200+ organizations, and helping catalyze over $100M in committed climate capital. The event is the spike. The rest of the year is quieter than it should be: the network is real, the commitments are real, but there's no canonical place where partner organizations, journalists, investors, and the public can see what's happening between summits. Climate momentum dies in the gap between events. The org needed a year-round digital home that turns one week of activity into twelve months of compound visibility — with AI sitting at the center of how people interact with the body of climate work that's already been done.

## The approach
Build a multi-module platform — not a brochure site — so every constituency in the climate movement has a reason to come back. AI as the connective layer, not a feature bolted on the side.

Five modules, each one a real workflow:

- A **living network directory** of partner organizations, with profiles, focus areas, and engagement tiers — the network made browsable.
- A **public accountability dashboard** tracking what each org pledged, with status updates over time. Commitments turned into something you can audit, not just announce.
- A **curated knowledge repository** of research, frameworks, case studies, and methodologies — the intellectual capital of the movement, organized.
- A **news feed paired with a RAG-powered AI assistant**, grounded in the platform's own knowledge corpus, so journalists, students, and policymakers can ask Mexico-specific climate questions and get sourced answers — not generic web results.
- A **climate-capital portfolio module** surfacing investment flows into the space, so funders and founders can see the deal landscape.

The AI piece is the through-line. Instead of every constituency needing to know which module to dig into, the assistant — anchored in the platform's curated knowledge — becomes the entry point that routes people to the right primary source.

## What I'm building
A Next.js 16 + React 19 application on Vercel, backed by Supabase (auth, Postgres, storage) with NextAuth on top for org-admin and partner workflows. Each module has its own data model, permissioning, and editorial pipeline so the team and partner orgs can self-serve content without engineering involvement. The RAG layer grounds the AI assistant in the platform's own corpus rather than the open web, keeping the assistant credible enough to put a Mexican climate NGO's name on. Built in collaboration with a partner engineer; I lead architecture and overall delivery.

## Outcome
Targeting launch in **October 2026** at Climate Action Week — using the summit itself as the platform's launch moment, so the same audience that creates a year of climate momentum gets a place to maintain it. Currently in active development; the goal is for "what happened at Climate Action Week" to become "what's happening, year-round, at mexicoporelclima.org."
