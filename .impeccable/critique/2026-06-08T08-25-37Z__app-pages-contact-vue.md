---
target: Contact Page
total_score: 27
p0_count: 1
p1_count: 2
timestamp: 2026-06-08T08-25-37Z
slug: app-pages-contact-vue
---
# Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | The form shows loading and success, but the success state is not tied to real delivery. |
| 2 | Match System / Real World | 4 | Copy uses shipment, COD, dispatch, couriers, and routing language that fits logistics operators. |
| 3 | User Control and Freedom | 3 | Users can reset after success and choose another route, but there is no cancel or alternate low-friction escape inside the form. |
| 4 | Consistency and Standards | 3 | Strong token use and bilingual parity, but the option board repeats the same select choices in a separate card grid. |
| 5 | Error Prevention | 3 | Inline validation, autocomplete, and phone format help are solid, but privacy and delivery expectations are under-specified. |
| 6 | Recognition Rather Than Recall | 3 | Labels and help text are visible, but users must reconcile route cards with the later inquiry select. |
| 7 | Flexibility and Efficiency | 2 | The page gives contact and demo paths, but the primary message path is long and duplicates the inquiry choice. |
| 8 | Aesthetic and Minimalist Design | 3 | The hero and routing ledger feel on-brand, while the six-card option board drifts toward generic SaaS card repetition. |
| 9 | Error Recovery | 2 | Field errors are specific, but the submit failure path is generic and the apparent success can mask non-delivery. |
| 10 | Help and Documentation | 2 | FAQ and field help exist, but response timing, privacy, and urgent support expectations are not concrete enough. |
| **Total** | | **27/40** | **Acceptable, with one production blocker and several conversion-quality issues** |

# Anti-Patterns Verdict

**LLM assessment**: The contact page does not immediately read as generic AI output. The routing ledger, Arabic-first copy, and logistics-specific language give it a credible Trackora voice. The weak point is the six-item option board: same-sized cards, marker, heading, paragraph, CTA, repeated across a grid. That is the clearest AI/SaaS template tell on the page.

**Deterministic scan**: `detect.mjs --json app/pages/contact.vue` returned `[]`. No automated slop, contrast, or pattern findings were reported for the source file.

**Visual overlays**: Browser visualization was not available in this environment because no browser automation tool is exposed. No reliable user-visible overlay is available.

# Overall Impression

This is a strong contact surface at the copy and brand-system level, but it is not production-safe as a contact page because the form currently simulates sending and then displays success. The biggest opportunity is to reduce the route-selection ceremony and make the primary action trustworthy: submit a real message, confirm exactly what happened, and give operators a clear response expectation.

# What's Working

- The hero earns the brand. `contact-hero` and `routing-ledger` make contact feel like operational routing, not a generic support page.
- The form is more accessible than typical marketing forms. Labels, `aria-invalid`, `aria-describedby`, visible focus, autocomplete, and first-invalid focus are all present.
- Arabic and English copy are meaningfully parallel. The Arabic default is not treated as a translation afterthought, and the domain language is specific.

# Priority Issues

**[P0] The form reports success without sending a real message**

**Why it matters**: The primary user task is contacting Trackora. `handleSubmit` builds a payload, logs it only in dev, waits `850ms`, then sets `success` to true. A logistics operator can believe they contacted sales or support when nothing reached the team.

**Fix**: Wire the form to a real API endpoint, server action, CRM webhook, or email service. If backend delivery is not ready, replace the success state with a transparent fallback that opens `mailto:` with the message details or clearly says online submission is unavailable.

**Suggested command**: `/impeccable harden Contact Page`

**[P1] The six-card route board creates avoidable decision load and duplicates the select field**

**Why it matters**: A user sees six route cards, chooses one, then lands in a form with the same inquiry type again. That is two representations of the same decision, plus six visible options before the task starts. It slows down the fastest path: send a message.

**Fix**: Collapse the board into a compact segmented selector attached to the form, or keep only 3 grouped routes: Sales and pricing, Support, Partnerships and integrations. If the six categories stay, make them a single form control, not a separate marketing section.

**Suggested command**: `/impeccable distill Contact Page`

**[P1] Mobile users reach the real form too late**

**Why it matters**: On small screens, users pass hero copy, two CTAs, routing ledger, six option cards, and contact details before the actual message form in the form section. For a distracted operator on a phone, that is a long path to the main task.

**Fix**: On mobile, move the contact form before `contact-details`, reduce the option board, and keep direct email or demo links as secondary support below the form. The primary CTA should land users at the first required field with the selected route already visible.

**Suggested command**: `/impeccable adapt Contact Page`

**[P2] Trust details are too vague for a high-intent contact form**

**Why it matters**: The page asks for phone, company, and operational details, but it does not say how quickly Trackora responds, how the data is used, or what happens for urgent support. Contact forms lose trust when users do not know where their data goes or when they will hear back.

**Fix**: Add one concise trust row near submit: expected response window, who receives the message, and privacy handling. Include a direct urgent-support alternative if support is an intended route.

**Suggested command**: `/impeccable clarify Contact Page`

**[P2] The visual system has one template-like patch**

**Why it matters**: The option cards are individually polished, but as a repeated grid they flatten the page into the generic SaaS pattern the Trackora design system explicitly rejects.

**Fix**: Replace identical cards with a more operational artifact: a routing table, dispatch lane selector, or message triage strip that looks like part of a shipment ledger.

**Suggested command**: `/impeccable bolder Contact Page`

# Persona Red Flags

**Jordan, first-time logistics operator**: Jordan can understand the language quickly, but the route cards plus inquiry select ask them to classify the request twice. If they are unsure whether custom pricing belongs under sales or pricing, the page gives no recommendation.

**Casey, distracted mobile user**: Casey has to scroll through several sections before the real form. The mobile layout makes every option card button full width, which is touch-friendly, but it also turns route selection into a long vertical task before message entry.

**Sam, keyboard and screen-reader user**: Sam gets good labels and focus states, but the fake success state is dangerous because assistive tech will announce that the message was received even though no delivery occurred. That is an accessibility and trust failure, not just a backend gap.

**Nadia, dispatch manager**: Nadia wants to get pricing or support into the right hands quickly between operational interruptions. The page speaks her language, but it makes her choose between contact, demo, six route types, and a repeated select before she gets confirmation of a real business outcome.

# Minor Observations

- `contact-note` is a single badge and acceptable, but avoid adding similar badges to every future section.
- The success checklist has four items after submit; it may be more reassuring as two concrete next steps with response timing.
- The submit note repeats the success message. Use the pre-submit space for privacy, response window, or urgent route details instead.
- The English marker labels like `Gen` and `API` feel compressed compared with the Arabic labels. They read more like dashboard shorthand than contact guidance.
- `resetForm` clears the form but does not refocus the first field, so keyboard users may lose their place after sending another message.

# Questions to Consider

- What should be the single fastest path: send a message, book a demo, or choose a department?
- If a shipping-company operator has only 60 seconds, which fields are truly required?
- Should support and sales share one form, or should urgent support bypass this marketing page entirely?
- What proof can the success state give that a real team received the request?
