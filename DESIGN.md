---
name: Trackora Website
description: Arabic-first marketing system for last-mile delivery operations.
colors:
  operational-teal: "#1B4D5C"
  route-teal: "#2D6E7D"
  deep-command-teal: "#0F3340"
  gold-action: "#E8A838"
  gold-hover: "#D99A24"
  gold-wash: "#FFF7E3"
  gold-contrast: "#4C3508"
  canvas: "#FFFFFF"
  alternate-canvas: "#F7F9FA"
  ink: "#333333"
  secondary-ink: "#666666"
  border: "#E0E0E0"
  success: "#22C55E"
  warning: "#F59E0B"
  danger: "#EF4444"
  info: "#3B82F6"
typography:
  display:
    fontFamily: "IBM Plex Sans Arabic, Noto Sans Arabic, Segoe UI, Tahoma, sans-serif"
    fontSize: "clamp(3.5rem, 9vw, 6.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "IBM Plex Sans Arabic, Noto Sans Arabic, Segoe UI, Tahoma, sans-serif"
    fontSize: "clamp(3rem, 7vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 1.2
  title:
    fontFamily: "IBM Plex Sans Arabic, Noto Sans Arabic, Segoe UI, Tahoma, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.2
  body:
    fontFamily: "IBM Plex Sans Arabic, Noto Sans Arabic, Segoe UI, Tahoma, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "IBM Plex Sans Arabic, Noto Sans Arabic, Segoe UI, Tahoma, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.02em"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
  2xl: "1.5rem"
  3xl: "2rem"
  full: "9999px"
spacing:
  1: "0.25rem"
  2: "0.5rem"
  3: "0.75rem"
  4: "1rem"
  6: "1.5rem"
  8: "2rem"
  10: "2.5rem"
  12: "3rem"
  16: "4rem"
  20: "5rem"
  24: "6rem"
  32: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.operational-teal}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.full}"
    padding: "0.85rem 2rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.operational-teal}"
    rounded: "{rounded.full}"
    padding: "0.85rem 2rem"
  badge-accent:
    backgroundColor: "{colors.gold-wash}"
    textColor: "{colors.gold-contrast}"
    rounded: "{rounded.full}"
    padding: "0.25rem 1rem"
  card-default:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.2xl}"
    padding: "2rem 1.75rem"
  input-field:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "0.85rem 1rem"
---

# Design System: Trackora Website

## 1. Overview

**Creative North Star: "Shipment Ledger"**

Trackora's visual system should feel like a reliable logistics record brought to life: every shipment, courier, risk signal, and COD movement has a visible place. The design uses deep teal as the trust anchor, warm gold as the action signal, rounded tactile controls, and dashboard-like surfaces that make delivery operations feel organized rather than abstract.

The site is Arabic-first. RTL layout, IBM Plex Sans Arabic, native Arabic copy rhythm, and localized operational examples are not secondary polish, they are part of the brand's credibility. English uses Inter as the equivalent LTR operating voice, but the system should still read as the same product.

This system rejects generic SaaS decoration. Gradients, glass, shadows, and dashboard previews are allowed only when they clarify control, status, or hierarchy. They are not a license for template-like hero metrics, repetitive icon-card grids, decorative gradient text, vague buzzwords, or low-contrast gray text.

**Key Characteristics:**
- Arabic-first operational clarity with bilingual parity.
- Teal-dominant surfaces with gold action emphasis.
- Tactile pill controls, rounded product surfaces, and clear focus states.
- Lifted cards and glow used to separate operational layers.
- Motion that supports status, reveal, and affordance without hiding content.

## 2. Colors

The palette is teal and gold: teal carries trust and operating-room structure, gold marks action, value, COD, and conversion.

### Primary
- **Operational Teal**: The primary brand color for CTAs, links, focused controls, and high-trust product surfaces.
- **Route Teal**: The secondary teal for gradients, hero atmosphere, route diagrams, badges, and supportive emphasis.
- **Deep Command Teal**: The dark surface color for navbar, hero sections, and high-contrast command-center moments.

