# 🔍 Comprehensive Website Extractor

A powerful Playwright-based tool that extracts everything needed for pixel-perfect website cloning.

## Features

- **Full HTML/DOM** - Complete page structure
- **All CSS** - Inline, embedded, and external stylesheets
- **JavaScript files** - All JS assets
- **Font files** - WOFF2, WOFF, TTF, OTF, EOT
- **Images** - PNG, JPG, WEBP, SVG, GIF
- **Videos** - MP4, WEBM, and streaming sources
- **Animations** - Keyframes and transitions
- **Color palette** - All colors used on the site
- **Typography system** - Font families, sizes, weights
- **CSS variables** - Custom properties from :root
- **Computed styles** - Layout information for key elements
- **Network log** - All HTTP requests made
- **Screenshots** - Desktop, tablet, and mobile views

## Installation

```bash
# Clone or download this folder
cd website-extractor

# Install dependencies
pip install -r requirements.txt

# Install Playwright browser
playwright install chromium
```

## Usage

### Basic Usage

```bash
python extract_website.py "https://example.com" "output_folder"
```

### Or use the helper script

```bash
chmod +x run.sh
./run.sh "https://example.com" "output_folder"
```

### Python API

```python
import asyncio
from extract_website import WebsiteExtractor

async def main():
    extractor = WebsiteExtractor(
        url="https://example.com",
        output_dir="my_extraction"
    )
    report = await extractor.extract()
    print(report)

asyncio.run(main())
```

## Output Structure

```
output_folder/
├── index.html              # Full page HTML
├── combined_styles.css     # All CSS combined
├── extraction_report.json  # Complete extraction data
├── SUMMARY.md             # Human-readable summary
├── screenshots/
│   ├── full_page.png      # Full page screenshot
│   ├── viewport.png       # Above-the-fold
│   ├── mobile.png         # 375px width
│   └── tablet.png         # 768px width
└── assets/
    ├── fonts/             # Font files (.woff2, .woff, etc.)
    ├── images/            # Image files
    ├── videos/            # Video files
    ├── css/               # Original CSS files
    └── js/                # JavaScript files
```

## Extraction Report Structure

The `extraction_report.json` contains:

```json
{
  "url": "https://example.com",
  "extracted_at": "2024-01-15T10:30:00",
  "title": "Page Title",
  "meta": { ... },
  
  "design_system": {
    "colors": {
      "all": [...],
      "hex": ["#ffffff", "#000000", ...],
      "rgb": [...],
      "rgba": [...]
    },
    "css_variables": {
      "--primary-color": "#ff6600",
      "--spacing-unit": "8px"
    },
    "fonts": ["Inter, sans-serif", ...],
    "font_faces": [{
      "fontFamily": "CustomFont",
      "src": "url(...)",
      "fontWeight": "400"
    }],
    "typography": [{
      "tag": "H1",
      "fontFamily": "...",
      "fontSize": "48px",
      "fontWeight": "700",
      "lineHeight": "1.2"
    }]
  },
  
  "layout": {
    "computed_styles": {
      "body_0": {
        "display": "block",
        "maxWidth": "1440px",
        "padding": "0 24px"
      }
    }
  },
  
  "animations": {
    "keyframes": [{
      "name": "fadeIn",
      "css": "@keyframes fadeIn { ... }"
    }],
    "animated_elements": [{
      "tag": "DIV",
      "className": "hero",
      "animation": "fadeIn 0.5s ease-out"
    }]
  },
  
  "assets": {
    "fonts": { ... },
    "stylesheets": [...],
    "scripts": [...],
    "videos": [...]
  }
}
```

## Using Extracted Data for Cloning

### 1. Design System Recreation

```css
/* Use extracted CSS variables */
:root {
  --primary: #ff6600;
  --background: #0a0a0a;
  /* ... from extraction_report.json */
}
```

### 2. Font Setup

```css
/* Copy font files from assets/fonts/ and reference them */
@font-face {
  font-family: 'CustomFont';
  src: url('./assets/fonts/customfont_abc123.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

### 3. Animation Recreation

```css
/* Copy keyframes from extraction_report.json */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### 4. Layout Analysis

Use the `computed_styles` section to understand:
- Grid/flexbox configurations
- Spacing and padding patterns
- Max-widths and containers
- Z-index layering

## Tips for Pixel-Perfect Cloning

1. **Start with screenshots** - Use them as visual reference
2. **Match the fonts first** - Typography sets the tone
3. **Extract the color system** - Use CSS variables for consistency
4. **Study the layout computed styles** - Understand the grid/container system
5. **Implement animations last** - Get static version right first
6. **Test at multiple viewports** - Use the mobile/tablet screenshots

## Troubleshooting

### CORS Issues
Some assets may fail to download due to CORS. Check the `network_log` for failed requests.

### Dynamic Content
If content loads via JavaScript:
- Increase the wait time after page load
- The script scrolls automatically to trigger lazy loading

### Protected Sites
Some sites block automated access. Try:
- Using a different user agent
- Adding delays between requests
- Running in headed mode for debugging

## Feeding to Claude for Clone Generation

After extraction, you can send the data to Claude:

```python
import anthropic
import json
import base64

client = anthropic.Anthropic()

# Load extraction data
with open("output_folder/extraction_report.json") as f:
    report = json.load(f)

# Load screenshot
with open("output_folder/screenshots/full_page.png", "rb") as f:
    screenshot_b64 = base64.b64encode(f.read()).decode()

response = client.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=8000,
    messages=[{
        "role": "user",
        "content": [
            {
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": "image/png",
                    "data": screenshot_b64
                }
            },
            {
                "type": "text",
                "text": f"""Create a pixel-perfect React/Tailwind clone of this website.

Design System:
- Colors: {json.dumps(report['design_system']['colors']['hex'][:20])}
- CSS Variables: {json.dumps(report['design_system']['css_variables'])}
- Fonts: {json.dumps(report['design_system']['fonts'][:5])}
- Typography: {json.dumps(report['design_system']['typography'][:10])}

Animations:
{json.dumps(report['animations']['keyframes'])}

Generate complete, production-ready code."""
            }
        ]
    }]
)

print(response.content[0].text)
```

## License

MIT - Use freely for your projects.
