---
target: request-demo
total_score: 28
p0_count: 0
p1_count: 2
timestamp: 2026-06-07T09-00-16Z
slug: app-pages-request-demo-vue
---
# Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Loading, success, and validation states exist, but success focus is not moved to the status panel. |
| 2 | Match System / Real World | 4 | Copy maps well to logistics operations, COD, dispatch, couriers, and plan intent. |
| 3 | User Control and Freedom | 2 | Users can reset after success, but there is no clear cancel/back path or draft recovery for a long form. |
| 4 | Consistency and Standards | 3 | Mostly cohesive, but the page introduces a red/blue palette that diverges from the documented teal/gold system. |
| 5 | Error Prevention | 3 | Required fields and Egyptian phone validation work, but the hidden custom choice inputs need stronger accessible focus handling. |
| 6 | Recognition Rather Than Recall | 3 | Plan context and next steps stay visible, but the problem checklist exposes seven choices at once. |
| 7 | Flexibility and Efficiency | 2 | The flow is linear with limited shortcuts; no persistence after interruption. |
| 8 | Aesthetic and Minimalist Design | 2 | Strong sections, but the page leans on repeated rounded panels and cards, reducing distinctiveness. |
| 9 | Error Recovery | 3 | Errors are specific and near fields; global error is clear, but focus does not announce success strongly. |
| 10 | Help and Documentation | 3 | FAQ and phone help are useful; no inline explanation for COD in English or plan boundaries beyond short helper text. |
| **Total** | | **28/40** | **Good foundation, needs polish before high-conversion release.** |

# Anti-Patterns Verdict

**LLM assessment**: The page does not read as disposable AI slop, because the operational copy is specific and Arabic-first. The weaker tell is structural: hero panel, form card, sticky reassurance card, trust cards, FAQ cards, final CTA. The visual rhythm is polished but too dependent on rounded containers. It needs one more signature Trackora motif, such as a shipment ledger timeline or dispatch worksheet, to feel authored rather than assembled.

**Deterministic scan**: `detect.mjs --json app/pages/request-demo.vue` returned `[]`. No detector findings were reported for banned patterns or obvious local quality issues.

**Visual overlays**: Browser automation/injection is not available in this environment, so no reliable user-visible overlay was created.

# Overall Impression

The page is functional, credible, and on-task. The strongest opportunity is reducing form cognitive load while making the hero and side panel feel more like Trackora's shipment-ledger world, not a generic SaaS demo page.

# What's Working

- The Arabic copy is operationally specific: shipments, dispatch, couriers, COD, reports, and trial scope all map to the user's real workflow.
- Query-param plan context is handled clearly, and `starter` / `growth` both affect the form and contextual copy.
- The form has visible labels, inline errors, loading, success, and development-only placeholder submission, which is the right implementation stance before backend integration.

# Priority Issues

**[P1] The form asks for too many decisions in one uninterrupted block**

**Why it matters**: Users must process six primary fields, three plan cards, seven problem chips, and an optional message before submitting. That exceeds the working-memory guideline and will hurt mobile completion.

**Fix**: Split the form into two visual groups: contact details and operating context. Move the seven problem chips behind a tighter grouped layout with a recommended default prompt, or cap visible chips to the most common four with a secondary "other" path.

**Suggested command**: `/impeccable distill request-demo`

**[P1] Custom radio and checkbox controls hide native inputs without a replacement focus style**

**Why it matters**: The actual inputs are `opacity: 0` and `pointer-events: none`; keyboard focus can land on an invisible control while the visible card/chip does not receive a clear focus state. This is a real accessibility and confidence problem.

**Fix**: Add `:focus-within` styles to `.choice-card` and `.problem-chip`, or use visually-hidden input styling that preserves focus affordance on the visible container.

**Suggested command**: `/impeccable audit request-demo`

**[P2] The page diverges from the documented teal/gold identity**

**Why it matters**: The user requested `#1A3B66`, `#3B5998`, and `#FF6B6B`, but the project design system documents teal/gold as the Trackora identity. The page looks close to pricing, but less connected to the broader shipment-ledger brand language.

**Fix**: Keep the requested blue/red where needed, but reintroduce a small gold action/status role or a teal operational ledger motif so it feels connected to the rest of the site.

**Suggested command**: `/impeccable colorize request-demo`

**[P2] Success state confirms the request but does not become the user's clear endpoint**

**Why it matters**: After submit, the full form remains in place and success appears inside it. Users may wonder whether they should keep editing, send another request, or wait.

**Fix**: Move focus to the success panel, add a concise "what happens next" recap immediately in the success state, and visually mute or collapse the editable fields after success.

**Suggested command**: `/impeccable harden request-demo`

**[P2] The hero still feels like a generic SaaS demo composition**

**Why it matters**: The operations panel is useful, but it is three generic workflow rows. Trackora's creative north star is a shipment ledger; the hero should show a more ownable object.

**Fix**: Replace the generic operations panel with a ledger-like dispatch sheet: shipment IDs, courier assignment, COD status, and risk note in one compact operational record.

**Suggested command**: `/impeccable bolder request-demo`

# Persona Red Flags

**Jordan, first-time logistics buyer**: The page explains value well, but the problem chips create a moment of hesitation. Seven options plus plan selection may feel like a mini survey before the payoff.

**Sam, keyboard/screen-reader user**: Labels and errors are mostly solid, but the custom plan/problem controls need visible keyboard focus on the card/chip, not just the hidden input.

**Casey, distracted mobile user**: The form is long, and progress is not preserved. If interrupted after typing contact details, Casey loses work on refresh or navigation.

**Operations manager persona**: The page speaks the right language, but the hero panel does not yet prove the product handles messy real records: failed attempt, pending COD, repeated phone, courier reassignment.

# Minor Observations

- `focusForm()` uses smooth scrolling even though global reduced motion disables CSS scroll behavior, not this JS call.
- The Arabic final CTA label "ركز نموذج العرض" is functional but slightly mechanical; "انتقل لنموذج العرض" is clearer.
- The form copy says no backend is called, which is accurate for internal/testing but may reduce trust if shown to real prospects.
- English copy uses COD without expansion; acceptable for logistics users, but first-time merchants may benefit from "cash on delivery (COD)" once.

# Questions to Consider

- Should this page optimize for completion speed or lead qualification depth?
- What would make the first fold unmistakably Trackora rather than a polished demo-request template?
- Should the placeholder no-backend notice remain visible to prospects, or only appear in development builds?
