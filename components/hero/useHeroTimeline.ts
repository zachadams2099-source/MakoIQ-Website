"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";

export type HeroRefs = {
  stage: RefObject<HTMLDivElement>;
  docs: RefObject<(HTMLDivElement | null)[]>;
  template: RefObject<HTMLDivElement>;
  pageEcho: RefObject<(HTMLDivElement | null)[]>;
  receipt: RefObject<HTMLDivElement>;
};

export function useHeroTimeline(refs: HeroRefs) {
  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const { stage, docs, template, pageEcho, receipt } = refs;
    if (!stage.current || !template.current || !receipt.current) return;
    const stageEl = stage.current;
    const templateEl = template.current;
    const receiptEl = receipt.current;

    const ctx = gsap.context(() => {
      const docEls = (docs.current ?? []).filter(Boolean) as HTMLDivElement[];
      const echoEls = (pageEcho.current ?? []).filter(Boolean) as HTMLDivElement[];
      const readyChip = templateEl.querySelector<HTMLElement>("[data-ready-chip]");
      const cursor = templateEl.querySelector<HTMLElement>("[data-cursor]");
      const hoursValue = receiptEl.querySelector<HTMLElement>("[data-hours-value]");

      // Ambient idle drift for scattered cards, independent of the main loop.
      docEls.forEach((el, i) => {
        gsap.to(el, {
          y: `+=${6 + (i % 4) * 2}`,
          duration: 2.4 + (i % 5) * 0.3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });

      const contentPieces = {
        heading: templateEl.querySelector<HTMLElement>("[data-fill-heading]"),
        body: templateEl.querySelectorAll<HTMLElement>("[data-fill-body]"),
        rows: templateEl.querySelectorAll<HTMLElement>("[data-fill-row]"),
        bars: templateEl.querySelectorAll<HTMLElement>("[data-fill-bar]"),
        final: templateEl.querySelectorAll<HTMLElement>("[data-fill-final]"),
      };

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 4, defaults: { ease: "power3.out" } });

      // --- reset state (re-applied on every loop) ---
      tl.set(docEls, { opacity: 0, scale: 0.85 })
        .set(templateEl, { y: 70, opacity: 0, scale: 0.92 })
        .set(echoEls, { opacity: 0 })
        .set(readyChip, { opacity: 0, scale: 0.7 })
        .set(cursor, { opacity: 0 })
        .set(receiptEl, { opacity: 0, scale: 0.6, rotate: -10, x: 30, y: 30 })
        .set(contentPieces.heading, { opacity: 0 })
        .set(contentPieces.body, { opacity: 0 })
        .set(contentPieces.rows, { opacity: 0 })
        .set(contentPieces.bars, { scaleY: 0, transformOrigin: "bottom" })
        .set(contentPieces.final, { opacity: 0 });

      // --- phase 1: scatter (0 -> 1.5s) ---
      tl.to(
        docEls,
        { opacity: 1, scale: 1, duration: 1.1, stagger: 0.07, ease: "power3.out" },
        0
      );

      // --- phase 2: template arrives (1.5 -> 2.5s) ---
      tl.to(
        templateEl,
        { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: "back.out(1.5)" },
        1.5
      );

      // --- phase 3: the pull (2.5 -> 4.5s) ---
      docEls.forEach((el, i) => {
        const start = 2.5 + i * 0.13;
        tl.to(
          el,
          {
            left: "50%",
            top: "50%",
            scale: 0.1,
            opacity: 0,
            duration: 0.55,
            ease: "power2.in",
          },
          start
        );
      });

      tl.to(contentPieces.heading, { opacity: 1, duration: 0.3 }, 2.7)
        .to(contentPieces.body, { opacity: 1, duration: 0.3, stagger: 0.12 }, 3.0)
        .to(contentPieces.rows, { opacity: 1, duration: 0.25, stagger: 0.18 }, 3.4)
        .to(contentPieces.bars, { scaleY: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" }, 3.9)
        .to(contentPieces.final, { opacity: 1, duration: 0.25, stagger: 0.15 }, 4.2);

      // --- phase 4: finish (4.5 -> 6s) ---
      tl.to(echoEls, { opacity: 0.5, x: 6, y: -6, duration: 0.25, stagger: 0.08 }, 4.5)
        .to(echoEls, { opacity: 0, duration: 0.3 }, 4.95)
        .to(
          readyChip,
          { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
          5.1
        )
        .to(cursor, { opacity: 1, duration: 0.15 }, 5.4)
        .to(cursor, {
          opacity: 0,
          duration: 0.5,
          repeat: 3,
          yoyo: true,
          ease: "steps(1)",
        }, 5.4);

      // --- phase 5: receipt stamp (6 -> 7s) ---
      tl.to(
        receiptEl,
        { opacity: 1, scale: 1.06, rotate: 4, x: 0, y: 0, duration: 0.32, ease: "power3.out" },
        6.0
      ).to(receiptEl, { scale: 1, rotate: 3, duration: 0.22, ease: "power2.out" }, 6.32);

      if (hoursValue) {
        const counter = { val: 0 };
        tl.to(
          counter,
          {
            val: 22,
            duration: 0.6,
            ease: "power1.out",
            onUpdate: () => {
              hoursValue.textContent = `~${Math.round(counter.val)} hrs`;
            },
          },
          6.3
        );
      }
    }, stageEl);

    return () => ctx.revert();
  }, [refs]);
}
