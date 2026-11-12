import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { testimonials } from "../src/testimonials.js";

const slugs = ["aegon", "university", "panasia", "petmart", "dats"];
const email = "mailto:andrew@andrewfonseka.com";
const hash = (value) => createHash("sha256").update(value).digest("hex");
const pages = ["/", ...slugs.map((s) => `/case-studies/${s}/`)];

test("homepage leads with the positioning, one email action, the portrait and three outcomes", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Paid media judged on customers, not clicks.");
  await expect(page).toHaveTitle(/Paid Media & Performance Marketing Specialist/);
  const primary = page.locator(".hero .button--primary");
  await expect(primary).toHaveCount(1);
  await expect(primary).toHaveAttribute("href", new RegExp(`^${email}`));
  await expect(page.locator(".hero")).toContainText("Available now in Greater Vancouver. Authorized to work in Canada.");
  await expect(page.locator(".hero__visual img")).toHaveAttribute("alt", "Andrew Fonseka");
  await expect(page.locator(".metrics__item")).toHaveCount(3);
  for (const text of ["312", "fee-paid enrolments", "259", "funded gold loans", "4:1", "first-order ROAS"]) {
    await expect(page.locator(".metrics")).toContainText(text);
  }
  await expect(page.locator(".metrics a")).toHaveCount(3);
  await expect(page.locator(".metrics a").first()).toHaveAttribute("href", "/case-studies/university/");
  await expect(page.locator(".hero .signal")).toHaveCount(0);
  await expect(page.locator(".accounts")).toHaveCount(0);
  for (const slug of slugs) {
    await expect(page.locator(`a[href="/case-studies/${slug}/"]`).first()).toBeAttached();
  }
  // The Meta Ads Manager screenshot is gone everywhere.
  await expect(page.locator('img[src*="university-ads-results"]')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("documents, contact links and analytics hooks are preserved", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator("#contact h2")).toHaveText("Let’s talk paid media");
  await expect(page.locator("#contact a[href^='mailto:']")).toHaveAttribute("href", new RegExp(`^${email}`));
  // Email is the first and most prominent contact action.
  await expect(page.locator("#contact .contact__actions a").first()).toHaveAttribute("href", new RegExp(`^${email}`));
  await expect(page.locator("#contact")).toContainText("available now in Greater Vancouver");
  await expect(page.locator("#contact")).not.toContainText("778");
  for (const name of ["Andrew_Fonseka_Resume.pdf", "Andrew_Fonseka_Portfolio.pdf"]) {
    const response = await request.get(`/documents/${name}`);
    expect(response.status()).toBe(200);
    expect(hash(await response.body())).toBe(hash(readFileSync(`public/documents/${name}`)));
  }
  for (const name of ["email_click", "resume_download", "linkedin_click", "case_open", "portfolio_download"]) {
    await expect(page.locator(`[data-track="${name}"]`)).not.toHaveCount(0);
  }
  await expect(page.locator(".stack__group:not(.stack__group--wide) .tool")).toHaveCount(26);
  await expect(page.locator(".group-label")).toHaveText([
    "The journey so far",
    "Paid media platforms",
    "Productivity, systems & project management",
    "CMS, e-commerce & design",
    "Analytics & tracking",
    "Email & CRM",
    "Certifications",
  ]);
  await expect(page.locator(".cred")).toHaveCount(7);
});

test("navigation links to every section and collapses to brand, résumé and email on phones", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".nav__links a")).toHaveText(["Results", "Approach", "Experience", "Contact"]);
  await expect(page.locator(".nav__email")).toHaveAttribute("href", new RegExp(`^${email}`));
  await expect(page.locator('.nav__links a[href="#approach"]')).toHaveText("Approach");
  for (const id of ["work", "approach", "systems", "experience", "contact"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await page.locator('.nav__links a[href="#experience"]').click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(page.locator("#experience-title")).toBeInViewport();
  // The sticky nav must not cover the anchored heading.
  const navBottom = (await page.locator(".nav").boundingBox()).y + (await page.locator(".nav").boundingBox()).height;
  expect((await page.locator("#experience-title").boundingBox()).y).toBeGreaterThanOrEqual(navBottom);

  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.locator(".nav__links")).toBeHidden();
  await expect(page.locator(".brand")).toBeVisible();
  await expect(page.locator(".nav__resume")).toBeVisible();
  await expect(page.locator(".nav__email")).toBeVisible();
  // Nothing in the nav is clipped at phone width.
  const right = await page.locator(".nav__email").evaluate((el) => el.getBoundingClientRect().right);
  expect(right).toBeLessThanOrEqual(375);
});

