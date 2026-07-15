"use client";

import { motion, MotionConfig } from "framer-motion";
import { useAuthModal } from "@/components/auth/AuthModalProvider";

type HeroCopyProps = {
  revealed: boolean;
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const ctaVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
};

export default function HeroCopy({ revealed }: HeroCopyProps) {
  const { openModal } = useAuthModal();

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        variants={container}
        initial="hidden"
        animate={revealed ? "visible" : "hidden"}
        className="relative z-10 mx-auto max-w-2xl px-6 text-center"
      >
        <motion.p variants={item} className="eyebrow text-violet">
          Built for investment teams
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-5 font-serif text-[2rem] font-medium leading-[1.15] text-white sm:text-[2.75rem] lg:text-[3.25rem]"
        >
          Do you need answers from documents, or do you need documents produced?
        </motion.h1>

        <motion.p variants={item} className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          MakoIQ starts where other systems end: the finished document.
        </motion.p>

        <motion.div variants={ctaVariant} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => openModal("signup")}
            className="pointer-events-auto inline-flex min-h-[44px] items-center justify-center rounded-full bg-purple px-8 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Get Started
          </button>
          <a
            href="#simulator"
            className="pointer-events-auto inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/25 px-8 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/50 hover:text-white"
          >
            Try a sample run
          </a>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}
