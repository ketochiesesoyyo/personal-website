---
title: "The Rebuild Tax: A 4-Signal Decision Rule for When Internal Tools Are Worth Building"
excerpt: "Most teams build internal software for the wrong reason. Rebuild only when at least three of four signals fire: workflow drift, vendor lock-on-data, integration fan-out, and cost-per-seat slope."
publishedAt: 2026-04-29
topic: Engineering
sourceUrls:
  - https://a16z.com/llmflation-llm-inference-cost
  - https://newsletter.pragmaticengineer.com
  - https://hbr.org/1996/05/the-experience-curve-reviewed
keywords:
  - build vs buy
  - internal tools
  - custom ERP
  - SaaS replacement
  - rebuild decision framework
  - Rebuild Tax
about:
  - Build vs buy decision
  - Internal tools
  - Custom software
faqs:
  - q: When should I rebuild internal tools?
    a: "Only when at least three of the four signals fire: workflow drift, vendor lock-on-data, integration fan-out, and cost-per-seat slope. One signal isn't enough. Two signals usually means configuration will solve it."
  - q: Is custom always cheaper long-term?
    a: "No. Custom is cheaper only when the SaaS price grows faster than the build's maintenance cost — true at scale, and only when the build stays small in scope. Most rebuilds expand in scope past the point where the math holds."
  - q: What's the break-even on a SaaS replacement?
    a: "For most B2B internal tools, the break-even between configuring an existing vendor and replacing it with a new one is 18–24 months when you include migration cost, retraining, and integration rebuild. Replace only when the new vendor is materially better on at least two of the four signals."
  - q: How do I know if my workflow drift is recoverable?
    a: "Hire a configuration consultant from the vendor's partner network for a one-week scoping engagement. If they can show a configuration path within four weeks of work, the drift is recoverable. If they say \"you'd be better off custom\" — that's evidence Signal 1 is firing."
  - q: Does AI change the build-vs-buy decision?
    a: "Yes — it lowers the build cost, which shifts the threshold but doesn't eliminate it. The 4-signal rule still applies. What changes: configurations that were \"good enough\" in 2022 become \"worth replacing\" in 2026, because building the replacement is now an engineer-week, not an engineer-quarter."
  - q: What's the single biggest mistake teams make on this decision?
    a: "Triggering on one signal. Usually cost-per-seat, sometimes vendor lock. They construct a narrative that three signals are firing when really one is, and the others are configuration problems they haven't tried hard enough to solve."
featured: true
draft: false
---

## TL;DR

Most teams build internal software for the wrong reason. They trigger on one signal — a feature gap, a price hike, a vendor that isn't "quite right" — and rebuild. Six months later, the team is maintaining a system that works, kind of, with no one to call when it breaks.

The rule is simpler than it looks: **rebuild only when at least three of four signals fire** — workflow drift, vendor lock-on-data, integration fan-out, and cost-per-seat slope. Triggering on one signal means you're paying the Rebuild Tax to fix something a configuration could have solved.

---

I've watched both sides of this decision from inside fast-growing B2B companies. As Director of Strategy & Operations at Bedu (Lottus Education), I owned a P&L that included six- and seven-figure SaaS contracts: HubSpot, Salesforce, ATS platforms, learning management, accounting. As Head of Sales for Jeeves across LATAM, I sat through the same vendor pitches every fintech operator sees. And now, building MatchWise — an AI-native ATS — I'm on the other end, shipping the kind of product I used to evaluate and replace.

Three internal systems I've rebuilt from scratch in the last 24 months. One of them I had to do twice — not because building was the wrong call, but because the scope I chose was.

Here's the framework I wish I'd had before signing the first SOW.

## The Rebuild Tax

The **Rebuild Tax** is the compounding cost of maintaining custom internal software past the point where SaaS would have been faster, cheaper, and safer. It's paid in four currencies: developer hours that don't ship customer-facing work, integrations that break with every API update, onboarding pain that scales with headcount, and the slow-burn risk of a single engineer who knows how the system actually works.

Most teams don't see the tax until year two, when the engineer who built it leaves.

The tax is not a reason never to build. The tax is a reason to *only* build when the alternative — configuring or replacing — costs more across a 24-month horizon. That's a much higher bar than most decision frameworks set.

