// Keep server-rendered content visible, including when motion is disabled.
export function initEntranceMotion() {
  if (!("IntersectionObserver" in window)) return;
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const targets = document.querySelectorAll(
    ".intro-copy, .intro-portrait, .rebuild-stats > div, .result-card, .result-row, .overview-figure, .case-dashboard",
  );
  const seen = new WeakSet();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        seen.add(target);
        target.classList.add("motion-arrived");
        observer.unobserve(target);
      });
    },
    { threshold: 0.08 },
  );
  const syncPreference = () => {
    observer.disconnect();
    targets.forEach((target) => {
      if (preference.matches) target.classList.remove("motion-arrived");
      else if (!seen.has(target)) observer.observe(target);
    });
  };
  syncPreference();
  preference.addEventListener("change", syncPreference);
  return () => {
    observer.disconnect();
    preference.removeEventListener("change", syncPreference);
    targets.forEach((target) => target.classList.remove("motion-arrived"));
  };
}