### Secondary
- **Gold Action**: The action accent for highlights, focus rings, COD emphasis, badges, and moments that need user attention.
- **Gold Hover**: The darker interactive gold used when an accent action needs hover depth.
- **Gold Wash**: The light accent wash for subtle badge backgrounds and low-pressure emphasis.
- **Gold Contrast**: The accessible text color for gold-wash surfaces and gold-heavy UI states.

### Tertiary
- **Success Green**: Positive shipment, delivery, or completion states.
- **Warning Amber**: Caution states, validation warnings, or pending operational risks.
- **Danger Red**: Error, failed shipment, destructive, or validation failure states.
- **Info Blue**: Informational status and neutral tracking updates.

### Neutral
- **Canvas**: The main page and surface background.
- **Alternate Canvas**: Alternating sections, ghost button hover, and calm content bands.
- **Ink**: Primary body and heading text.
- **Secondary Ink**: Supporting text, hints, secondary labels, and metadata.
- **Border**: Dividers, input strokes, and low-emphasis card borders.

### Named Rules

**The Gold Is an Action Rule.** Gold is reserved for action, status, COD/value emphasis, and focus. Do not scatter it as decoration.

**The Teal Carries Trust Rule.** High-value claims, navigation, and product-control surfaces should lean on Operational Teal or Deep Command Teal before introducing new hues.

## 3. Typography

**Display Font:** IBM Plex Sans Arabic, with Noto Sans Arabic, Segoe UI, Tahoma, sans-serif fallback.
**Body Font:** IBM Plex Sans Arabic, with Noto Sans Arabic, Segoe UI, Tahoma, sans-serif fallback.
**English Font:** Inter, with system UI fallbacks, when `html[lang="en"]` is active.

**Character:** The typography is direct and operational, with heavy Arabic headings and readable body copy. It should feel like a clear shipment record, not an editorial magazine page.

### Hierarchy
- **Display** (800 to 900, `clamp(3.5rem, 9vw, 6.5rem)`, tight line-height): Hero headlines and rare dominant claims only. Keep the actual max at or below production-safe mobile behavior.
- **Headline** (800, `clamp(3rem, 7vw, 5.5rem)`, 1.2 line-height): Section-leading statements and major route titles.
- **Title** (800, `1.5rem`, 1.2 line-height): Cards, feature titles, pricing labels, and route section titles.
- **Body** (400, `1rem`, 1.7 line-height): Product explanation, form help, FAQ copy, and feature descriptions. Keep long prose near 65 to 75 characters per line.
- **Label** (700, `0.875rem`, slight tracking): Badges, pills, navigation details, and compact metadata.

### Named Rules

**The Arabic First Rule.** New components should inherit Arabic typography and RTL behavior by default, then adapt cleanly to English through the existing locale switches.

**The No Editorial Costume Rule.** Do not introduce serif display, mono metadata, drop caps, or magazine-like separators unless the product context explicitly changes.

## 4. Elevation

Trackora uses a hybrid of tonal layering, blur, and shadow. Cards are rounded and lifted; dark surfaces use glow and translucent layers to suggest live operational depth. Shadows should feel ambient and soft, never like dated heavy UI chrome.

### Shadow Vocabulary
- **Small Shadow** (`0 1px 2px rgba(27, 77, 92, 0.06)`): Minimal separation for quiet elements.
- **Medium Shadow** (`0 8px 24px rgba(27, 77, 92, 0.08)`): Hover, dropdown, and moderate card lift.
- **Large Shadow** (`0 20px 60px rgba(27, 77, 92, 0.14)`): Elevated feature cards and stronger content separation.
- **Glow Shadow** (`0 32px 90px rgba(45, 110, 125, 0.2)`): Hero dashboard and premium command-surface emphasis.
- **Card Shadow** (`0 4px 16px rgba(27, 77, 92, 0.06), 0 1px 3px rgba(27, 77, 92, 0.04)`): Default card depth.

