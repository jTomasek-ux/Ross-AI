import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-ross-black flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Eyebrow label */}
        <span className="text-xs font-sans font-medium tracking-[0.3em] uppercase text-ross-midgrey">
          AI-Powered Contract Review
        </span>

        {/* Main headline */}
        <h1 className="font-serif font-light text-white leading-[1.05] tracking-tight">
          <span className="block text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            Your AI
          </span>
          <span className="block text-6xl md:text-7xl lg:text-8xl xl:text-9xl italic">
            associate.
          </span>
        </h1>

        {/* Subtext */}
        <p className="font-sans font-light text-ross-midgrey text-lg md:text-xl max-w-xl leading-relaxed">
          Ross reads every clause. Flags every obligation. So you can focus on
          what matters — your client.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 bg-white text-ross-black text-sm font-sans font-medium tracking-widest uppercase px-8 py-4 hover:bg-ross-offwhite transition-colors duration-200"
          >
            Analyze a Contract
            <span aria-hidden>→</span>
          </Link>
          <a
            href="#what-ross-does"
            className="text-sm font-sans font-medium tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors duration-200"
          >
            Learn more
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
        <div className="w-px h-12 bg-white/20 animate-pulse" />
      </div>
    </section>
  );
}
