"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Explicit fromTo() values are used throughout instead of from()'s implicit
// "to" capture: in a dynamic React tree (simulator height changes, dev-mode
// double effects) the current-value capture can race and lock elements at
// opacity 0 forever. Hardcoded end values remove that failure mode entirely.
function staggerReveal(selector: string) {
  const items = gsap.utils.toArray<HTMLElement>(selector);
  if (!items.length) return;
  gsap.fromTo(
    items,
    { y: 28, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.09,
      ease: "expo.out",
      scrollTrigger: {
        trigger: items[0].closest("section") ?? items[0],
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

function fadeReveal(el: Element | null) {
  if (!el) return;
  gsap.fromTo(
    el,
    { y: 28, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" },
    }
  );
}

export default function ScrollReveals() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // The interactive simulator's height changes constantly as its steps
    // progress, which shifts every section below it. ScrollTrigger only
    // caches positions on mount/resize/load, so without this, sections
    // after the hero can end up with the wrong trigger boundaries.
    let refreshTimeout: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 120);
    });
    resizeObserver.observe(document.body);

    const ctx = gsap.context(() => {
      fadeReveal(document.querySelector("[data-htoh-intro]"));
      staggerReveal("[data-htoh-row]");
      staggerReveal("[data-usecase-card]");
      staggerReveal("[data-hiw-card]");
      staggerReveal("[data-trust-card]");
      staggerReveal("[data-pricing-card]");

      fadeReveal(document.querySelector("[data-receipt-copy]"));
      fadeReveal(document.querySelector("[data-receipt-card]"));
    });

    return () => {
      clearTimeout(refreshTimeout);
      resizeObserver.disconnect();
      ctx.revert();
    };
  }, []);

  return null;
}
