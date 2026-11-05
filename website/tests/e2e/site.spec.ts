import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * zer0 company site: hash routes, navigation, the Work filters, the Writing
 * journey and the honesty rules from the site brief (no fake numbers, upstream
 * credit first). Runs against a static build: `PLAYWRIGHT_BASE_URL` points at
 * the served dist; the poster tier keeps WebGL out of the way.
 */

const go = (page: import('@playwright/test').Page, hash = '') =>
  page.goto(`./?wallpaper=poster${hash}`, { waitUntil: 'domcontentloaded' });

test.describe('routes', () => {
  for (const [hash, heading] of [
    ['', 'Engineering for human flourishing.'],
    ['#/work', 'Everything public, labelled honestly.'],
    ['#/research', 'Evidence you can re-run.'],
    ['#/about', 'A studio of one, working in public.'],
    ['#/oss', "Other people's projects, credited first."],
  ] as const) {
    test(`${hash || 'home'} renders its heading and passes axe`, async ({ page }) => {
      await go(page, hash);
      await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        // Contrast over the painted wallpaper depends on the plate under each glyph; checked by eye.
        .disableRules(['color-contrast'])
        .analyze();
      expect(results.violations.map((v) => v.id)).toEqual([]);
    });
  }

  // Worst case for copy on the wallpaper: swap the plate for pure white (brighter
  // than any sky or waterfall pixel in it). On phones every on-art block carries its
  // own panel, so axe contrast must pass even then.
  for (const hash of ['', '#/work', '#/research', '#/about', '#/oss']) {
    test(`${hash || 'home'} on-art copy stays AA over a white plate on phones`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await go(page, hash);
      await page.addStyleTag({ content: '#wallpaper-poster{display:none!important} html,body{background:#fff!important}' });
      await expect(page.locator('.z-onart').first()).toBeVisible();
      const results = await new AxeBuilder({ page }).include('.z-onart').withRules(['color-contrast']).analyze();
      const bad = results.violations.flatMap((v) => v.nodes.map((n) => `${n.target.join(' ')}: ${n.any[0]?.message ?? ''}`));
      expect(bad).toEqual([]);
    });
  }

  test('unknown hashes fall back to home', async ({ page }) => {
    await go(page, '#/nope');
    await expect(page.getByRole('heading', { level: 1, name: 'Engineering for human flourishing.' })).toBeVisible();
  });
});

test.describe('navigation', () => {
  test('desktop nav marks the current page and moves between routes', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await go(page);
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await nav.getByRole('link', { name: 'Work' }).click();
    await expect(page).toHaveURL(/#\/work$/);
    await expect(nav.getByRole('link', { name: 'Work' })).toHaveAttribute('aria-current', 'page');
    await nav.getByRole('link', { name: 'Open source' }).click();
    await expect(page.getByRole('heading', { name: "Other people's projects, credited first." })).toBeVisible();
    await page.goBack();
    await expect(page.getByRole('heading', { name: 'Everything public, labelled honestly.' })).toBeVisible();
  });

  test('mobile menu opens, navigates and closes', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await go(page);
    const toggle = page.getByRole('button', { name: 'Open menu' });
    await toggle.click();
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    await page.locator('#mobile-menu').getByRole('link', { name: 'Research' }).click();
    await expect(page).toHaveURL(/#\/research$/);
    await expect(page.locator('#mobile-menu')).toHaveCount(0);
  });

  test('Contact scrolls to the footer without changing the route', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await go(page, '#/about');
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Contact' }).click();
    await expect(page.locator('#contact')).toBeInViewport();
    await expect(page).toHaveURL(/#\/about$/);
  });
});

