# Design System - Vibe App

## Midnight Garden Theme

A dark-first design system for anonymous college social connections.

## Usage

```typescript
import { theme, createTextStyle, createBoxShadow } from "@/design-system/theme";

// Access colors
const bgColor = theme.colors.background.primary; // #0f0f1a
const accentColor = theme.colors.accent.primary; // #00d4aa

// Create text styles
const headingStyle = createTextStyle("heading");
const bodyStyle = createTextStyle("body", theme.colors.text.secondary);

// Apply shadows
const cardShadow = createBoxShadow("md");
```

## Typography Scale

- **Display**: 32px/40px - Hero text
- **Heading**: 24px/32px - Screen titles
- **Body**: 16px/24px - Chat, descriptions
- **Caption**: 12px/16px - Metadata, timestamps
- **Tiny**: 10px/12px - Badges, labels

## Color Palette

### Backgrounds

- Primary: `#0f0f1a` - Deep space
- Secondary: `#1a1b2f` - Card backgrounds
- Tertiary: `#252740` - Input fields

### Accents

- Primary: `#00d4aa` - Matches, reveals, success
- Secondary: `#7c3aed` - Purple for mysterious elements
- Warning: `#f59e0b` - Notifications

### Text

- Primary: `#ffffff` - Headlines
- Secondary: `#a0a3bd` - Body text
- Muted: `#6b6f8a` - Timestamps, hints

### Borders & Overlays

- Subtle: `#2a2d45` - Dividers
- Glass Overlay: `rgba(255,255,255,0.05)` - Glassmorphism

## Spacing

- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px
- xxxl: 64px

## Border Radius

- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- round: 999px
