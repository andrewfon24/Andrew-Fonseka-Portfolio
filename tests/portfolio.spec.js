import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const slugs = ["university", "aegon", "panasia", "petmart", "dats"];
const email =
  "mailto:rafandrewf@gmail.com?subject=Paid%20media%20specialist%20%E2%80%93%20intro";
const hash = (value) => createHash("sha256").update(value).digest("hex");

test("homepage follows the short result-first brief and has one email primary action", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText(
    "I turn ad spend into enrolments, loans and applications.",
  );
  await expect(page.locator(".intro-actions .primary")).toHaveAttribute(
    "href",
    email,
  );
  await expect(page.locator(".rebuild-featured .project-open")).toHaveCount(3);
  expect(
    await page
      .locator(".project-open")
      .evaluateAll((es) => es.map((e) => e.getAttribute("href"))),
  ).toEqual(slugs.map((s) => `/case-studies/${s}/`));
  await expect(page.locator(".result-row")).toHaveCount(2);
  await expect(page.locator(".project-case-link")).toHaveCount(5);
  await expect(page.locator(".rebuild-stats strong")).toHaveText([
    "7-figure",
    "50",
    "3 years",
  ]);
  await expect(page.locator(".rebuild-stats")).toContainText(
    "business units managed at Aegon",
  );
  await expect(page.locator(".rebuild-stats")).toContainText("in Paid Media");
  await expect(
    page.locator(
      ".filters, #approach, #systems, .experience-list, .decision-story, .client-partnership, .quote-controls, .preview-graphic",
    ),
  ).toHaveCount(0);
  await expect(page.locator("#references blockquote")).toHaveCount(1);
  await expect(page.locator("#references")).toContainText(
    "Excerpt from LinkedIn recommendation",
  );
  await expect(page.locator("#about")).toContainText(
    "Kites Global, Marketing Strategist (2023)",
  );
  await expect(page.locator("main")).not.toContainText("next agency team");
  const wordCount = await page
    .locator("main > section:not(#toolkit), main > .metric-band")
    .evaluateAll(
      (es) =>
        es
          .map((e) => e.innerText)
          .join(" ")
          .trim()
          .split(/\s+/).length,
    );
  expect(wordCount).toBeLessThanOrEqual(470);
  await expect(page.locator(".intro-portrait img")).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".intro-portrait img")
        .evaluate((e) => e.complete && e.naturalWidth > 0),
    )
    .toBe(true);
  expect(errors).toEqual([]);
});

test("contact, tool logos, credentials and original PDF files are preserved", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page.locator("#contact h2")).toHaveText("Let’s talk paid media");
  await expect(page.locator(".contact-reference-actions > a")).toHaveCount(4);
  await expect(page.locator("#contact a[href^='mailto:']")).toHaveAttribute(
    "href",
    "mailto:rafandrewf@gmail.com",
  );
  await expect(page.locator(".stack-group li")).toHaveCount(26);
  await expect(page.locator(".cert-grid .brand-icon")).toHaveCount(6);
  await expect(page.locator(".stack-group h3")).toHaveText([
    "Paid media platforms",
    "Analytics & tracking",
    "Productivity, systems & project management",
    "Email & CRM",
    "CMS, e-commerce & design",
  ]);
  await page.locator("#toolkit").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator(".stack-grid img")
        .evaluateAll((es) => es.every((e) => e.complete && e.naturalWidth > 0)),
    )
    .toBe(true);
  expect(
    await page
      .locator(".stack-grid .brand-icon")
      .first()
      .evaluate((e) => getComputedStyle(e).width),
  ).toBe("22px");
  for (const tool of [
    "Supermetrics",
    "Drip",
    "BrightLocal",
    "Airtable",
    "WordPress",
    "Wix",
  ])
    await expect(
      page.locator(".stack-grid").getByText(tool, { exact: true }),
    ).toHaveCount(0);
  for (const name of [
    "Andrew_Fonseka_Resume.pdf",
    "Andrew_Fonseka_Portfolio.pdf",
  ]) {
    const response = await request.get(`/documents/${name}`);
    expect(response.status()).toBe(200);
    expect(hash(await response.body())).toBe(
      hash(readFileSync(`public/documents/${name}`)),
    );
  }
  for (const name of [
    "email_click",
    "resume_download",
    "linkedin_click",
    "case_open",
    "portfolio_download",
  ])
    await expect(page.locator(`[data-track="${name}"]`)).not.toHaveCount(0);
});

test("desktop navigation is centred and phone navigation is brand plus resume", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".navigation a")).toHaveText([
    "Results",
    "References",
    "About",
    "Contact",
  ]);
  const geometry = await page.evaluate(() => {
    const box = (s) =>
      document.querySelector(s).getBoundingClientRect().toJSON();
    return {
      brand: box(".brand"),
      nav: box(".navigation"),
      resume: box(".nav-contact"),
      width: innerWidth,
    };
  });
  expect(geometry.brand.x).toBeLessThan(50);
  expect(
    Math.abs(geometry.nav.x + geometry.nav.width / 2 - geometry.width / 2),
  ).toBeLessThan(2);
  expect(geometry.width - geometry.resume.right).toBeLessThan(50);
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const avatar = await page.locator(".brand-monogram").boundingBox();
    expect(avatar.width).toBe(avatar.height);
    await expect(page.locator(".brand-monogram")).toHaveText("AF");
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(".navigation")).toBeHidden();
  await expect(page.getByRole("button", { name: /navigation/ })).toHaveCount(0);
  await expect(page.locator(".nav-contact")).toBeVisible();
  expect(
    (await page.locator(".nav-contact").boundingBox()).height,
  ).toBeGreaterThanOrEqual(44);
  for (const card of await page.locator(".result-card").all()) {
    expect((await card.boundingBox()).height).toBeLessThan(844);
    expect(
      await card
        .locator("p, h3, .result-numbers span, .project-case-link")
        .evaluateAll((es) =>
          Math.min(...es.map((e) => parseFloat(getComputedStyle(e).fontSize))),
        ),
    ).toBeGreaterThanOrEqual(14);
  }
  await page.getByRole("link", { name: "See the results" }).click();
  await expect(page).toHaveURL(/#work$/);
});

