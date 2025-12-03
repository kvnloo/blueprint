# Solarpunk Color Palette Specification

## Overview
This specification defines the enhanced color system for Blueprint's pretotype website, building on Gemini's solid teal/emerald foundation while adding solar warmth and organic depth for a complete solarpunk aesthetic.

## Design Philosophy
Solarpunk represents the fusion of:
- **Nature**: Verdant greens, organic textures, living systems
- **Solar Energy**: Warm golds, amber glows, radiant optimism
- **Technology**: Clean interfaces, data visualization, automation
- **Sustainability**: Earth tones, grounding elements, cyclical patterns

---

## Color System

### Primary Palette (From Gemini - Keep)
```css
/* Teal Scale - Nature-Tech Fusion */
--teal-400: #2dd4bf;  /* Bright cyan-teal - highlights, accents */
--teal-500: #14b8a6;  /* Primary teal - main brand color */
--teal-600: #0d9488;  /* Darker teal - hover states */
--teal-900: #134e4a;  /* Deep forest teal - backgrounds */

/* Emerald Scale - Living Green */
--emerald-400: #34d399;  /* Bright green - success, growth */
--emerald-500: #10b981;  /* Primary emerald - secondary actions */
--emerald-600: #059669;  /* Darker emerald - pressed states */
```

### NEW: Solar Warmth (Add These)
```css
/* Gold Scale - Solar Energy */
--gold-300: #fcd34d;  /* Bright solar - highlights, animations */
--gold-400: #fbbf24;  /* Primary gold - accent elements */
--gold-500: #f59e0b;  /* Rich amber - CTAs, important elements */
--gold-600: #d97706;  /* Deep amber - hover states */

/* Sunrise Scale - Gradient Transitions */
--sunrise-400: #fb923c;  /* Orange - energy visualization */
--sunrise-500: #f97316;  /* Deep orange - alerts, emphasis */
```

### NEW: Earth Grounding (Add These)
```css
/* Earth Scale - Organic Foundation */
--earth-300: #d6d3d1;  /* Light stone - subtle backgrounds */
--earth-400: #a8a29e;  /* Warm gray - muted text */
--earth-500: #78716c;  /* Stone - secondary text */
--earth-600: #57534e;  /* Dark stone - borders */

/* Terracotta Scale - Warmth */
--terracotta-400: #c2410c;  /* Warm earth - accents */
--terracotta-500: #9a3412;  /* Deep clay - grounding elements */
```

### NEW: Forest Depth (Add These)
```css
/* Deep Forest Scale */
--forest-500: #22c55e;  /* Vibrant leaf green */
--forest-600: #16a34a;  /* Forest canopy */
--forest-700: #15803d;  /* Deep forest */
--forest-800: #166534;  /* Shadowed green */
```

### Background System (Enhanced)
```css
/* Dark Mode Foundation */
--bg-primary: #050505;      /* Near-black - main background */
--bg-secondary: #0A0A0A;    /* Card backgrounds */
--bg-tertiary: #0F0F0F;     /* Elevated surfaces */
--bg-accent: #141414;       /* Hover states */

/* Glass Morphism */
--glass-bg: rgba(20, 20, 20, 0.6);
--glass-border: rgba(255, 255, 255, 0.08);
--glass-blur: 12px;

/* Organic Overlays */
--organic-texture: url('/textures/noise.svg');
--organic-opacity: 0.03;
```

---

## Gradient System

### Primary Gradients
```css
/* Hero Gradient - Nature Tech */
.gradient-hero {
  background: linear-gradient(135deg,
    var(--teal-400) 0%,
    var(--emerald-400) 50%,
    var(--teal-200) 100%
  );
}

/* Solar Gradient - Energy */
.gradient-solar {
  background: linear-gradient(135deg,
    var(--gold-400) 0%,
    var(--sunrise-400) 50%,
    var(--gold-500) 100%
  );
}

/* Solarpunk Fusion - Primary Brand */
.gradient-solarpunk {
  background: linear-gradient(135deg,
    var(--teal-400) 0%,
    var(--emerald-500) 35%,
    var(--gold-400) 65%,
    var(--sunrise-400) 100%
  );
}

/* Forest Depth */
.gradient-forest {
  background: linear-gradient(180deg,
    var(--forest-600) 0%,
    var(--teal-900) 100%
  );
}
```

### Background Gradients
```css
/* Ambient Glow */
.glow-teal {
  background: radial-gradient(
    circle at center,
    rgba(20, 184, 166, 0.2) 0%,
    transparent 70%
  );
}

.glow-solar {
  background: radial-gradient(
    circle at center,
    rgba(251, 191, 36, 0.15) 0%,
    transparent 70%
  );
}

/* Bioluminescent Effect */
.bioluminescent {
  background: radial-gradient(
    ellipse at 50% 50%,
    rgba(45, 212, 191, 0.3) 0%,
    rgba(16, 185, 129, 0.1) 40%,
    transparent 70%
  );
  animation: pulse 4s ease-in-out infinite;
}
```

