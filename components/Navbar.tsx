import Link from "next/link";

type NavbarProps = {
  variant?: "transparent" | "dark";
};

export default function Navbar({ variant = "dark" }: NavbarProps) {
  const isDark = variant === "dark";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 h-16 ${
        isDark
          ? "bg-ross-black border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <Link
        href="/"
        className="font-serif text-xl font-light tracking-widest text-white uppercase select-none"
      >
        Ross <span className="font-medium">AI</span>
      </Link>

      <Link
        href="/analyze"
        className="text-xs font-sans font-medium tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-200"
      >
        Analyze a Contract →
      </Link>
    </nav>
  );
}
