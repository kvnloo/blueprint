# Wallpaper lifecycle regression checks

From the repository root:

```sh
npm --prefix website install
npm --prefix website/src ci
cd website/src
npm run test:unit
npm run typecheck
npm run test:wallpaper
```

`test:unit` uses Node's test runner with one worker and mocked WebGL/canvas events.
`test:wallpaper` starts and owns a Vite server on loopback port 3017 (fails if
occupied), runs Chromium headlessly with one worker, and shuts the server down.
Install Playwright's Chromium first with `npx playwright install chromium`, or
set `WALLPAPER_BROWSER` to an existing compatible Chromium executable.

The browser matrix is desktop (1280×720), Pixel 5 portrait, and full HD
(1920×1080). The original six wallpaper journeys run unchanged on each
viewport (18 checks). Two additional journeys run on each viewport (6 checks):

- Real `WEBGL_lose_context` loss/restoration: poster appears, the same live canvas
  returns, center pixels are non-black, and no page exception is raised.
- Twenty React StrictMode mount/unmount cycles: every retired GPU context is
  lost and no context-limit warning is emitted.

Restoration PNGs and failure artifacts go under `.wallpaper-shots/test-results/`.

## Verification of this change

- Original source at `7d01712`, using the same installed dependencies and browser:
  original wallpaper journeys **18/18 passed**; no unit suite existed.
- Candidate: mocked unit checks **11/11 passed**, original browser journeys
  **18/18 passed**, additional lifecycle browser journeys **6/6 passed**.
- Production Vite build passed (existing missing `/index.css` and bundle-size warnings).
- Whole-site typecheck is **not green**: both untouched `7d01712` and candidate
  report the same error in `services/searchService.ts:132`: FlexSearch's
  `ContextOptions` requires `resolution`, but the existing options only supply
  `depth` and `bidirectional`. No wallpaper diagnostic is reported. This unrelated
  search configuration has not been changed.

Actual browser verification caught a StrictMode replay failure that player-only
mocks cannot catch: cleanup explicitly loses a context, and a second effect on
the same canvas cannot reuse it. Each effect now owns a new canvas under a
React-owned host; genuine context restoration still reuses that effect's canvas.

No art assets were changed. Browser verification is headless, not a real-device
or production-deployment qualification.