---

## Semantic Colors

### Status Colors
```css
--success: var(--emerald-500);    /* #10b981 */
--warning: var(--gold-500);       /* #f59e0b */
--error: #ef4444;                 /* Keep red for errors */
--info: var(--teal-500);          /* #14b8a6 */
```

### Text Colors
```css
--text-primary: #ffffff;
--text-secondary: #a1a1aa;       /* Zinc-400 */
--text-muted: #71717a;           /* Zinc-500 */
--text-accent: var(--teal-400);  /* #2dd4bf */
--text-solar: var(--gold-400);   /* #fbbf24 */
```

### Interactive States
```css
/* Buttons */
--btn-primary-bg: linear-gradient(135deg, var(--teal-600), var(--emerald-600));
--btn-primary-hover: linear-gradient(135deg, var(--teal-500), var(--emerald-500));
--btn-primary-glow: 0 0 30px rgba(20, 184, 166, 0.4);

/* Solar CTA (Premium Actions) */
--btn-solar-bg: linear-gradient(135deg, var(--gold-500), var(--sunrise-500));
--btn-solar-hover: linear-gradient(135deg, var(--gold-400), var(--sunrise-400));
--btn-solar-glow: 0 0 30px rgba(251, 191, 36, 0.4);
```

---

## Application Guidelines

### Track-Specific Colors
```css
/* Track 1: Blueprint Protocol (Health) */
--track-health: var(--emerald-500);      /* Living, organic, growth */

/* Track 2: World Simulation (Tech) */
--track-simulation: var(--teal-500);     /* Digital, precise, tech */

/* Track 3: Evolve Documentation */
--track-evolve: var(--gold-500);         /* Illumination, knowledge */
```

### Component Applications

#### Hero Section
- Primary text gradient: `gradient-hero`
- Background glow: `glow-teal`
- Accent badge: `teal-400` with pulse animation
- Solar highlight for key CTA: `gradient-solar`

#### Cards
- Background: `bg-secondary` (#0A0A0A)
- Border: `glass-border`
- Hover border: `teal-500/30`
- Active/Selected: Add subtle `gold-400/10` overlay

#### Statistics/Metrics
- Primary numbers: White with `gradient-hero` text
- Positive growth: `emerald-500`
- Energy/Power metrics: `gold-400`
- Labels: `teal-500/80`

#### Navigation
- Active: `teal-400`
- Hover: `white`
- Default: `gray-400`
- Indicator: `gold-400` dot

#### Progress Bars
- Track: `gray-800`
- Fill: `gradient-hero` (teal → emerald)
- Glow: `teal-500` shadow

---

## Animation Colors

### Beam Animation (Enhanced)
```css
/* Original teal beam */
.beam-teal {
  background: linear-gradient(to bottom,
    transparent,
    var(--teal-500),
    transparent
  );
}

/* Solar beam variant */
.beam-solar {
  background: linear-gradient(to bottom,
    transparent,
    var(--gold-400),
    transparent
  );
}
```

### Text Glow Effects
```css
.text-glow-teal {
  text-shadow: 0 0 20px rgba(45, 212, 191, 0.5);
}

.text-glow-solar {
  text-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
}

.text-glow-fusion {
  text-shadow:
    0 0 20px rgba(45, 212, 191, 0.3),
    0 0 40px rgba(251, 191, 36, 0.2);
}
```

---

## Tailwind Configuration

```javascript
// tailwind.config.js extension
module.exports = {
  theme: {
    extend: {
      colors: {
        // Existing (from Gemini)
        teal: {
          200: '#99f6e4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          900: '#134e4a',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        // NEW: Solarpunk additions
        gold: {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        sunrise: {
          400: '#fb923c',
          500: '#f97316',
        },
        earth: {
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
        },
        terracotta: {
          400: '#c2410c',
          500: '#9a3412',
        },
        forest: {
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
        },
      },
    },
  },
};
```

---

## Accessibility

### Contrast Ratios
| Combination | Ratio | WCAG |
|-------------|-------|------|
| teal-400 on #050505 | 9.2:1 | AAA |
| gold-400 on #050505 | 10.8:1 | AAA |
| emerald-500 on #050505 | 7.1:1 | AAA |
| white on #050505 | 19.3:1 | AAA |
| gray-400 on #050505 | 5.2:1 | AA |

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--teal-400);
  outline-offset: 2px;
}
```

---

## Migration from Gemini Base

### No Changes Required
- Teal color scale
- Emerald color scale
- Background colors
- Glass morphism effects
- Text glow (teal)

### Additions to Implement
1. Add gold/sunrise/earth color scales to Tailwind config
2. Create gradient utility classes
3. Add solar beam animation variant
4. Implement track-specific color theming
5. Add solar accent to premium CTAs

### Enhancement Opportunities
1. Add gold accent to Hero CTA for "solar warmth"
2. Use gold-400 for notification dots and badges
3. Apply gradient-solarpunk to key headings
4. Add bioluminescent background effects to showcase sections
