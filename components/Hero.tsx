"use client";

import { motion } from "framer-motion";

const TICKER = [
  "Python",
  "RAG Pipelines",
  "FastAPI",
  "Multimodal LLMs",
  "TypeScript",
  "Next.js",
  "ChromaDB",
  "TensorFlow",
  "Spark",
  "Program Analysis",
  "NLP",
  "PostgreSQL",
];

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Drawing-sheet frame annotations */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
        <span className="spec-label absolute top-20 left-6 lg:left-10">
          Doc. SA-2026 / Rev 07
        </span>
        <span className="spec-label absolute top-20 right-6 lg:right-10 text-right">
          Sydney, AU
          <br />
          33.87°S — 151.21°E
        </span>
        <span className="spec-label absolute bottom-24 left-6 lg:left-10">
          Sheet 01 / 05
        </span>
        {/* Registration crosses */}
        <span className="absolute top-[4.5rem] left-1/2 -translate-x-1/2 text-muted/40 font-mono text-xs">
          +
        </span>
        <span className="absolute bottom-20 left-1/2 -translate-x-1/2 text-muted/40 font-mono text-xs">
          +
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-24 pb-32">
        {/* Status */}
        <motion.div
          custom={0}
          variants={rise}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2.5 mb-10 border border-line px-3.5 py-2 bg-carbon-2"
        >
          <span className="status-dot w-1.5 h-1.5 rounded-full bg-ok" aria-hidden="true" />
          <span className="spec-label !text-ink/80">
            Open to 2027 graduate roles &amp; internships — Sydney
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={1}
          variants={rise}
          initial="hidden"
          animate="visible"
          className="font-display font-black text-ink leading-[0.92] tracking-tight text-[clamp(3.5rem,12vw,9.5rem)]"
        >
          Seif Ali
        </motion.h1>

        {/* Statement */}
        <motion.p
          custom={2}
          variants={rise}
          initial="hidden"
          animate="visible"
          className="mt-8 max-w-2xl font-display text-[clamp(1.35rem,3vw,2rem)] leading-snug text-ink/90"
        >
          Builds AI systems that run{" "}
          <em className="text-signal not-italic font-display italic">
            where the data lives
          </em>
          .
        </motion.p>

        <motion.p
          custom={3}
          variants={rise}
          initial="hidden"
          animate="visible"
          className="mt-5 max-w-xl text-muted text-base leading-relaxed"
        >
          Final-year Computer Science (AI &amp; Big Data) at the University of
          Wollongong. Grounded RAG pipelines, local-first tools, and full-stack
          applications — engineered to cite their sources, not guess.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={rise}
          initial="hidden"
          animate="visible"
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="group bg-signal text-carbon font-mono text-xs tracking-[0.16em] uppercase px-7 py-4 hover:bg-ink transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-carbon"
            aria-label="Scroll to selected work"
          >
            View selected work{" "}
            <span className="inline-block group-hover:translate-y-0.5 transition-transform">
              ↓
            </span>
          </button>
          <a
            href="/Seif-Ali-CV.pdf"
            download
            className="border border-line-strong text-ink font-mono text-xs tracking-[0.16em] uppercase px-7 py-4 hover:border-signal hover:text-signal transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-carbon"
            aria-label="Download CV as PDF"
          >
            Download CV ↧
          </a>
        </motion.div>
      </div>

      {/* Ticker strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="marquee absolute bottom-0 left-0 right-0 border-t border-b border-line bg-carbon-2 overflow-hidden py-3.5"
        aria-hidden="true"
      >
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {TICKER.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="font-mono text-xs tracking-[0.2em] uppercase text-muted px-8 whitespace-nowrap"
                >
                  {item} <span className="text-signal ml-8">▪</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