## Why teams trigger on one signal

Walk into any growth-stage operations review and you'll hear the same sentences:

- "HubSpot can't model our renewal logic."
- "Our ATS doesn't capture the candidate scorecard the way our team actually evaluates."
- "Salesforce reporting is unusable."
- "Their roadmap doesn't match ours."

Each of these is a real complaint. None of them, on its own, is a reason to build.

Because each has a configuration answer:

- HubSpot has custom objects. Most teams haven't tried.
- Every ATS has custom fields. Most teams haven't tried.
- Salesforce reports work fine when the data model is clean. Most teams' aren't.
- Vendor roadmaps move when the customer is large enough to push them.

The trap is that one big complaint *feels* like a sufficient reason. It isn't. The Rebuild Tax is paid quietly, over years; the configuration cost is paid loudly, over weeks. The loud cost feels worse, so teams optimize against it. They shouldn't.

## The 4 signals

Apply each as a yes/no test. Anything below three yeses is a configuration problem.

### Signal 1 — Workflow Drift

**What it is:** Your operational workflow has drifted so far from the SaaS vendor's model that you're using the tool against itself — fields renamed, statuses repurposed, automations bolted on through Zapier to translate between what the system expects and what your team actually does.

**The disqualifier:** If a one-week consulting engagement with a vendor-certified configuration partner could realign the workflow to the tool, the drift is your data model, not the tool's limits. Pay the consultant. Don't build.

**The threshold:** When drift forces you to maintain a separate documentation layer that explains "what each field actually means in our process," the drift is real.

I saw this most clearly at Service Core, where the operational stack spanned Sage (accounting), Celigo (iPaaS), and Recurly (billing). None of the three were wrong individually. But each named the same business object differently — *customer*, *account*, *subscriber* — and Service Core's workflow didn't match any of their native models. Every new connection required an entire field-mapping pass before it could go live, and the mapping doc became a parallel system of record that nobody owned. That's Signal 1 in production. The fix wasn't a better iPaaS. It was admitting the workflow had drifted past the vendors' models.

### Signal 2 — Vendor Lock-on-Data

**What it is:** Your most valuable operational data lives in a system that charges you to extract it, throttles API access, or — worst — owns the schema in a way that prevents you from running the analyses your business actually needs.

**The disqualifier:** If the vendor offers a data warehouse export at a price you can stomach, this signal doesn't fire. Most modern SaaS does. Pay the export fee. Don't build.

**The threshold:** When you can't answer a board-level question without three vendor support tickets and a manual export — *or* when the cost of migrating off the vendor consumes six months of operational leadership — the lock is real.

The version of this signal most teams underestimate isn't the reporting block. It's the migration cost. At Bedu, standardizing the entire org on Microsoft 365 meant a six-month coordination project to migrate off Google — every team's documents, every shared drive, every nested folder permission, every email forwarding rule. I'd never run a migration like it before, and the rolling checkups across teams were what consumed the time, not the technical move itself. The lock wasn't blocking analysis. It was making the *exit* expensive enough that the previous regime had simply never executed it. That's the quieter, more dangerous shape of Signal 2 — the lock you don't notice until you decide to leave.

### Signal 3 — Integration Fan-out

**What it is:** Your SaaS stack has grown past the point where any tool is a system of record. Customer data lives in HubSpot, billing in Stripe, support in Zendesk, product usage in Mixpanel, contracts in DocuSign, payroll in Gusto. Each integration is a webhook or a Zap that breaks every time someone upgrades a plan.

**The disqualifier:** If a single integration platform (Workato, n8n, Zapier Premium) holds the layer together at under 5% breakage per quarter, your fan-out is manageable. Pay the platform. Don't build.

**The threshold:** When more than 30% of operations engineering time is spent maintaining the connective tissue between tools, you've crossed it. The integrations *are* the system. Owning them is cheaper than renting them.

### Signal 4 — Cost-per-Seat Slope

**What it is:** Your SaaS bill scales with headcount in a way that diverges from the value the tool delivers per seat. The classic shape: you onboard 50 new ops users to a $90/seat tool, and 40 of them only need read access — but the vendor's read-only tier doesn't exist, or costs 80% of full-seat pricing.

