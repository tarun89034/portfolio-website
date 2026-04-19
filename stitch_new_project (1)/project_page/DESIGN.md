# Design System Strategy: Cinematic Immersion

## 1. Overview & Creative North Star
**The Creative North Star: "The Celestial Editor"**

This design system is not a layout; it is a lens. It draws from the high-stakes, "infinite scroll" immersion of Netflix’s dark-mode interface and fuses it with the ethereal, emotionally charged landscapes of Makoto Shinkai’s cinematography. 

We are moving away from the "webpage" feel and toward a **Cinematic Editorial** experience. This means breaking the rigid 12-column grid in favor of intentional asymmetry, overlapping elements that mimic depth-of-field, and a "living" background. The goal is to make the user feel like they are navigating a high-end film production—where every scroll feels like a camera pan across a starlit horizon.

---

## 2. Colors & Surface Philosophy

### The Tonal Palette
The palette is rooted in the depth of a midnight sky, using `surface` (`#0f131e`) as our canvas. We avoid true black to maintain a "filmic" look where shadows have color.

*   **Primary Glow (`#b6c4ff`):** Used for interactive focus and high-importance highlights. 
*   **Secondary Accent (`#ddb7ff`):** Inspired by comet trails and twilight; used for editorial accents.
*   **The "No-Line" Rule:** We strictly prohibit 1px solid borders for sectioning. Structural boundaries must be defined by:
    *   **Tonal Shifts:** Moving from `surface` to `surface_container_low`.
    *   **Luminous Transitions:** Using soft radial gradients that mimic city lights or distant stars.
    *   **Negative Space:** Large, editorial gaps (64px+) to separate distinct thoughts.

### Surface Hierarchy & Nesting
Treat the UI as layers of "Optical Glass." 
*   **Base:** `surface_dim` for the global background.
*   **Mid-Ground:** `surface_container` for content blocks.
*   **Fore-Ground:** `surface_bright` or `primary_container` with 40% opacity and a 20px backdrop blur for floating navigation or modals.

### The "Glass & Gradient" Rule
To capture the Shinkai aesthetic, use "Bloom Lighting." For primary CTAs, do not use flat colors. Use a linear gradient from `primary` to `primary_container` with a soft glow effect (a secondary shadow using the `primary` color at 20% opacity).

---

## 3. Typography
We use **Manrope** for its geometric yet warm personality. It serves as our "Voice," while **Inter** acts as our "Data" layer.

*   **Display (Display-LG/MD):** These are your cinematic titles. Use `display-lg` (3.5rem) with negative letter-spacing (-0.02em) to create an "IMAX" presence. Headlines should often be left-aligned with a massive top margin to create an editorial, asymmetrical feel.
*   **Body (Body-LG/MD):** Set in `on_surface_variant` (`#c4c5d5`). This soft gray reduces eye strain and allows the "Glow" of the primary elements to pop.
*   **Labels (Label-MD/SM):** Set in **Inter** with 10% letter-spacing. Use these for metadata (e.g., "PROJECT 01 / 2024") to mimic the technical look of film credits.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through **Tonal Stacking** rather than drop shadows.
1.  **Level 0:** `surface_container_lowest` (Background elements, e.g., starry sky textures).
2.  **Level 1:** `surface` (The main content stage).
3.  **Level 2:** `surface_container_high` (Cards, focused sections).
4.  **Level 3:** Glass-morphic layers with `backdrop-filter: blur(12px)`.

### Ambient Shadows & Ghost Borders
*   **Shadows:** When a floating state is required, use a 40px blur with 4% opacity of `on_surface`. It should feel like an "ambient occlusion" rather than a hard shadow.
*   **Ghost Borders:** If a card needs a boundary, use a 1px border with `outline_variant` at **15% opacity**. This creates a "shimmer" effect on the edge of the glass without blocking the background visuals.

---

## 5. Components

### Buttons
*   **Primary:** Gradient of `primary` to `primary_container`. Border-radius: `full`. No border. Apply a `0 0 15px` glow on hover.
*   **Secondary:** Ghost style. 1px border of `outline_variant` at 20%. Soft `surface_bright` background on hover.
*   **States:** Transitions must be 400ms "Ease-Out" to mimic the slow, purposeful movement of anime pans.

### Cards (The "Film Strip" Item)
*   **Structure:** No dividers. Use `surface_container_low` for the card body. 
*   **Interaction:** On hover, the card should slightly scale (1.02x) and the background should shift to `surface_container_high`.
*   **Visuals:** Incorporate a subtle "Lens Flare" or "Comet Trail" gradient in the top-right corner of high-priority cards.

### Input Fields
*   **Style:** Minimalist underline or "Glass" fill.
*   **Active State:** The bottom border glows with the `primary` token. Helper text uses `label-sm` in `secondary`.

### Immersive Components (Context Specific)
*   **The Particle Overlay:** A global `canvas` layer behind content that generates floating dust particles (on-surface, 5% opacity) to provide a sense of living space.
*   **The Cinematic Progress Bar:** A thin, 2px line at the top of the viewport using `secondary` to `primary` gradient, indicating scroll depth.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use intentional white space. Let the background "Sky" breathe between sections.
*   **Do** use "Depth of Field." Blur background elements (city skylines) when a foreground card is active.
*   **Do** use `on_tertiary_fixed` for small, high-contrast alerts or badges to cut through the cool blue tones.

### Don’t:
*   **Don’t** use 100% white (#FFFFFF). It breaks the dark cinematic immersion. Use `on_surface` (`#dfe2f2`).
*   **Don’t** use sharp corners. Stick to the `md` (0.375rem) to `xl` (0.75rem) roundedness scale to keep the aesthetic "soft" and anime-inspired.
*   **Don’t** use vertical dividers. Use the Spacing Scale (64px, 80px, 128px) to separate content sections.