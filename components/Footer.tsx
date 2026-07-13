import Link from "next/link";

const links = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Examples", href: "/#examples" },
  { label: "Pricing", href: "/pricing" },
  { label: "Security", href: "/security" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink py-12">
      <div className="container-page flex flex-col items-center gap-6 border-t border-white/10 pt-10 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="text-lg font-bold tracking-tight text-white">
            Mako<span className="text-violet">IQ</span>
          </p>
          <p className="mt-1 font-mono text-xs text-white/40">A product of XFinLabs</p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="font-mono text-xs text-white/40">© {year} MakoIQ</p>
      </div>
    </footer>
  );
}
