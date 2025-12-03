#!/usr/bin/env python3
"""
Comprehensive Website Extractor using Playwright
Extracts everything needed for pixel-perfect cloning:
- Full HTML/DOM structure
- All CSS (inline, embedded, external)
- JavaScript files
- Fonts (files + usage info)
- Images and videos
- Network requests
- Animations and keyframes
- Color palette
- Typography system
- Layout information
"""

import asyncio
import base64
import json
import os
import re
import hashlib
from pathlib import Path
from urllib.parse import urljoin, urlparse
from datetime import datetime

from playwright.async_api import async_playwright, Page, BrowserContext


class WebsiteExtractor:
    def __init__(self, url: str, output_dir: str = "extracted_site"):
        self.url = url
        self.output_dir = Path(output_dir)
        self.assets_dir = self.output_dir / "assets"
        self.fonts_dir = self.assets_dir / "fonts"
        self.images_dir = self.assets_dir / "images"
        self.videos_dir = self.assets_dir / "videos"
        self.css_dir = self.assets_dir / "css"
        self.js_dir = self.assets_dir / "js"
        
        # Collected data
        self.network_requests = []
        self.fonts = {}
        self.stylesheets = []
        self.scripts = []
        self.images = []
        self.videos = []
        self.animations = []
        self.colors = set()
        self.typography = {}
        self.html = ""
        self.computed_styles = {}
        
    def setup_directories(self):
        """Create output directory structure"""
        for dir_path in [self.output_dir, self.assets_dir, self.fonts_dir, 
                         self.images_dir, self.videos_dir, self.css_dir, self.js_dir]:
            dir_path.mkdir(parents=True, exist_ok=True)
    
    async def capture_network(self, response):
        """Capture all network responses"""
        try:
            url = response.url
            content_type = response.headers.get('content-type', '')
            status = response.status
            
            request_info = {
                'url': url,
                'status': status,
                'content_type': content_type,
                'headers': dict(response.headers),
            }
            
            # Capture body for relevant content types
            if status == 200:
                try:
                    body = await response.body()
                    
                    # Font files
                    if any(ext in url.lower() for ext in ['.woff2', '.woff', '.ttf', '.otf', '.eot']) or \
                       'font' in content_type.lower():
                        filename = self.get_safe_filename(url, 'fonts')
                        filepath = self.fonts_dir / filename
                        filepath.write_bytes(body)
                        self.fonts[url] = {
                            'local_path': str(filepath),
                            'filename': filename,
                            'size': len(body),
                            'content_type': content_type
                        }
                        request_info['saved_to'] = str(filepath)
                    
                    # CSS files
                    elif url.endswith('.css') or 'text/css' in content_type:
                        filename = self.get_safe_filename(url, 'css')
                        filepath = self.css_dir / filename
                        filepath.write_bytes(body)
                        self.stylesheets.append({
                            'url': url,
                            'local_path': str(filepath),
                            'content': body.decode('utf-8', errors='ignore')
                        })
                        request_info['saved_to'] = str(filepath)
                    
                    # JavaScript files
                    elif url.endswith('.js') or 'javascript' in content_type:
                        filename = self.get_safe_filename(url, 'js')
                        filepath = self.js_dir / filename
                        filepath.write_bytes(body)
                        self.scripts.append({
                            'url': url,
                            'local_path': str(filepath),
                        })
                        request_info['saved_to'] = str(filepath)
                    
                    # Images
                    elif any(ext in url.lower() for ext in ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico']) or \
                         'image' in content_type:
                        filename = self.get_safe_filename(url, 'images')
                        filepath = self.images_dir / filename
                        filepath.write_bytes(body)
                        self.images.append({
                            'url': url,
                            'local_path': str(filepath),
                            'size': len(body),
                            'content_type': content_type
                        })
                        request_info['saved_to'] = str(filepath)
                    
                    # Videos
                    elif any(ext in url.lower() for ext in ['.mp4', '.webm', '.mov', '.avi', '.m3u8']) or \
                         'video' in content_type:
                        filename = self.get_safe_filename(url, 'videos')
                        filepath = self.videos_dir / filename
                        filepath.write_bytes(body)
                        self.videos.append({
                            'url': url,
                            'local_path': str(filepath),
                            'size': len(body),
                            'content_type': content_type
                        })
                        request_info['saved_to'] = str(filepath)
                        
                except Exception as e:
                    request_info['body_error'] = str(e)
            
            self.network_requests.append(request_info)
            
        except Exception as e:
            print(f"Error capturing network response: {e}")
    
    def get_safe_filename(self, url: str, category: str) -> str:
        """Generate a safe filename from URL"""
        parsed = urlparse(url)
        path = parsed.path
        
        # Get original filename
        original_name = os.path.basename(path) or 'index'
        
        # Clean up the filename
        original_name = re.sub(r'[^\w\-_\.]', '_', original_name)
        
        # Add hash for uniqueness
        url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
        
        # Ensure extension
        if '.' not in original_name:
            ext_map = {
                'fonts': '.woff2',
                'css': '.css',
                'js': '.js',
                'images': '.png',
                'videos': '.mp4'
            }
            original_name += ext_map.get(category, '')
        
        name, ext = os.path.splitext(original_name)
        return f"{name}_{url_hash}{ext}"
    
    async def extract_page_data(self, page: Page):
        """Extract comprehensive page data using JavaScript"""
        
        data = await page.evaluate("""
            () => {
                const result = {
                    html: document.documentElement.outerHTML,
                    title: document.title,
                    meta: {},
                    colors: [],
                    fonts: [],
                    typography: [],
                    animations: [],
                    elements: [],
                    cssVariables: {},
                    mediaQueries: [],
                    keyframes: [],
                    inlineStyles: [],
                    computedStyles: {}
                };
                
                // Extract meta tags
                document.querySelectorAll('meta').forEach(meta => {
                    const name = meta.getAttribute('name') || meta.getAttribute('property');
                    if (name) {
                        result.meta[name] = meta.getAttribute('content');
                    }
                });
                
                // Extract CSS variables from :root
                const rootStyles = getComputedStyle(document.documentElement);
                const cssVars = {};
                for (let i = 0; i < rootStyles.length; i++) {
                    const prop = rootStyles[i];
                    if (prop.startsWith('--')) {
                        cssVars[prop] = rootStyles.getPropertyValue(prop).trim();
                    }
                }
                result.cssVariables = cssVars;
                
                // Collect all unique colors and fonts
                const colors = new Set();
                const fonts = new Set();
                const typography = [];
                
                document.querySelectorAll('*').forEach(el => {
                    const style = getComputedStyle(el);
                    
                    // Colors
                    colors.add(style.color);
                    colors.add(style.backgroundColor);
                    colors.add(style.borderColor);
                    colors.add(style.outlineColor);
                    
                    // Fonts
                    fonts.add(style.fontFamily);
                    
                    // Typography details for text elements
                    if (['H1','H2','H3','H4','H5','H6','P','SPAN','A','LI','BUTTON'].includes(el.tagName)) {
                        typography.push({
                            tag: el.tagName,
                            className: el.className,
                            fontFamily: style.fontFamily,
                            fontSize: style.fontSize,
                            fontWeight: style.fontWeight,
                            lineHeight: style.lineHeight,
                            letterSpacing: style.letterSpacing,
                            textTransform: style.textTransform,
                            color: style.color,
                            text: el.innerText?.substring(0, 50)
                        });
                    }
                });
                
                result.colors = [...colors].filter(c => c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent');
                result.fonts = [...fonts].filter(f => f);
                result.typography = typography.slice(0, 100); // Limit to prevent huge output
                
                // Extract keyframes and animations from stylesheets
                const keyframes = [];
                const mediaQueries = [];
                
                try {
                    for (const sheet of document.styleSheets) {
                        try {
                            const rules = sheet.cssRules || sheet.rules;
                            for (const rule of rules) {
                                if (rule instanceof CSSKeyframesRule) {
                                    let keyframeCSS = `@keyframes ${rule.name} {\\n`;
                                    for (const keyframe of rule.cssRules) {
                                        keyframeCSS += `  ${keyframe.keyText} { ${keyframe.style.cssText} }\\n`;
                                    }
                                    keyframeCSS += '}';
                                    keyframes.push({
                                        name: rule.name,
                                        css: keyframeCSS
                                    });
                                }
                                if (rule instanceof CSSMediaRule) {
                                    mediaQueries.push({
                                        condition: rule.conditionText,
                                        css: rule.cssText
                                    });
                                }
                            }
                        } catch (e) {
                            // Cross-origin stylesheet, skip
                        }
                    }
                } catch (e) {}
                
                result.keyframes = keyframes;
                result.mediaQueries = mediaQueries.slice(0, 50);
                
                // Extract elements with animations
                const animatedElements = [];
                document.querySelectorAll('*').forEach(el => {
                    const style = getComputedStyle(el);
                    if (style.animation && style.animation !== 'none') {
                        animatedElements.push({
                            tag: el.tagName,
                            className: el.className,
                            id: el.id,
                            animation: style.animation,
                            animationName: style.animationName,
                            animationDuration: style.animationDuration,
                            animationTimingFunction: style.animationTimingFunction,
                            animationDelay: style.animationDelay,
                            animationIterationCount: style.animationIterationCount,
                            animationDirection: style.animationDirection,
                            animationFillMode: style.animationFillMode
                        });
                    }
                    if (style.transition && style.transition !== 'none' && style.transition !== 'all 0s ease 0s') {
                        animatedElements.push({
                            tag: el.tagName,
                            className: el.className,
                            id: el.id,
                            transition: style.transition,
                            transitionProperty: style.transitionProperty,
                            transitionDuration: style.transitionDuration,
                            transitionTimingFunction: style.transitionTimingFunction
                        });
                    }
                });
                result.animations = animatedElements;
                
                // Extract inline styles
                document.querySelectorAll('[style]').forEach(el => {
                    result.inlineStyles.push({
                        tag: el.tagName,
                        className: el.className,
                        id: el.id,
                        style: el.getAttribute('style')
                    });
                });
                
                // Extract key element computed styles for layout reconstruction
                const keySelectors = [
                    'body', 'header', 'nav', 'main', 'footer', 'section', 'article',
                    '.hero', '.container', '.wrapper', '[class*="grid"]', '[class*="flex"]'
                ];
                
                keySelectors.forEach(selector => {
                    try {
                        const els = document.querySelectorAll(selector);
                        els.forEach((el, i) => {
                            const style = getComputedStyle(el);
                            const key = `${selector}_${i}`;
                            result.computedStyles[key] = {
                                selector: selector,
                                tag: el.tagName,
                                className: el.className,
                                display: style.display,
                                position: style.position,
                                width: style.width,
                                maxWidth: style.maxWidth,
                                height: style.height,
                                padding: style.padding,
                                margin: style.margin,
                                gap: style.gap,
                                gridTemplateColumns: style.gridTemplateColumns,
                                gridTemplateRows: style.gridTemplateRows,
                                flexDirection: style.flexDirection,
                                justifyContent: style.justifyContent,
                                alignItems: style.alignItems,
                                backgroundColor: style.backgroundColor,
                                backgroundImage: style.backgroundImage,
                                borderRadius: style.borderRadius,
                                boxShadow: style.boxShadow,
                                overflow: style.overflow,
                                zIndex: style.zIndex
                            };
                        });
                    } catch (e) {}
                });
                
                // Extract all video sources
                const videoSources = [];
                document.querySelectorAll('video').forEach(video => {
                    videoSources.push({
                        src: video.src,
                        poster: video.poster,
                        autoplay: video.autoplay,
                        loop: video.loop,
                        muted: video.muted,
                        sources: [...video.querySelectorAll('source')].map(s => ({
                            src: s.src,
                            type: s.type
                        }))
                    });
                });
                result.videos = videoSources;
                
                // Extract background images
                const backgroundImages = [];
                document.querySelectorAll('*').forEach(el => {
                    const style = getComputedStyle(el);
                    if (style.backgroundImage && style.backgroundImage !== 'none') {
                        backgroundImages.push({
                            tag: el.tagName,
                            className: el.className,
                            backgroundImage: style.backgroundImage,
                            backgroundSize: style.backgroundSize,
                            backgroundPosition: style.backgroundPosition,
                            backgroundRepeat: style.backgroundRepeat
                        });
                    }
                });
                result.backgroundImages = backgroundImages;
                
                // Extract all linked resources
                const links = [];
                document.querySelectorAll('link').forEach(link => {
                    links.push({
                        rel: link.rel,
                        href: link.href,
                        type: link.type,
                        as: link.as
                    });
                });
                result.links = links;
                
                // Extract @font-face rules
                const fontFaces = [];
                try {
                    for (const sheet of document.styleSheets) {
                        try {
                            const rules = sheet.cssRules || sheet.rules;
                            for (const rule of rules) {
                                if (rule instanceof CSSFontFaceRule) {
                                    fontFaces.push({
                                        css: rule.cssText,
                                        fontFamily: rule.style.fontFamily,
                                        src: rule.style.src,
                                        fontWeight: rule.style.fontWeight,
                                        fontStyle: rule.style.fontStyle,
                                        fontDisplay: rule.style.fontDisplay
                                    });
                                }
                            }
                        } catch (e) {}
                    }
                } catch (e) {}
                result.fontFaces = fontFaces;
                
                return result;
            }
        """)
        
        return data
    
    async def extract_all_stylesheets(self, page: Page):
        """Extract all CSS including cross-origin sheets"""
        
        css_content = await page.evaluate("""
            async () => {
                const sheets = [];
                
                for (const sheet of document.styleSheets) {
                    const sheetInfo = {
                        href: sheet.href,
                        rules: []
                    };
                    
                    try {
                        // Try to access rules directly
                        const rules = sheet.cssRules || sheet.rules;
                        for (const rule of rules) {
                            sheetInfo.rules.push(rule.cssText);
                        }
                    } catch (e) {
                        // Cross-origin, need to fetch
                        if (sheet.href) {
                            try {
                                const response = await fetch(sheet.href);
                                const text = await response.text();
                                sheetInfo.rules.push(text);
                                sheetInfo.fetched = true;
                            } catch (fetchError) {
                                sheetInfo.error = fetchError.message;
                            }
                        }
                    }
                    
                    sheets.push(sheetInfo);
                }
                
                // Also get <style> tags
                document.querySelectorAll('style').forEach((style, i) => {
                    sheets.push({
                        href: null,
                        isInline: true,
                        index: i,
                        rules: [style.textContent]
                    });
                });
                
                return sheets;
            }
        """)
        
        return css_content
    
    async def take_screenshots(self, page: Page):
        """Take various screenshots for reference"""
        
        screenshots_dir = self.output_dir / "screenshots"
        screenshots_dir.mkdir(exist_ok=True)
        
        # Full page screenshot
        await page.screenshot(
            path=str(screenshots_dir / "full_page.png"),
            full_page=True
        )
        
        # Viewport screenshot
        await page.screenshot(
            path=str(screenshots_dir / "viewport.png")
        )
        
        # Mobile viewport
        await page.set_viewport_size({"width": 375, "height": 812})
        await page.screenshot(
            path=str(screenshots_dir / "mobile.png"),
            full_page=True
        )
        
        # Tablet viewport
        await page.set_viewport_size({"width": 768, "height": 1024})
        await page.screenshot(
            path=str(screenshots_dir / "tablet.png"),
            full_page=True
        )
        
        # Reset to desktop
        await page.set_viewport_size({"width": 1920, "height": 1080})
    
    async def extract(self):
        """Main extraction method"""
        
        self.setup_directories()
        
        print(f"🚀 Starting extraction of: {self.url}")
        print(f"📁 Output directory: {self.output_dir}")
        
        async with async_playwright() as p:
            # Launch browser with appropriate settings
            browser = await p.chromium.launch(
                headless=True,
                args=[
                    '--disable-web-security',  # Allow cross-origin requests
                    '--disable-features=IsolateOrigins,site-per-process'
                ]
            )
            
            context = await browser.new_context(
                viewport={"width": 1920, "height": 1080},
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            )
            
            page = await context.new_page()
            
            # Set up network interception
            page.on("response", self.capture_network)
            
            print("⏳ Loading page...")
            
            # Navigate and wait for full load
            await page.goto(self.url, wait_until="networkidle", timeout=60000)
            
            # Additional wait for dynamic content
            await page.wait_for_timeout(3000)
            
            # Scroll to trigger lazy-loaded content
            print("📜 Scrolling to load lazy content...")
            await page.evaluate("""
                async () => {
                    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
                    const height = document.body.scrollHeight;
                    const step = window.innerHeight;
                    
                    for (let i = 0; i < height; i += step) {
                        window.scrollTo(0, i);
                        await delay(200);
                    }
                    
                    // Scroll back to top
                    window.scrollTo(0, 0);
                    await delay(500);
                }
            """)
            
            await page.wait_for_timeout(2000)
            
            print("📸 Taking screenshots...")
            await self.take_screenshots(page)
            
            print("🔍 Extracting page data...")
            page_data = await self.extract_page_data(page)
            
            print("🎨 Extracting stylesheets...")
            css_data = await self.extract_all_stylesheets(page)
            
            # Store HTML
            self.html = page_data['html']
            (self.output_dir / "index.html").write_text(self.html, encoding='utf-8')
            
            # Compile comprehensive report
            report = {
                "url": self.url,
                "extracted_at": datetime.now().isoformat(),
                "title": page_data['title'],
                "meta": page_data['meta'],
                
                "design_system": {
                    "colors": self.extract_color_palette(page_data['colors']),
                    "css_variables": page_data['cssVariables'],
                    "fonts": page_data['fonts'],
                    "font_faces": page_data['fontFaces'],
                    "typography": self.dedupe_typography(page_data['typography'])
                },
                
                "layout": {
                    "computed_styles": page_data['computedStyles']
                },
                
                "animations": {
                    "keyframes": page_data['keyframes'],
                    "animated_elements": page_data['animations']
                },
                
                "media": {
                    "videos": page_data['videos'],
                    "background_images": page_data['backgroundImages'],
                    "images": self.images
                },
                
                "assets": {
                    "fonts": self.fonts,
                    "stylesheets": [{"url": s['url'], "local_path": s['local_path']} for s in self.stylesheets],
                    "scripts": self.scripts,
                    "images": self.images,
                    "videos": self.videos
                },
                
                "stylesheets_content": css_data,
                
                "network_log": self.network_requests,
                
                "links": page_data['links']
            }
            
            # Save report
            report_path = self.output_dir / "extraction_report.json"
            with open(report_path, 'w', encoding='utf-8') as f:
                json.dump(report, f, indent=2, default=str)
            
            # Save combined CSS
            combined_css = self.combine_css(css_data)
            (self.output_dir / "combined_styles.css").write_text(combined_css, encoding='utf-8')
            
            # Generate summary
            summary = self.generate_summary(report)
            (self.output_dir / "SUMMARY.md").write_text(summary, encoding='utf-8')
            
            await browser.close()
            
            print(f"\n✅ Extraction complete!")
            print(f"📄 HTML: {self.output_dir / 'index.html'}")
            print(f"🎨 CSS: {self.output_dir / 'combined_styles.css'}")
            print(f"📊 Report: {report_path}")
            print(f"📝 Summary: {self.output_dir / 'SUMMARY.md'}")
            
            return report
    
    def extract_color_palette(self, colors: list) -> dict:
        """Organize colors into a structured palette"""
        
        palette = {
            "all": [],
            "hex": [],
            "rgb": [],
            "rgba": [],
            "hsl": []
        }
        
        for color in colors:
            if not color:
                continue
                
            palette["all"].append(color)
            
            if color.startswith('#'):
                palette["hex"].append(color)
            elif color.startswith('rgb('):
                palette["rgb"].append(color)
            elif color.startswith('rgba('):
                palette["rgba"].append(color)
            elif color.startswith('hsl'):
                palette["hsl"].append(color)
        
        # Dedupe
        for key in palette:
            palette[key] = list(set(palette[key]))
        
        return palette
    
    def dedupe_typography(self, typography: list) -> list:
        """Remove duplicate typography entries"""
        
        seen = set()
        unique = []
        
        for t in typography:
            key = (t['tag'], t['fontFamily'], t['fontSize'], t['fontWeight'])
            if key not in seen:
                seen.add(key)
                unique.append(t)
        
        return unique
    
    def combine_css(self, css_data: list) -> str:
        """Combine all CSS into a single file"""
        
        combined = "/* Combined CSS extracted from website */\n\n"
        
        for i, sheet in enumerate(css_data):
            if sheet.get('href'):
                combined += f"\n/* === External: {sheet['href']} === */\n"
            else:
                combined += f"\n/* === Inline Style #{sheet.get('index', i)} === */\n"
            
            for rule in sheet.get('rules', []):
                combined += rule + "\n"
        
        return combined
    
    def generate_summary(self, report: dict) -> str:
        """Generate a human-readable summary"""
        
        # Safely get nested values with defaults
        design = report.get('design_system', {})
        colors = design.get('colors', {})
        assets = report.get('assets', {})
        animations = report.get('animations', {})
        
        hex_colors = colors.get('hex', [])[:20]
        css_vars = design.get('css_variables', {})
        fonts = design.get('fonts', [])[:10]
        font_files = assets.get('fonts', {})
        typography = design.get('typography', [])[:15]
        keyframes = animations.get('keyframes', [])
        animated_els = animations.get('animated_elements', [])
        
        summary = f"""# Website Extraction Summary

## Source
- **URL**: {report.get('url', 'N/A')}
- **Title**: {report.get('title', 'N/A')}
- **Extracted**: {report.get('extracted_at', 'N/A')}

## Design System

### Color Palette
Total unique colors: {len(colors.get('all', []))}

**Hex Colors:**
{chr(10).join(f'- `{c}`' for c in hex_colors) if hex_colors else '- None found'}

### CSS Variables
```css
{chr(10).join(f'{k}: {v};' for k, v in list(css_vars.items())[:30]) if css_vars else '/* None found */'}
```

### Fonts Used
{chr(10).join(f'- {f}' for f in fonts) if fonts else '- None found'}

### Font Files Downloaded
{chr(10).join(f'- {f.get("filename", "unknown")}' for f in font_files.values()) if font_files else '- None downloaded'}

### Typography Samples
| Tag | Font | Size | Weight |
|-----|------|------|--------|
{chr(10).join(f'| {t.get("tag", "?")} | {str(t.get("fontFamily", ""))[:30]}... | {t.get("fontSize", "?")} | {t.get("fontWeight", "?")} |' for t in typography) if typography else '| - | - | - | - |'}

## Animations

### Keyframes Defined
{chr(10).join(f'- `{kf.get("name", "unknown")}`' for kf in keyframes) if keyframes else '- None found'}

### Animated Elements
{len(animated_els)} elements with animations/transitions

## Assets Downloaded

### Fonts
{len(font_files)} font files

### Images  
{len(assets.get('images', []))} images

### Videos
{len(assets.get('videos', []))} videos

### Stylesheets
{len(assets.get('stylesheets', []))} CSS files

### Scripts
{len(assets.get('scripts', []))} JS files

## Files Generated
- `index.html` - Full page HTML
- `combined_styles.css` - All CSS combined
- `extraction_report.json` - Complete data
- `screenshots/` - Visual references
- `assets/fonts/` - Font files
- `assets/images/` - Image files
- `assets/videos/` - Video files
- `assets/css/` - Original CSS files
- `assets/js/` - JavaScript files

## Next Steps for Cloning

1. **Review the design system** in extraction_report.json
2. **Check screenshots** for visual reference
3. **Use the font files** from assets/fonts/
4. **Reference keyframes** for animations
5. **Analyze computed_styles** for layout recreation
"""
        
        return summary


async def main():
    import sys
    
    # Default URL or use command line argument
    url = sys.argv[1] if len(sys.argv) > 1 else "https://www.aura.build/share/lumina-video"
    output_dir = sys.argv[2] if len(sys.argv) > 2 else "extracted_site"
    
    extractor = WebsiteExtractor(url, output_dir)
    report = await extractor.extract()
    
    print(f"\n🎉 Done! Check the '{output_dir}' directory for all extracted files.")


if __name__ == "__main__":
    asyncio.run(main())
