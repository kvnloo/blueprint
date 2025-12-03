#!/usr/bin/env python3
"""
Blob Video Capture Tool
Captures videos served via blob: URLs or MediaSource Extensions

This works by:
1. Intercepting MediaSource/SourceBuffer to capture video segments
2. Recording the canvas/video element directly
3. Finding the original source URL in network requests
"""

import asyncio
import json
from pathlib import Path
from playwright.async_api import async_playwright


async def capture_blob_videos(url: str, output_dir: str = "captured_videos"):
    """
    Capture blob videos using multiple strategies
    """
    output = Path(output_dir)
    output.mkdir(exist_ok=True)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=False,  # Need headed for video recording
            args=[
                '--autoplay-policy=no-user-gesture-required',
            ]
        )
        
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            # Enable video recording of the entire page
            record_video_dir=str(output),
            record_video_size={'width': 1920, 'height': 1080},
        )
        
        page = await context.new_page()
        
        # Collect potential video source URLs
        video_urls = []
        
        async def intercept_response(response):
            content_type = response.headers.get('content-type', '')
            url = response.url
            
            # Look for video content
            if any(x in content_type for x in ['video/', 'application/octet-stream']):
                video_urls.append({
                    'url': url,
                    'content_type': content_type,
                    'status': response.status
                })
                print(f"[VIDEO] Found: {url[:80]}...")
                
                # Try to download
                try:
                    body = await response.body()
                    ext = '.mp4' if 'mp4' in content_type or 'mp4' in url else '.webm'
                    filename = f"video_{len(video_urls)}{ext}"
                    with open(output / filename, 'wb') as f:
                        f.write(body)
                    print(f"  -> Saved as {filename}")
                except Exception as e:
                    print(f"  -> Could not download: {e}")
                    
            # Also look for m3u8/mpd (HLS/DASH manifests)
            if '.m3u8' in url or '.mpd' in url:
                video_urls.append({
                    'url': url,
                    'type': 'manifest',
                    'content_type': content_type
                })
                print(f"[MANIFEST] Found: {url}")
                
        page.on('response', intercept_response)
        
        # Inject script to intercept MediaSource before page loads
        await page.add_init_script("""
            // Store original MediaSource
            const originalMediaSource = window.MediaSource;
            const capturedSegments = [];
            
            // Intercept SourceBuffer.appendBuffer to capture segments
            const originalAppendBuffer = SourceBuffer.prototype.appendBuffer;
            SourceBuffer.prototype.appendBuffer = function(data) {
                console.log('[CAPTURE] Video segment captured, size:', data.byteLength);
                capturedSegments.push({
                    size: data.byteLength,
                    timestamp: Date.now()
                });
                window.__capturedSegments = capturedSegments;
                return originalAppendBuffer.call(this, data);
            };
            
            // Also intercept URL.createObjectURL to log blob creation
            const originalCreateObjectURL = URL.createObjectURL;
            URL.createObjectURL = function(obj) {
                const url = originalCreateObjectURL.call(this, obj);
                console.log('[CAPTURE] Blob URL created:', url, 'Type:', obj?.type || 'unknown');
                window.__blobUrls = window.__blobUrls || [];
                window.__blobUrls.push({ url, type: obj?.type, size: obj?.size });
                return url;
            };
        """)
        
        print(f"[*] Loading {url}")
        await page.goto(url, wait_until='networkidle', timeout=60000)
        
        # Wait for video to start playing
        print("[*] Waiting for videos to load...")
        await page.wait_for_timeout(5000)
        
        # Try to find and play any paused videos
        await page.evaluate("""
            () => {
                document.querySelectorAll('video').forEach(v => {
                    if (v.paused) {
                        v.play().catch(() => {});
                    }
                });
            }
        """)
        
        # Wait for video content to be captured
        print("[*] Recording for 10 seconds...")
        await page.wait_for_timeout(10000)
        
        # Get video element info
        video_info = await page.evaluate("""
            () => {
                return Array.from(document.querySelectorAll('video')).map(v => ({
                    src: v.src,
                    currentSrc: v.currentSrc,
                    duration: v.duration,
                    width: v.videoWidth,
                    height: v.videoHeight,
                    sources: Array.from(v.querySelectorAll('source')).map(s => ({
                        src: s.src,
                        type: s.type
                    })),
                    blobUrls: window.__blobUrls || [],
                    segments: window.__capturedSegments || []
                }));
            }
        """)
        
        # Save metadata
        with open(output / 'video_metadata.json', 'w') as f:
            json.dump({
                'source_url': url,
                'found_videos': video_urls,
                'video_elements': video_info
            }, f, indent=2)
        
        await context.close()
        await browser.close()
        
    print(f"\n[✓] Capture complete. Check {output}/")
    print("\nFiles:")
    for f in output.iterdir():
        print(f"  - {f.name}")


async def main():
    import sys
    url = sys.argv[1] if len(sys.argv) > 1 else "https://www.aura.build/share/lumina-video"
    output = sys.argv[2] if len(sys.argv) > 2 else "captured_videos"
    await capture_blob_videos(url, output)


if __name__ == "__main__":
    asyncio.run(main())
