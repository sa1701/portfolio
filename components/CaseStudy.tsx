"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  animate,
} from "framer-motion";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PIPELINE = [
  "22 PDF manuals",
  "PyMuPDF chunker",
  "ChromaDB vectors",
  "Retriever",
  "LLM — Claude ⇄ Ollama",
  "Cited answer + diagram",
];

const ARCHITECTURE: [string, string][] = [
  ["Ingestion", "PyMuPDF + custom section-aware chunker"],
  ["Vector store", "ChromaDB — 2,450 embedded chunks"],
  ["Inference", "Claude API or local Ollama, switched with one env var"],
  ["API", "FastAPI"],
  ["Grounding", "Page-level citations + the manual's actual diagrams"],
];

const STEPS: [string, string][] = [
  [
    "Describe the fault",
    "A symptom in plain words or an OBD-II code — “P0420 after cold start” is enough.",
  ],
  [
    "Get interviewed",
    "Follow-up questions like a mechanic's intake: when, how often, what changed recently.",
  ],
  [
    "Retrieval",
    "Hybrid search over the indexed workshop manual for that exact vehicle — not generic car advice.",
  ],
  [
    "Cited fix",
    "Diagnosis with the manual page reference and the actual wiring or component diagram.",
  ],
];

const STATS: { value: number; suffix: string; label: string }[] = [
  { value: 22, suffix: "", label: "Workshop manuals indexed" },
  { value: 2450, suffix: "", label: "Retrievable chunks" },
  { value: 100, suffix: "%", label: "Works offline — local LLM" },
];

// ---------------------------------------------------------------------------
// Animation
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ---------------------------------------------------------------------------
// Pieces
// ---------------------------------------------------------------------------

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value.toLocaleString());
      return;
    }
    const controls = animate(mv, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString()),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, mv]);

  return (
    <div ref={ref} className="p-7 text-center">
      <p className="font-display font-black text-4xl sm:text-5xl text-signal tabular-nums">
        {display}
        {suffix}
      </p>
      <p className="spec-label mt-2">{label}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="gearhead"
      ref={sectionRef}
      aria-labelledby="casestudy-heading"
      className="py-28 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <motion.div
            variants={itemVariants}
            className="flex items-baseline gap-4 mb-6 border-b border-line pb-5"
          >
            <span className="font-mono text-sm text-signal">03</span>
            <h2
              id="casestudy-heading"
              className="font-display font-black text-3xl sm:text-4xl text-ink"
            >
              Case File — GEARHEAD
            </h2>
            <span className="spec-label ml-auto hidden sm:inline">
              Retrieval-augmented generation, applied
            </span>
          </motion.div>

          {/* Brief */}
          <motion.p
            variants={itemVariants}
            className="max-w-3xl text-muted leading-relaxed mb-14"
          >
            Workshop manuals are 600-page PDFs nobody has time to search — so
            garages guess, and drivers pay for parts they didn&apos;t need.
            GEARHEAD turns the manual for your exact car into a diagnostic
            interview that answers with{" "}
            <span className="text-ink">page-level citations and the manual&apos;s own
            diagrams</span>
            . Built GCC-first: starting with the Nissan Patrol, the region&apos;s
            workhorse.
          </motion.p>

          {/* Pipeline diagram */}
          <motion.div variants={itemVariants} className="panel ticks p-7 lg:p-9 mb-6">
            <p className="spec-label mb-6 !text-signal">Pipeline — Fig. 01</p>
            <div
              className="flex flex-col lg:flex-row lg:items-center lg:flex-wrap gap-3"
              role="img"
              aria-label="Pipeline: 22 PDF manuals, chunked with PyMuPDF, embedded into ChromaDB, retrieved and passed to a Claude or Ollama LLM, producing a cited answer with diagram"
            >
              {PIPELINE.map((stage, i) => (
                <div key={stage} className="flex flex-col lg:flex-row lg:items-center gap-3">
                  <span className="border border-line-strong bg-carbon px-4 py-3 font-mono text-xs tracking-[0.1em] uppercase text-ink whitespace-nowrap">
                    {stage}
                  </span>
                  {i < PIPELINE.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="text-signal font-mono text-sm self-center lg:self-auto"
                    >
                      <span className="lg:hidden">↓</span>
                      <span className="hidden lg:inline">→</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Architecture table */}
            <motion.div variants={itemVariants} className="panel ticks p-7 lg:p-9">
              <p className="spec-label mb-5 !text-signal">Architecture</p>
              <dl>
                {ARCHITECTURE.map(([part, detail]) => (
                  <div
                    key={part}
                    className="flex items-baseline justify-between gap-6 border-b border-line py-3.5 last:border-b-0"
                  >
                    <dt className="text-ink text-sm shrink-0">{part}</dt>
                    <dd className="font-mono text-xs text-muted text-right leading-relaxed">
                      {detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            {/* How it works */}
            <motion.div variants={itemVariants} className="panel ticks p-7 lg:p-9">
              <p className="spec-label mb-5 !text-signal">How it works</p>
              <ol>
                {STEPS.map(([title, detail], i) => (
                  <li
                    key={title}
                    className="border-b border-line py-3.5 last:border-b-0 flex gap-4"
                  >
                    <span
                      className="font-mono text-xs text-signal pt-0.5"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-ink text-sm">{title}</p>
                      <p className="text-muted text-sm leading-relaxed mt-1">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>

          {/* Sample session terminal */}
          <motion.div variants={itemVariants} className="panel ticks mb-6">
            <div className="border-b border-line px-5 py-3 flex items-center gap-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full border border-line-strong" />
                <span className="w-2.5 h-2.5 rounded-full border border-line-strong" />
                <span className="w-2.5 h-2.5 rounded-full border border-line-strong" />
              </span>
              <span className="spec-label">gearhead — sample session</span>
            </div>
            <div className="p-6 lg:p-8 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
              <p className="text-muted">
                <span className="text-signal">$</span> gearhead diagnose
              </p>
              <p className="text-ink mt-2">
                <span className="text-muted">vehicle:</span> Nissan Patrol Y61 4.8
              </p>
              <p className="text-ink">
                <span className="text-muted">fault:</span> P0420 — only on cold
                mornings
              </p>
              <p className="text-muted mt-3">
                … retrieving from service manual (2,450 chunks)
              </p>
              <p className="text-ink mt-3 max-w-2xl">
                Likely an aging upstream O2 sensor skewing readings before
                warm-up — test its voltage response before touching the
                catalytic converter. Replacing the cat on this code without
                sensor data is the expensive mistake.
              </p>
              <p className="text-signal mt-3">
                — Engine Control section, p. EC-247, Fig. 12
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="panel ticks grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(236,231,220,0.13)] mb-10"
          >
            {STATS.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </motion.div>

          {/* Source link */}
          <motion.div variants={itemVariants} className="text-center">
            <a
              href="https://github.com/sa1701/gearhead"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-line-strong px-7 py-4 font-mono text-xs tracking-[0.16em] uppercase text-ink hover:border-signal hover:text-signal transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
              aria-label="View GEARHEAD source on GitHub (opens in new tab)"
            >
              Read the source ↗
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
