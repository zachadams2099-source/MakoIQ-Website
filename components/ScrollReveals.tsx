"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveals() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Qualifying question: halves slide in from left/right, divider draws itself.
      const qqLeft = document.querySelector("[data-qq-left]");
      const qqRight = document.querySelector("[data-qq-right]");
      const qqDivider = document.querySelector("[data-qq-divider]");
      if (qqLeft && qqRight) {
        gsap.set(qqDivider, { scaleY: 0, transformOrigin: "center" });
        gsap
          .timeline({
            scrollTrigger: { trigger: qqLeft, start: "top 82%", toggleActions: "play none none reverse" },
          })
          .from(qqLeft, { x: -40, opacity: 0, duration: 0.7, ease: "expo.out" }, 0)
          .from(qqRight, { x: 40, opacity: 0, duration: 0.7, ease: "expo.out" }, 0)
          .to(qqDivider, { scaleY: 1, duration: 0.5, ease: "power2.out" }, 0.2);
      }

      // How it works: staggered card entrance.
      const hiwCards = gsap.utils.toArray<HTMLElement>("[data-hiw-card]");
      if (hiwCards.length) {
        gsap.from(hiwCards, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: hiwCards[0].closest("section") ?? hiwCards[0],
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Value receipt: copy and card reveal.
      const receiptCopy = document.querySelector("[data-receipt-copy]");
      const receiptCard = document.querySelector("[data-receipt-card]");
      if (receiptCopy) {
        gsap.from(receiptCopy, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: { trigger: receiptCopy, start: "top 80%", toggleActions: "play none none reverse" },
        });
      }
      if (receiptCard) {
        gsap.from(receiptCard, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: { trigger: receiptCard, start: "top 80%", toggleActions: "play none none reverse" },
        });
      }

      // Pricing cards: staggered entrance.
      const pricingCards = gsap.utils.toArray<HTMLElement>("[data-pricing-card]");
      if (pricingCards.length) {
        gsap.from(pricingCards, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: pricingCards[0].closest("section") ?? pricingCards[0],
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
