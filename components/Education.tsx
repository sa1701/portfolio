"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ENTRIES = [
  {
    period: "2025 — Dec 2026",
    status: "In progress",
    title: "Bachelor of Computer Science — AI & Big Data",
    place: "University of Wollongong · Wollongong, NSW, Australia",
    detail:
      "Transferred to the main campus to finish the degree in Australia. Coursework spans big data mining, generative AI, software methodologies, and a year-long capstone combining NLP with program analysis.",
  },
  {
    period: "Feb 2023 — 2025",
    status: "Completed",
    title: "Bachelor of Computer Science — AI & Big Data",
    place: "University of Wollongong in Dubai · Dubai, UAE",
    detail:
      "Commenced the degree at the Dubai campus: programming foundations, databases, cybersecurity, and IT project management before the transfer.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="education"
      ref={ref}
      aria-labelledby="education-heading"
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
            className="flex items-baseline gap-4 mb-16 border-b border-line pb-5"
          >
            <span className="font-mono text-sm text-signal">04</span>
            <h2
              id="education-heading"
              className="font-display font-black text-3xl sm:text-4xl text-ink"
            >
              Education
            </h2>
            <span className="spec-label ml-auto hidden sm:inline">
              Academic ledger
            </span>
          </motion.div>

          {/* Ledger */}
          <div role="list" aria-label="Education history">
            {ENTRIES.map((entry, i) => (
              <motion.article
                key={entry.period}
                variants={itemVariants}
                role="listitem"
                className={`group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 ${
                  i < ENTRIES.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <div className="md:col-span-3">
                  <p className="font-mono text-sm text-ink">{entry.period}</p>
                  <p
                    className={`spec-label mt-1.5 ${
                      entry.status === "In progress" ? "!text-ok" : ""
                    }`}
                  >
                    {entry.status}
                  </p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-ink group-hover:text-signal transition-colors duration-200">
                    {entry.title}
                  </h3>
                  <p className="font-mono text-xs text-signal/90 tracking-wide mt-2">
                    {entry.place}
                  </p>
                  <p className="text-muted text-sm leading-relaxed mt-3 max-w-2xl">
                    {entry.detail}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
