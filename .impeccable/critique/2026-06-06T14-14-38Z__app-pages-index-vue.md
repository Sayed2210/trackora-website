---
target: current Trackora homepage
total_score: 29
p0_count: 0
p1_count: 3
timestamp: 2026-06-06T14-14-38Z
slug: app-pages-index-vue
---
## Design Health Score

Overall UX score: 7.4/10. Nielsen heuristic score: 29/40, good foundation with conversion and trust gaps.

## Anti-Patterns Verdict

The page does not read as obvious AI slop. It has a concrete logistics/COD story, Arabic-first content, and a credible operational dashboard hero. Main risks are repeated section markers, heavy use of card grids after the hero, and proof points that feel asserted rather than evidenced.

Deterministic scan: 0 findings in app/pages/index.vue.

Browser visualization: unavailable in this environment.

## Priority Issues

- P1: Above-the-fold conversion promise is strong but not sharp enough. The hero explains many capabilities, but the decisive outcome is split across dispatch, COD, risk, and tracking. Fix by making one primary promise explicit: fewer failed deliveries, faster COD settlement, and clearer merchant/customer visibility.
- P1: Trust and credibility are underpowered. Metrics are impressive but unsourced and generic. Add concrete proof such as supported workflows, sample SLA outcomes, implementation reassurance, security/role controls, or recognizable operational artifacts.
- P1: Mid-page rhythm becomes card-heavy. Features, product screens, pricing, FAQ, and parts of the workflow all use similar rounded-card grammar. Replace at least one middle section with a more distinctive operational artifact such as a COD ledger, dispatch queue, or shipment timeline.
- P2: CTA intent could be stronger. The primary CTA repeats request-demo, but the page could better qualify what happens next and offer a lower-friction tracking/test path.
- P2: Mobile has likely density problems around the hero console, feature bento, stats, and workflow cards. Compress or sequence these areas for smaller screens.

## Persona Red Flags

- Jordan, first-time buyer: The product category is clear, but the buyer may still ask what implementation requires and whether this replaces their current dispatch/COD workflow end-to-end.
- Casey, distracted mobile visitor: Many stacked cards could make the page feel long before enough trust is built. Primary CTA at the top is good, but repeated sections may require too much scrolling.
- Operations leader at a shipping company: The page speaks their language, but needs more operational proof around COD reconciliation, exception handling, permissions, and daily adoption by dispatch/couriers.

## Recommended Focus

Must fix now: sharpen hero promise, add credible proof, reduce card sameness in the middle.
Should improve: CTA specificity, mobile pacing, pricing clarity.
Nice to have: richer motion, trust badges, customer scenario snippets.