test("case pages load directly, survive refresh and back, and link onward", async ({ page }) => {
  await page.goto("/");
  await page.locator('#work a[href="/case-studies/university/"]').click();
  await expect(page).toHaveURL(/\/case-studies\/university\/$/);
  await expect(page.locator("h1")).toHaveText("Optimize for enrolments, not form fills.");
  await page.reload();
  await expect(page.locator("h1")).toHaveText("Optimize for enrolments, not form fills.");
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  for (const slug of slugs) {
    const response = await page.goto(`/case-studies/${slug}/`);
    expect(response.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(".next-case")).toHaveCount(1);
  }
});

test("university case replaces the screenshot with the funnel, per-campaign charts and the match note", async ({ page }) => {
  await page.goto("/case-studies/university/");
  const funnel = page.locator(".brief .bars").first();
  await expect(funnel).toHaveAttribute("aria-label", /821.*430.*312/);
  await expect(page.locator("main")).toContainText("Enrolments matched on name, phone and student ID, and de-duplicated. Qualification data is available for all campaigns combined only.");
  await expect(page.locator('img[src*="university-ads-results"]')).toHaveCount(0);

  const explorer = page.locator(".explorer");
  await explorer.scrollIntoViewIfNeeded();
  await expect(explorer.locator("tbody tr")).toHaveCount(3);
  await expect(explorer.locator("tfoot")).toContainText("821");
  await expect(explorer.locator("tfoot")).toContainText("US$20.02");
  await explorer.getByRole("button", { name: "Priority colleges" }).click();
  await expect(explorer.getByRole("button", { name: "Priority colleges" })).toHaveAttribute("aria-pressed", "true");
  await expect(explorer.locator("tbody tr[data-dim]")).toHaveCount(2);
  await expect(page.locator(".callout__big")).toContainText("125");
  await expect(page.locator(".case-hero .chips")).toContainText("Independent project, via partner agency");
  // The big figure and its sentence never overlap, at any desktop width.
  for (const width of [1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    const [big, text] = await page.locator(".panel.callout > *").evaluateAll((els) => els.map((el) => el.getBoundingClientRect().toJSON()));
    const separate = big.right <= text.left || big.bottom <= text.top;
    expect(separate, `callout overlaps at ${width}px`).toBe(true);
  }
});

test("Aegon shows process and responsibilities without result figures", async ({ page }) => {
  await page.goto("/case-studies/aegon/");
  await expect(page.locator("main")).toContainText("Illustrative process. No employer results or figures are shown.");
  await expect(page.locator(".pipeline li")).toHaveCount(6);
  await expect(page.locator(".journey__steps li")).toHaveCount(6);
  await expect(page.locator(".systems-list li")).toHaveCount(5);
  await expect(page.locator(".build-steps li")).toHaveCount(4);
  await expect(page.locator("main")).toContainText("Legal and compliance kept final approval");
  await expect(page.locator("main")).not.toContainText("account-based");
  await expect(page.locator("main")).not.toContainText("eliminated");
  await expect(page.locator(".case-stat")).toHaveCount(0);
  await expect(page.locator("main")).not.toContainText("US$");
  await page.goto("/case-studies/dats/");
  await expect(page.locator(".case-hero .chips")).toContainText("Independent project");
  await expect(page.locator(".case-hero .chips")).not.toContainText("Independent projects");
});

test("journey entries and testimonials respond to input", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".role")).toHaveCount(6);
  await expect(page.locator(".role[open]")).toHaveCount(0);
  await page.locator("#role-kites-global summary").click();
  await expect(page.locator("#role-kites-global")).toHaveAttribute("open", "");
  await expect(page.locator("#role-kites-global")).toContainText("Godrej India");
  // Plain and linked client chips share the same inner padding.
  const pads = await page.locator("#role-kites-global .client-chip").evaluateAll((els) => els.map((el) => getComputedStyle(el).paddingLeft));
  expect(new Set(pads).size).toBe(1);
  expect(parseFloat(pads[0])).toBeGreaterThan(8);
  await expect(page.locator("#role-university-canada-west")).toContainText("Jun 2023 – Oct 2024");
  await expect(page.locator("#role-aegon")).toContainText("Intermediate Channel Marketing Specialist (Paid Media)");
  await expect(page.locator("#role-independent-projects")).toContainText("Jan 2026 – Sep 2026");

  // Two excerpts, both visible, each a verbatim part of the full recommendation.
  await expect(page.locator(".ref")).toHaveCount(2);
  await expect(page.locator(".ref__label")).toHaveText(["Excerpt", "Excerpt"]);
  for (const t of testimonials) {
    expect(t.quote.includes(t.excerpt)).toBe(true);
    await expect(page.locator(".ref", { hasText: t.name })).toContainText(t.excerpt);
  }

});

