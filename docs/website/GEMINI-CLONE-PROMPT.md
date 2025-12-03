# Gemini 3 Pro - Lumina Clone Prompt for ECE Solutions LLC

Complete prompts to clone the full Lumina landing page and adapt it for ECE Solutions.

---

## Complete Page Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1. NAVBAR                                                           │
│ [● Logo Name]     [Link] [Link] [Link]      [Login] [CTA Button]   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ 2. HERO (2-column)                                                  │
│ ┌─────────────────────────┐  ┌─────────────────────────────────────┐│
│ │ ● BADGE TEXT            │  │  ┌─────────────────────────────┐   ││
│ │                         │  │  │   CARD STACK (3 cards)      │   ││
│ │ Large Headline          │  │  │   with play button          │   ││
│ │ Gradient Text.          │  │  └─────────────────────────────┘   ││
│ │                         │  │                                     ││
│ │ Subtitle paragraph      │  │  ┌─────────────────────────────┐   ││
│ │                         │  │  │ 01 Step One         [icon]  │   ││
│ │ [★ CTA Button →]        │  │  │ 02 Step Two         [icon]  │   ││
│ │ ✓ Subtext               │  │  │ 03 Step Three       [icon]  │   ││
│ └─────────────────────────┘  └─────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ 3. TESTIMONIAL + VERSION BADGE                                      │
│ ┌───────────────────────────────┐                                   │
│ │ [avatars] [+2K]          ""   │   ⚡ VERSION X.X AVAILABLE        │
│ │ "Quote text here"             │   Next generation description    │
│ │ ATTRIBUTION • RATING          │                                   │
│ └───────────────────────────────┘                                   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ 4. ABOUT US                                                         │
│                                                                     │
│ ● ABOUT US                                                          │
│                                                                     │
│ We are a creative intelligence engine dedicated to transforming     │
│ how the world visualizes stories. With a team of researchers,       │
│ engineers, and artists, we build tools that empower ambitious       │
│ creators to design, animate, and ship cinematic experiences...      │
│                                                                     │
│ ┌──────────┬──────────┬──────────┬──────────┐                       │
│ │  $500M   │   99%    │   2M+    │   4.9    │                       │
│ │ Revenue  │ Satisf.  │ Generated│ Rating   │                       │
│ └──────────┴──────────┴──────────┴──────────┘                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ 5. TRUSTED BY                                                       │
│                                                                     │
│ TRUSTED BY INDUSTRY LEADERS                                         │
│ [Logo]    [Logo]    [Logo]    [Logo]                                │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ 6. APP SHOWCASE (2-column)                                          │
│ ┌─────────────────────┐  ┌─────────────────────────────────────────┐│
│ │  ┌───────────────┐  │  │  10+                                    ││
│ │  │ Phone Mockup  │  │  │  Industries Transformed                 ││
│ │  │ with App UI   │  │  │                                         ││
│ │  │               │  │  │  500 Million                            ││
│ │  │               │  │  │  Assets Generated                       ││
│ │  │               │  │  │                                         ││
│ │  └───────────────┘  │  │  1,800%                                 ││
│ └─────────────────────┘  │  Efficiency Lift                        ││
│                          │                                         ││
│                          │  140,000                                ││
│                          │  Active Teams                           ││
│                          └─────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ 7. SUCCESS STORIES (Accordion)                                      │
│                                                                     │
│ Success Stories                              ← CASE STUDIES →       │
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ FINTECH        ≡ Midday Financial                            ▼ │ │
│ ├─────────────────────────────────────────────────────────────────┤ │
│ │ INFRASTRUCTURE  △ Vercel                                     ▼ │ │
│ ├─────────────────────────────────────────────────────────────────┤ │
│ │ DATABASE       ⬡ Supabase                                    ▼ │ │
│ ├─────────────────────────────────────────────────────────────────┤ │
│ │ PRODUCTIVITY   ▬ Linear Systems                              ▲ │ │
│ │ (expanded)                                                       │ │
│ │ ┌────────────────┬────────────────┬────────────────┐           │ │
│ │ │   CHALLENGE    │    SOLUTION    │     RESULT     │           │ │
│ │ │ Description    │ Description    │ Description    │           │ │
│ │ └────────────────┴────────────────┴────────────────┘           │ │
│ └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ 8. FOOTER / CONTACT                                                 │
│                                                                     │
│ ● GET IN TOUCH          PRIVACY   TERMS OF SERVICE                  │
│                                                                     │
│ +1 800 555 0199                                                     │
│ HELLO@LUMINA.AI                                                     │
│                                                                     │
│ [X] [GitHub] [LinkedIn]                                             │
│                                                                     │
│ ██╗     ██╗   ██╗███╗   ███╗██╗███╗   ██╗ █████╗                    │
│ (Giant brand text)                                                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## System Instructions

