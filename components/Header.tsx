"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAuthModal } from "@/components/auth/AuthModalProvider";

const centerLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Examples", href: "/#examples" },
  { label: "Pricing", href: "/pricing" },
  { label: "Security", href: "/security" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useAuthModal();

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
        scrolled ? "border-b border-white/10 bg-ink/90 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="font-sans text-xl font-bold tracking-tight text-white">
          Mako<span className="text-violet">IQ</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {centerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => openModal("login")}
            className="min-h-[40px] text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => openModal("signup")}
            className="min-h-[40px] rounded-full bg-purple px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Create free account
          </button>
        </div>

        <button
          type="button"
          onClick={() => openModal("signup")}
          className="min-h-[40px] rounded-full bg-purple px-4 py-2 text-sm font-semibold text-white md:hidden"
        >
          Start free
        </button>
      </div>
    </header>
  );
}
