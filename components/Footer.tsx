import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ross-black border-t border-white/10 px-8 md:px-12 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="font-serif text-sm font-light tracking-widest text-white/60 uppercase"
        >
          Ross AI
        </Link>

        <p className="font-sans text-xs font-light text-ross-midgrey text-center">
          Not legal advice. Ross AI is a proof-of-concept tool and does not
          constitute legal counsel.
        </p>

        <span className="font-sans text-xs text-white/20 tracking-wider">
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