test.describe('work', () => {
  test('area and status filters narrow the grid and reset', async ({ page }) => {
    await go(page, '#/work');
    const cards = page.getByTestId('project-card');
    const total = await cards.count();
    expect(total).toBeGreaterThan(20);
    await page.getByRole('button', { name: 'Worlds' }).click();
    await expect(cards.first()).toBeVisible();
    for (const area of await cards.evaluateAll((els) => els.map((e) => e.querySelector('[data-area]')?.getAttribute('data-area')))) {
      expect(area).toBe('worlds');
    }
    await page.getByRole('button', { name: 'Archived' }).click();
    await expect(page.getByText('Nothing matches both filters.')).toBeVisible();
    await page.getByRole('group', { name: 'Filter projects' }).getByRole('button', { name: 'All' }).first().click();
    await page.getByRole('group', { name: 'Filter projects' }).getByRole('button', { name: 'All' }).last().click();
    await expect(cards).toHaveCount(total);
  });

  test('every project links to its public source', async ({ page }) => {
    await go(page, '#/work');
    const hrefs = await page.getByTestId('project-card').getByRole('link', { name: 'Source' }).evaluateAll((els) => els.map((e) => e.getAttribute('href')));
    expect(hrefs.length).toBeGreaterThan(20);
    for (const h of hrefs) expect(h).toMatch(/^https:\/\/github\.com\/kvnloo\//);
  });

  test('the old Blueprint tracks are labelled provisional', async ({ page }) => {
    await go(page, '#/work');
    await expect(page.getByTestId('vision-card')).toHaveCount(3);
    for (const card of await page.getByTestId('vision-card').all()) await expect(card).toContainText('Provisional');
  });
});

test.describe('writing', () => {
  test('an essay opens from Research and returns', async ({ page }) => {
    await go(page, '#/research');
    await page.locator('#writing').getByText('Read Article').first().click();
    await expect(page).toHaveURL(/#\/article\//);
    await page.getByRole('button', { name: 'Back to Writing' }).last().click();
    await expect(page).toHaveURL(/#\/research$/);
  });

  test('Writing lists every essay on first paint, and search narrows it', async ({ page }) => {
    await go(page, '#/research');
    const writing = page.locator('#writing');
    await expect(writing.getByText('No articles found')).toHaveCount(0);
    await expect(writing.getByText('Read Article')).toHaveCount(9);
    await writing.locator('input').first().fill('brain');
    await expect(writing.getByText(/Showing [1-8] of 9 articles/)).toBeVisible();
    await expect.poll(() => writing.getByText('Read Article').count()).toBeLessThan(9);
    expect(await writing.getByText('Read Article').count()).toBeGreaterThan(0);
  });

  test('article deep links load directly', async ({ page }) => {
    await go(page, '#/article/limitless-protocol');
    await expect(page.getByRole('heading', { name: /Limitless Protocol/i }).first()).toBeVisible();
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).disableRules(['color-contrast']).analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});

test.describe('honesty rules', () => {
  test('no fake numbers, login or recorder survive from the pretotype', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', (r) => requests.push(r.url()));
    for (const hash of ['', '#/work', '#/about']) {
      await go(page, hash);
      const text = await page.locator('body').innerText();
      for (const banned of ['Log In', '1,800%', '500K+', 'COOKING', 'Robot Chef mock', 'hello@zer0.llc', '555-0199']) {
        expect(text).not.toContain(banned);
      }
    }
    expect(requests.some((u) => /meticulous/i.test(u))).toBe(false);
  });

  test('open source page leads with the merge caveat and upstream credit', async ({ page }) => {
    await go(page, '#/oss');
    await expect(page.getByRole('note')).toContainText('A fork, draft, or review is not an upstream merge.');
    const first = page.getByTestId('collab-card').first();
    await expect(first).toContainText('Hermes Agent');
    await expect(first).toContainText('by Nous Research');
  });

  test('wallpaper landmarks point at real pages', async ({ page }) => {
    await go(page);
    const hrefs = await page.locator('.wallpaper-hotspot').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
    expect(hrefs.sort()).toEqual(['#/about', '#/oss', '#/research', '#/work']);
  });

  test('llms.txt is served for agents', async ({ request, baseURL }) => {
    const res = await request.get(new URL('llms.txt', baseURL).toString());
    expect(res.ok()).toBe(true);
    expect(await res.text()).toContain('# zer0');
  });
});
