import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const axe = (page) => new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
const cases = ["university", "panasia", "aegon", "petmart", "dats"];

test("homepage renders the proof-first story without errors", async ({ page, request }) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Paid media judged on customers, not clicks.");
  await expect(page.locator(".hero-funnel")).toContainText("312");
  await expect(page.locator(".case-card")).toHaveCount(3);
  await expect(page.locator(".mini-case")).toHaveCount(2);
  await expect(page.locator(".case-card .cc-client")).toHaveText([
    "Private university, Saudi Arabia",
    "Pan Asia Bank",
    "Aegon",
  ]);
  for (const file of ["Andrew_Fonseka_Resume.pdf", "Andrew_Fonseka_Portfolio.pdf"]) {
    const res = await request.get(`/documents/${file}`);
    expect(res.status()).toBe(200);
    expect((await res.body()).subarray(0, 5).toString()).toBe("%PDF-");
  }
  await expect(page.locator('a[href="mailto:rafandrewf@gmail.com"]').first()).toBeAttached();
  await expect(page.getByRole("link", { name: "Connect on LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/andrewfonseka/",
  );
  expect(errors).toEqual([]);
});

test("retired claims never appear on any page", async ({ request }) => {
  for (const path of ["/", ...cases.map((c) => `/case-studies/${c}/`)]) {
    const html = await (await request.get(path)).text();
    for (const banned of [
      "Open to",
      "OPEN TO",
      "3+",
      "50+",
      "No sponsorship",
      "no sponsorship",
      "budget allocation",
      "100×",
      "≈100",
      "10 clients",
    ]) {
      expect(html, `${path} contains "${banned}"`).not.toContain(banned);
    }
  }
});

test("every case page tells problem, action, result and role, with evidence", async ({ page }) => {
  for (const id of cases) {
    await page.goto(`/case-studies/${id}/`);
    for (const h of ["The problem", "What I did", "The result"])
      await expect(page.getByRole("heading", { name: h, exact: true })).toBeVisible();
    await expect(page.locator(".case-role")).toContainText("My role.");
    await expect(page.locator(".case-evidence")).toBeVisible();
    await expect(page.locator(".case-stats > div")).toHaveCount(4);
    await expect(page.locator(".next-link")).toBeVisible();
  }
});

test("university evidence picker updates the figures", async ({ page }) => {
  await page.goto("/case-studies/university/");
  await page.getByRole("button", { name: "Broad undergraduate", exact: true }).click();
  await expect(page.locator(".campaign-results")).toContainText("603");
  await expect(page.locator(".campaign-results")).toContainText("27.7%");
  await expect(page.locator(".evidence-img img")).toHaveAttribute("src", "/images/university-ads-results.png");
});

test("questions panel answers on desktop and expands inline on mobile", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Why so few Aegon numbers?" }).click();
  await expect(page.locator(".ask-answer")).toContainText("NDA");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const q = page.getByRole("button", { name: "Have you worked agency-side?" });
  await q.click();
  await expect(q).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".ask-inline")).toContainText("Kites Global");
  await q.click();
  await expect(page.locator(".ask-inline")).toHaveCount(0);
});

test("mobile navigation, no horizontal overflow, reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    for (const path of ["/", "/case-studies/university/", "/case-studies/aegon/"]) {
      await page.goto(path);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `No horizontal overflow at ${width}px on ${path}`,
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("navigation").getByRole("link", { name: "Work", exact: true }).click();
  await expect(page.getByRole("button", { name: "Open navigation" })).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#work$/);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
});

test("charts render their final state and the career timeline expands", async ({ page }) => {
  await page.goto("/");
  await page.locator(".dots").scrollIntoViewIfNeeded();
  await expect(page.locator(".dots")).toHaveClass(/is-in/);
  await expect(page.locator(".dm-grid i.own")).toHaveCount(50);
  await expect(page.locator(".dm-grid i.co")).toHaveCount(100);
  const kites = page.locator(".experience-item").filter({ hasText: "Kites Global" });
  await kites.locator("summary").click();
  await expect(kites.locator(".experience-detail")).toContainText("Led four client accounts");
});

test("analytics hooks are present on the conversion links", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('[data-track="resume_download"]')).not.toHaveCount(0);
  await expect(page.locator('[data-track="email_click"]')).not.toHaveCount(0);
  await expect(page.locator('[data-track="linkedin_click"]')).not.toHaveCount(0);
  await expect(page.locator('[data-track="case_open"]')).not.toHaveCount(0);
});

test("home and every case page pass automated WCAG 2.1 AA checks on mobile and desktop", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", ...cases.map((c) => `/case-studies/${c}/`)]) {
      await page.goto(path);
      const results = await axe(page);
      expect(results.violations, `${path} at ${width}px`).toEqual([]);
    }
  }
});

test("static HTML is complete without JavaScript, with metadata and a useful 404", async ({ request, browser }) => {
  for (const slug of ["", ...cases.map((c) => `case-studies/${c}/`)]) {
    const res = await request.get("/" + slug);
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).toContain("Let’s talk paid media");
    expect(html).toContain(`href="https://andrewfonseka.com/${slug}"`);
    if (slug) expect(html).toContain("What I did");
  }
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await expect(page.locator(".hero-funnel")).toContainText("Fee-paid enrolments");
  await page.goto("http://127.0.0.1:4173/case-studies/aegon/");
  await expect(page.getByRole("heading", { name: "The problem", exact: true })).toBeVisible();
  const missing = await page.goto("http://127.0.0.1:4173/missing-page/");
  expect(missing.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Explore the case studies" })).toHaveAttribute("href", "/#work");
  await context.close();
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
});
