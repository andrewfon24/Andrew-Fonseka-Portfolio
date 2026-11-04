// Progressive enhancement for every page. Content is complete without this
// script; it only adds entrances, counters, chart drawing and small controls.

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initReveal() {
  const targets = document.querySelectorAll("[data-rise], [data-draw]");
  if (!("IntersectionObserver" in window) || reduced()) {
    targets.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -4% 0px", threshold: 0 },
  );
  targets.forEach((el) => io.observe(el));

  // Fallback: if the observer is late (background tabs, slow devices), reveal
  // anything already on screen when the page scrolls or loads, so copy is
  // never left hidden.
  let queued = false;
  const sweep = () => {
    queued = false;
    for (const el of targets) {
      if (el.classList.contains("is-in")) continue;
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) el.classList.add("is-in");
    }
  };
  const queue = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(sweep);
  };
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("load", () => setTimeout(sweep, 600));
}

function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length || reduced() || !("IntersectionObserver" in window)) return;
  const render = (el, n) => {
    el.textContent = `${el.dataset.prefix || ""}${Math.round(n).toLocaleString("en-US")}${el.dataset.suffix || ""}`;
  };
  const run = (el) => {
    const to = Number(el.dataset.count);
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      render(el, to * (1 - Math.pow(1 - t, 4)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        run(entry.target);
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.6 },
  );
  // The real figure stays on screen until the count actually starts, so a
  // late or missing trigger can never leave a counter showing zero.
  counters.forEach((el) => io.observe(el));
}

function initNav() {
  const nav = document.querySelector("[data-nav]");
  if (!nav) return;
  const onScroll = () => nav.toggleAttribute("data-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const links = [...nav.querySelectorAll(".nav__links a[href^='#']")];
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  if (!sections.length || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((a) => {
          if (a.getAttribute("href") === `#${entry.target.id}`) {
            a.setAttribute("aria-current", "true");
          } else {
            a.removeAttribute("aria-current");
          }
        });
      }
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );
  sections.forEach((s) => io.observe(s));
}

function initQuotes() {
  document.querySelectorAll("[data-quotes]").forEach((root) => {
    const slides = [...root.querySelectorAll(".quote__slide")];
    const status = root.querySelector("[data-quote-status]");
    let index = 0;
    const show = (step) => {
      slides[index].hidden = true;
      index = (index + step + slides.length) % slides.length;
      slides[index].hidden = false;
      if (status) status.textContent = `Recommendation ${index + 1} of ${slides.length}`;
    };
    root.querySelector("[data-quote-prev]")?.addEventListener("click", () => show(-1));
    root.querySelector("[data-quote-next]")?.addEventListener("click", () => show(1));
  });
}

function initFilters() {
  document.querySelectorAll("[data-filters]").forEach((root) => {
    const buttons = [...root.querySelectorAll("[data-filter]")];
    const tools = [...document.querySelectorAll("[data-group]")];
    buttons.forEach((button) =>
      button.addEventListener("click", () => {
        const group = button.dataset.filter;
        buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
        tools.forEach((t) =>
          t.toggleAttribute("data-dim", group !== "all" && t.dataset.group !== group),
        );
      }),
    );
  });
}

function initGantt() {
  document.querySelectorAll("[data-role-target]").forEach((bar) =>
    bar.addEventListener("click", () => {
      const role = document.getElementById(bar.dataset.roleTarget);
      if (!role) return;
      role.open = true;
      role.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "center" });
      role.querySelector("summary")?.focus({ preventScroll: true });
    }),
  );
}

function initCopy() {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    const label = button.querySelector("[data-copy-label]");
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        if (label) label.textContent = "Copied";
        setTimeout(() => label && (label.textContent = "Copy email"), 2000);
      } catch {
        if (label) label.textContent = "Select and copy";
      }
    });
  });
}

// Stageshow demos announce the step they are on; the list beside them follows.
function initStepSync() {
  window.addEventListener("demo-step", (event) => {
    const { list, index } = event.detail || {};
    document.querySelectorAll(`[data-steps="${list}"] > li`).forEach((li, i) => {
      li.toggleAttribute("data-active", i === index);
    });
  });
}

export function initMotion() {
  initReveal();
  initCounters();
  initNav();
  initQuotes();
  initFilters();
  initGantt();
  initCopy();
  initStepSync();
}