test("case links support refresh, back and the intended reading order", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator('a[data-case="university"]').click();
  await expect(page).toHaveURL(/case-studies\/university\/$/);
  await page.reload();
  await expect(page.locator("h1")).toHaveText("From interest to intake.");
  await expect(page.locator(".case-next a")).toHaveAttribute(
    "href",
    "/case-studies/aegon/",
  );
  await page.goBack();
  await expect(page.locator(".result-card")).toHaveCount(3);
});

test("every case puts its answer first and keeps deeper evidence expandable", async ({
  page,
}) => {
  for (const slug of slugs) {
    await page.goto(`/case-studies/${slug}/`);
    await expect(page.locator(".case-answer")).toBeVisible();
    await expect(page.locator(".case-role-note")).toBeVisible();
    for (const title of ["The problem", "What I did", "The result"])
      await expect(
        page.getByRole("heading", { name: title, exact: true }),
      ).toBeVisible();
    await expect(page.locator(".overview-figure")).toBeVisible();
    await expect(page.locator(".measurement-caveat")).toBeVisible();
    const details = page.locator(".case-evidence-details");
    await expect(details).not.toHaveAttribute("open");
    await expect(page.locator(".case-dashboard")).toBeHidden();
    await details.locator("summary").click();
    await expect(page.locator(".case-dashboard")).toBeVisible();
    await expect(page.locator(".case-source")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
    await details.locator("summary").click();
    await expect(page.locator(".case-dashboard")).toBeHidden();
  }
});

test("expanded evidence retains the dashboards and their attribution safeguards", async ({
  page,
}) => {
  await page.goto("/case-studies/university/");
  await page.locator("summary").click();
  await page
    .getByRole("button", { name: "Broad undergraduate", exact: true })
    .click();
  await expect(page.locator(".campaign-results")).toContainText("603");
  await expect(page.locator(".case-source-image img")).toHaveAttribute(
    "src",
    "/images/university-ads-results.png",
  );
  await page.goto("/case-studies/panasia/");
  await page.locator("summary").click();
  await page.getByRole("button", { name: "Meta", exact: true }).click();
  await expect(page.locator(".allocation-insight")).toContainText("US$15,000");
  await page.getByRole("button", { name: "Google Ads", exact: true }).click();
  await expect(page.locator(".allocation-insight")).toContainText("US$10,000");
  await page.goto("/case-studies/aegon/");
  await page.locator("summary").click();
  await page
    .getByRole("button", { name: "Campaign operations", exact: true })
    .click();
  await expect(page.locator(".automation-workflow")).toContainText(
    "Director approval",
  );
  await expect(page.locator(".case-system-outcome")).toContainText("−60%");
  await page.goto("/case-studies/aegon/#linkedin-abm");
  await expect(page.locator(".case-evidence-details")).toHaveAttribute("open");
  const abm = page.locator("#linkedin-abm");
  await expect(abm).toBeVisible();
  await expect(abm).toContainText("Thought Leader Ads and carousel creative");
  await expect(abm).toContainText(
    "Campaign results, targets, budget and performance metrics remain confidential",
  );
  expect(await abm.innerText()).not.toMatch(
    /[$€£]|\d\s*%|\b(?:million|ROAS|overshot|exceeded)\b/i,
  );
  await page.goto("/case-studies/dats/");
  await page.locator("summary").click();
  await expect(page.locator(".enquiry-workflow")).toContainText(
    "during working hours",
  );
});

test("all pages fit small screens and pass automated WCAG checks, including expanded evidence", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of ["/", ...slugs.map((s) => `/case-studies/${s}/`)]) {
    await page.goto(path);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${path} at ${width}`,
      ).toBe(true);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations, path).toEqual([]);
    if (path !== "/") {
      expect((await page.locator("main").boundingBox()).height).toBeLessThan(
        3 * 844,
      );
      await page.locator("summary").click();
      await page.setViewportSize({ width: 320, height: 844 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        path + " expanded",
      ).toBe(true);
      const expanded = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(expanded.violations, path + " expanded").toEqual([]);
    }
  }
});

test("Astro renders complete pages and evidence remains usable without JavaScript", async ({
  request,
  browser,
}) => {
  for (const path of ["/", ...slugs.map((s) => `/case-studies/${s}/`)]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain("Astro v");
    expect(html).toContain("Let’s talk paid media");
    expect(html).toContain(`href="https://andrewfonseka.com${path}"`);
    expect(html).not.toContain("next agency team");
    expect(html).not.toContain("Active engagements will transition");
  }
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/case-studies/university/");
  await expect(page.locator(".overview-figure")).toBeVisible();
  await page.locator("summary").click();
  await expect(page.locator(".case-table")).toBeVisible();
  await expect(page.locator(".case-source")).toBeVisible();
  const missing = await page.goto("http://127.0.0.1:4173/missing-page/");
  expect(missing.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Explore the case studies" }),
  ).toHaveAttribute("href", "/#work");
  await context.close();
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
});
