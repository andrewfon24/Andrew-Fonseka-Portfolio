import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("renders the portfolio without browser errors and serves the real documents", async ({
  page,
  request,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Paid media judged",
  );
  await expect(page.locator(".project-card")).toHaveCount(5);
  await expect(page.locator(".hero-art img")).toBeVisible();
  expect(
    await page
      .locator(".hero-art img")
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
  await expect(
    page.locator('a[href="mailto:rafandrewf@gmail.com"]').first(),
  ).toBeAttached();
  await expect(
    page.getByRole("link", { name: "Connect on LinkedIn", exact: true }),
  ).toHaveAttribute("href", "https://www.linkedin.com/in/andrewfonseka/");
  expect(errors).toEqual([]);
});

test("contact matches the reference and measurement and allocation sections are removed", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(
    page.locator(".measurement-section, .allocation-section"),
  ).toHaveCount(0);
  await expect(page.locator('nav a[href="#systems"]')).toHaveCount(1);
  await expect(page.locator("#systems")).toBeVisible();
  const contact = page.locator("#contact");
  await expect(
    contact.getByRole("heading", { name: "Let’s talk paid media" }),
  ).toBeVisible();
  await expect(contact.locator(".contact-reference-actions > a")).toHaveCount(
    4,
  );
  await expect(
    contact.getByRole("link", { name: "Portfolio PDF" }),
  ).toHaveAttribute("href", "/documents/Andrew_Fonseka_Portfolio.pdf");
  await expect(page.locator(".reference-footer")).toContainText(
    "Paid media · Business growth · Account ownership",
  );
  await expect(page.locator(".project-case-link")).toHaveCount(5);
  for (const link of await contact.locator("a[download]").all()) {
    expect((await request.get(await link.getAttribute("href"))).ok()).toBe(
      true,
    );
  }
});

