# Website Cloning Toolkit

A comprehensive set of tools for creating pixel-perfect website clones, including capturing videos, CSS, fonts, design tokens, and more.

## Quick Start

```bash
# Install dependencies
pip install playwright aiohttp
python -m playwright install chromium

# Clone a website
python website_cloner.py "https://example.com" output_folder

# Or use enhanced cloner (better video capture)
python enhanced_cloner.py "https://example.com" output_folder

# For blob video URLs specifically
python capture_blob_videos.py "https://example.com" videos_folder
```

## Files Included

| Script | Purpose |
|--------|---------|
| `website_cloner.py` | Main comprehensive cloner - captures HTML, CSS, JS, videos, fonts, design tokens |
| `enhanced_cloner.py` | Enhanced version with better video/blob handling and Tailwind config generation |
| `capture_blob_videos.py` | Specialized tool for capturing videos served via blob: URLs |
| `clone_website.sh` | Bash wrapper for easy one-command cloning |

## What Gets Captured

### Basic Cloner (`website_cloner.py`)
- ✅ Full rendered HTML (after JS execution)
- ✅ All CSS (inline, stylesheets, computed styles)
- ✅ JavaScript files (external and inline)
- ✅ Images (PNG, JPG, SVG, WebP)
- ✅ Videos (MP4, WebM)
- ✅ Fonts (WOFF, WOFF2, TTF)
- ✅ Design tokens (colors, typography, spacing)
- ✅ Screenshots (full page, viewport, mobile)
- ✅ Network request log
- ✅ Asset manifest

### Enhanced Cloner (`enhanced_cloner.py`)
All of the above, plus:
- ✅ CSS animations and keyframes
- ✅ Component hierarchy tree
- ✅ Generated Tailwind config
- ✅ Responsive screenshots (mobile, tablet, desktop, XL)
- ✅ Better blob URL handling
- ✅ Clone guide with step-by-step instructions

## Output Structure

```
cloned_site/
├── index.html              # Full rendered HTML
├── screenshot_full.png     # Full page screenshot
├── screenshot_mobile.png   # Mobile viewport
├── screenshot_desktop.png  # Desktop viewport
├── tailwind.config.js      # Generated Tailwind config
├── CLONE_GUIDE.md          # Step-by-step recreation guide
├── css/
│   ├── extracted_styles.css
│   └── design_tokens.css
├── js/
│   └── inline_script_*.js
├── videos/
│   └── *.mp4, *.webm
├── images/
│   └── *.png, *.jpg, *.svg
├── fonts/
│   └── *.woff2, *.ttf
└── data/
    ├── design_system.json      # Colors, fonts, spacing
    ├── component_tree.json     # DOM hierarchy
    ├── animations.json         # CSS animations
    ├── computed_styles.json    # All element styles
    ├── video_elements.json     # Video player configs
    ├── network_requests.json   # All HTTP requests
    └── asset_manifest.json     # List of all assets
```

## Handling Tricky Cases

### Blob Video URLs

Many modern sites use MediaSource Extensions (MSE) to stream video via `blob:` URLs. To capture these:

1. **Check network requests**: The actual video chunks often appear in the network log
2. **Use `capture_blob_videos.py`**: Records the page including video playback
3. **Inspect video_elements.json**: May contain references to original sources
4. **Look for .m3u8/.mpd manifests**: These point to video segments

```bash
python capture_blob_videos.py "https://example.com" videos/
```

### Dynamically Loaded Content

The cloners use Playwright which executes JavaScript, so dynamically loaded content should be captured. The scripts also:
- Scroll through the page to trigger lazy loading
- Wait for network idle state
- Take multiple passes to ensure content loads

### Protected/CORS-Blocked Assets

Some assets may be blocked by CORS. Check the network log for failed requests and manually download if needed.

## Using with Claude for Recreation

After cloning, you can use Claude to recreate the site:

### Step 1: Upload Files
Upload to Claude:
- `screenshot_desktop.png` (visual reference)
- `data/design_system.json` (design tokens)
- `data/component_tree.json` (structure)

### Step 2: Prompt Template

```
I'm recreating this website pixel-perfect. Using the attached:
1. Screenshot - visual reference
2. design_system.json - exact colors, fonts, spacing
3. component_tree.json - DOM structure

Generate a React + Tailwind component for the hero section.

Requirements:
- Match colors exactly using the hex values from design_system.json
- Use the same font families
- Replicate the exact layout (check component_tree for flex/grid)
- Include any visible animations
- Make it responsive

Start with the hero section, then we'll do other sections.
```

### Step 3: Iterate
Work section by section, using screenshots as visual reference and JSON files for exact values.

## Tips for Pixel-Perfect Clones

1. **Colors**: Always use the hex values from `design_system.json`, not eyedropper approximations
2. **Fonts**: Check `fonts/` directory - you may need to self-host the fonts
3. **Spacing**: Use `computed_styles.json` for exact padding/margin values
4. **Animations**: Check `animations.json` for keyframes and copy them exactly
5. **Videos**: If using placeholder videos, match the aspect ratio and styling from `video_elements.json`

## Requirements

- Python 3.8+
- playwright
- aiohttp

```bash
pip install playwright aiohttp
python -m playwright install chromium
```

## Limitations

- Cannot capture assets behind authentication
- Blob video URLs may require additional handling
- CORS-blocked stylesheets won't have their rules extracted
- Some JavaScript-heavy sites may need longer wait times

## License

MIT - Use responsibly and respect copyright/terms of service of target sites.
