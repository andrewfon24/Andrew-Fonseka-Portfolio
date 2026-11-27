import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const slugs = ['aegon', 'panasia', 'godrej', 'petmart'];
mkdirSync('test-results/review', { recursive: true });

// Freelance work, the wrong Aegon periods and the corrected EMQ score must never reach the public build.
const banned = ['Saudi', 'DIMO', 'DATS', 'freelance', 'B2B apparel', 'H1 to H2', 'H2 2026', 'H1 2026 = 100', 'Contact me about a role', 'TikTok', 'coordinator', 'Hiring a Paid Media Specialist', 'client-reported', 'first-order'];

const noOverflow = async (page, width) => {
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
};
const axe = async (page) => {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
};
const files = (dir) => readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? files(join(dir, f)) : [join(dir, f)]));

test('homepage: role, proof, sections, navigation and metadata', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page).toHaveTitle('Andrew Fonseka | Paid Media Specialist');
  await expect(page.locator('.hero .eyebrow')).toHaveText('Andrew Fonseka, MBA · Paid Media Specialist');
  await expect(page.locator('h1')).toHaveText('Most ad reports stop at the click. Mine start there.');
  await expect(page.locator('.hero .pill-fill')).toHaveText('Contact me');
  await expect(page.locator('.hero .pill-fill')).toHaveAttribute('href', /^mailto:andrew@andrewfonseka\.com\?subject=Paid%20Media%20Specialist%20role/);
  await expect(page.locator('.hero .availability')).toHaveText('Based in Greater Vancouver. Open to paid media roles.');
  await expect(page.locator('.site-nav a')).toHaveText(['Results', 'Approach', 'About', 'References', 'Contact']);
  await expect(page.locator('.site-header .pill-fill')).toHaveAttribute('href', /^mailto:andrew@andrewfonseka.com/);
  await expect(page.locator('.metric .stat-value')).toHaveText(['−15%', '+17 pts', '259', '22']);
  await expect(page.locator('.metric small').first()).toHaveText('Aegon, H2 2025 to H1 2026');
  await expect(page.locator('#problems')).toHaveCount(0);
  await expect(page.locator('#results h2')).toHaveText('Agency experience. In-house discipline. Business outcomes.');
  await expect(page.locator('#approach h2')).toHaveText('Better signals. Better decisions.');
  await expect(page.locator('#aegon h3')).toHaveText('First, make the numbers match. Then make them grow.');
  await expect(page.locator('#about h2')).toHaveText('Agency roots. In-house experience.');
  const order = await page.locator('main > section[id]').evaluateAll((s) => s.map((x) => x.id));
  expect(order).toEqual(['results', 'approach', 'about', 'toolkit', 'references']);
  expect(await page.locator('#results a.pill').evaluateAll((a) => a.map((x) => x.pathname))).toEqual(slugs.map((s) => `/case-studies/${s}/`));
  await expect(page.locator('.timeline li')).toHaveCount(5);
  await expect(page.locator('.timeline')).toContainText('July 2023 to October 2024');
  await expect(page.locator('#toolkit .chip')).toHaveCount(24);
  await expect(page.locator('.quote')).toHaveCount(3);
  await expect(page.locator('#contact h2')).toHaveText('Let’s talk about what happens after the click.');
  await expect(page.locator('#contact p').first()).toContainText('an agency managing client accounts or an in-house team');
  await expect(page.locator('#about')).toContainText('whether at an agency or in-house');
  await expect(page.locator('#contact .pill-white')).toHaveText('Contact me');
  await expect(page.locator('#contact')).not.toContainText('Or email me directly');
  const bar = await page.locator('.footer-inner').boundingBox();
  expect(bar.width, 'footer bar spans the full page width').toBe(1440);
  await expect(page.locator('meta[name=robots]')).toHaveCount(0);
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://andrewfonseka.com/');
  const person = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  expect(person['@type']).toBe('Person');
  expect(person.address).toBeUndefined();
  expect(errors).toEqual([]);
});

test('proof-strip links open case studies', async ({ page, request }) => {
  await page.goto('/');
  for (const href of await page.locator('.metric').evaluateAll((a) => a.map((x) => x.getAttribute('href')))) expect((await request.get(href)).status(), href).toBe(200);
});

