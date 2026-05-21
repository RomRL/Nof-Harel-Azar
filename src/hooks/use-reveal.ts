import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal, .reveal-left, .reveal-right, .reveal-scale");

    // Stagger children inside a [data-stagger] container automatically
    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((parent) => {
      const step = Number(parent.dataset.stagger ?? 80);
      parent.querySelectorAll<HTMLElement>(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach((child, i) => {
        if (!child.style.transitionDelay) {
          child.style.transitionDelay = `${i * step}ms`;
        }
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
