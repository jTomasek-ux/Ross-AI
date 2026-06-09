import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type LegalLayoutProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export function legalMetadata(
  title: string,
  description: string
): Metadata {
  return {
    title: `${title} — Ross AI`,
    description,
  };
}

export default function LegalLayout({
  title,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-ross-offwhite">
      <Navbar variant="dark" />

      <main className="flex-1 pt-16">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
          <header className="mb-12 border-b border-ross-lightgrey pb-8">
            <span className="font-sans text-xs font-medium tracking-[0.3em] uppercase text-ross-midgrey">
              Legal
            </span>
            <h1 className="font-serif font-light text-ross-black text-4xl md:text-5xl mt-2">
              {title}
            </h1>
            <p className="font-sans text-sm font-light text-ross-midgrey mt-4">
              Last updated: {lastUpdated}
            </p>
          </header>

          <article className="legal-prose font-sans font-light text-ross-black/90 text-sm leading-relaxed space-y-8">
            {children}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
