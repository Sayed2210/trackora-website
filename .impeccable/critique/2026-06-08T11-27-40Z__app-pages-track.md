---
target: track and track/[trackingNumber]
total_score: 33
p0_count: 0
p1_count: 1
timestamp: 2026-06-08T11-27-40Z
slug: app-pages-track
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Loading is explicit and `aria-live` is present, but final status changes rely on focus movement rather than a named live update. |
| 2 | Match System / Real World | 4 | Shipment language, privacy framing, masked phone, last known step, and next step match delivery operations well. |
| 3 | User Control and Freedom | 3 | Users can edit the tracking number or return to tracking, but the edit affordance competes with the result hero before users see the shipment record. |
| 4 | Consistency and Standards | 3 | Components, RTL/LTR behavior, tokens, and states are consistent; minor duplication remains across empty and error recovery guidance. |
| 5 | Error Prevention | 3 | Empty and malformed input are caught before navigation, but valid-looking impossible numbers still move users into a result route. |
| 6 | Recognition Rather Than Recall | 4 | Example format, visible labels, hints, status labels, and recovery checks remove memory burden. |
| 7 | Flexibility and Efficiency | 3 | Lookup and re-lookup are quick and keyboard-friendly, but there is no paste normalization feedback beyond minimum length. |
| 8 | Aesthetic and Minimalist Design | 3 | The surfaces are cleaner after polish; the lookup page still carries a few simultaneous decorative devices in the ledger hero. |
| 9 | Error Recovery | 4 | Not-found and service-error states now explain what happened and offer concrete recovery steps while preserving the tracking number context. |
| 10 | Help and Documentation | 3 | Contextual help is now present in hints, privacy notes, and recovery checklists; escalation is mentioned but not yet linked. |
| **Total** | | **33/40** | **Good** |

#### Anti-Patterns Verdict

**LLM assessment**: This no longer reads as generic AI SaaS. The public tracking flow has a concrete logistics object, the shipment ledger, and the result page is shaped around operational evidence rather than decorative dashboard metrics. The previous high-risk blank-content reveal issue is fixed by visible-default CSS and JS-gated reveal activation. The remaining template tell is smaller: the lookup hero still stacks a pill kicker, radial background, route line, receipt card, 3D icon, and lifted form card in one fold. It is on brand, but slightly over-explained visually.

**Deterministic scan**: `detect.mjs --json` returned `[]` for `app/pages/track/index.vue`, `app/pages/track/[trackingNumber].vue`, `TrackingSummary.vue`, `TrackingTimeline.vue`, `TrackingEmptyState.vue`, and `TrackingErrorState.vue`. No detector findings for gradient text, side-stripe cards, repetitive slop scaffolds, or obvious contrast patterns.

**Visual overlays**: No reliable user-visible overlay is available in this environment because browser automation and script injection are not exposed. Evidence is source review plus the deterministic CLI detector.

#### Overall Impression

The tracking experience is now shippable. It feels like a public shipment record: privacy-aware, Arabic-first, operational, and recoverable. The biggest opportunity is to make the high-stakes failure and correction flow feel more direct on mobile, while tightening the few remaining contrast and hierarchy edges.

#### What's Working

- **The primary task is clear**: `/track` gives one form, one example, one submit action, and a privacy note. The visitor does not need to understand Trackora to track a shipment.
- **Recovery is now credible**: `/track/[trackingNumber]` lets users edit the number in place and the empty/error states explain what to check next. This fixes the prior dead-end feeling.
- **The brand register fits logistics**: the ledger/receipt motif, masked phone, last known step, and timeline copy make the page feel tied to shipment operations rather than abstract SaaS analytics.

#### Priority Issues

**[P1] Error text color misses WCAG AA**

**Why it matters**: `AppInput.vue` uses `var(--color-danger)` (`#EF4444`) for `.app-input__error` on white. The measured contrast is 3.76:1, below the 4.5:1 requirement for 14px error text. Users with low vision can miss the exact reason the tracking number failed.

