---
name: Clinical Precision
colors:
  surface: '#faf9fd'
  surface-dim: '#dad9dd'
  surface-bright: '#faf9fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f7'
  surface-container: '#efedf1'
  surface-container-high: '#e9e7eb'
  surface-container-highest: '#e3e2e6'
  on-surface: '#1a1c1e'
  on-surface-variant: '#43474e'
  inverse-surface: '#2f3033'
  inverse-on-surface: '#f1f0f4'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#455f88'
  primary: '#002045'
  on-primary: '#ffffff'
  primary-container: '#1a365d'
  on-primary-container: '#86a0cd'
  inverse-primary: '#adc7f7'
  secondary: '#1960a3'
  on-secondary: '#ffffff'
  secondary-container: '#7db6ff'
  on-secondary-container: '#00477f'
  tertiary: '#1b2127'
  on-tertiary: '#ffffff'
  tertiary-container: '#30363c'
  on-tertiary-container: '#989fa6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#adc7f7'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#2d476f'
  secondary-fixed: '#d3e4ff'
  secondary-fixed-dim: '#a2c9ff'
  on-secondary-fixed: '#001c38'
  on-secondary-fixed-variant: '#004881'
  tertiary-fixed: '#dde3eb'
  tertiary-fixed-dim: '#c1c7cf'
  on-tertiary-fixed: '#161c22'
  on-tertiary-fixed-variant: '#41474e'
  background: '#faf9fd'
  on-background: '#1a1c1e'
  surface-variant: '#e3e2e6'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-max: 1440px
  gutter: 20px
---

## Brand & Style
The design system is engineered for high-stakes medical environments where clarity, speed of cognition, and trust are paramount. The brand personality is clinical, authoritative, and stoic. It avoids decorative flourishes in favor of a **Corporate Modern** aesthetic that leans into functional minimalism. 

The visual language communicates reliability through a structured grid, generous whitespace to reduce cognitive load, and a strict adherence to accessibility standards. The emotional goal is to provide a sense of calm and control to healthcare professionals managing complex patient data and urgent triage situations.

## Colors
This design system utilizes a high-contrast palette optimized for clinical legibility. 
- **Primary (#1A365D):** Deep Navy is reserved for persistent structural elements like sidebars and headers, establishing an anchor of authority.
- **Secondary (#2B6CB0):** Clinical Blue is the primary action color, used for buttons, active states, and links to ensure interactive elements are immediately identifiable.
- **Neutral/Background:** A progression of soft slate grays provides layering without the harshness of pure white, reducing eye strain during long shifts.
- **Semantic/Triage:** A strict traffic-light system is used for patient status: Red (Urgent/Immediate), Yellow (Delayed/Observation), and Green (Minimal/Stable). These must always be paired with icons or text labels to ensure accessibility for color-blind users.

## Typography
The design system exclusively uses **Inter** for its exceptional legibility and systematic "neutral" feel. 
- **Data Display:** For patient vitals and ID numbers, the `data-mono` style utilizes tabular numbers to ensure columns of figures align perfectly for quick scanning.
- **Hierarchy:** Headlines use a tighter letter spacing and heavier weights to stand out against dense data tables.
- **Mobile Adaptivity:** On mobile devices, `display-lg` should scale down to 28px to prevent awkward text wrapping in patient profiles.

## Layout & Spacing
The layout follows a **Dashboard-centric** model utilizing a fixed left-hand navigation and a fluid content area.
- **The Grid:** A 12-column grid is used for desktop. In medical data views, columns should be used to group related metrics (e.g., Vitals, Medications, Lab Results).
- **Density:** To accommodate the high volume of information, the system supports "Compact" and "Comfortable" modes. Spacing defaults to a 4px baseline rhythm.
- **Responsive Behavior:** 
    - **Desktop (1024px+):** Full sidebar, multi-column data tables.
    - **Tablet (768px - 1023px):** Collapsed sidebar (icons only), 2-column card layouts.
    - **Mobile (<768px):** Bottom navigation, single-column stacked view, expanded touch targets for buttons (minimum 44px height).

## Elevation & Depth
Depth is conveyed through **Tonal Layers** rather than heavy shadows. This maintains a clean, "sterile" medical look.
- **Surface Level 0 (Background):** Used for the main application canvas (#F8FAFC).
- **Surface Level 1 (Cards/Containers):** Pure white (#FFFFFF) with a 1px border (#E2E8F0). This is the primary container for patient data.
- **Surface Level 2 (Modals/Popovers):** Pure white with a subtle, diffused shadow (0px 4px 12px rgba(26, 54, 93, 0.08)).
- **Overlays:** A 40% opacity Navy (#1A365D) backdrop is used for critical alerts to focus the user’s attention on urgent modal windows.

## Shapes
The shape language is **Soft**. A 4px (0.25rem) radius is applied to standard UI elements like inputs and buttons. This provides a professional, "modern tool" feel that is more approachable than sharp corners but more serious than highly rounded "consumer" apps. 
- **Icons:** Use 24px stroke-based icons with a 2px weight for consistency.
- **Status Pills:** Utilize a slightly higher roundedness (rounded-lg) to distinguish them from interactive buttons.

## Components
- **Buttons:** Primary buttons use Clinical Blue with white text. Secondary buttons use a slate border and Navy text. Critical actions (e.g., "Discharge", "Delete") use the Triage Red.
- **Input Fields:** High-contrast borders (#94A3B8) that darken to Clinical Blue on focus. Labels must always be visible (no floating labels) to ensure context is never lost.
- **Data Tables:** Row heights are optimized for readability (48px). Use subtle zebra striping for large datasets. The primary column (e.g., Patient Name) should be pinned during horizontal scrolls on smaller screens.
- **Status Indicators:** Triage categories use a solid color bar on the left edge of a patient card or a filled pill within a table row.
- **Progress Steppers:** Used for multi-step intake forms, providing a clear map of the current clinical workflow.
- **Alerts:** Inline banners with light tinted backgrounds and saturated icons for "Success", "Info", "Warning", and "Critical" messages.