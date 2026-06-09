"use client";

import { motion } from "framer-motion";

const features = [
  {
    number: "01",
    title: "Plain English Summary",
    description:
      "Ross distills any contract into a clear, jargon-free overview. Understand the purpose, the parties, and the scope in seconds.",
  },
  {
    number: "02",
    title: "Key Obligations",
    description:
      "See exactly what each party is committed to. Deadlines, deliverables, payment terms — laid out without the legalese.",
  },
  {
    number: "03",
    title: "Instant Analysis",
    description:
      "Upload any PDF contract and receive a structured analysis in under 15 seconds. Powered by GPT-4o.",
  },
];

export default function FeatureSection() {
  return (
    <motion.section
      id="what-ross-does"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="bg-ross-offwhite py-28 md:py-36 px-6 scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
          <h2 className="font-serif font-light text-ross-black text-5xl md:text-6xl leading-tight max-w-sm">
            What Ross does.
          </h2>
          <p className="font-sans font-light text-ross-midgrey text-base max-w-xs leading-relaxed">
            Purpose-built for lawyers who need answers fast, without
            compromising depth.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ross-lightgrey">
          {features.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-ross-offwhite p-10 flex flex-col gap-6 group hover:bg-white transition-colors duration-300"
            >
              <span className="font-sans text-xs font-medium tracking-[0.3em] uppercase text-ross-midgrey">
                {feature.number}
              </span>
              <h3 className="font-serif font-light text-ross-black text-2xl leading-snug">
                {feature.title}
              </h3>
              <p className="font-sans font-light text-ross-midgrey text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
