# Aero Glass Design System

### 1. Overview & Creative North Star
**Creative North Star: The Elevated Aviator**

Aero Glass is a high-end editorial design system tailored for the intersection of precision aerospace and modern software ecosystems. It moves away from the "industrial" look of traditional aviation software in favor of "Soft Precision"—a style defined by atmospheric depth, high-contrast typography, and a "glass-first" philosophy. The system breaks traditional grid rigidity through the use of expansive whitespace (Spacing: 3), oversized headings, and overlapping translucent layers that mimic the view through a cockpit canopy.

### 2. Colors
The color palette is rooted in 'Fidelity' blue, transitioning from a deep nautical primary (`#316482`) to soft, airy neutrals.

- **The "No-Line" Rule:** Visual sectioning is achieved strictly through background shifts (e.g., moving from `surface` to `surface_container_low`) or through high-diffuse shadows. Solid 1px borders are prohibited for layout division.
- **Surface Hierarchy & Nesting:** Depth is created by nesting `surface_container_lowest` (pure white #ffffff) cards inside `surface` or `surface_container_low` sections.
- **The "Glass & Gradient" Rule:** Floating elements and navigation bars must use a 20px backdrop blur with 80% opacity (`rgba(255, 255, 255, 0.8)`).
- **Signature Textures:** Main CTAs and featured sections utilize the "Primary Gradient": a linear 135-degree transition from `#316482` to `#225876`.

### 3. Typography
Aero Glass utilizes a dual-font strategy to balance character with readability.
- **Display & Headlines (Manrope):** Set in weights 700 (Bold) to 800 (ExtraBold). Headlines use tight tracking (-0.025em) and aggressive leading (1.1) to create a "block" effect for punchy editorial copy.
- **Body & Labels (Inter):** High-legibility sans-serif for functional content.

**Typography Scale (Ground Truth):**
- **Hero Display:** 3.75rem (60px) - Extrabold
- **Section Headlines:** 3rem (48px) or 2.25rem (36px)
- **Sub-headings:** 1.25rem (20px) to 1.5rem (24px)
- **Body Text:** 1.125rem (18px) for editorial; 0.875rem (14px) for standard descriptions.
- **Micro-labels:** 11px (0.6875rem) - Uppercase with high tracking.

### 4. Elevation & Depth
Elevation is handled through "Ambient Atmosphere" rather than structural shadows.

- **The Layering Principle:** Use `surface_container_low` for large section backgrounds to make `surface_container_lowest` cards pop forward naturally.
- **Shadow Ground Truth:**
  - **Level 1 (Navigation):** `shadow-sm` (Subtle definition).
  - **Level 2 (Cards):** `shadow-md` (Soft lift).
  - **Level 3 (Featured):** `shadow-xl` (Deep atmospheric lift).
  - **Level 4 (Modals/Hero Media):** `shadow-2xl` (Maximal depth).
- **Glassmorphism:** Navigation and interactive overlays must use `.glass-panel` properties: `backdrop-filter: blur(20px)`.

### 5. Components
- **Buttons:**
  - *Primary:* Gradient fill (`#316482` to `#225876`), white text, 0.5rem (lg) roundedness.
  - *Secondary:* `surface_container_high` background with `on_surface` text.
- **Chips/Badges:** Pill-shaped (9999px), using `secondary_container` background and `on_secondary_container` text.
- **Cards:** Rounded (1rem/xl), `surface_container_lowest` fill, with `shadow-sm` that transitions to `shadow-md` on hover.
- **Inputs:** Minimalist style using `outline_variant` at 10% opacity for the border, prioritizing the background fill for structure.

### 6. Do's and Don'ts
**Do:**
- Use expansive padding (Spacing 3) to give elements room to breathe.
- Apply `active:scale-95` transitions to buttons for tactile feedback.
- Use iconography with `material-symbols-outlined` at a weight of 400.

**Don't:**
- Do not use black (`#000000`) for text; use `on_surface` (`#2d3335`) to maintain the tonal softness.
- Avoid sharp corners; the minimum roundedness is `0.25rem` (DEFAULT), but `0.75rem` (xl) is preferred for containers.
- Never use a solid border on the fixed header; use the backdrop blur and a `shadow-sm` for separation.