**Fix**: Add a darker error text token, for example `--color-danger-text`, and use it for inline error copy while keeping `#EF4444` for borders or icons. The text color should test at 4.5:1 or higher on white and `--color-bg-alt`.

**Suggested command**: `/impeccable audit app/components/base/AppInput.vue`

**[P2] Result correction competes with the shipment record**

**Why it matters**: On successful result pages, the retry/edit form appears before the summary and timeline. That is useful after errors, but on the happy path it asks the user to think about correcting input before they have read the shipment status. On mobile this can push the actual answer lower than necessary.

**Fix**: Keep the tracking number visible in the hero, but collapse the correction form behind a clear secondary action such as “Correct tracking number” on successful results. Keep the full inline form expanded by default for not-found and error states.

**Suggested command**: `/impeccable layout app/pages/track/[trackingNumber].vue`

**[P2] Recovery guidance mentions support but gives no direct path**

**Why it matters**: Empty and error states tell users to contact the merchant or support if the problem continues, but there is no support/contact link in the recovery block. A frustrated customer still has to search the site or go back to the merchant message.

**Fix**: Add a low-pressure link in the guidance area, for example “Contact support” or “Contact the merchant support team” if Trackora support is not the right owner. Keep it secondary to retry/edit, but make escalation concrete.

**Suggested command**: `/impeccable clarify app/components/tracking/TrackingEmptyState.vue app/components/tracking/TrackingErrorState.vue`

**[P3] Lookup hero is still visually dense**

**Why it matters**: The ledger object is distinctive, but the fold combines multiple decorative layers: two radial washes, a dashed inset, route line, receipt card, icon card, privacy icon, and two kicker styles. It does not block comprehension, but it slightly reduces the calm “shipment record” authority the brand is aiming for.

**Fix**: Keep the ledger receipt as the signature object and remove one secondary decoration layer, likely the dashed inset or extra icon treatment in the form card. Let the concrete tracking example do more of the brand work.

**Suggested command**: `/impeccable quieter app/pages/track/index.vue`

#### Persona Red Flags

**Jordan (First-Timer)**: The first action is clear and the example format helps. Red flag: on the result page, the edit form appears immediately even when the shipment is found, so Jordan may think the number needs correction before reading the status.

**Sam (Accessibility-Dependent User)**: Labels, hints, `aria-describedby`, `aria-invalid`, and loading `aria-live` are good. Red flag: inline error text contrast fails AA in `AppInput.vue`; final result announcements depend on focus moving to a silent `tabindex=-1` region rather than a clearly named live result update.

**Casey (Distracted Mobile User)**: The lookup form becomes single-column and buttons become full-width in the result retry area. Red flag: the always-expanded correction form on successful results costs vertical space before the actual shipment summary, which is the answer Casey came for.

**Logistics Support Operator**: The UI gives enough detail to identify a shipment without exposing full customer data. Red flag: when a customer cannot find a shipment, the page advises support contact but does not provide a direct escalation link or reference handoff.

#### Minor Observations

- `TrackingEmptyState.vue` and `TrackingErrorState.vue` duplicate the same recovery checklist; if it grows, extract a small shared recovery component.
- `useScrollReveal.ts` now fixes the visibility risk, but it does not disconnect the observer on unmount. Low practical risk on these pages, worth cleaning if reveal is used widely.
- The English homepage copy still contains em dashes in locale strings outside the tracking surface; not part of this target, but it conflicts with the current copy rules.
- The `track-result__status-region:focus { outline: none; }` avoids an awkward focus ring, but if focus is part of the screen-reader announcement strategy, a visually hidden label or `aria-live` region would make the intent more robust.

#### Questions to Consider

- Should successful tracking prioritize “show me the answer” and move correction into a secondary disclosure?
- Is Trackora the support owner for public tracking failures, or should escalation always point back to the merchant/shipping company?
- How much decorative atmosphere should the tracking page keep now that the ledger object already carries the brand idea?