**The disqualifier:** If the vendor has a credible read-only or limited-access tier within 30% of your target cost, the signal doesn't fire. Negotiate. Don't build.

**The threshold:** When your finance team flags the SaaS line item in three consecutive board decks, the slope is real.

The clearest version of this I dealt with at Bedu was Notion. Forty-plus seats, business-tier pricing, and a usage split that didn't justify the bill: a handful of power users who lived in it daily, and the rest checking in once a month or less. We weren't paying for a knowledge base — we were paying for read-only access to documents that could have lived behind any number of cheaper-or-free alternatives for the people who only needed to consume them. Notion didn't have a credible read-only tier at the price gap that mattered. That's the disqualifier failing — and that's the moment the slope stops being a finance complaint and starts being a structural reason to either renegotiate hard or rebuild the layer in something the org actually owns.

## The decision rule

**Build only when ≥3 of the 4 signals fire.**

- **Two signals:** configure or replace.
- **Three signals:** build — but scope tightly to the signals firing.
- **Four signals:** build, and scope to the whole stack.

The reason the threshold is three, not two: any two signals are usually solvable inside the existing vendor with a hard 90-day project — data model cleanup, workspace re-architecture, integration consolidation. At three, you're rebuilding the workflow inside the vendor anyway. You're just paying a license fee while you do it.

## Rebuild vs Configure vs Replace

| Dimension | Rebuild | Configure | Replace |
|---|---|---|---|
| Time to value | 4–9 months | 4–8 weeks | 6–12 weeks |
| Upfront cost | Engineer-months × loaded cost | 1–2 consulting engagements | Migration + new license |
| Ongoing cost | Maintenance, oncall, retraining | Vendor license + admin time | Vendor license |
| Vendor risk | None — you are the vendor | Same as today | Reset clock |
| Single-engineer risk | High (knowledge concentration) | Low | Low |
| Speed of iteration | High (you own the roadmap) | Low | Low |
| Compliance burden | Yours | Vendor's | New vendor's |
| When it wins | ≥3 signals fire | ≤2 signals, drift is recoverable | ≤2 signals, vendor is the problem |

The most-missed row is **single-engineer risk**. A built-from-scratch internal tool is one resignation away from being unmaintainable. Most teams don't price this in until the resignation happens. Price it in upfront — assume any solo-built system is one departure from a 12-month rebuild.

## The post-mortem: the wrong call wasn't whether to build — it was how widely to scope

Of the three internal systems I've built from scratch in the last two years, the build that taught me the most was the one I had to redo.