### Named Rules

**The Lift Has a Job Rule.** Elevation must separate an interactive or operational layer. If the shadow does not clarify state, hierarchy, or focus, remove it.

## 5. Components

### Buttons
- **Shape:** Fully rounded pill controls (`9999px`) with strong weight and generous horizontal padding.
- **Primary:** Operational teal gradient with white text and soft teal shadow. Use for request-demo, primary conversion, and high-confidence actions.
- **Hover / Focus:** Hover lifts by `translateY(-2px)` and deepens the shadow. Focus uses a visible 3px gold outline with 2px offset.
- **Secondary / Glass:** Dark-section secondary buttons use translucent white with blur and a white border. Glass buttons use a light translucent surface, teal text, and card shadow.
- **Outline / Ghost:** Use outline and ghost variants for lower-pressure navigation or secondary actions on light surfaces.

### Chips
- **Style:** Badges are compact rounded pills with bold labels and subtle tints.
- **State:** Gold badges use Gold Wash with Gold Contrast text for readability. Status badges use semantic tint backgrounds. Eyebrow badges should be used sparingly to avoid repeated section scaffolding.

### Cards / Containers
- **Corner Style:** Generous rounded corners (`1.5rem` default, `2rem` for hero dashboards).
- **Background:** White surfaces for default cards, light teal tints for metric cards, translucent glass only when layered over dark or atmospheric surfaces.
- **Shadow Strategy:** Default cards use Card Shadow. Elevated cards use Large Shadow. Glow belongs to hero or command-like surfaces only.
- **Border:** Most cards use a soft neutral or teal-tinted border. Avoid colored side-stripe accents.
- **Internal Padding:** Default cards use large padding (`2rem 1.75rem`) to keep the marketing surface calm and readable.

### Inputs / Fields
- **Style:** White field, neutral border, `1rem` radius, body font, and `0.85rem 1rem` padding.
- **Focus:** No default outline; focus moves to a primary teal border and a 4px soft teal ring.
- **Error / Disabled:** Error uses Danger Red border and a soft red focus ring. Disabled fields use Alternate Canvas and lower opacity.

### Navigation
- **Style, typography, default/hover/active states, mobile treatment.** The navbar is sticky, deep teal, lightly blurred, and compact. Links use semi-transparent white text that becomes white on hover or focus. Dropdowns use glass surfaces, rounded corners, Large Shadow, and readable dark text. Mobile navigation should preserve the same hierarchy without clipping dropdowns or hiding keyboard focus.

### Hero Dashboard

The hero dashboard is Trackora's signature surface: a dark teal command panel paired with operational cards and shipment examples. It should always communicate real workflow context, not decorative analytics.

## 6. Do's and Don'ts

### Do:
- **Do** use teal as the trust anchor for major surfaces, CTAs, navigation, and product-control moments.
- **Do** keep Arabic-first typography and RTL layout native, not patched after English layouts are complete.
- **Do** use gold for focus, action, COD/value emphasis, and status emphasis, especially where the user can do something next.
- **Do** preserve visible keyboard focus and reduced-motion fallbacks on every interactive or animated element.
- **Do** show operational proof: shipments, couriers, COD, dispatch, tracking, validation, and risk states.

### Don't:
- **Don't** let Trackora look like a generic SaaS template: repetitive icon-card grids, decorative gradient text, interchangeable dashboard mockups, vague buzzwords, tiny repeated section eyebrows, or muted text that reads poorly on tinted backgrounds.
- **Don't** use gradient text as emphasis. Use a solid token color, weight, or hierarchy instead.
- **Don't** use glass, blur, or glow as decoration. Use them only when they clarify layered command surfaces.
- **Don't** add side-stripe borders greater than 1px on cards, callouts, or list items.
- **Don't** introduce new fonts, serif editorial styling, or monospace technical costume without a confirmed design-system change.
