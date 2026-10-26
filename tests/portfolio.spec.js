import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const WCAG = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];
const CASES = ["university", "panasia", "aegon", "dats", "petmart"];
const MAILTO_PREFIX = "mailto:rafandrewf@gmail.com?subject=";

test("homepage renders the data story without browser errors and serves the real documents", async ({
  page,
  request,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Paid media judged on customers",
  );
  await expect(page.locator(".chapter")).toHaveCount(5);
  await expect(page.locator(".compact")).toHaveCount(1);
  expect(
    await page
      .locator(".portrait img")
      .evaluate((img) => img.complete && img.naturalWidth > 0),
  ).toBe(true);
  for (const file of [
    "Andrew_Fonseka_Resume.pdf",
    "Andrew_Fonseka_Portfolio.pdf",
  ]) {
    const response = await request.get(`/documents/${file}`);
    expect(response.status()).toBe(200);
    expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  }
  expect(errors).toEqual([]);
});

test("email is the primary call to action everywhere, with copy and call fallbacks", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const primaries = page.locator(".btn-primary, .btn-on-dark");
  for (const href of await primaries.evaluateAll((els) =>
    els.map((a) => a.getAttribute("href")),
  ))
    expect(href.startsWith(MAILTO_PREFIX)).toBe(true);
  await expect(page.locator(".header .btn-primary")).toHaveText(/Email me/);
  await expect(page.locator(".hero .btn-primary")).toHaveText(/Email me/);
  await page.locator(".hero .copy-btn").click();
  await expect(page.locator(".hero .copy-btn")).toHaveAttribute(
    "data-copied",
    "true",
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "rafandrewf@gmail.com",
  );
  await expect(page.locator('#contact a[href="tel:+17786819041"]')).toHaveCount(
    1,
  );
  await expect(
    page.getByRole("link", { name: /Connect on LinkedIn/ }),
  ).toHaveAttribute("href", "https://www.linkedin.com/in/andrewfonseka/");
  for (const name of [
    "resume_download",
    "email_click",
    "copy_email",
    "call_click",
    "linkedin_click",
    "case_open",
    "portfolio_download",
  ])
    await expect(page.locator(`[data-track="${name}"]`)).not.toHaveCount(0);
});

test("every case study is linked from the homepage and opens as its own page", async ({
  page,
}) => {
  await page.goto("/");
  for (const id of CASES)
    await expect(
      page.locator(`a[href="/case-studies/${id}/"]`).first(),
    ).toBeAttached();
  for (const id of CASES) {
    await page.goto(`/case-studies/${id}/`);
    const story = page.locator(".case-page");
    for (const title of ["The problem", "What I did", "The result"])
      await expect(
        story.getByRole("heading", { name: title, exact: true }),
      ).toBeVisible();
    await expect(story.locator(".case-dashboard")).toBeVisible();
    await expect(page.locator('#contact a[href^="mailto:"]').first()).toBeVisible();
  }
});

test("figures and facts match the résumé and portfolio", async ({ page }) => {
  await page.goto("/");
  const text = await page.locator("main").innerText();
  for (const fact of [
    "7-figure",
    "50 + ~100",
    "312",
    "77.6%",
    "~US$20",
    "259",
    "~US$97",
    "−13%",
    "+18%",
    "+25%",
    "−60%",
    "+20%",
    "4:1",
    "DIMO Academy for Technical Studies",
    "Marketing Strategist",
    "7 clients since 2026",
    "Aug 2023 – Oct 2024",
    "Sep 2019 – Jun 2022",
  ])
    expect(text, fact).toContain(fact);
  expect(text).not.toContain("Digital Marketing Strategist");
  expect(text).not.toContain("DIMO Academy of");
});

test("mobile layout fits, the menu works and the email dock appears after the hero", async ({
  page,
}) => {
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      ),
    ).toBeLessThanOrEqual(0);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.locator("#site-nav")).toBeVisible();
  await page.locator("#site-nav").getByRole("link", { name: "Approach" }).click();
  await expect(page.locator("#site-nav")).toBeHidden();
  await expect(page.locator(".dock")).not.toHaveClass(/is-visible/);
  await page.evaluate(() =>
    document.getElementById("case-panasia").scrollIntoView(),
  );
  await expect(page.locator(".dock")).toHaveClass(/is-visible/);
  const monogram = await page.locator(".monogram").evaluate((el) => {
    const r = el.getBoundingClientRect();
    return [r.width, r.height, el.textContent];
  });
  expect(monogram).toEqual([38, 38, "AF"]);
});

test("reduced motion shows every section and figure immediately", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  const hidden = await page
    .locator("[data-reveal]")
    .evaluateAll(
      (els) => els.filter((el) => getComputedStyle(el).opacity !== "1").length,
    );
  expect(hidden).toBe(0);
  await expect(page.locator(".metric strong").first()).toContainText(
    "7-figure",
  );
});

test("homepage and a case page meet automated WCAG 2.1 AA checks", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of ["/", "/case-studies/university/"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(WCAG).analyze();
    expect(results.violations, path).toEqual([]);
  }
  await page.setViewportSize({ width: 320, height: 844 });
  for (const id of CASES) {
    await page.goto(`/case-studies/${id}/`);
    const story = page.locator(".case-page");
    expect(
      await story.evaluate((el) => el.scrollWidth <= el.clientWidth),
    ).toBe(true);
  }
});

test("Astro delivers complete HTML, unique metadata, and useful missing-page navigation", async ({
  request,
  browser,
}) => {
  for (const slug of ["", ...CASES.map((c) => `case-studies/${c}/`)]) {
    const response = await request.get("/" + slug);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain("Astro v");
    expect(html).toContain("Let’s talk");
    expect(html).toContain(`href="https://andrewfonseka.com/${slug}"`);
    if (!slug) {
      for (const figure of ["312", "−13%", "~US$97", "Paid Media Specialist"])
        expect(html).toContain(figure);
    }
  }
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await expect(page.locator("#case-university")).toBeVisible();
  await expect(page.locator(".metric strong").first()).toContainText("7-figure");
  const missing = await page.goto("http://127.0.0.1:4173/missing-page/");
  expect(missing.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Explore the case studies" }),
  ).toHaveAttribute("href", "/#work");
  await context.close();
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
});

test("retired claims never appear on any page", async ({ request }) => {
  for (const path of ["/", ...CASES.map((c) => `/case-studies/${c}/`)]) {
    const html = await (await request.get(path)).text();
    for (const banned of [
      "Open to",
      "OPEN TO",
      "3+",
      "50+",
      "No sponsorship",
      "no sponsorship",
      "bidding, budget allocation",
      "100×",
      "≈100",
      "10 clients",
      "set the channel split",
      "~150",
    ]) {
      expect(html, `${path} contains "${banned}"`).not.toContain(banned);
    }
  }
});
