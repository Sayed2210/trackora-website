---
target: track and track/[trackingNumber]
total_score: 29
p0_count: 0
p1_count: 2
timestamp: 2026-06-08T09-04-13Z
slug: app-pages-track
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Lookup and result loading states are visible, but reveal defaults can hide primary content if JS or observer setup fails. |
| 2 | Match System / Real World | 4 | Shipment, courier, privacy, COD-adjacent tracking language fits logistics operators and customers. |
| 3 | User Control and Freedom | 3 | Users can return to lookup, but the result page does not provide an inline re-track/edit path. |
| 4 | Consistency and Standards | 3 | Strong Trackora token usage, but repeated kicker/card/glass treatments start to flatten the tracking flow. |
| 5 | Error Prevention | 3 | Empty and format validation exist, but the field does not preserve or expose a sample retry path on the result page. |
| 6 | Recognition Rather Than Recall | 3 | The sample number and privacy note help, but wrong-number recovery requires navigation memory. |
| 7 | Flexibility and Efficiency | 2 | The flow is one-path only: lookup, result, back. Good enough for customers, slower for support/operators checking multiple shipments. |
| 8 | Aesthetic and Minimalist Design | 3 | The shipment-ledger direction is distinctive, but the surface count and repeated rounded panels create moderate visual noise. |
| 9 | Error Recovery | 2 | Not-found and error states are polite but under-instructed; they do not show an example format or support route. |
| 10 | Help and Documentation | 3 | Inline hints and privacy explanations are useful, but recovery help is thin in edge states. |
| **Total** | | **29/40** | **Good** |

#### Anti-Patterns Verdict

**LLM assessment**: This does not read as obvious AI slop. The shipment-ledger metaphor, mocked receipt, masked phone number, and route-specific statuses are concrete and aligned with Trackora. The risk is not generic SaaS hero metrics or gradient text; the risk is repetition. Both routes rely on pill kickers, glass-like cards, large rounded panels, icons, and teal/gold glows, so the experience can start to feel like a component showcase instead of a crisp customer tracking tool.

**Deterministic scan**: `detect.mjs --json app/pages/track app/components/tracking` returned `[]`. No detector findings for gradient text, side-stripe accents, repeated obvious slop patterns, or related deterministic rules in the scanned targets.

**Visual overlays**: No reliable browser overlay is available in this harness. There is no browser automation tool exposed, so the live injection flow could not be performed. The fallback evidence is source review plus the clean CLI detector result.

#### Overall Impression

The direction is strong: it feels operational, Arabic-first, and much more specific than a generic tracking form. The biggest opportunity is hardening trust at the edges: when content fails to reveal, when a customer mistypes a number, or when the shipment is not found.

#### What's Working

- The lookup page has a memorable logistics object: the receipt-style ledger with masked phone and route status makes tracking feel like a real shipment record, not a decorative SaaS card.
- The result page hierarchy is understandable: summary, latest step, timeline, and back action are arranged in a natural order for checking shipment state.
- Arabic and English parity is mostly respected through locale-driven labels, `dir="ltr"` on tracking numbers and phone values, and localized date formatting.

#### Priority Issues

**[P1] Reveal classes can ship hidden primary content**

**Why it matters**: `.reveal-up`, `.reveal-scale`, and `.reveal-stagger` start at `opacity: 0`. If JavaScript fails, IntersectionObserver is unavailable, hydration is delayed, or the reveal composable misses nodes added after mount, key content can remain invisible. On `/track`, this includes the story and form card. On `/track/[trackingNumber]`, this includes the hero, record, loading card, and timeline steps.

**Fix**: Make reveal content visible by default and use a progressive-enhancement class on `html` or `body` to opt into hidden pre-reveal states only after the reveal script is active. Alternatively, add a no-JS fallback class during mount before applying hidden styles.

**Suggested command**: `/impeccable harden track and track/[trackingNumber]`

