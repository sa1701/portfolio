"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SPEC_ROWS = [
  { key: "Location", value: "Sydney, NSW — Australia" },
  { key: "Status", value: "Final year · graduating Dec 2026" },
  { key: "Degree", value: "BCompSci — AI & Big Data, UOW" },
  { key: "Focus", value: "Grounded AI · RAG · full-stack systems" },
  { key: "Languages", value: "English (fluent) · Arabic (native)" },
  { key: "Currently", value: "Capstone: NLP × program analysis" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className="relative py-28 px-6"
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
            className="flex items-baseline gap-4 mb-16 border-b border-line pb-5"
          >
            <span className="font-mono text-sm text-signal">01</span>
            <h2
              id="about-heading"
              className="font-display font-black text-3xl sm:text-4xl text-ink"
            >
              Profile
            </h2>
            <span className="spec-label ml-auto hidden sm:inline">
              Personnel record
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Bio — editorial column */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <p className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] leading-snug text-ink/90">
                Most AI demos guess.{" "}
                <em className="italic text-signal">Mine cite their sources.</em>
              </p>
              <p className="mt-7 text-muted leading-relaxed">
                I&apos;m a final-year Computer Science student at the University of
                Wollongong, and the thread through everything I build is{" "}
                <span className="text-ink">grounding</span> — AI that answers from
                real documents, real manuals, real code, and shows you exactly
                where the answer came from. That means retrieval pipelines with
                page-level citations, local-first tools where sensitive data never
                leaves the machine, and systems that refuse to make things up when
                the evidence isn&apos;t there.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                I started the degree at UOW Dubai in 2023 and transferred to
                Australia in 2025 — chasing bigger opportunities and colder
                weather. When I&apos;m not coding, I&apos;m deep in a game or
                stress-testing the newest AI tools.
              </p>
            </motion.div>

            {/* Spec table */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="panel ticks">
                <div className="border-b border-line px-5 py-3 flex items-center justify-between">
                  <span className="spec-label !text-ink/70">Specification</span>
                  <span className="font-mono text-xs text-muted">SA-01</span>
                </div>
                <dl>
                  {SPEC_ROWS.map((row, i) => (
                    <div
                      key={row.key}
                      className={`flex gap-4 px-5 py-3.5 ${
                        i < SPEC_ROWS.length - 1 ? "border-b border-line" : ""
                      }`}
                    >
                      <dt className="spec-label w-24 shrink-0 pt-0.5">{row.key}</dt>
                      <dd className="font-mono text-sm text-ink/90">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
