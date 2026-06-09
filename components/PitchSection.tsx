import Link from "next/link";

export default function PitchSection() {
  return (
    <section className="bg-ross-black py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-16">
        <div className="flex flex-col gap-8 max-w-lg">
          <span className="font-sans text-xs font-medium tracking-[0.3em] uppercase text-ross-midgrey">
            Built for lawyers
          </span>
          <h2 className="font-serif font-light text-white text-5xl md:text-6xl leading-tight">
            Every contract deserves a second set of eyes.
          </h2>
          <p className="font-sans font-light text-ross-midgrey text-base leading-relaxed">
            Ross doesn't replace your judgment — it enhances it. Get an instant
            structural read of any contract so you can focus your expertise
            where it counts.
          </p>
          <Link
            href="/analyze"
            className="self-start inline-flex items-center gap-2 bg-white text-ross-black text-xs font-sans font-medium tracking-widest uppercase px-8 py-4 hover:bg-ross-offwhite transition-colors duration-200"
          >
            Try Ross now →
          </Link>
        </div>

        {/* Decorative quote */}
        <div className="md:max-w-xs border-l border-white/10 pl-10">
          <p className="font-serif font-light text-white/60 text-2xl leading-relaxed italic">
            "The best lawyers use the best tools."
          </p>
          <span className="block mt-4 font-sans text-xs tracking-widest uppercase text-ross-midgrey">
            — Harvey Specter
          </span>
        </div>
      </div>
    </section>
  );
}