The system was the Rodada backend OS — the inventory and operations layer behind a fleet of 2,000+ wrapped semi-trailers running OOH advertising across Mexican highways. The signal count was clearly four out of four: workflow drift (no off-the-shelf SaaS models OOH-on-trailers), vendor lock (none of the candidates exported in a useful shape), integration fan-out (campaign data, fleet telemetry, sales pipeline, finance), and cost-per-seat slope (more importantly, a value-per-seat slope that didn't justify enterprise SaaS for an operations team that small). The build was the right call.

The wrong call was inside the build. I scoped multi-language support into v1 — Spanish *and* English — assuming that was a small lift. It wasn't. I couldn't get the i18n layer to cleanly translate every page and button without breaking state and routing across the app. The translation pass cascaded into bugs that turned into a near-total rewrite. The system that eventually shipped is Spanish-only, and that's the right answer: the operators who actually use it work in Spanish, the customer base is in Mexico, and English was never going to earn back the engineering weeks it cost me.

Two lessons came out of that, and both update the framework.

**First — the 4-signal rule tells you whether to build. It says nothing about how widely to scope. That's a separate decision, and it kills more builds than the build/buy question does.** Signal counts justify *building*. They don't justify building a more ambitious version of what you actually need. Every dimension of scope you add multiplies the surface area of what can break — and unlike SaaS, there's no vendor whose problem the breakage becomes.

**Second — vendors can't write this section.** A SaaS vendor selling you their product is structurally incentivized to claim every signal fires for everyone. An engineer who built an internal tool has every reason to defend the build. The only person who can give you the post-mortem honestly is an operator who has done it, picked the wrong scope, and paid for it. That's the wedge of this whole framework. Not "I built and you should too." But "I built, scoped it wrong, redid it, and here's what I'd cut next time."

The pattern in scope-creep mistakes — and in every misfire I've seen across Bedu, Jeeves, and the dozens of fintechs I sized at KoreFusion — is the same. The team is right that the signals are firing. They're wrong about how much of the workflow needs to be rebuilt. They build the whole stack when they should have built the one drifting workflow. They translate the whole app when they should have shipped the Spanish-only v1.

The rule against single-signal triggers exists because every engineer who's built an internal tool can construct a story where their decision was right. The corollary rule against wide-scope first versions exists because every engineer who's built an internal tool can construct a story where the *next* feature was worth adding. Both stories are usually wrong.

## What changes in 2026

Two things make this framework matter more, not less, in an AI-native build environment:

**Build velocity has collapsed.** What took an engineer-quarter in 2022 takes an engineer-week in 2026 with Claude Code, Cursor, v0, and the rest. This pushes the build-vs-buy line. Things that weren't worth building in 2022 are worth building in 2026. The 4-signal rule still applies — but the cost side of the comparison drops. Configurations that used to be "free" relative to a build are now closer to even.

**Vendor moats are eroding.** The reason large incumbent SaaS companies could charge enterprise pricing was that the build alternative cost too much. That alternative just got cheaper. Expect price compression on the long tail of SaaS within 18 months — and use that compression as a renegotiation lever *before* you decide to rebuild.

If you're triggering on cost-per-seat slope today, your highest-leverage move isn't rebuilding. It's writing the build proposal, getting a credible engineering estimate, and walking it into your account manager's office.

## How I'd build for this

If I were starting a B2B operation today and had to make this decision from scratch, here's the order I'd run it in:

1. **Audit against the 4 signals.** Yes/no. No qualifiers. Get to a number.
2. **If the number is ≤2:** invest in configuration. Hire a vendor-certified consultant for 4–8 weeks. Cost: ~$15–40K. Savings: 12+ months of build avoidance.
3. **If the number is 3:** build the smallest possible thing that addresses the signals firing. Don't build the whole stack. Build the one workflow that's drifted, the one report the vendor blocks, the one integration that breaks. Keep the SaaS for everything else.
4. **If the number is 4:** build with a proper team — at least two engineers and an operations partner — not a solo project. The single-engineer risk is the killer here.
5. **In all cases:** write the post-mortem *before* you ship. What does success look like 12 months from now? What signal would tell you to deprecate this and go back to SaaS? Most teams don't define that. They should.

## FAQ

**When should I rebuild internal tools?**
Only when at least three of the four signals fire: workflow drift, vendor lock-on-data, integration fan-out, and cost-per-seat slope. One signal isn't enough. Two signals usually means configuration will solve it.

**Is custom always cheaper long-term?**
No. Custom is cheaper only when the SaaS price grows faster than the build's maintenance cost — true at scale, and only when the build stays small in scope. Most rebuilds expand in scope past the point where the math holds.

**What's the break-even on a SaaS replacement?**
For most B2B internal tools, the break-even between configuring an existing vendor and replacing it with a new one is 18–24 months when you include migration cost, retraining, and integration rebuild. Replace only when the new vendor is materially better on at least two of the four signals.

**How do I know if my workflow drift is recoverable?**
Hire a configuration consultant from the vendor's partner network for a one-week scoping engagement. If they can show a configuration path within four weeks of work, the drift is recoverable. If they say "you'd be better off custom" — that's evidence Signal 1 is firing.

**Does AI change the build-vs-buy decision?**
Yes — it lowers the build cost, which shifts the threshold but doesn't eliminate it. The 4-signal rule still applies. What changes: configurations that were "good enough" in 2022 become "worth replacing" in 2026, because building the replacement is now an engineer-week, not an engineer-quarter.

**What's the single biggest mistake teams make on this decision?**
Triggering on one signal. Usually cost-per-seat, sometimes vendor lock. They construct a narrative that three signals are firing when really one is, and the others are configuration problems they haven't tried hard enough to solve.

---

*If you've made this call recently and want a sanity check before you sign the SOW or kick off the rebuild, [hello@henrickf.com](mailto:hello@henrickf.com).*
