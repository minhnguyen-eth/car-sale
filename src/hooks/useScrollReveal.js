import { useEffect, useRef } from "react";

// Attach to a parent element: any child with .reveal will fade-in-up when in view.
// Supports staggered delay via data-reveal-delay (ms).
// `deps` re-binds observer when async children appear (e.g. async-loaded lists).
export default function useScrollReveal({ threshold = 0.15, once = true, deps = [] } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.revealDelay || 0;
            entry.target.style.transitionDelay = `${delay}ms`;
            entry.target.classList.add("reveal-in");
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("reveal-in");
          }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    const observeAll = () => {
      root.querySelectorAll(".reveal:not(.reveal-in)").forEach((el) => io.observe(el));
    };
    observeAll();

    // Watch for new .reveal nodes added later (async data load).
    const mo = new MutationObserver(observeAll);
    mo.observe(root, { childList: true, subtree: true });

    // Safety net: if observer logic fails for any reason, ensure content is visible
    // after a short delay so users never see blank cards.
    const safety = setTimeout(() => {
      root.querySelectorAll(".reveal:not(.reveal-in)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) el.classList.add("reveal-in");
      });
    }, 800);

    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(safety);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, once, ...deps]);

  return ref;
}
