---
target: layout app/pages/track/[trackingNumber].vue
total_score: 32
p0_count: 0
p1_count: 1
timestamp: 2026-06-08T11-32-29Z
slug: layout-app-pages-track-trackingnumber-vue
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Loading has a clear centered state, but the successful result does not get a distinct announcement or visual arrival moment beyond content appearing below the hero. |
| 2 | Match System / Real World | 4 | The layout speaks in shipment-record terms: tracking number, last known step, next step, update time, summary, and timeline. |
| 3 | User Control and Freedom | 3 | Correction and back actions are always available, but they are too prominent on successful results and compete with the answer. |
| 4 | Consistency and Standards | 3 | Grid, cards, spacing tokens, RTL/LTR behavior, and component usage are coherent; the retry form uses a different hierarchy than the result content. |
| 5 | Error Prevention | 3 | Correction is easy and validation is present, but the page does not visually distinguish “correct this failed lookup” from “edit a successful lookup.” |
| 6 | Recognition Rather Than Recall | 4 | Users see the tracking number, current status, next step, update time, and full timeline without needing to remember prior input. |
| 7 | Flexibility and Efficiency | 3 | Re-search is fast, but the always-expanded form adds friction for the most common successful lookup path, especially on mobile. |
| 8 | Aesthetic and Minimalist Design | 3 | The result record is strong, but the hero correction card creates a second primary card before the real content. |
| 9 | Error Recovery | 3 | Recovery is structurally possible from every state, but layout does not reserve the expanded correction form for error/not-found contexts where it is most needed. |
| 10 | Help and Documentation | 3 | Hints and labels are useful, but contextual guidance is spread across hero form, states, and cards rather than sequenced by user need. |
| **Total** | | **32/40** | **Good** |

#### Anti-Patterns Verdict

**LLM assessment**: The page does not look AI-generated in the usual SaaS-template sense. It avoids gradient text, hero metrics, side-stripes, and interchangeable icon cards. The strongest brand move is the shipment-record composition: summary plus next-step panel plus timeline. The main layout weakness is not slop; it is priority inversion. The correction form is visually treated as a primary object even after a successful lookup, so the page briefly behaves like an edit screen before it behaves like a tracking result.

**Deterministic scan**: `detect.mjs --json "app/pages/track/[trackingNumber].vue"` returned `[]`. No automated anti-pattern findings.

**Visual overlays**: Browser automation and script injection are not exposed in this environment, so no reliable user-visible overlay is available. Assessment is source-level plus deterministic detector evidence.

#### Overall Impression

The result-page layout is close to production quality. The content model is right: hero context, status record, next operational step, then timeline. The fix is to sequence the user’s attention better: first answer “where is my shipment?”, then offer correction as a secondary escape hatch unless the lookup failed.

#### What's Working

- **The result record has the right hierarchy once visible**: `TrackingSummary` and `track-result__next` form a useful two-column top record, then the timeline expands the detail below.
- **Responsive collapse is simple and reliable**: the two-column record collapses to one column at `56rem`, and the retry form becomes single-column at `36rem`.
- **The next-step aside is valuable**: it gives users a concise operational answer before they read the whole timeline.

#### Priority Issues

**[P1] Successful result hierarchy starts with correction instead of status**

**Why it matters**: In lines 10-28, the full retry form is always inside the hero, before the status region. When `data` exists, users still see “Correct tracking number” and “Update tracking” before the shipment summary. On mobile, this pushes the actual shipment answer farther down and makes the page feel like it doubts the lookup.

**Fix**: Make correction state-aware. On successful `data`, show a compact secondary control near the tracking number, for example a ghost “Correct tracking number” button that expands the form. On `notFound` or `error`, keep the full correction form expanded because that is when recovery is the primary job.

**Suggested command**: `/impeccable layout app/pages/track/[trackingNumber].vue`

**[P2] The hero and result record are two separate centers of gravity**

**Why it matters**: The hero is centered with a max-width of `52rem`; the record below is a separate `64rem` content column. This creates a visual pause between “Shipment status record” and the actual record. The correction card increases that pause.

**Fix**: On successful results, tighten the hero to a compact header: kicker, title, tracking number, optional correction disclosure. Reduce bottom spacing from `var(--spacing-10)` to something closer to `var(--spacing-6)` when `data` exists. Let the summary/next-step grid become the dominant first fold.

**Suggested command**: `/impeccable layout app/pages/track/[trackingNumber].vue`

**[P2] Mobile action order is not optimized for the main task**

**Why it matters**: At `36rem`, the retry actions become full-width and stacked. That is good for touch targets, but on a successful result they still consume a large block before the current status. Distracted mobile users need the current shipment answer first.

**Fix**: Use state-aware mobile order. Successful result: status summary first, correction secondary below the tracking number or after the summary. Not-found/error: correction first, recovery guidance second.

**Suggested command**: `/impeccable adapt app/pages/track/[trackingNumber].vue`

**[P3] Next-step card has strong hierarchy but weak relationship to the timeline**

**Why it matters**: The dark next-step aside is visually strong, but the timeline below repeats some status context. The relationship is implicit: users infer that the aside summarizes the latest completed timeline item.

**Fix**: Add a small textual bridge in the aside or timeline header, such as “Taken from the latest recorded timeline update.” Keep it brief and localized.

**Suggested command**: `/impeccable clarify app/pages/track/[trackingNumber].vue`

#### Persona Red Flags

**Jordan (First-Timer)**: Jordan lands on a successful result and sees a correction form before the record. They may assume something is wrong with the number and hesitate before reading the status.

**Casey (Distracted Mobile User)**: Casey wants one quick answer. The mobile layout gives them full-width edit actions before the status summary, increasing scroll and attention cost.

**Sam (Accessibility-Dependent User)**: Sam can reach the form and content with keyboard/screen reader semantics, but the focus target at `.track-result__status-region` has no outline and no explicit label. If focus jumps after loading, it may not clearly announce what changed.

**Logistics Support Operator**: The record grid is useful for support context. The layout risk is that correction UI takes the same visual priority as the operational status, slowing quick lookup during a customer call.

#### Minor Observations

- `track-result__retry-form` has strong card styling. That is appropriate for failed lookup, but overweight for a successful lookup.
- `track-result__record` uses a good 1.1fr / 0.72fr split, keeping the summary dominant while making the next step feel like a command panel.
- The `max-width: 64rem` content column is comfortable, but if the correction form collapses, the first fold will feel more decisive without widening anything.
- `track-result__next dt` uses `rgba(255, 255, 255, 0.66)` on dark teal. This is likely acceptable for bold small labels, but should be verified visually if the text is considered body-sized information.

#### Questions to Consider

- Should correction be expanded only when lookup fails, and collapsed when the shipment is found?
- Is the “next step” panel intended to be the main answer, or should the summary status badge own that role?
- Should mobile prioritize the timeline immediately after the summary, or keep the dark next-step card before the timeline?
