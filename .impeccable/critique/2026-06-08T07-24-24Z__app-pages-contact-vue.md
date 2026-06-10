---
target: Contact Page
total_score: 22
p0_count: 0
p1_count: 3
timestamp: 2026-06-08T07-24-24Z
slug: app-pages-contact-vue
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Status feedback exists, but the user-facing “no backend” and placeholder language exposes implementation incompleteness instead of confidence. |
| 2 | Match System / Real World | 2 | Logistics language is present, but a fake/local submit path does not match the urgency of sales, support, or COD operations. |
| 3 | User Control and Freedom | 3 | Users can reset and send another message, but option cards set inquiry type then focus the first input, so the selected route is not obvious. |
| 4 | Consistency and Standards | 1 | The page uses a blue/coral local palette instead of Trackora’s teal/gold system, so it feels disconnected from the rest of the brand. |
| 5 | Error Prevention | 2 | Required Egypt-only phone validation conflicts with the stated target market of Egypt and the Arab region. |
| 6 | Recognition Rather Than Recall | 3 | Labels and hints are mostly clear, but contact option cards and select options do not match exactly. |
| 7 | Flexibility and Efficiency | 2 | Demo, message, cards, and final CTA compete without clarifying the fastest path for sales vs urgent support. |
| 8 | Aesthetic and Minimalist Design | 2 | The page is polished, but heavy gradients, staggered cards, and repeated CTA/reassurance sections create a template-like contact surface. |
| 9 | Error Recovery | 3 | Inline errors are understandable and focus moves to the first invalid field, but the global error is generic. |
| 10 | Help and Documentation | 2 | FAQ exists, but actual contact details are explicitly temporary and there is no credible urgent channel. |
| **Total** | | **22/40** | **Acceptable, significant improvements needed before users are happy** |

## Anti-Patterns Verdict

**LLM assessment**: Moderate AI slop. The page has real structure, accessible form basics, and operational copy, but it reads like a polished placeholder rather than a trustworthy Trackora contact surface. The clearest tells are the off-brand blue/coral palette, repeated “placeholder/no backend” admissions, temporary contact details, and a generic contact-options board that could fit many SaaS products with the nouns swapped.

**Deterministic scan**: `detect.mjs --json app/pages/contact.vue` returned `[]`. No automated detector findings were reported. The detector did not catch the larger product-trust and brand-token issues, which are judgment issues rather than pattern matches.

**Visual overlays**: Browser automation and overlay injection are not available in this tool environment, so no reliable user-visible overlay was created.

## Overall Impression

The Contact page is structurally complete and materially better than a bare contact form, but the trust story is undermined by implementation caveats and palette drift. The single biggest opportunity is to make the page feel like an official operational Trackora channel, not a demo-only surface.

## What’s Working

- The page uses specific operational language: shipments, couriers, dispatch, COD, settlement, and pricing. That fits Trackora’s audience better than generic “talk to our team” copy.
- The form has a solid accessibility foundation: visible labels, `aria-invalid`, associated error text, inline help, loading state, success state, and focus movement to invalid fields.
- The hero routing-ledger idea is appropriate for the “Shipment Ledger” north star because it turns contact routing into an operational flow instead of a generic envelope illustration.

## Priority Issues

**[P1] User-facing placeholder language destroys trust**

**Why it matters**: A shipping operator deciding whether to discuss COD, support, or pricing should not see “no backend,” “safe placeholder,” or “temporary details.” That language tells them the channel may not reach anyone.

**Fix**: Replace implementation caveats with user-safe operational copy. If backend is not connected, keep the placeholder behavior internal, but the UI should say what happens next: “سنراجع رسالتك ونوجهها للفريق المناسب.” Remove visible “لا يوجد اتصال بخادم حاليا,” “إرسال تجريبي,” and temporary-channel caveats.

**Suggested command**: `/impeccable clarify app/pages/contact.vue`

**[P1] Visual identity is inconsistent with Trackora’s established teal/gold system**

**Why it matters**: The page currently uses `#1A3B66`, `#3B5998`, and `#FF6B6B`, while the design system defines operational teal, route teal, deep command teal, and gold action. Users experience this as a different product surface.

**Fix**: Move contact-specific colors onto existing tokens: `--color-primary`, `--color-primary-light`, `--color-primary-dark`, `--color-accent`, `--color-bg-alt`, `--color-text`. If a warmer warning/action accent is needed, use gold action, not coral.

**Suggested command**: `/impeccable colorize app/pages/contact.vue`

**[P1] Phone validation conflicts with regional positioning**

**Why it matters**: The page says Trackora targets Egypt and the Arab region, but requires an Egyptian mobile number. Non-Egypt operators could be blocked from contacting sales or partnerships.

**Fix**: Either make the market copy Egypt-only for this phase, or accept broader E.164-style regional phone formats while keeping Egyptian examples in hint text.

**Suggested command**: `/impeccable harden app/pages/contact.vue`

**[P2] Inquiry routing taxonomy is inconsistent**

**Why it matters**: Option cards include `careers`, while the select includes `custom-pricing` and `other`. Clicking “الوظائف / التعاون” silently selects a value the dropdown cannot display. That creates a hidden state and weakens recognition.

**Fix**: Use one source of truth for inquiry types. Cards and select should share the same values and labels, or cards should route to exact select options.

**Suggested command**: `/impeccable harden app/pages/contact.vue`

**[P2] Primary path is visually diluted**

**Why it matters**: The page asks users to book a demo, write a message, choose an option card, read details, submit a form, read reassurance, open FAQ, then book a demo again. This is not unusable, but it asks too many decisions from someone who just wants the right Trackora contact path.

**Fix**: Make “اكتب لنا رسالة” the primary action on the Contact page, keep demo as secondary, and let the option cards act as direct form presets. Consider moving final demo CTA lower-emphasis or making it conditional copy rather than another high-emphasis conversion block.

**Suggested command**: `/impeccable layout app/pages/contact.vue`

## Persona Red Flags

**Jordan, first-time buyer**: Jordan will understand the labels, but will doubt the page when it says the form is a placeholder and details are temporary. The trust break happens before the form is even submitted.

**Sam, accessibility-dependent user**: Sam can likely complete the form with keyboard and screen reader, but color/state meaning relies heavily on visual styling. The selected inquiry from option cards is not announced as a clear state change, and the focus lands at the first field rather than the changed select.

**Casey, distracted mobile user**: Casey sees too many routes and long explanatory sections before reaching completion. The form is usable on mobile, but no state persistence means an interruption can lose a partially typed message.

**Mona, logistics operations manager**: Mona is checking whether Trackora can support live dispatch and COD workflows. Temporary contact details, no urgent support channel, and placeholder submit language make the company feel less operationally ready than the product claims.

## Minor Observations

- Arabic copy includes the English word “later,” which breaks Arabic-first polish.
- Focus color uses coral instead of the gold action/focus token.
- Reduced motion sets the spinner to `1ms` animation instead of disabling it cleanly.
- Hero heading max-width of `12ch` may create awkward Arabic line breaks on some widths.
- The local `--contact-surface: #f5f5f5` differs from the existing alternate canvas token.

## Questions to Consider

- Why would a serious logistics operator trust a contact page that announces it cannot contact the backend?
- Is this a Trackora page, or a blue/coral SaaS template with logistics words inserted?
- If COD reconciliation is urgent, where is the credible human channel?
- Are we designing for Arabic logistics operations, or validating only Egyptian mobile numbers by accident?
