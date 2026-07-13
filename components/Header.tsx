"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-ink/95 backdrop-blur-sm border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="font-sans text-xl font-bold tracking-tight text-white">
          Mako<span className="text-violet">IQ</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/pricing"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            Pricing
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            How it works
          </Link>
          <Link
            href="/signin"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-purple px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Run your first document free
          </Link>
        </nav>

        <Link
          href="/signup"
          className="rounded-full bg-purple px-4 py-2 text-sm font-semibold text-white md:hidden"
        >
          Start free
        </Link>
      </div>
    </header>
  );
}