```xml
<role>
You are Gemini 3, a specialized web developer who excels at cloning existing designs.
You produce pixel-perfect recreations with clean, production-ready code.
You understand modern CSS (Tailwind), animations, and responsive design.
</role>

<instructions>
1. **Analyze**: Study the complete 8-section page structure provided
2. **Clone**: Recreate exact layout, spacing, and visual hierarchy for ALL sections
3. **Adapt**: Replace content with new brand while preserving design language
4. **Enhance**: Adjust colors from orange to teal/green
5. **Output**: Single HTML file with embedded CSS/JS
</instructions>

<constraints>
- Output: Single HTML file with embedded styles and scripts
- Framework: Tailwind CSS via CDN, vanilla JS
- Fonts: Inter from Google Fonts
- Animations: fadeSlideIn on scroll, beam-fall for grid lines, spin for CTA
- Responsive: Mobile-first
- Include ALL 8 sections
</constraints>
```

---

## Clone Prompt

```xml
<reference_design>
Clone the complete Lumina landing page with ALL 8 sections:

SECTION 1 - NAVBAR:
- Logo (orange gradient circle with black dot + "Lumina" text) on left
- Nav links center: WORKFLOW, RESOURCES, PRICING
- Right: "Log In" text link + "Get Access" CTA button with animated border

SECTION 2 - HERO (2-column grid):
Left column:
- Orange dot + "CREATIVE SUITE 2.0" badge
- Large headline "Craft Visual" on line 1
- "Stories." with gradient (white to gray) on line 2
- Subtitle paragraph about transforming footage
- CTA button with sparkle icon, spinning border beam glow, "Start Creating" + arrow
- "✓ No credit card required" subtext

Right column:
- Card stack: 3 stacked image cards with 3D perspective transforms
- Top card has play button overlay, "4K Ready" badge
- Below cards: 3-step list (01 Import Footage, 02 AI Scene Detect, 03 Export 4K)
- Active step has orange badge, others are gray

SECTION 3 - TESTIMONIAL + VERSION:
- Left: Orange/amber background card with:
  - Avatar stack (3 circles overlapping) + "+2K" badge
  - Quote marks icon
  - "Lumina changed my entire workflow." quote
  - "VERIFIED CREATOR • 5.0 RATING"
- Right: "⚡ VERSION 2.0 AVAILABLE" badge
  - "Next generation creative suite." text

SECTION 4 - ABOUT US:
- "● ABOUT US" orange badge
- Large paragraph with mixed weight text (some bold white, some gray):
  "We are a creative intelligence engine dedicated to transforming 
  how the world visualizes stories. With a team of researchers, 
  engineers, and artists, we build tools that empower ambitious 
  creators to design, animate, and ship cinematic experiences at 
  the speed of thought."
- Stats row: $500M (Creator Revenue) | 99% (Client Satisfaction) | 2M+ (Videos Generated) | 4.9 (Average Rating)

SECTION 5 - TRUSTED BY:
- "TRUSTED BY INDUSTRY LEADERS" label
- Logo row: AMP, Adobe, 100, ActiveCampaign (grayscale)

SECTION 6 - APP SHOWCASE (2-column):
- Left: Phone/device mockup showing app UI with image
- Right: Stats list with large numbers:
  - 10+ Industries Transformed
  - 500 Million Assets Generated Annually  
  - 1,800% Production Efficiency Lift
  - 140,000 Active Creative Teams

SECTION 7 - SUCCESS STORIES:
- Header: "Success Stories" + "← CASE STUDIES →" navigation
- Accordion list (4 items):
  - FINTECH: Midday Financial
  - INFRASTRUCTURE: Vercel
  - DATABASE: Supabase
  - PRODUCTIVITY: Linear Systems (expanded by default)
- Expanded state shows 3 columns: CHALLENGE | SOLUTION | RESULT
- Each with description text, highlight keywords in orange

SECTION 8 - FOOTER:
- "● GET IN TOUCH" badge
- Links: PRIVACY & POLICY, TERMS OF SERVICE
- Large phone: +1 800 555 0199
- Large email: HELLO@LUMINA.AI
- Social icons: X (Twitter), GitHub, LinkedIn
- Giant "LUMINA" text at bottom (very large, outline or filled)
- "Made in Aura" badge bottom right
</reference_design>

<new_brand>
Company: ECE Solutions LLC
Tagline: "Building Autonomous Futures"
Industry: AI Consulting & Agricultural Technology

COLOR REBRAND:
- Keep dark background (#050505)
- Orange (#f97316) → Teal (#00d4aa) as primary accent
- Amber gradients → Emerald gradients (#10b981)
- Keep same glow/shadow effects but in teal
</new_brand>

<content_replacement>
SECTION 1 - NAVBAR:
- Logo: Teal gradient circle + "ECE Solutions"
- Nav: "Services", "Technology", "Projects"  
- CTA: "Get Started"

SECTION 2 - HERO:
- Badge: "● AUTONOMOUS SYSTEMS 2.0"
- Headline: "Build Smarter" / "Farms." (gradient)
- Subtitle: "Transform agricultural operations with AI-powered digital twins. Our autonomous systems optimize growth, reduce costs, and run themselves—so you can focus on scaling."
- CTA: "Start Building"
- Subtext: "✓ Free consultation available"
- Steps: 01 Design System, 02 AI Simulation, 03 Deploy & Scale
- Card images: vertical farming / hydroponics visuals

SECTION 3 - TESTIMONIAL + VERSION:
- Quote: "ECE's digital twin reduced our optimization time from weeks to hours."
- Attribution: "VERIFIED CLIENT • 5.0 RATING"
- Version: "⚡ CLAUDE FLOW POWERED"
- Tagline: "Next generation autonomous systems."

SECTION 4 - ABOUT US:
- Text: "We are an autonomous systems lab dedicated to transforming how agriculture operates. With expertise in AI agents, digital twins, and controlled environment systems, we build infrastructure that empowers ambitious growers to design, simulate, and scale operations at the speed of thought."
- Stats: 
  - $2M+ (Cost Savings Delivered)
  - 95% (Automation Rate)
  - 50+ (Systems Deployed)
  - 4.9 (Client Rating)

SECTION 5 - TRUSTED BY:
- "BUILT WITH LEADING TECHNOLOGY"
- Logos: Claude/Anthropic, Unreal Engine, Blender, Python

SECTION 6 - APP SHOWCASE:
- Phone mockup: Dashboard/control panel UI for farming
- Stats:
  - 10+ Crop Types Optimized
  - 500K+ Data Points Analyzed
  - 1,800% Yield Improvement
  - 24/7 Autonomous Operation

SECTION 7 - SUCCESS STORIES:
- "Success Stories" header
- Accordion:
  - VERTICAL FARMING: Urban Greens Co
  - HYDROPONICS: AquaGrow Systems
  - GREENHOUSE: SolarLeaf Farms
  - RESEARCH: AgriTech University (expanded)
- Case study: Challenge/Solution/Result format

SECTION 8 - FOOTER:
- "GET IN TOUCH"
- Email: HELLO@ECESOLUTIONS.COM
- Phone: +1 (312) 555-0199
- Social: X, GitHub, LinkedIn
- Giant text: "ECE SOLUTIONS" or just "ECE"
</content_replacement>

<technical_requirements>
- Single HTML file, no build step
- Tailwind CSS via CDN
- Inter font from Google Fonts
- Lucide icons via CDN
- All 8 sections must be included
- Animations:
  - beam-fall for vertical grid lines
  - fadeSlideIn for scroll animations
  - spin for CTA border beam
  - pulse for status dots
  - Accordion open/close transitions
- Card stack with CSS 3D transforms
- Responsive: mobile-first, md:, lg: breakpoints
- Phone mockup can use a simple frame with screenshot inside
</technical_requirements>
```

