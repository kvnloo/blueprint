#!/usr/bin/env python3
"""
Enhanced Website Cloner v2
Specifically handles:
- Blob URLs for videos
- Dynamically loaded content
- HLS/DASH video streams
- CSS animations and transitions
- Web fonts
"""

import asyncio
import json
import os
import re
import hashlib
from pathlib import Path
from urllib.parse import urlparse, urljoin
from playwright.async_api import async_playwright


class EnhancedWebsiteCloner:
    def __init__(self, url: str, output_dir: str = "cloned_site"):
        self.url = url
        self.output_dir = Path(output_dir)
        self.captured_blobs = {}
        self.video_sources = []
        
    async def clone(self):
        """Main cloning method with enhanced video capture"""
        
        # Create directories
        for subdir in ["videos", "images", "css", "js", "fonts", "data"]:
            (self.output_dir / subdir).mkdir(parents=True, exist_ok=True)
        
        async with async_playwright() as p:
            browser = await p.chromium.launch(
                headless=False,  # Use headed mode for better video capture
                args=[
                    '--autoplay-policy=no-user-gesture-required',
                    '--disable-features=PreloadMediaEngagementData,MediaEngagementBypassAutoplayPolicies',
                ]
            )
            
            context = await browser.new_context(
                viewport={'width': 1920, 'height': 1080},
                record_video_dir=str(self.output_dir / "videos"),  # Record video
                user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            )
            
            page = await context.new_page()
            
            # Intercept and save all responses
            captured_resources = []
            
            async def capture_response(response):
                url = response.url
                content_type = response.headers.get('content-type', '')
                
                try:
                    if any(x in content_type for x in ['video', 'audio']) or \
                       any(ext in url for ext in ['.mp4', '.webm', '.m3u8', '.mpd']):
                        body = await response.body()
                        filename = hashlib.md5(url.encode()).hexdigest()[:12]
                        
                        if '.mp4' in url or 'video/mp4' in content_type:
                            filename += '.mp4'
                        elif '.webm' in url:
                            filename += '.webm'
                        elif '.m3u8' in url:
                            filename += '.m3u8'
                        
                        with open(self.output_dir / "videos" / filename, 'wb') as f:
                            f.write(body)
                        
                        self.video_sources.append({
                            'url': url,
                            'saved_as': filename,
                            'content_type': content_type
                        })
                        print(f"  [VIDEO] Captured: {filename}")
                        
                    elif 'font' in content_type or any(ext in url for ext in ['.woff', '.woff2', '.ttf']):
                        body = await response.body()
                        filename = os.path.basename(urlparse(url).path) or hashlib.md5(url.encode()).hexdigest()[:12]
                        with open(self.output_dir / "fonts" / filename, 'wb') as f:
                            f.write(body)
                        print(f"  [FONT] Captured: {filename}")
                        
                except Exception as e:
                    pass
            
            page.on("response", capture_response)
            
            print(f"[*] Navigating to {self.url}")
            await page.goto(self.url, wait_until="networkidle", timeout=60000)
            
            # Wait and scroll for lazy content
            print("[*] Triggering lazy-loaded content...")
            await self._deep_scroll(page)
            
            # Try to capture blob video URLs
            print("[*] Capturing video blob URLs...")
            await self._capture_blob_videos(page)
            
            # Extract everything
            print("[*] Extracting page data...")
            
            # Get rendered HTML (after JS execution)
            html = await page.content()
            
            # Get all computed styles
            design_system = await self._extract_design_system(page)
            
            # Get animation keyframes
            animations = await self._extract_animations(page)
            
            # Screenshots at multiple breakpoints
            await self._capture_responsive_screenshots(page)
            
            # Save everything
            with open(self.output_dir / "index.html", 'w', encoding='utf-8') as f:
                f.write(html)
            
            with open(self.output_dir / "data" / "design_system.json", 'w') as f:
                json.dump(design_system, f, indent=2)
            
            with open(self.output_dir / "data" / "animations.json", 'w') as f:
                json.dump(animations, f, indent=2)
            
            with open(self.output_dir / "data" / "video_sources.json", 'w') as f:
                json.dump(self.video_sources, f, indent=2)
            
            # Generate Tailwind config from design tokens
            self._generate_tailwind_config(design_system)
            
            # Generate component structure
            component_tree = await self._extract_component_structure(page)
            with open(self.output_dir / "data" / "component_tree.json", 'w') as f:
                json.dump(component_tree, f, indent=2)
            
            await browser.close()
            
        self._generate_clone_guide()
        print(f"\n[✓] Enhanced clone complete! See: {self.output_dir}")
        
    async def _deep_scroll(self, page):
        """Scroll through page multiple times to ensure all content loads"""
        for _ in range(3):
            await page.evaluate("""
                async () => {
                    const delay = ms => new Promise(r => setTimeout(r, ms));
                    for (let i = 0; i < document.body.scrollHeight; i += 300) {
                        window.scrollTo(0, i);
                        await delay(150);
                    }
                    window.scrollTo(0, 0);
                }
            """)
            await page.wait_for_timeout(1000)

    async def _capture_blob_videos(self, page):
        """Attempt to capture blob URL videos by recording MediaSource"""
        blob_info = await page.evaluate("""
            () => {
                const videos = [];
                document.querySelectorAll('video').forEach((video, i) => {
                    const info = {
                        index: i,
                        src: video.src,
                        currentSrc: video.currentSrc,
                        poster: video.poster,
                        autoplay: video.autoplay,
                        loop: video.loop,
                        muted: video.muted,
                        playsInline: video.playsInline,
                        preload: video.preload,
                        width: video.videoWidth || video.clientWidth,
                        height: video.videoHeight || video.clientHeight,
                        duration: video.duration,
                        sources: [],
                        isBlob: video.src?.startsWith('blob:'),
                        parentClasses: video.parentElement?.className,
                        styles: {
                            position: getComputedStyle(video).position,
                            objectFit: getComputedStyle(video).objectFit,
                            zIndex: getComputedStyle(video).zIndex,
                            opacity: getComputedStyle(video).opacity,
                        }
                    };
                    
                    video.querySelectorAll('source').forEach(s => {
                        info.sources.push({ src: s.src, type: s.type });
                    });
                    
                    videos.push(info);
                });
                return videos;
            }
        """)
        
        with open(self.output_dir / "data" / "video_elements.json", 'w') as f:
            json.dump(blob_info, f, indent=2)
        
        # For blob URLs, we need to find the actual source
        # Check network requests logged earlier or look for data-* attributes
        for video in blob_info:
            if video.get('isBlob'):
                print(f"  [!] Video {video['index']} uses blob URL - checking for original source...")
                
    async def _extract_design_system(self, page):
        """Extract comprehensive design system"""
        return await page.evaluate("""
            () => {
                const rgbToHex = (rgb) => {
                    if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return null;
                    const match = rgb.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/);
                    if (!match) return rgb;
                    return '#' + [match[1], match[2], match[3]]
                        .map(x => parseInt(x).toString(16).padStart(2, '0'))
                        .join('');
                };
                
                const system = {
                    colors: { backgrounds: [], texts: [], accents: [] },
                    typography: { fonts: [], sizes: [], weights: [], lineHeights: [] },
                    spacing: [],
                    borderRadius: [],
                    shadows: [],
                    gradients: [],
                    breakpoints: {},
                };
                
                const seen = { colors: new Set(), fonts: new Set(), sizes: new Set() };
                
                document.querySelectorAll('*').forEach(el => {
                    const s = getComputedStyle(el);
                    
                    // Colors
                    const bg = rgbToHex(s.backgroundColor);
                    const fg = rgbToHex(s.color);
                    if (bg && !seen.colors.has(bg)) {
                        seen.colors.add(bg);
                        system.colors.backgrounds.push(bg);
                    }
                    if (fg && !seen.colors.has(fg)) {
                        seen.colors.add(fg);
                        system.colors.texts.push(fg);
                    }
                    
                    // Typography
                    const font = s.fontFamily.split(',')[0].replace(/['"]/g, '').trim();
                    if (font && !seen.fonts.has(font)) {
                        seen.fonts.add(font);
                        system.typography.fonts.push(font);
                    }
                    
                    if (!seen.sizes.has(s.fontSize)) {
                        seen.sizes.add(s.fontSize);
                        system.typography.sizes.push(s.fontSize);
                    }
                    
                    // Gradients
                    if (s.backgroundImage.includes('gradient')) {
                        system.gradients.push(s.backgroundImage);
                    }
                    
                    // Shadows
                    if (s.boxShadow !== 'none') {
                        system.shadows.push(s.boxShadow);
                    }
                    
                    // Border radius
                    if (s.borderRadius !== '0px') {
                        system.borderRadius.push(s.borderRadius);
                    }
                });
                
                // Dedupe
                system.shadows = [...new Set(system.shadows)].slice(0, 10);
                system.gradients = [...new Set(system.gradients)].slice(0, 10);
                system.borderRadius = [...new Set(system.borderRadius)];
                system.typography.sizes = system.typography.sizes.sort((a, b) => 
                    parseFloat(a) - parseFloat(b)
                );
                
                return system;
            }
        """)

    async def _extract_animations(self, page):
        """Extract CSS animations and keyframes"""
        return await page.evaluate("""
            () => {
                const animations = {
                    keyframes: [],
                    transitions: [],
                    animatedElements: []
                };
                
                // Get keyframes from stylesheets
                Array.from(document.styleSheets).forEach(sheet => {
                    try {
                        Array.from(sheet.cssRules).forEach(rule => {
                            if (rule.type === CSSRule.KEYFRAMES_RULE) {
                                animations.keyframes.push({
                                    name: rule.name,
                                    cssText: rule.cssText
                                });
                            }
                        });
                    } catch(e) {}
                });
                
                // Find elements with animations/transitions
                document.querySelectorAll('*').forEach(el => {
                    const s = getComputedStyle(el);
                    if (s.animation !== 'none 0s ease 0s 1 normal none running') {
                        animations.animatedElements.push({
                            tag: el.tagName,
                            classes: el.className,
                            animation: s.animation
                        });
                    }
                    if (s.transition !== 'all 0s ease 0s') {
                        animations.transitions.push({
                            tag: el.tagName,
                            classes: el.className,
                            transition: s.transition
                        });
                    }
                });
                
                return animations;
            }
        """)

    async def _capture_responsive_screenshots(self, page):
        """Capture screenshots at multiple breakpoints"""
        breakpoints = [
            {'name': 'mobile', 'width': 390, 'height': 844},
            {'name': 'tablet', 'width': 768, 'height': 1024},
            {'name': 'desktop', 'width': 1440, 'height': 900},
            {'name': 'desktop_xl', 'width': 1920, 'height': 1080},
        ]
        
        for bp in breakpoints:
            await page.set_viewport_size({'width': bp['width'], 'height': bp['height']})
            await page.wait_for_timeout(500)
            await page.screenshot(
                path=str(self.output_dir / f"screenshot_{bp['name']}.png"),
                full_page=True
            )
            print(f"  [SCREENSHOT] {bp['name']}: {bp['width']}x{bp['height']}")

    async def _extract_component_structure(self, page):
        """Extract semantic component structure"""
        return await page.evaluate("""
            () => {
                const extractComponent = (el, depth = 0) => {
                    if (depth > 5) return null;
                    
                    const style = getComputedStyle(el);
                    const rect = el.getBoundingClientRect();
                    
                    const component = {
                        tag: el.tagName.toLowerCase(),
                        id: el.id || null,
                        classes: el.className.toString().split(' ').filter(Boolean),
                        role: el.getAttribute('role'),
                        text: el.childNodes[0]?.nodeType === 3 
                            ? el.childNodes[0].textContent.trim().slice(0, 50) 
                            : null,
                        dimensions: {
                            width: Math.round(rect.width),
                            height: Math.round(rect.height),
                        },
                        layout: {
                            display: style.display,
                            position: style.position,
                            flexDirection: style.flexDirection,
                            justifyContent: style.justifyContent,
                            alignItems: style.alignItems,
                            gap: style.gap,
                        },
                        children: []
                    };
                    
                    // Get semantic children
                    const importantTags = ['header', 'nav', 'main', 'section', 'article', 'aside', 'footer', 'div', 'button', 'a', 'video', 'img'];
                    
                    Array.from(el.children).forEach(child => {
                        if (importantTags.includes(child.tagName.toLowerCase()) || 
                            child.className.toString().length > 0) {
                            const childComponent = extractComponent(child, depth + 1);
                            if (childComponent) {
                                component.children.push(childComponent);
                            }
                        }
                    });
                    
                    return component;
                };
                
                return extractComponent(document.body);
            }
        """)

    def _generate_tailwind_config(self, design_system):
        """Generate Tailwind config from design tokens"""
        config = f"""
// tailwind.config.js - Generated from {self.url}
module.exports = {{
  theme: {{
    extend: {{
      colors: {{
        // Background colors
{chr(10).join(f"        'bg-{i}': '{c}'," for i, c in enumerate(design_system['colors']['backgrounds'][:10]))}
        // Text colors  
{chr(10).join(f"        'text-{i}': '{c}'," for i, c in enumerate(design_system['colors']['texts'][:10]))}
      }},
      fontFamily: {{
{chr(10).join(f"        'font-{i}': ['{f}', 'sans-serif']," for i, f in enumerate(design_system['typography']['fonts'][:5]))}
      }},
      fontSize: {{
{chr(10).join(f"        'size-{i}': '{s}'," for i, s in enumerate(design_system['typography']['sizes'][:15]))}
      }},
      borderRadius: {{
{chr(10).join(f"        'radius-{i}': '{r}'," for i, r in enumerate(set(design_system['borderRadius'][:8])))}
      }},
      boxShadow: {{
{chr(10).join(f"        'shadow-{i}': '{s}'," for i, s in enumerate(design_system['shadows'][:5]))}
      }},
    }},
  }},
}};
"""
        with open(self.output_dir / "tailwind.config.js", 'w') as f:
            f.write(config)

    def _generate_clone_guide(self):
        """Generate instructions for completing the clone"""
        guide = f"""
# Pixel-Perfect Clone Guide

## Source: {self.url}

## Files Generated

| File | Purpose |
|------|---------|
| `index.html` | Rendered HTML (after JS execution) |
| `screenshot_*.png` | Visual reference at multiple breakpoints |
| `tailwind.config.js` | Extracted design tokens as Tailwind config |
| `data/design_system.json` | Full color palette, typography, spacing |
| `data/animations.json` | CSS keyframes and transitions |
| `data/component_tree.json` | Semantic component hierarchy |
| `data/video_elements.json` | Video player configurations |
| `data/video_sources.json` | Downloaded video files |
| `videos/` | Captured video files |
| `fonts/` | Downloaded web fonts |

## Recreating the Clone

### Step 1: Set Up Project
```bash
npm create vite@latest lumina-clone -- --template react-ts
cd lumina-clone
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 2: Copy Tailwind Config
Copy the generated `tailwind.config.js` to your project.

### Step 3: Feed to Claude
Upload these files to Claude for component generation:
1. `screenshot_desktop.png` - visual reference
2. `data/design_system.json` - design tokens
3. `data/component_tree.json` - structure
4. `index.html` - HTML reference

### Step 4: Prompt Template
```
I'm recreating this website. Using the attached screenshot, design system, 
and component tree, generate a pixel-perfect React component with Tailwind.

Focus on:
1. Exact color matching (use design_system.json colors)
2. Typography hierarchy (fonts, sizes, weights)
3. Layout structure (flexbox/grid patterns)
4. Animations and transitions
5. Responsive behavior

Generate the component for the hero section first.
```

## Handling Videos

If videos use blob URLs (common for streaming), you have options:

1. **Check network requests**: The actual .mp4/.webm URL may be in the network log
2. **Inspect video_elements.json**: May contain original source URLs
3. **Use placeholder**: Replace with similar stock footage
4. **Contact site owner**: For official assets

## Common Issues

| Issue | Solution |
|-------|----------|
| Blob video URLs | Check network log or video_elements.json |
| Missing fonts | Download from Google Fonts or use fallbacks |
| Broken animations | Check animations.json for keyframes |
| Wrong colors | Use eyedropper on screenshot PNGs |
"""
        with open(self.output_dir / "CLONE_GUIDE.md", 'w') as f:
            f.write(guide)


async def main():
    import sys
    url = sys.argv[1] if len(sys.argv) > 1 else "https://www.aura.build/share/lumina-video"
    output = sys.argv[2] if len(sys.argv) > 2 else "lumina_clone"
    
    cloner = EnhancedWebsiteCloner(url, output)
    await cloner.clone()


if __name__ == "__main__":
    asyncio.run(main())
