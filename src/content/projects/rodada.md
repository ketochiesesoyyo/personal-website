---
title: Rodada
tagline: The backend OS behind an out-of-home advertising fleet — inventory, campaigns, and operations on one truth.
type: client
role: Lead Developer
year: "2024"
status: live
url: https://tryrodada.com
stack: ["Next.js", "Postgres", "Supabase"]
metrics:
  - { label: "Trailers managed", value: "2,000+" }
featured: true
order: 4
---

## The problem
Rodada operates wrapped semi-trailers as moving billboards on Mexico's highest-traffic commercial corridors — 600,000+ vehicles a day on routes that include Mexico City to Nuevo Laredo. The commercial side worked. The operations side didn't scale.

Every new campaign was a spreadsheet exercise — which trucks were free, which corridors they were running, which were due for a wrap change, and which clients were on which units. At 2,000+ trailers across simultaneous campaigns, that math doesn't fit in a sheet, and the cost of getting it wrong (a unit double-booked, a wrap installed late, a client briefed on the wrong route) compounds fast.

## The approach
Model the actual unit of work — *truck-week on a corridor* — and build inventory, scheduling, and campaign assignment around it. Every operational view (availability, utilization, wrap status, client deployment) reads from one truth, not five. Designed with the dispatch team's actual day in mind: what they look at first, what they need to change in 10 seconds, and what reporting clients want at the end of a campaign.

## What I built
A custom ERP/CMS purpose-built for an out-of-home media fleet:

- **Trailer inventory** — every unit's location, corridor, current campaign, wrap status, and availability windows in one view.
- **Campaign planning & assignment** — pick units against a brief, lock them for the campaign window, and brief the team on which trucks go where, when.
- **Wrap & re-wrap scheduling** — install dates, takedown dates, the maintenance overhead that's invisible until it starts breaking everything.
- **Client deployment views** — what each advertiser is running, on which units, against which routes, with the reporting cadence they expect.

## Outcome
Weeks of manual planning collapse into minutes. Rodada runs a 2,000+ trailer operation with a small team, on infrastructure built around how the business actually works rather than around a generic SaaS shaped almost-right.