---

## Content Mapping Table

| Section | Original (Lumina) | New (ECE Solutions) |
|---------|-------------------|---------------------|
| **Brand** | Lumina | ECE Solutions |
| **Badge** | Creative Suite 2.0 | Autonomous Systems 2.0 |
| **Headline** | Craft Visual Stories. | Build Smarter Farms. |
| **Subtitle** | Transforms raw footage into cinematic masterpieces... | Transform agricultural operations with AI-powered digital twins... |
| **CTA** | Start Creating | Start Building |
| **Subtext** | No credit card required | Free consultation available |
| **Nav Links** | Workflow / Resources / Pricing | Services / Technology / Projects |
| **Steps** | Import Footage → AI Scene Detect → Export 4K | Design System → AI Simulation → Deploy & Scale |
| **Quote** | "Lumina changed my entire workflow." | "ECE's digital twin reduced our optimization time from weeks to hours." |
| **Version** | VERSION 2.0 AVAILABLE | CLAUDE FLOW POWERED |
| **About** | Creative intelligence engine... | Autonomous systems lab... |
| **Stats** | $500M / 99% / 2M+ / 4.9 | $2M+ / 95% / 50+ / 4.9 |
| **Trusted By** | AMP, Adobe, 100, ActiveCampaign | Claude, Unreal Engine, Blender, Python |
| **App Stats** | 10+ Industries / 500M / 1,800% / 140K | 10+ Crops / 500K+ / 1,800% / 24/7 |
| **Case Studies** | Fintech, Infrastructure, Database, Productivity | Vertical Farming, Hydroponics, Greenhouse, Research |
| **Color** | Orange (#f97316) | Teal (#00d4aa) |
| **Footer Text** | LUMINA | ECE SOLUTIONS |

---

## Color Reference

### Tailwind Classes Mapping

| Original | New |
|----------|-----|
| `bg-orange-500` | `bg-teal-500` |
| `text-orange-500` | `text-teal-500` |
| `from-orange-400 to-orange-600` | `from-teal-400 to-emerald-500` |
| `from-orange-400 to-amber-500` | `from-teal-400 to-emerald-400` |
| `shadow-orange-500/30` | `shadow-teal-500/30` |
| `via-orange-500/60` | `via-teal-500/60` |
| `border-orange-500` | `border-teal-500` |

### CSS Variables

```css
:root {
  --brand-primary: #00d4aa;
  --brand-secondary: #10b981;
  --brand-glow: rgba(0, 212, 170, 0.3);
  --bg-dark: #050505;
  --text-primary: #ffffff;
  --text-muted: #a3a3a3;
}
```

---

## Iteration Prompts

After generating the initial clone, use these to refine:

### Fix Accordion Functionality
```
The Success Stories accordion needs JavaScript:
- Click on a row to expand/collapse
- Only one row open at a time
- Smooth height transition (0.3s ease)
- Rotate arrow icon when open
- Show CHALLENGE | SOLUTION | RESULT columns when expanded
```

### Add Phone Mockup
```
Create a realistic phone mockup for Section 6:
- iPhone-style frame with rounded corners
- Dark bezel with notch
- Inside: screenshot showing a dashboard with:
  - Header with "ECE Dashboard" and hamburger menu
  - Stats cards showing pH, EC, Temperature
  - Line chart showing growth over time
  - Teal accent color for UI elements
Use CSS only, no images needed.
```

### Enhance Grid Background
```
Add the vertical grid lines with falling beam animation:
- 5 columns spanning full viewport
- Subtle white/5 borders between columns
- Animated gradient beams that fall down periodically
- Column numbers (01, 02, 03, 04, 05) at bottom in muted text
- Center column has dashed orange/teal center line
```

### Add Scroll Animations
```
Add fadeSlideIn animations on scroll:
- Elements fade in and slide up when entering viewport
- Stagger delays: 0.1s, 0.2s, 0.3s for sequential elements
- Use Intersection Observer API
- Add .animate-on-scroll class with animation keyframes
```

### Mobile Navigation
```
Add mobile hamburger menu:
- Hide nav links on mobile (< md breakpoint)
- Show hamburger icon that opens slide-down menu
- Menu has same links + CTA button
- Close button or click-outside to dismiss
```

---

## Quick Start

1. Open [Google AI Studio](https://aistudio.google.com) or [Gemini](https://gemini.google.com)
2. Select Gemini 3 Pro (Thinking mode)
3. Paste the **System Instructions**
4. Paste the **Clone Prompt**
5. Review generated HTML - should have all 8 sections
6. Use **Iteration Prompts** to fix accordion, add phone mockup, etc.
7. Save final HTML file

---

## Placeholder Images

Use these Unsplash URLs if needed:

```
Hero BG:     https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1920
Card 1:      https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800
Card 2:      https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800  
Card 3:      https://images.unsplash.com/photo-1518770660439-4636190af475?w=800
Phone BG:    https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400
```

Or use gradient placeholders:
```html
<div class="w-full h-full bg-gradient-to-br from-teal-900 via-emerald-800 to-green-900"></div>
```
