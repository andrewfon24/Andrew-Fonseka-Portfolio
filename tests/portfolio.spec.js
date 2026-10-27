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
  await expect(
    page.locator(".result-row .more-card-metric > strong"),
  ).toHaveText(["4:1", "+20%"]);
  const moreBoxes = await page
    .locator(".result-row")
    .evaluateAll((es) => es.map((e) => e.getBoundingClientRect().toJSON()));
  expect(Math.abs(moreBoxes[0].top - moreBoxes[1].top)).toBeLessThan(2);
  expect(moreBoxes[1].left).toBeGreaterThan(moreBoxes[0].right);
  await expect(page.locator(".card-data")).toHaveCount(3);
  const firstCard = page.locator(".result-card .project-open").first();
  await firstCard.focus();
  await expect
    .poll(() =>
      page
        .locator(".card-data-track i")
        .first()
        .evaluate((e) => getComputedStyle(e, "::after").opacity),
    )
    .toBe("1");
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
      ".filters, #systems, .decision-story, .client-partnership, .quote-controls, .preview-graphic",
    ),
  ).toHaveCount(0);
  await expect(page.locator("#references blockquote")).toHaveCount(1);
  await expect(page.locator("#references")).toContainText(
    "Verbatim LinkedIn recommendation",
  );
  await expect(page.locator("#about")).toContainText("Marketing Strategist");
  await expect(page.locator("main")).not.toContainText("next agency team");
  await expect(page.locator("#references #approach")).toBeVisible();
  await expect(page.locator(".combined-steps li")).toHaveCount(4);
  expect(
    await page
      .locator("main > section[id]")
      .evaluateAll((es) => es.map((e) => e.id)),
  ).toEqual(["work", "references", "about", "toolkit"]);
  await page.getByRole("button", { name: "Next recommendation" }).click();
  await expect(page.locator(".combined-person")).toContainText(
    "Hashan Nalinda Fernando",
  );
  await page.getByRole("button", { name: "Previous recommendation" }).click();
  await expect(page.locator(".combined-person")).toContainText(
    "Don Chanaka Perera",
  );
  await expect(page.locator(".experience-item")).toHaveCount(6);
  await expect(page.locator(".experience-item[open]")).toHaveCount(0);
  await expect(page.locator(".experience-list")).toContainText(
    "Aug 2023 – Oct 2024",
  );
  await expect(page.locator(".experience-list")).toContainText(
    "Sep 2019 – Jun 2022",
  );
  const kites = page.locator(".experience-item").filter({
    has: page.getByRole("heading", { name: "Kites Global", exact: true }),
  });
  await kites.locator("summary").click();
  await expect(kites.locator(".experience-detail")).toBeVisible();
  await kites.locator("summary").click();
  await expect(kites.locator(".experience-detail")).toBeHidden();
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
    "Approach",
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
  expect((await page.locator(".header").boundingBox()).height).toBe(96);
  for (const link of await page.locator(".navigation a").all()) {
    expect((await link.boundingBox()).height).toBeGreaterThanOrEqual(56);
  }
  await page.locator('.navigation a[href="#approach"]').click();
  await expect(page).toHaveURL(/#approach$/);
  await expect(page.locator("#approach-title")).toBeInViewport();
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
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    const ring = await page.locator(".bank-donut > div").boundingBox();
    const value = await page.locator(".bank-donut strong").boundingBox();
    expect(value.x).toBeGreaterThanOrEqual(ring.x + 12);
    expect(value.x + value.width).toBeLessThanOrEqual(ring.x + ring.width - 12);
    expect(
      Math.abs(value.x + value.width / 2 - ring.x - ring.width / 2),
    ).toBeLessThan(1);
  }
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

test("1.5-second entrances run once, preserve data and respect reduced motion", async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const metric = page.locator(".rebuild-stats > div").first();
    await metric.scrollIntoViewIfNeeded();
    await expect(metric).toHaveClass(/motion-arrived/);
    expect(
      await metric.evaluate((e) => getComputedStyle(e).animationDuration),
    ).toBe("1.5s");
    expect(
      await metric
        .locator("strong")
        .evaluate((e) => getComputedStyle(e).animationDuration),
    ).toBe("1.5s");
    const card = page.locator(".result-card").first();
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveClass(/motion-arrived/);
    const bar = card.locator(".card-data-track i").first();
    expect(
      await bar.evaluate((e) => getComputedStyle(e).animationDuration),
    ).toBe("1.5s");
    await card.evaluate(async (e) => {
      await Promise.all(
        e.getAnimations({ subtree: true }).map((a) => a.finished),
      );
    });
    await expect(card.locator(".result-numbers strong")).toHaveText([
      "312",
      "~US$20",
    ]);
    await page.locator("#about").scrollIntoViewIfNeeded();
    await expect(page.locator(".experience-item[open]")).toHaveCount(0);
    const entry = page.locator(".experience-item").first();
    await entry.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(entry).toHaveAttribute("open");
    await page.keyboard.press("Enter");
    await expect(entry).not.toHaveAttribute("open");
    await card.scrollIntoViewIfNeeded();
    expect(
      await card.evaluate(
        (e) =>
          e
            .getAnimations({ subtree: true })
            .filter((a) => a.playState === "running").length,
      ),
    ).toBe(0);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(card).not.toHaveClass(/motion-arrived/);
    await page.reload();
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
    expect(
      await card.evaluate((e) => e.getAnimations({ subtree: true }).length),
    ).toBe(0);
    await expect(page.locator(".experience-item[open]")).toHaveCount(0);
  }
});

test("homepage delivers content and interactions without framework hydration or blocking CSS", async ({
  page,
}) => {
  const scripts = [];
  page.on("response", async (response) => {
    if (
      response.request().resourceType() === "script" &&
      response.url().includes("127.0.0.1")
    ) {
      scripts.push(response.url());
    }
  });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("astro-island")).toHaveCount(0);
  await expect(page.locator('link[rel="stylesheet"]')).toHaveCount(0);
  expect(scripts.some((url) => /\/(?:App|client|react)\./.test(url))).toBe(
    false,
  );
  await expect(page.locator('link[rel="preload"][as="font"]')).toHaveCount(2);
  // Keep the largest text paint independent of entrance-animation timing.
  expect(
    await page
      .locator(".intro-copy")
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe("none");
  await page.getByRole("button", { name: "Next recommendation" }).click();
  await expect(page.locator(".combined-person")).toContainText(
    "Hashan Nalinda Fernando",
  );
  await page.getByRole("button", { name: "Next recommendation" }).click();
  await expect(page.locator(".combined-person")).toContainText(
    "Don Chanaka Perera",
  );
});
