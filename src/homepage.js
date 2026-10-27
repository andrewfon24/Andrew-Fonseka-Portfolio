import { testimonials } from "./testimonials";
import { initEntranceMotion } from "./entranceMotion";

// The page is rendered at build time. Only these small interactions need JS.
export function initHomepage() {
  initEntranceMotion();
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          target.classList.add("revealed");
          if (target.id) {
            document.querySelectorAll(".navigation a").forEach((link) => {
              link.classList.toggle("active", link.hash === `#${target.id}`);
            });
          }
        });
      },
      { rootMargin: "-10% 0px -40% 0px" },
    );
    document
      .querySelectorAll("section[id], #approach, .reveal")
      .forEach((el) => observer.observe(el));
  }

  const reference = document.querySelector(".combined-reference");
  if (reference) {
    let index = 0;
    const show = (direction) => {
      index = (index + direction + testimonials.length) % testimonials.length;
      const quote = testimonials[index];
      reference.querySelector("blockquote").textContent = quote.quote;
      reference.querySelector(".reference-initials").textContent =
        quote.initials;
      reference.querySelector(".combined-person strong").textContent =
        quote.name;
      reference.querySelector(".combined-person p > span").textContent =
        quote.role;
      reference
        .querySelector(".testimonial-linkedin")
        .setAttribute(
          "aria-label",
          `Read LinkedIn recommendations for Andrew, including ${quote.name}`,
        );
      const counter = reference.querySelector(".combined-controls > span");
      counter.textContent = `0${index + 1} / 0${testimonials.length}`;
      counter.setAttribute(
        "aria-label",
        `Recommendation ${index + 1} of ${testimonials.length}`,
      );
    };
    reference
      .querySelector('[aria-label="Previous recommendation"]')
      .addEventListener("click", () => show(-1));
    reference
      .querySelector('[aria-label="Next recommendation"]')
      .addEventListener("click", () => show(1));
  }

  // Preserve the image fallback without hydrating every brand icon.
  document.addEventListener(
    "error",
    (event) => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement) || !image.closest(".brand-icon"))
        return;
      if (image.dataset.fallback) {
        image.src = image.dataset.fallback;
        delete image.dataset.fallback;
      } else {
        image.hidden = true;
      }
    },
    true,
  );
}
