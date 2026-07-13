"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

// Sourced from 21st.dev (magicui/number-ticker), adapted to MakoIQ tokens.
export function NumberTicker({
  value,
  prefix = "",
  suffix = "",
  delay = 0,
  className,
  decimalPlaces = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  delay?: number;
  decimalPlaces?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => {
      motionValue.set(value);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [motionValue, isInView, delay, value]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent =
            prefix +
            Intl.NumberFormat("en-US", {
              minimumFractionDigits: decimalPlaces,
              maximumFractionDigits: decimalPlaces,
            }).format(Number(latest.toFixed(decimalPlaces))) +
            suffix;
        }
      }),
    [springValue, decimalPlaces, prefix, suffix]
  );

  return (
    <span
      ref={ref}
      className={cn("inline-block tabular-nums", className)}
    >
      {prefix + (0).toString() + suffix}
    </span>
  );
}
