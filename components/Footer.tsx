import Link from "next/link";

const legalLinks = [
  { href: "/terms", label: "Terms of Use" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-ross-black border-t border-white/10 px-8 md:px-12 py-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-5">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="font-serif text-sm font-light tracking-widest text-white/60 uppercase hover:text-white/80 transition-colors"
          >
            Ross AI
          </Link>

          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            {legalLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-sans text-xs font-light text-white/50 hover:text-white/80 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <span className="font-sans text-xs text-white/20 tracking-wider">
            © {new Date().getFullYear()}
          </span>
        </div>

        <p className="font-sans text-xs font-light text-ross-midgrey text-center max-w-xl">
          Not legal advice. Ross AI is a proof-of-concept tool and does not
          constitute legal counsel.
        </p>
      </div>
    </footer>
  );
}