**[P1] Placeholder contrast likely fails WCAG AA**

**Why it matters**: `AppInput.vue` sets placeholder text to `var(--color-text-secondary)` with `opacity: 0.6`. On white, that lands far lighter than the required 4.5:1 contrast for placeholder text. The tracking number placeholder is one of the first instructions a customer sees.

**Fix**: Remove the opacity reduction and use an explicit accessible placeholder token, likely `#666666` or a darker teal-tinted support color. Keep hint text distinct through spacing or style, not low contrast.

**Suggested command**: `/impeccable audit track and track/[trackingNumber]`

**[P2] Result recovery is slower than it needs to be**

**Why it matters**: A customer or support agent who checks the wrong shipment has to go back to `/track`, re-orient, and type again. That is acceptable for one lookup, but it is friction for repeated checks and for mobile users correcting a typo.

**Fix**: Add a compact re-track form or editable tracking-number strip on the result page, placed near the displayed tracking number or under the not-found state. Keep the current back button as a secondary escape.

**Suggested command**: `/impeccable polish track and track/[trackingNumber]`

**[P2] Not-found and error states need more operational recovery guidance**

**Why it matters**: `TrackingEmptyState` and `TrackingErrorState` are visually polished but generic. A real customer needs to know whether to check the format, contact the seller, wait for shipment activation, or retry later.

**Fix**: Add one concise recovery checklist: verify the number, try the sample format, check with the merchant if the order is new. For error state, distinguish network retry from not-found guidance if the service can expose it later.

**Suggested command**: `/impeccable clarify track and track/[trackingNumber]`

**[P3] The visual system repeats the same badge-card-glow grammar too often**

**Why it matters**: The design avoids banned patterns, but the repeated pill kicker, icon-leading header, glass card, and rounded panel stack reduces distinctiveness across lookup, summary, timeline, empty, and error surfaces.

**Fix**: Keep the ledger as the expressive hero object, then simplify downstream surfaces: fewer icons, fewer glass panels, more plain record/table affordances where the user is reading status.

**Suggested command**: `/impeccable quieter track and track/[trackingNumber]`

#### Persona Red Flags

**Jordan (First-Timer)**: The lookup action is clear, but if the shipment is not found, Jordan only gets a back button. They are not told whether the number format is wrong, whether new shipments take time to activate, or whether to contact the merchant.

**Sam (Accessibility-Dependent User)**: The input label and error wiring are solid, but the placeholder opacity likely fails contrast. The reveal-hidden default also creates a risk that assistive users encounter missing content if enhancement fails.

**Casey (Distracted Mobile User)**: The mobile form stacks correctly, but result correction requires going back to the lookup page. A one-handed user who mistyped a tracking number has to navigate rather than edit in place.

**Dispatch Support Agent: "Mona"**: A support operator checking multiple customer calls can read the result quickly, but the one-path lookup flow slows repeated searches. Mona needs a faster re-track path from the result screen.

#### Minor Observations

- The duplicated `localizeDescription` logic in `[trackingNumber].vue` and `TrackingTimeline.vue` is a maintainability smell, though not a visual blocker.
- `TrackingTimeline.vue` repeats `.tracking-timeline__content { min-width: 0; }`, which is harmless but untidy.
- The latest-step panel uses several low-alpha white text values on a dark gradient. They are probably acceptable for large labels, but a contrast pass should verify `rgba(255,255,255,0.66)` and `0.78` against the teal gradient.
- The loading spinner has reduced-motion handling, but there is no alternate visual progress treatment beyond static icon/text when motion is reduced.

#### Questions to Consider

- Should public tracking optimize for one customer lookup, or also for support staff checking many shipments in a row?
- What should a customer do when a number is valid-looking but not found: wait, contact the merchant, or call the delivery company?
- Could the result page feel more like a shipment record and less like another marketing panel once the user has already entered the tracking flow?