test("every page fits small screens and passes automated WCAG 2.1 AA checks", async ({ page }) => {
  // Measure settled colours, not frames caught mid-fade.
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 375, height: 812 },
  ]) {
    await page.setViewportSize(viewport);
    for (const path of [...pages, "/missing-page/"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(overflow, `${path} at ${viewport.width}`).toBeLessThanOrEqual(0);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .exclude(".ss-stage")
        .analyze();
      expect(results.violations.map((v) => `${path}: ${v.id}`)).toEqual([]);
    }
  }
});

test("content and evidence remain readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const path of pages) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    const hidden = await page.evaluate(
      () => [...document.querySelectorAll("[data-rise]")].filter((el) => getComputedStyle(el).opacity === "0").length,
    );
    expect(hidden, path).toBe(0);
  }
  await page.goto("/");
  await expect(page.locator(".metrics")).toContainText("312");
  await expect(page.locator("#work")).toContainText("312");
  await expect(page.locator("#work")).toContainText("125");
  await expect(page.locator("#work")).toContainText("259");
  await expect(page.locator(".role")).toHaveCount(6);
  await page.goto("/case-studies/university/");
  await expect(page.locator("main")).toContainText("821");
  await expect(page.locator(".data-table tbody tr")).toHaveCount(3);
  await context.close();
});

test("reduced motion shows final figures and finished charts immediately", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".metrics [data-count]")).toHaveText(["312", "259", "4:1"]);
  await page.goto("/case-studies/university/");
  const scales = await page.locator(".brief .bar-fill").evaluateAll((els) => els.map((el) => getComputedStyle(el).transform));
  expect(scales.every((t) => t !== "matrix(0, 0, 0, 1, 0, 0)")).toBe(true);
  await page.goto("/");
  const risen = await page.evaluate(
    () => [...document.querySelectorAll("[data-rise]")].every((el) => getComputedStyle(el).opacity === "1"),
  );
  expect(risen).toBe(true);
  await context.close();
});

test("counters count up once and land on the real figure", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".metrics [data-count]").first()).toHaveText("312", { timeout: 4000 });
  const compare = page.locator(".compare__row--win [data-count]");
  await compare.scrollIntoViewIfNeeded();
  await expect(compare).toHaveText("125", { timeout: 4000 });
});

test("unknown pages recover to the work and email", async ({ page }) => {
  const response = await page.goto("/missing-page/");
  expect(response.status()).toBe(404);
  await expect(page.locator('main a[href="/#work"]')).toBeVisible();
  await expect(page.locator(`main a[href^="${email}"]`)).toBeVisible();
});

test("hiring-evidence pass: role, ownership and corrected claims", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".hero .actions a")).toHaveText(["Email me", "See the results"]);
  await expect(page.locator(".card__role")).toHaveCount(4);
  await expect(page.locator(".card__role").first()).toContainText("The partner agency ran day-to-day optimisation");
  await expect(page.locator(".card--process")).toHaveCount(0);
  await expect(page.locator('#systems a[href="/case-studies/aegon/"]')).toHaveCount(1);
  await expect(page.locator("#approach .approach__steps li h3")).toHaveText(["Audit", "Define", "Test", "Report"]);
  await expect(page.locator("main")).not.toContainText("Liveline");
  await expect(page.locator("main")).not.toContainText("Demand Gen");
  await expect(page.locator("#experience")).toContainText("one QA pass instead of rework");

  await page.goto("/case-studies/petmart/");
  await expect(page.locator("main")).toContainText("not used to calculate the 4:1 first-order ROAS");
  await expect(page.locator(".columns[aria-label*='US$50K']")).toHaveCount(0);
  await expect(page.locator("main")).not.toContainText("boosted by");

  await page.goto("/case-studies/university/");
  await expect(page.locator(".who")).toContainText("audience structure, placements and a higher-intent lead form");
  await expect(page.locator(".panel--limits")).toContainText("Its 167 covers every programme");

  for (const slug of ["university", "panasia", "petmart", "dats"]) {
    await page.goto(`/case-studies/${slug}/`);
    await expect(page.locator(".panel--limits li")).not.toHaveCount(0);
  }
  await page.goto("/case-studies/panasia/");
  await expect(page.locator(".case-hero .chips")).toContainText("Jan to Jun 2023");
  await page.goto("/case-studies/dats/");
  await expect(page.locator("main")).toContainText("including Microsoft Advertising");
});

