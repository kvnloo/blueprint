# Gemini 3 Pro Prompt Guide for Website Showcase

> **UPDATE**: For cloning the Lumina template design, see [GEMINI-CLONE-PROMPT.md](GEMINI-CLONE-PROMPT.md) which contains detailed instructions for replicating the exact design with zer0 branding.

This document contains optimized system instructions and prompts for using Gemini 3 Pro to build the zer0 LLC showcase website from scratch (original design approach).

## Table of Contents

- [Gemini 3 Pro Best Practices](#gemini-3-pro-best-practices)
- [System Instructions](#system-instructions)
- [Initial Website Prompt](#initial-website-prompt)
- [Iteration Prompts](#iteration-prompts)
- [Platform Options](#platform-options)

---

## Gemini 3 Pro Best Practices

Based on Google's official documentation and community testing:

### Core Principles

1. **Be Concise and Direct**
   - Gemini 3 responds best to clear, direct instructions
   - Avoid verbose or overly complex prompt engineering
   - The model may over-analyze lengthy prompts

2. **Default Behavior is Less Verbose**
   - Gemini 3 provides direct, efficient answers by default
   - Explicitly request conversational tone if needed

3. **Use XML Structure**
   - XML tags provide clear boundaries between instructions and data
   - Don't mix XML and Markdown - choose one format

4. **Keep Temperature at Default (1.0)**
   - Changing temperature may cause looping or degraded performance
   - The model is optimized for default settings

5. **Place Instructions After Context**
   - When using large contexts, put instructions at the end
   - Use anchor phrases like "Based on the above..."

### What NOT to Do

- Don't use complex chain-of-thought prompting (model handles this internally)
- Don't set temperature below 1.0
- Don't use verbose explanations of what you want
- Don't include redundant context

---

## System Instructions

Copy this system instruction when starting a new Gemini 3 Pro session:

```xml
<role>
You are Gemini 3, a specialized web development architect and designer.
You are precise, creative, and understand modern web aesthetics.
You excel at vibe coding - translating high-level creative briefs into production-ready code.
</role>

<instructions>
1. **Plan**: Analyze the project requirements and create a step-by-step implementation plan.
2. **Execute**: Generate complete, production-ready HTML/CSS/JavaScript code.
3. **Validate**: Ensure the code is responsive, accessible, and follows modern best practices.
4. **Format**: Output complete, runnable single-file HTML with embedded CSS/JS unless otherwise specified.
</instructions>

<constraints>
- Verbosity: Medium
- Tone: Technical but creative
- Output: Single HTML file with embedded styles and scripts (no build tools required)
- Framework: Vanilla JS with optional CDN imports (Three.js, GSAP, etc.)
- Design System: Modern, premium, technical aesthetic
- Handling Ambiguity: Make informed design decisions based on context; state assumptions clearly
</constraints>

<error_handling>
IF requirements are unclear or incomplete:
- Make reasonable assumptions based on the project context
- Document assumptions in code comments
- Suggest alternatives where applicable
</error_handling>

<output_format>
1. Brief implementation plan (3-5 bullet points)
2. Complete, runnable code
3. Notes on customization points
</output_format>
```

---

## Initial Website Prompt

Use this prompt to generate the initial showcase website:

```xml
<context>
Design a high-impact portfolio/showcase website for zer0 LLC - an AI consulting company specializing in autonomous AI agent systems, digital twin technologies for controlled environment agriculture (CEA), and multi-agent orchestration frameworks.

The founder has deep expertise in:
- Claude Flow, SuperClaude, CCPM multi-agent orchestration
- Digital twins for vertical farming / hydroponics
- Blender + UE5 workflows with MCP integration
- Self-optimizing agricultural systems

Style = futuristic tech-meets-nature, dark mode with organic accent colors (greens, teals), premium feel, subtle animations. Think: high-end AI research lab meets sustainable agriculture.
</context>

<requirements>
- Hero section with animated background (particle system or subtle 3D effect suggesting growth/data flow)
- Tagline emphasizing autonomous systems + agriculture innovation
- "What We Build" section showcasing 3 core offerings:
  1. Autonomous AI Agent Systems (Claude Flow, multi-agent orchestration)
  2. Digital Twin Development (UE5, Blender, real-time simulation)
  3. Smart Agriculture Tech (CEA optimization, self-improving systems)
- Interactive project showcase with hover effects (feature the vertical farming digital twin project)
- Tech stack visualization (show tools like Claude, UE5, Blender, MCP protocols)
- About/Philosophy section emphasizing the solo scientist-founder approach
- Contact CTA with modern form styling
- Smooth scroll navigation
- Mobile responsive
- Use Three.js for hero background effect (import via CDN)
- Use GSAP for scroll animations (import via CDN)
- Single HTML file, no build step required
</requirements>

<design_direction>
Color palette:
- Background: Deep charcoal (#0a0f0d) to near-black
- Primary accent: Luminous teal (#00d4aa)
- Secondary: Soft green (#4ade80)
- Text: Off-white (#f0f9f4)

Typography:
- Headlines: Bold, geometric sans-serif (Inter or similar from Google Fonts)
- Body: Clean, readable (16-18px base)

Aesthetic references:
- Premium SaaS landing pages
- Research lab / scientific visualization
- Organic data visualization (growth patterns, neural networks)
</design_direction>

<technical_specs>
- Output: Single HTML file with embedded CSS and JavaScript
- Import Three.js and GSAP via CDN (ES Modules)
- Use CSS Grid and Flexbox for layout
- Include CSS custom properties for easy theming
- Optimize for Core Web Vitals (lazy load where appropriate)
- Add subtle micro-interactions on buttons and cards
</technical_specs>
```

---

## Iteration Prompts

Short, direct prompts for refining the website:

### Navigation Enhancements

```
Add a floating navigation bar that:
- Appears when scrolling down 100px
- Has a glassmorphism effect (backdrop blur)
- Highlights the current section
- Smoothly animates in/out
```

### Project Card Interactions

```
Update the project cards to flip on hover:
- Front: Project image and title
- Back: Tech stack icons and brief description
- Use CSS 3D transforms
- 0.6s ease transition
```

### Hero Animation Enhancement

```
Add a typing animation to the hero tagline:
- Type out "Building autonomous futures..."
- 50ms per character
- Blinking cursor
- Start 1 second after page load
```

### Mobile Optimization

```
Improve mobile experience:
- Hamburger menu for navigation
- Stack cards vertically below 768px
- Reduce particle count on mobile for performance
- Larger touch targets (min 44px)
```

### Performance Optimization

```
Optimize for Core Web Vitals:
- Add loading="lazy" to images
- Defer non-critical JS
- Use will-change for animated elements
- Add preconnect for CDN resources
```

### Contact Form Enhancement

```
Add form validation with:
- Real-time email format validation
- Required field indicators
- Success/error state animations
- Accessible error messages
```

---

## Platform Options

### Google AI Studio (Recommended for Vibe Coding)

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Select "Build" tab
3. Choose Gemini 3 Pro model
4. Paste system instructions
5. Paste initial prompt
6. Use Canvas feature for live preview

### Gemini App (Quick Iterations)

1. Go to [gemini.google.com](https://gemini.google.com)
2. Select "Thinking" mode (Gemini 3 Pro)
3. Enable Canvas for code output
4. Paste combined prompt (system + initial)

### Gemini CLI (For Developers)

```bash
# Install Gemini CLI
npm install -g @anthropic/gemini-cli

# Set API key
export GEMINI_API_KEY="your-key"

# Run prompt
gemini --model gemini-3-pro-preview < prompt.txt > output.html
```

### API Integration

```python
import google.generativeai as genai

genai.configure(api_key="your-key")
model = genai.GenerativeModel('gemini-3-pro-preview')

response = model.generate_content(
    system_instruction=system_instructions,
    contents=initial_prompt,
    generation_config={
        "temperature": 1.0,  # Keep default
        "max_output_tokens": 65536,
    }
)

# Save output
with open("website.html", "w") as f:
    f.write(response.text)
```

---

## Tips for Best Results

### Do This

- Start with a complete, well-structured initial prompt
- Use short, direct follow-up prompts for iterations
- Let the model make design decisions within your constraints
- Test output in browser after each iteration

### Avoid This

- Don't ask for explanations along with code (separate requests)
- Don't provide conflicting requirements
- Don't over-specify micro-details
- Don't ignore the model's assumptions (review and correct early)

### Common Issues and Fixes

| Issue | Solution |
|-------|----------|
| Code is incomplete | Ask: "Continue the code from where you stopped" |
| Missing mobile styles | Ask: "Add responsive styles for screens <768px" |
| Animations too heavy | Ask: "Simplify animations, prioritize performance" |
| Wrong color palette | Paste exact hex codes and ask for replacement |
| JS not working | Ask: "Debug the JavaScript, check for syntax errors" |

---

## Full Example Session

**User** (Initial):
```
[Paste system instructions]
[Paste initial prompt]
```

**Gemini 3**: *Generates complete HTML file*

**User** (Iteration 1):
```
Add a project modal that opens when clicking a project card. Include project details, tech stack, and a link to learn more.
```

**Gemini 3**: *Updates code with modal*

**User** (Iteration 2):
```
The particle animation is too resource-intensive. Reduce particle count by 50% and add requestAnimationFrame throttling.
```

**Gemini 3**: *Optimizes performance*

**User** (Final):
```
Add meta tags for SEO and social sharing. Include Open Graph tags with a preview image placeholder.
```

**Gemini 3**: *Adds meta tags*

---

## Resources

- [Gemini 3 Developer Guide](https://ai.google.dev/gemini-api/docs/gemini-3)
- [Google AI Studio](https://aistudio.google.com)
- [Gemini Prompting Best Practices](https://ai.google.dev/gemini-api/docs/prompting-strategies)
- [WebDev Arena Leaderboard](https://huggingface.co/spaces/lmsys/webdev-arena)
