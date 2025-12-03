#!/usr/bin/env python3
"""
Comprehensive Website Cloner
Captures: HTML, CSS, JS, videos, images, fonts, network requests, and computed styles
"""

import asyncio
import json
import base64
import re
import os
from pathlib import Path
from urllib.parse import urlparse, urljoin
from playwright.async_api import async_playwright
import hashlib


class WebsiteCloner:
    def __init__(self, url: str, output_dir: str = "cloned_site"):
        self.url = url
        self.output_dir = Path(output_dir)
        self.assets = {
            "videos": [],
            "images": [],
            "stylesheets": [],
            "scripts": [],
            "fonts": [],
            "other": []
        }
        self.network_requests = []
        self.computed_styles = {}
        self.color_palette = set()
        self.font_families = set()
        
    async def clone(self):
        """Main cloning method"""
        # Create output directories
        for subdir in ["videos", "images", "css", "js", "fonts", "data"]:
            (self.output_dir / subdir).mkdir(parents=True, exist_ok=True)
        
        async with async_playwright() as p:
            # Launch browser with video/media support
            browser = await p.chromium.launch(
                headless=True,
                args=[
                    '--autoplay-policy=no-user-gesture-required',
                    '--disable-web-security',
                ]
            )
            
            context = await browser.new_context(
                viewport={'width': 1920, 'height': 1080},
                user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                accept_downloads=True,
            )
            
            page = await context.new_page()
            
            # Set up network interception to capture ALL requests
            await self._setup_network_interception(page)
            
            print(f"[*] Navigating to {self.url}")
            await page.goto(self.url, wait_until="networkidle", timeout=60000)
            
            # Wait for dynamic content
            print("[*] Waiting for dynamic content...")
            await page.wait_for_timeout(5000)
            
            # Scroll through page to trigger lazy loading
            await self._scroll_page(page)
            
            # Extract all data
            print("[*] Extracting HTML...")
            html = await self._extract_html(page)
            
            print("[*] Extracting computed styles...")
            await self._extract_computed_styles(page)
            
            print("[*] Extracting inline styles and stylesheets...")
            css_data = await self._extract_all_css(page)
            
            print("[*] Extracting scripts...")
            js_data = await self._extract_scripts(page)
            
            print("[*] Finding video sources...")
            await self._extract_video_sources(page)
            
            print("[*] Taking screenshots...")
            await self._take_screenshots(page)
            
            print("[*] Extracting design tokens...")
            design_tokens = await self._extract_design_tokens(page)
            
            # Download all captured assets
            print("[*] Downloading assets...")
            await self._download_assets()
            
            # Save everything
            self._save_html(html)
            self._save_css(css_data)
            self._save_js(js_data)
            self._save_network_log()
            self._save_design_tokens(design_tokens)
            self._save_analysis_report()
            
            await browser.close()
            
        print(f"\n[✓] Cloning complete! Output saved to: {self.output_dir}")
        return self.output_dir

    async def _setup_network_interception(self, page):
        """Intercept all network requests to capture resources"""
        
        async def handle_response(response):
            try:
                url = response.url
                content_type = response.headers.get('content-type', '')
                
                request_data = {
                    "url": url,
                    "status": response.status,
                    "content_type": content_type,
                    "headers": dict(response.headers),
                }
                
                # Categorize and potentially download
                if 'video' in content_type or any(ext in url.lower() for ext in ['.mp4', '.webm', '.mov', '.m3u8']):
                    self.assets["videos"].append(url)
                    request_data["type"] = "video"
                elif 'image' in content_type or any(ext in url.lower() for ext in ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico']):
                    self.assets["images"].append(url)
                    request_data["type"] = "image"
                elif 'css' in content_type or '.css' in url.lower():
                    self.assets["stylesheets"].append(url)
                    request_data["type"] = "stylesheet"
                    # Try to get CSS content
                    try:
                        body = await response.body()
                        request_data["content"] = body.decode('utf-8', errors='ignore')
                    except:
                        pass
                elif 'javascript' in content_type or '.js' in url.lower():
                    self.assets["scripts"].append(url)
                    request_data["type"] = "script"
                elif 'font' in content_type or any(ext in url.lower() for ext in ['.woff', '.woff2', '.ttf', '.otf', '.eot']):
                    self.assets["fonts"].append(url)
                    request_data["type"] = "font"
                else:
                    request_data["type"] = "other"
                
                self.network_requests.append(request_data)
                
            except Exception as e:
                pass  # Silently handle errors for resources we can't access
        
        page.on("response", handle_response)

    async def _scroll_page(self, page):
        """Scroll through page to trigger lazy loading"""
        print("[*] Scrolling to trigger lazy-loaded content...")
        
        await page.evaluate("""
            async () => {
                const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
                const scrollHeight = document.body.scrollHeight;
                const viewportHeight = window.innerHeight;
                
                for (let i = 0; i < scrollHeight; i += viewportHeight / 2) {
                    window.scrollTo(0, i);
                    await delay(300);
                }
                
                // Scroll back to top
                window.scrollTo(0, 0);
                await delay(500);
            }
        """)

    async def _extract_html(self, page):
        """Extract full HTML with preserved structure"""
        html = await page.content()
        
        # Also get the outer HTML of specific important elements
        important_elements = await page.evaluate("""
            () => {
                const elements = {};
                
                // Get specific sections
                const selectors = ['header', 'nav', 'main', 'footer', 'section', '[class*="hero"]', '[class*="video"]'];
                selectors.forEach(sel => {
                    const el = document.querySelector(sel);
                    if (el) {
                        elements[sel] = el.outerHTML;
                    }
                });
                
                return elements;
            }
        """)
        
        return {"full_html": html, "sections": important_elements}

    async def _extract_computed_styles(self, page):
        """Extract computed styles for all elements"""
        self.computed_styles = await page.evaluate("""
            () => {
                const styles = {};
                const elements = document.querySelectorAll('*');
                
                elements.forEach((el, index) => {
                    const computed = window.getComputedStyle(el);
                    const tag = el.tagName.toLowerCase();
                    const classes = el.className.toString();
                    const id = el.id;
                    
                    const key = `${tag}${id ? '#' + id : ''}${classes ? '.' + classes.split(' ').join('.') : ''}_${index}`;
                    
                    styles[key] = {
                        // Typography
                        fontFamily: computed.fontFamily,
                        fontSize: computed.fontSize,
                        fontWeight: computed.fontWeight,
                        lineHeight: computed.lineHeight,
                        letterSpacing: computed.letterSpacing,
                        textTransform: computed.textTransform,
                        
                        // Colors
                        color: computed.color,
                        backgroundColor: computed.backgroundColor,
                        
                        // Layout
                        display: computed.display,
                        position: computed.position,
                        width: computed.width,
                        height: computed.height,
                        padding: computed.padding,
                        margin: computed.margin,
                        
                        // Flexbox/Grid
                        flexDirection: computed.flexDirection,
                        justifyContent: computed.justifyContent,
                        alignItems: computed.alignItems,
                        gap: computed.gap,
                        gridTemplateColumns: computed.gridTemplateColumns,
                        
                        // Effects
                        boxShadow: computed.boxShadow,
                        borderRadius: computed.borderRadius,
                        opacity: computed.opacity,
                        transform: computed.transform,
                        transition: computed.transition,
                    };
                });
                
                return styles;
            }
        """)

    async def _extract_all_css(self, page):
        """Extract all CSS including inline styles and stylesheets"""
        css_data = await page.evaluate("""
            () => {
                const result = {
                    inline_styles: [],
                    stylesheet_rules: [],
                    css_variables: {},
                    media_queries: []
                };
                
                // Get inline styles
                document.querySelectorAll('[style]').forEach(el => {
                    result.inline_styles.push({
                        element: el.tagName,
                        classes: el.className.toString(),
                        style: el.getAttribute('style')
                    });
                });
                
                // Get CSS variables from :root
                const rootStyles = getComputedStyle(document.documentElement);
                const cssVarRegex = /--[a-zA-Z0-9-]+/g;
                const allCSS = Array.from(document.styleSheets).map(sheet => {
                    try {
                        return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\\n');
                    } catch(e) {
                        return '';
                    }
                }).join('\\n');
                
                const cssVars = allCSS.match(cssVarRegex) || [];
                cssVars.forEach(varName => {
                    result.css_variables[varName] = rootStyles.getPropertyValue(varName).trim();
                });
                
                // Get all stylesheet rules
                Array.from(document.styleSheets).forEach(sheet => {
                    try {
                        Array.from(sheet.cssRules).forEach(rule => {
                            if (rule.type === CSSRule.STYLE_RULE) {
                                result.stylesheet_rules.push({
                                    selector: rule.selectorText,
                                    styles: rule.style.cssText
                                });
                            } else if (rule.type === CSSRule.MEDIA_RULE) {
                                result.media_queries.push({
                                    condition: rule.conditionText,
                                    rules: Array.from(rule.cssRules).map(r => ({
                                        selector: r.selectorText,
                                        styles: r.style?.cssText
                                    }))
                                });
                            }
                        });
                    } catch(e) {
                        // CORS blocked stylesheets
                    }
                });
                
                return result;
            }
        """)
        
        return css_data

    async def _extract_scripts(self, page):
        """Extract JavaScript code"""
        scripts = await page.evaluate("""
            () => {
                const scripts = [];
                document.querySelectorAll('script').forEach(script => {
                    scripts.push({
                        src: script.src || null,
                        type: script.type || 'text/javascript',
                        content: script.src ? null : script.textContent,
                        async: script.async,
                        defer: script.defer
                    });
                });
                return scripts;
            }
        """)
        return scripts

    async def _extract_video_sources(self, page):
        """Extract all video sources including blob URLs"""
        video_info = await page.evaluate("""
            () => {
                const videos = [];
                
                // Regular video elements
                document.querySelectorAll('video').forEach(video => {
                    const sources = [];
                    
                    // Direct src
                    if (video.src) sources.push(video.src);
                    if (video.currentSrc) sources.push(video.currentSrc);
                    
                    // Source elements
                    video.querySelectorAll('source').forEach(source => {
                        sources.push(source.src);
                    });
                    
                    videos.push({
                        sources: [...new Set(sources)],
                        poster: video.poster,
                        autoplay: video.autoplay,
                        loop: video.loop,
                        muted: video.muted,
                        controls: video.controls,
                        width: video.videoWidth,
                        height: video.videoHeight,
                        duration: video.duration,
                        styles: {
                            position: getComputedStyle(video).position,
                            objectFit: getComputedStyle(video).objectFit,
                            width: getComputedStyle(video).width,
                            height: getComputedStyle(video).height,
                        }
                    });
                });
                
                // Background videos in CSS or data attributes
                document.querySelectorAll('[data-video-src], [data-src]').forEach(el => {
                    const src = el.dataset.videoSrc || el.dataset.src;
                    if (src && (src.includes('.mp4') || src.includes('.webm'))) {
                        videos.push({ sources: [src], type: 'data-attribute' });
                    }
                });
                
                return videos;
            }
        """)
        
        # Add found video sources to assets
        for video in video_info:
            for src in video.get('sources', []):
                if src and not src.startswith('blob:'):
                    self.assets["videos"].append(src)
        
        # Save video metadata
        with open(self.output_dir / "data" / "video_info.json", 'w') as f:
            json.dump(video_info, f, indent=2)

    async def _take_screenshots(self, page):
        """Take various screenshots"""
        # Full page screenshot
        await page.screenshot(
            path=str(self.output_dir / "screenshot_full.png"),
            full_page=True
        )
        
        # Viewport screenshot
        await page.screenshot(
            path=str(self.output_dir / "screenshot_viewport.png"),
            full_page=False
        )
        
        # Mobile viewport
        await page.set_viewport_size({"width": 390, "height": 844})
        await page.wait_for_timeout(1000)
        await page.screenshot(
            path=str(self.output_dir / "screenshot_mobile.png"),
            full_page=True
        )
        
        # Reset viewport
        await page.set_viewport_size({"width": 1920, "height": 1080})

    async def _extract_design_tokens(self, page):
        """Extract design system tokens"""
        tokens = await page.evaluate("""
            () => {
                const tokens = {
                    colors: new Set(),
                    fonts: new Set(),
                    fontSizes: new Set(),
                    spacing: new Set(),
                    borderRadius: new Set(),
                    shadows: new Set(),
                    transitions: new Set(),
                    zIndices: new Set(),
                };
                
                const rgbToHex = (rgb) => {
                    const match = rgb.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/);
                    if (!match) return rgb;
                    const r = parseInt(match[1]).toString(16).padStart(2, '0');
                    const g = parseInt(match[2]).toString(16).padStart(2, '0');
                    const b = parseInt(match[3]).toString(16).padStart(2, '0');
                    return `#${r}${g}${b}`;
                };
                
                document.querySelectorAll('*').forEach(el => {
                    const style = getComputedStyle(el);
                    
                    // Colors
                    if (style.color && style.color !== 'rgba(0, 0, 0, 0)') {
                        tokens.colors.add(rgbToHex(style.color));
                    }
                    if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                        tokens.colors.add(rgbToHex(style.backgroundColor));
                    }
                    
                    // Fonts
                    tokens.fonts.add(style.fontFamily.split(',')[0].trim().replace(/['"]/g, ''));
                    tokens.fontSizes.add(style.fontSize);
                    
                    // Spacing (padding/margin)
                    if (style.padding !== '0px') tokens.spacing.add(style.padding);
                    if (style.margin !== '0px') tokens.spacing.add(style.margin);
                    if (style.gap && style.gap !== 'normal') tokens.spacing.add(style.gap);
                    
                    // Border radius
                    if (style.borderRadius !== '0px') tokens.borderRadius.add(style.borderRadius);
                    
                    // Shadows
                    if (style.boxShadow !== 'none') tokens.shadows.add(style.boxShadow);
                    
                    // Transitions
                    if (style.transition !== 'all 0s ease 0s' && style.transition !== 'none') {
                        tokens.transitions.add(style.transition);
                    }
                    
                    // Z-index
                    if (style.zIndex !== 'auto') tokens.zIndices.add(style.zIndex);
                });
                
                // Convert Sets to Arrays
                return {
                    colors: [...tokens.colors].filter(c => c !== '#000000' && c !== 'transparent'),
                    fonts: [...tokens.fonts].filter(f => f && f !== 'inherit'),
                    fontSizes: [...tokens.fontSizes],
                    spacing: [...tokens.spacing].slice(0, 50),  // Limit
                    borderRadius: [...tokens.borderRadius],
                    shadows: [...tokens.shadows].slice(0, 20),
                    transitions: [...tokens.transitions].slice(0, 20),
                    zIndices: [...tokens.zIndices],
                };
            }
        """)
        
        return tokens

    async def _download_assets(self):
        """Download all captured assets"""
        import aiohttp
        
        async def download_file(session, url, category):
            try:
                async with session.get(url, timeout=aiohttp.ClientTimeout(total=30)) as response:
                    if response.status == 200:
                        content = await response.read()
                        
                        # Generate filename
                        parsed = urlparse(url)
                        filename = os.path.basename(parsed.path) or hashlib.md5(url.encode()).hexdigest()[:12]
                        
                        # Add extension if missing
                        if '.' not in filename:
                            content_type = response.headers.get('content-type', '')
                            if 'video/mp4' in content_type:
                                filename += '.mp4'
                            elif 'video/webm' in content_type:
                                filename += '.webm'
                        
                        # Determine save path
                        if category == "videos":
                            save_path = self.output_dir / "videos" / filename
                        elif category == "images":
                            save_path = self.output_dir / "images" / filename
                        elif category == "fonts":
                            save_path = self.output_dir / "fonts" / filename
                        elif category == "stylesheets":
                            save_path = self.output_dir / "css" / filename
                        elif category == "scripts":
                            save_path = self.output_dir / "js" / filename
                        else:
                            save_path = self.output_dir / "data" / filename
                        
                        with open(save_path, 'wb') as f:
                            f.write(content)
                        
                        print(f"    Downloaded: {filename}")
                        return True
            except Exception as e:
                print(f"    Failed: {url[:50]}... ({str(e)[:30]})")
                return False
        
        async with aiohttp.ClientSession() as session:
            for category, urls in self.assets.items():
                unique_urls = list(set(urls))
                if unique_urls:
                    print(f"\n  Downloading {len(unique_urls)} {category}...")
                    tasks = [download_file(session, url, category) for url in unique_urls if url and not url.startswith('blob:')]
                    await asyncio.gather(*tasks)

    def _save_html(self, html_data):
        """Save HTML files"""
        # Full HTML
        with open(self.output_dir / "index.html", 'w', encoding='utf-8') as f:
            f.write(html_data["full_html"])
        
        # Sections
        with open(self.output_dir / "data" / "html_sections.json", 'w', encoding='utf-8') as f:
            json.dump(html_data["sections"], f, indent=2)

    def _save_css(self, css_data):
        """Save CSS data"""
        # Combined CSS file
        combined_css = []
        
        # CSS Variables
        if css_data.get("css_variables"):
            combined_css.append(":root {")
            for var, value in css_data["css_variables"].items():
                if value:
                    combined_css.append(f"  {var}: {value};")
            combined_css.append("}\n")
        
        # Stylesheet rules
        for rule in css_data.get("stylesheet_rules", []):
            if rule.get("selector") and rule.get("styles"):
                combined_css.append(f"{rule['selector']} {{ {rule['styles']} }}")
        
        with open(self.output_dir / "css" / "extracted_styles.css", 'w', encoding='utf-8') as f:
            f.write("\n".join(combined_css))
        
        # Full CSS data as JSON
        with open(self.output_dir / "data" / "css_data.json", 'w', encoding='utf-8') as f:
            json.dump(css_data, f, indent=2)
        
        # Computed styles
        with open(self.output_dir / "data" / "computed_styles.json", 'w', encoding='utf-8') as f:
            json.dump(self.computed_styles, f, indent=2)

    def _save_js(self, js_data):
        """Save JavaScript data"""
        with open(self.output_dir / "data" / "scripts.json", 'w', encoding='utf-8') as f:
            json.dump(js_data, f, indent=2)
        
        # Save inline scripts separately
        for i, script in enumerate(js_data):
            if script.get("content"):
                with open(self.output_dir / "js" / f"inline_script_{i}.js", 'w', encoding='utf-8') as f:
                    f.write(script["content"])

    def _save_network_log(self):
        """Save network request log"""
        with open(self.output_dir / "data" / "network_requests.json", 'w', encoding='utf-8') as f:
            json.dump(self.network_requests, f, indent=2)
        
        # Create asset manifest
        manifest = {
            "videos": list(set(self.assets["videos"])),
            "images": list(set(self.assets["images"])),
            "stylesheets": list(set(self.assets["stylesheets"])),
            "scripts": list(set(self.assets["scripts"])),
            "fonts": list(set(self.assets["fonts"])),
        }
        
        with open(self.output_dir / "data" / "asset_manifest.json", 'w', encoding='utf-8') as f:
            json.dump(manifest, f, indent=2)

    def _save_design_tokens(self, tokens):
        """Save design tokens"""
        with open(self.output_dir / "data" / "design_tokens.json", 'w', encoding='utf-8') as f:
            json.dump(tokens, f, indent=2)
        
        # Also create a CSS variables file from tokens
        css_vars = [":root {"]
        
        for i, color in enumerate(tokens.get("colors", [])[:20]):
            css_vars.append(f"  --color-{i}: {color};")
        
        for i, font in enumerate(tokens.get("fonts", [])[:5]):
            css_vars.append(f"  --font-{i}: {font};")
        
        css_vars.append("}")
        
        with open(self.output_dir / "css" / "design_tokens.css", 'w') as f:
            f.write("\n".join(css_vars))

    def _save_analysis_report(self):
        """Generate a human-readable analysis report"""
        report = f"""
# Website Clone Analysis Report
## Source: {self.url}

## Assets Captured

### Videos: {len(set(self.assets['videos']))}
{chr(10).join('- ' + url for url in list(set(self.assets['videos']))[:10])}

### Images: {len(set(self.assets['images']))}

### Stylesheets: {len(set(self.assets['stylesheets']))}
{chr(10).join('- ' + url for url in list(set(self.assets['stylesheets']))[:10])}

### Fonts: {len(set(self.assets['fonts']))}
{chr(10).join('- ' + url for url in list(set(self.assets['fonts']))[:10])}

### Scripts: {len(set(self.assets['scripts']))}

## Total Network Requests: {len(self.network_requests)}

## Output Structure
```
{self.output_dir}/
├── index.html              # Full HTML
├── screenshot_full.png     # Full page screenshot
├── screenshot_viewport.png # Viewport screenshot  
├── screenshot_mobile.png   # Mobile screenshot
├── css/
│   ├── extracted_styles.css
│   └── design_tokens.css
├── js/
│   └── inline_script_*.js
├── videos/
├── images/
├── fonts/
└── data/
    ├── network_requests.json
    ├── asset_manifest.json
    ├── design_tokens.json
    ├── computed_styles.json
    ├── css_data.json
    ├── html_sections.json
    └── video_info.json
```

## Next Steps for Pixel-Perfect Clone

1. Review `design_tokens.json` for color palette and typography
2. Use `computed_styles.json` for precise element styling
3. Check `video_info.json` for video element configurations
4. Reference screenshots for visual accuracy
5. Feed these files to Claude for React/Tailwind component generation
"""
        
        with open(self.output_dir / "ANALYSIS_REPORT.md", 'w') as f:
            f.write(report)


async def main():
    import sys
    
    url = sys.argv[1] if len(sys.argv) > 1 else "https://www.aura.build/share/lumina-video"
    output_dir = sys.argv[2] if len(sys.argv) > 2 else "cloned_site"
    
    cloner = WebsiteCloner(url, output_dir)
    await cloner.clone()


if __name__ == "__main__":
    asyncio.run(main())