test("story pass: four short result cards, two to a row, and a tighter Aegon and stack", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#work h2")).toHaveText("Every result here ends at a customer.");
  const chapters = page.locator("#work .chapter");
  await expect(chapters).toHaveCount(4);
  await expect(chapters.locator("h3")).toHaveText([
    "The cheaper leads were filling the wrong colleges.",
    "Lead quality made the allocation decision.",
    "First orders. Lasting customers.",
    "More qualified leads. Same budget.",
  ]);
  // Cards carry the headline and the result; problem and decision live on the case page.
  await expect(chapters.locator(".chapter__result")).toHaveCount(4);
  await expect(page.locator("#work .beats")).toHaveCount(0);
  // Aegon keeps the demo and three facts; the step list stays on its case page.
  await expect(page.locator("#systems .pipeline")).toHaveCount(0);
  await expect(page.locator("#systems .facts dt")).toHaveText(["The problem", "What I built", "Who I worked with"]);
  // Approach closes the Aegon section: same dark band, four steps, no second demo.
  await expect(page.locator("#approach.band--dark")).toHaveCount(1);
  await expect(page.locator("#approach .ss-stage")).toHaveCount(0);
  await expect(page.locator("main .ss-stage")).toHaveCount(1);
  const gap = await page.evaluate(() => {
    const a = document.querySelector("#systems").getBoundingClientRect();
    const b = document.querySelector("#approach").getBoundingClientRect();
    return Math.round(b.top - a.bottom);
  });
  expect(gap).toBe(0);
  for (const fact of ["125 fee-paid enrolments", "259 funded gold loans", "4:1 first-order ROAS", "up from 178"]) {
    await expect(page.locator("#work")).toContainText(fact);
  }
  await expect(page.locator("#work .compare__row")).toHaveCount(2);
  await expect(page.locator("#work")).toContainText("not a controlled test");
  await expect(page.locator("#systems .head")).toContainText("The results are confidential");
  await expect(page.locator("#questions")).toHaveCount(0);

  // Two to a row, and each pair lines up row for row.
  const boxes = await chapters.evaluateAll((els) =>
    els.map((el) => {
      const top = el.getBoundingClientRect().top;
      return {
        left: Math.round(el.getBoundingClientRect().left),
        rows: [...el.children].map((child) => Math.round(child.getBoundingClientRect().top - top)).join(","),
      };
    }),
  );
  expect(boxes[0].left).toBe(boxes[2].left);
  expect(boxes[1].left).toBe(boxes[3].left);
  expect(boxes[0].left).toBeLessThan(boxes[1].left);
  expect(boxes[0].rows).toBe(boxes[1].rows);
  expect(boxes[2].rows).toBe(boxes[3].rows);
});

test("objection pass: hands-on work, agency scope and Aegon scale are stated", async ({ page }) => {
  await page.goto("/");
  // Hands-on: every card says who made the changes in the account.
  await expect(page.locator("#work .head")).toContainText("On three of them I made the week-to-week changes in the ad accounts myself");
  const roles = page.locator("#work .card__role");
  await expect(roles.nth(0)).toContainText("audience structure, the placements and a higher-intent lead form");
  await expect(roles.nth(1)).toContainText("made the week-to-week changes in Meta and Google Ads");
  await expect(roles.nth(2)).toContainText("I made the week-to-week changes in the account myself");
  await expect(roles.nth(3)).toContainText("week-to-week changes in the accounts");
  // Aegon: the budget band and nothing more specific.
  await expect(page.locator("#systems .chips")).toContainText("Seven-figure annual budget");
  await expect(page.locator("#systems")).not.toContainText("$");
  await expect(page.locator("#approach")).toContainText("pre-launch checklist");
  // Agency scope is visible without opening anything.
  await expect(page.locator("#experience .story")).toContainText("I led four client accounts");
  await expect(page.locator("#experience .story")).toContainText("hybrid or on-site");
  await page.locator("#role-kites-global summary").click();
  await expect(page.locator("#role-kites-global")).toContainText("The client reported US$300K in revenue for the quarter the ads ran");
  await expect(page.locator("#role-kites-global")).toContainText("The bank approved it");
  await page.locator("#role-enfection summary").click();
  await expect(page.locator("#role-enfection")).toContainText("stayed with the agency");
  await expect(page.locator("#toolkit")).toContainText("Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads and Google Analytics 4");
  await expect(page.locator("#contact")).toContainText("hybrid or on-site roles");
  // No mistake story and no permit date on the site.
  await expect(page.locator("main")).not.toContainText("overspen");
  await expect(page.locator("body")).not.toContainText("2027");

  await page.goto("/case-studies/aegon/");
  await expect(page.locator("main")).toContainText("on a seven-figure annual budget");
  await page.goto("/case-studies/panasia/");
  await expect(page.locator("main")).toContainText("The bank approved it");
});
