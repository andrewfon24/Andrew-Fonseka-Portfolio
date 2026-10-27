// Keep server-rendered content visible, including when motion is disabled.
export function initEntranceMotion() {
  if (!("IntersectionObserver" in window)) return;
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const targets = document.querySelectorAll(
    ".rebuild-stats > div, .result-card, .result-row, .overview-figure, .case-dashboard",
  );
  const seen = new WeakSet();
  const counters = new Map();
  const countUp = (target) => {
    const number = target.querySelector("[data-count-to]");
    if (!number) return;
    const display = number.querySelector(".metric-count-display");
    const value = Number(number.dataset.countTo);
    const suffix = number.dataset.countSuffix || "";
    const started = performance.now();
    const finish = () => {
      cancelAnimationFrame(counters.get(number)?.frame);
      display.textContent = `${value}${suffix}`;
      delete number.dataset.counting;
      counters.delete(number);
    };
    const state = { frame: 0, finish };
    counters.set(number, state);
    number.dataset.counting = "true";
    display.textContent = `0${suffix}`;
    let previous = 0;
    const tick = (now) => {
      const progress = Math.min((now - started) / 1500, 1);
      if (progress === 1) return finish();
      const current = Math.floor(value * (1 - (1 - progress) ** 2));
      if (current !== previous) {
        display.textContent = `${current}${suffix}`;
        previous = current;
      }
      state.frame = requestAnimationFrame(tick);
    };
    state.frame = requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        seen.add(target);
        target.classList.add("motion-arrived");
        countUp(target);
        observer.unobserve(target);
      });
    },
    { threshold: 0.08 },
  );
  const syncPreference = () => {
    observer.disconnect();
    if (preference.matches) counters.forEach(({ finish }) => finish());
    targets.forEach((target) => {
      if (preference.matches) target.classList.remove("motion-arrived");
      else if (!seen.has(target)) observer.observe(target);
    });
  };
  syncPreference();
  preference.addEventListener("change", syncPreference);
  return () => {
    observer.disconnect();
    counters.forEach(({ finish }) => finish());
    preference.removeEventListener("change", syncPreference);
    targets.forEach((target) => target.classList.remove("motion-arrived"));
  };
}
