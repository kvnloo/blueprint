import { test, expect, type Page } from '@playwright/test';

/**
 * Living Ruins wallpaper: tiers, controls, Explore mode and hotspots.
 *
 * WebGL rendering needs a GL-capable browser. Headless Chromium usually has
 * SwiftShader; when a browser has no WebGL at all, the WebGL-specific test is
 * skipped and the poster-tier tests still run. `?wallpaper=poster|webgl`
 * forces a tier (and disables adaptive fallback for `webgl`).
 */

const WEBGL_READY_TIMEOUT = 60_000;

async function hasWebGL(page: Page) {
  return page.evaluate(() => {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
  });
}

test.describe('Living wallpaper', () => {
  // the page pulls Tailwind and fonts from CDNs; give slow CI hosts room
  test.use({ navigationTimeout: 60_000, actionTimeout: 15_000 });
  test('static poster is painted from index.html and points at our plate', async ({ page }) => {
    await page.goto('/?wallpaper=poster', { waitUntil: 'domcontentloaded' });
    const img = page.locator('#wallpaper-poster img');
    await expect(img).toHaveCount(1);
    expect(await img.getAttribute('src')).toContain('wallpaper/living-ruins/base.jpg');
    const loaded = await img.evaluate((el: HTMLImageElement) =>
      el.complete ? el.naturalWidth > 0 : new Promise<boolean>((r) => (el.onload = () => r(el.naturalWidth > 0))),
    );
    expect(loaded).toBe(true);
    // the readability veil sits above the wallpaper layers
    const veilZ = await page.locator('#wallpaper-veil').evaluate((el) => getComputedStyle(el).zIndex);
    expect(Number(veilZ)).toBe(-9);
  });

  test('poster tier never mounts the WebGL canvas', async ({ page }) => {
    await page.goto('/?wallpaper=poster', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3500);
    await expect(page.locator('canvas[data-testid="living-wallpaper"]')).toHaveCount(0);
  });

  test('reduced motion keeps the poster', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3500);
    await expect(page.locator('canvas[data-testid="living-wallpaper"]')).toHaveCount(0);
    await expect(page.locator('#wallpaper-poster img')).toHaveCount(1);
  });

  test('WebGL tier crossfades in after its first frame', async ({ page, browserName }) => {
    test.setTimeout(WEBGL_READY_TIMEOUT + 30_000);
    await page.goto('/?wallpaper=webgl', { waitUntil: 'domcontentloaded' });
    test.skip(!(await hasWebGL(page)), `no WebGL in ${browserName}`);
    const canvas = page.locator('canvas[data-testid="living-wallpaper"]');
    await expect(canvas).toHaveAttribute('data-ready', '1', { timeout: WEBGL_READY_TIMEOUT });
    // crossfade target is set on the first frame (computed opacity is mid-transition for 1.2 s)
    expect(await canvas.evaluate((c: HTMLCanvasElement) => c.style.opacity)).toBe('1');
    const size = await canvas.evaluate((c: HTMLCanvasElement) => ({ w: c.width, h: c.height }));
    expect(size.w).toBeGreaterThan(0);
    expect(size.w).toBeLessThanOrEqual(1920);

    // quality toggle appears once live and persists
    const quality = page.locator('button[data-quality]');
    await expect(quality).toHaveAttribute('data-quality', 'high');
    await quality.click();
    await expect(quality).toHaveAttribute('data-quality', 'low');
    expect(await page.evaluate(() => localStorage.getItem('bg-wallpaper-quality'))).toBe('"low"');

    // pausing unmounts the player; the poster remains
    await page.locator('button.fixed.bottom-4.right-4').click();
    await expect(canvas).toHaveCount(0);
    await expect(page.locator('#wallpaper-poster img')).toHaveCount(1);
  });

  test('Explore mode shows hotspots that link to sections', async ({ page }) => {
    await page.goto('/?wallpaper=poster', { waitUntil: 'domcontentloaded' });
    const explore = page.getByTestId('wallpaper-explore');
    await expect(explore).toBeVisible();
    await expect(page.locator('.wallpaper-hud')).toHaveAttribute('data-active', '0');

    await explore.click();
    await expect(page.locator('html')).toHaveClass(/wallpaper-exploring/);
    await expect(page.locator('.wallpaper-hud')).toHaveAttribute('data-active', '1');

    const hotspots = page.locator('.wallpaper-hotspot');
    await expect(hotspots).toHaveCount(4);
    const vp = page.viewportSize()!;
    const portrait = vp.width <= vp.height;
    const anchor = (id: string) =>
      page.locator(`[data-hotspot="${id}"]`).evaluate((el) => {
        const m = /translate3d\(([-\d.]+)px, ([-\d.]+)px/.exec((el as HTMLElement).style.transform);
        return m ? { x: Number(m[1]), y: Number(m[2]), visible: getComputedStyle(el).visibility !== 'hidden' } : null;
      });
    const ids = await hotspots.evaluateAll((els) => els.map((el) => (el as HTMLElement).dataset.hotspot!));
    for (const id of ids) {
      // portrait crops show about a quarter of the plate: the landmark chip pans to it
      if (portrait) {
        const chip = page.locator(`[data-chip="${id}"]`);
        await expect(chip).toBeVisible();
        await chip.click();
        await expect(chip).toHaveAttribute('aria-pressed', 'true');
      }
      const box = await anchor(id);
      expect(box).not.toBeNull();
      expect(box!.visible).toBe(true);
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x).toBeLessThanOrEqual(vp.width);
      expect(box!.y).toBeGreaterThanOrEqual(0);
      expect(box!.y).toBeLessThanOrEqual(vp.height);
    }

    // Escape returns to the content
    await page.keyboard.press('Escape');
    await expect(page.locator('html')).not.toHaveClass(/wallpaper-exploring/);

    // a hotspot leaves Explore mode and scrolls to its section
    await explore.click();
    if (portrait) await page.locator('[data-chip="greenhouse"]').click();
    await page.locator('[data-hotspot="greenhouse"] .wallpaper-hotspot__label').click();
    await expect(page.locator('html')).not.toHaveClass(/wallpaper-exploring/);
    await expect(page.locator('#products')).toBeInViewport({ timeout: 15_000 });
  });

  test('pause state persists across reloads', async ({ page }) => {
    await page.goto('/?wallpaper=poster', { waitUntil: 'domcontentloaded' });
    const pause = page.locator('button.fixed.bottom-4.right-4');
    await expect(pause).toHaveAttribute('aria-label', 'Pause background animations');
    await pause.click();
    await expect(pause).toHaveAttribute('aria-label', 'Play background animations');
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.locator('button.fixed.bottom-4.right-4')).toHaveAttribute(
      'aria-label',
      'Play background animations',
    );
    expect(await page.evaluate(() => localStorage.getItem('bg-animations-enabled'))).toBe('false');
  });
});