test("filters link to independent case pages with refresh and browser back", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Education", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await page.locator('a[href="/case-studies/university/"]').click();
  await expect(page).toHaveURL(/\/case-studies\/university\/$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "From interest to intake.",
  );
  await page
    .getByRole("button", { name: "Broad undergraduate", exact: true })
    .click();
  await expect(page.locator(".campaign-results")).toContainText("603");
  await expect(page.locator(".campaign-results")).toContainText("27.7%");
  await expect(page.locator("figure img")).toHaveAttribute(
    "src",
    "/images/university-ads-results.png",
  );
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await page.getByRole("button", { name: "E-commerce", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page.locator(".project-open").click();
  await expect(page.locator(".petmart-evidence img")).toBeVisible();
  await page.getByRole("link", { name: "Back to selected work" }).click();
  await page
    .getByRole("button", { name: "Financial services", exact: true })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(2);
});

test("brand icons, recommendations and career expansion work", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await expect(page.locator(".stack-group h3")).toHaveText([
    "Paid media platforms",
    "Analytics & tracking",
    "Productivity, systems & project management",
    "Email & CRM",
    "CMS, e-commerce & design",
  ]);
  await expect(page.locator(".stack-group li")).toHaveCount(30);
  await expect(page.locator(".stack-analytics")).toContainText("Screaming Frog");
  await page.getByRole("button", { name: "Next recommendation" }).click();
  await expect(page.locator(".quote-person")).toContainText(
    "Hashan Nalinda Fernando",
  );
  await page.getByRole("button", { name: "Previous recommendation" }).click();
  await expect(page.locator(".quote-person")).toContainText(
    "Don Chanaka Perera",
  );
  const kites = page.locator(".experience-item").filter({
    has: page.getByRole("heading", { name: "Kites Global", exact: true }),
  });
  await kites.locator("summary").click();
  await expect(kites.locator(".experience-detail")).toBeVisible();
  await expect(kites).toContainText("Led four client accounts");
  for (const li of await page.locator(".stack-group li").all()) {
    const img = li.locator(".brand-icon img");
    if (await img.count())
      await expect(img).toHaveAttribute("src", /cdn\.brandfetch\.io|\/images\/brands\//);
    else await expect(li.locator(".brand-letter")).toHaveCount(1);
  }
  await expect(page.locator(".cert-grid .brand-icon")).toHaveCount(6);
  await expect(page.locator(".testimonial-linkedin")).toHaveAttribute(
    "href",
    /linkedin.com/,
  );
  await expect(page.locator(".tool-initial")).toHaveCount(0);
});

test("mobile navigation, layout and reduced motion are usable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `No horizontal overflow at ${width}px`,
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page
      .getByRole("navigation")
      .getByRole("link", { name: "Results", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Results", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#work$/);
  await page
    .locator(".project-open")
    .filter({ hasText: "Private university · Saudi Arabia" })
    .click();
  await expect(page.locator(".case-page")).toBeVisible();
  expect(
    await page
      .locator(".case-page")
      .evaluate((el) => el.scrollWidth <= el.clientWidth),
  ).toBe(true);

  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

test("home and dedicated case page meet automated WCAG 2.1 AA checks", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const pageResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(pageResults.violations).toEqual([]);
  await page
    .locator(".project-open")
    .filter({ hasText: "Private university · Saudi Arabia" })
    .click();
  const dialogResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(dialogResults.violations).toEqual([]);
});

test("all case studies tell the problem, action and result with source-backed dashboards", async ({
  page,
}) => {
  await page.goto("/");
  const clients = [
    "Private university · Saudi Arabia",
    "Petmart.lk",
    "Pan Asia Bank",
    "DIMO Academy of Technical Studies",
    "Aegon",
  ];
  for (const client of clients) {
    const trigger = page
      .locator(".project-open")
      .filter({ has: page.locator(".project-client", { hasText: client }) });
    await trigger.click();
    const dialog = page.locator(".case-page");
    for (const title of ["The problem", "What I did", "The result"])
      await expect(
        dialog.getByRole("heading", { name: title, exact: true }),
      ).toBeVisible();
    await expect(dialog.locator(".case-dashboard")).toBeVisible();
    await expect(dialog.locator('a[href*="Portfolio.pdf"]')).toHaveCount(0);
    await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
    if (client === "Pan Asia Bank") {
      await dialog.getByRole("button", { name: "Meta", exact: true }).click();
      await expect(dialog.locator(".allocation-insight")).toContainText(
        "US$15,000",
      );
      await dialog
        .getByRole("button", { name: "Google Ads", exact: true })
        .click();
      await expect(dialog.locator(".allocation-insight")).toContainText(
        "US$10,000",
      );
    }
    if (client === "Aegon") {
      await dialog
        .getByRole("button", { name: "Campaign operations", exact: true })
        .click();
      await expect(dialog.locator(".case-system-outcome")).toContainText(
        "−60%",
      );
      await dialog
        .getByRole("button", { name: "Conversion signals", exact: true })
        .click();
      await expect(dialog.locator(".case-system-outcome")).toContainText(
        "+25%",
      );
    }

    await page.getByRole("link", { name: "Back to selected work" }).click();
  }
});

test("case study dashboards fit a narrow screen and pass accessibility checks", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const urls = await page
    .locator(".project-open")
    .evaluateAll((links) => links.map((a) => a.getAttribute("href")));
  for (const url of urls) {
    await page.goto(url);
    const dialog = page.locator(".case-page");
    expect(
      await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
});

test("navigation spans the viewport, AF monogram stays circular, metrics and education match the brief", async ({
  page,
}) => {
  await page.goto("/");
  const geometry = await page.evaluate(() => {
    const box = (selector) =>
      document.querySelector(selector).getBoundingClientRect().toJSON();
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
  await expect(page.locator(".stats-strip strong")).toHaveText([
    "Since 2022",
    "7-figure",
    "50 + ~100",
    "6 markets",
  ]);
  await expect(page.locator(".stats-strip")).toContainText(
    "Singapore · Malaysia · Sri Lanka · Saudi Arabia · US · Canada",
  );
  await expect(page.locator(".experience-list")).toContainText(
    "Aug 2023 – Oct 2024",
  );
  await expect(page.locator(".experience-list")).toContainText(
    "Sep 2019 – Jun 2022",
  );
  await expect(page.locator("#work a[download]")).toHaveCount(0);
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const avatar = await page.locator(".brand-monogram").evaluate((img) => {
      const rect = img.getBoundingClientRect();
      const style = getComputedStyle(img);
      return {
        width: rect.width,
        height: rect.height,
        text: img.textContent,
        round: style.borderRadius,
      };
    });
    expect(avatar.width).toBe(avatar.height);
    expect(avatar.text).toBe("AF");
    expect(avatar.round).toBe("50%");
  }
});

test("Astro delivers complete HTML, unique metadata, and useful missing-page navigation", async ({
  request,
  browser,
}) => {
  for (const slug of [
    "",
    "case-studies/aegon/",
    "case-studies/university/",
    "case-studies/panasia/",
    "case-studies/petmart/",
    "case-studies/dats/",
  ]) {
    const response = await request.get("/" + slug);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain("Astro v");
    expect(html).toContain("Let’s talk paid media");
    expect(html).toContain(`href="https://andrewfonseka.com/${slug}"`);
    expect(html).not.toContain("AAF");
    if (slug) {
      expect(html).toContain("The problem");
      expect(html).toContain("What I did");
      expect(html).toContain("The result");
    } else {
      expect(html).toContain(
        "I’m Andrew, and I love figuring out what makes a campaign work.",
      );
    }
  }
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/case-studies/aegon/");
  await expect(
    page.getByRole("heading", { name: "The problem", exact: true }),
  ).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();
  const missing = await page.goto("http://127.0.0.1:4173/missing-page/");
  expect(missing.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Explore the case studies" }),
  ).toHaveAttribute("href", "/#work");
  await context.close();
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
});

test("retired claims never appear on any page", async ({ request }) => {
  for (const path of [
    "/",
    ...["university", "panasia", "aegon", "petmart", "dats"].map((c) => `/case-studies/${c}/`),
  ]) {
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
    ]) {
      expect(html, `${path} contains "${banned}"`).not.toContain(banned);
    }
  }
});

test("work comes first and analytics hooks are on the conversion links", async ({ page }) => {
  await page.goto("/");
  const order = await page.evaluate(() =>
    [...document.querySelectorAll("main section[id]")].map((s) => s.id),
  );
  expect(order.slice(0, 3)).toEqual(["work", "approach", "systems"]);
  const firstCardTop = await page.evaluate(
    () => document.querySelector(".story-card").getBoundingClientRect().top + scrollY,
  );
  expect(firstCardTop).toBeLessThan(1400);
  for (const name of ["resume_download", "email_click", "linkedin_click", "case_open", "portfolio_download"]) {
    await expect(page.locator(`[data-track="${name}"]`)).not.toHaveCount(0);
  }
});