test('no withdrawn or incorrect claims anywhere in the built site', async ({ page }) => {
  const sources = files('dist').filter((f) => /\.(html|js|css|xml|txt|json)$/.test(f));
  for (const f of sources) {
    const text = readFileSync(f, 'utf8');
    for (const phrase of banned) expect(text.includes(phrase), `${phrase} in ${f}`).toBe(false);
  }
  for (const path of ['/', ...slugs.map((s) => `/case-studies/${s}/`)]) {
    await page.goto(path);
    const body = await page.locator('body').innerText();
    expect(body.includes('7.8'), `EMQ 7.8 on ${path}`).toBe(false);
  }
});

for (const width of [1440, 1024, 768, 390, 320]) {
  test(`homepage at ${width}px: no overflow, readable nav, accessibility`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await noOverflow(page, width);
    await expect(page.locator('.site-nav')).toBeVisible();
    expect(await page.locator('.site-nav').evaluate((n) => n.scrollWidth - n.clientWidth), 'all nav links fit without scrolling').toBeLessThanOrEqual(1);
    if (width === 390) {
      await page.setViewportSize({ width, height: 844 });
      const cta = await page.locator('.hero .pill-fill').boundingBox();
      expect(cta.y + cta.height, 'primary CTA inside a 390×844 phone viewport').toBeLessThanOrEqual(844);
    }
    await axe(page);
    await page.screenshot({ path: `test-results/review/home-${width}.png`, fullPage: true });
  });
}

for (const slug of slugs) {
  test(`case ${slug}: structure, evidence, anchors, mobile and accessibility`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(`/case-studies/${slug}/`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.case-section h2')).toContainText(['Problem', 'What I built', 'What moved']);
    await expect(page.locator('.case-aside')).not.toContainText('Hiring for a paid media role');
    expect(await page.locator('.case-article figure, .case-article .flow, .case-article .tiles').count()).toBeGreaterThanOrEqual(3);
    await expect(page.locator('.next-story')).toBeVisible();
    await axe(page);
    await page.screenshot({ path: `test-results/review/case-${slug}-1440.png`, fullPage: true });
    await page.setViewportSize({ width: 390, height: 900 });
    await page.reload();
    await noOverflow(page, 390);
    await page.screenshot({ path: `test-results/review/case-${slug}-390.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}

test('Aegon case shows the corrected period and EMQ', async ({ page }) => {
  await page.goto('/case-studies/aegon/');
  await expect(page.locator('.case-article')).toContainText('Cost per lead, indexed (H2 2025 = 100)');
  await expect(page.locator('.case-article')).toContainText('H1 2026, new form');
  await expect(page.locator('.case-article')).toContainText('Meta Event Match Quality');
  await expect(page.locator('.case-article .bar-row strong').filter({ hasText: '7.0' })).toHaveCount(1);
});

test('every local link, image and document resolves; 404 recovers', async ({ page, request }) => {
  const pages = ['/', ...slugs.map((s) => `/case-studies/${s}/`), '/404.html'];
  const seen = new Set();
  for (const path of pages) {
    await page.goto(path);
    const urls = await page.evaluate(() => [
      ...[...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')),
      ...[...document.querySelectorAll('img')].map((i) => i.getAttribute('src')),
    ]);
    for (const url of urls) {
      const clean = url.split('#')[0];
      if (!clean || seen.has(clean)) continue;
      seen.add(clean);
      const res = await request.get(clean);
      expect(res.status(), clean).toBe(200);
    }
    expect(await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length)).toBe(0);
  }
  for (const doc of ['Andrew_Fonseka_Resume.pdf', 'Andrew_Fonseka_Portfolio.pdf']) {
    const pdf = await request.get(`/documents/${doc}`);
    expect(pdf.headers()['content-type']).toContain('pdf');
  }
  for (const gone of ['/evidence/meta-ads-may-aug-2026.png', '/images/campaigns/university.webp']) expect((await request.get(gone)).status(), gone).toBe(404);
  await page.goto('/no-such-page/');
  await expect(page.getByRole('link', { name: 'See the results' })).toBeVisible();
});

test('content reads without JavaScript, with a static builder fallback', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('#results .story-card')).toBeVisible();
  await expect(page.locator('#references blockquote').first()).toBeVisible();
  await page.goto('/case-studies/aegon/');
  await expect(page.locator('.mock')).toBeVisible();
  await context.close();
});
