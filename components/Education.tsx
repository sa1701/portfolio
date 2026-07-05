"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CAMPUSES = [
  {
    period: "Sep 2023 — Dec 2024",
    place: "University of Wollongong in Dubai",
    location: "Dubai, UAE",
  },
  {
    period: "Feb 2025 — present",
    place: "University of Wollongong — main campus",
    location: "Wollongong, NSW, Australia",
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

          {/* Single degree, two campuses */}
          <motion.article
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
            aria-label="Degree details"
          >
            <div className="md:col-span-3">
              <p className="font-mono text-sm text-ink">Sep 2023 — Dec 2026</p>
              <p className="spec-label mt-1.5 !text-ok">
                In progress · graduating Dec 2026
              </p>
              <p className="spec-label mt-4">
                UAC 754100
                <br />
                UOW course 766
                <br />
                BCompSci · 144 cp
              </p>
            </div>

            <div className="md:col-span-9">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-ink">
                Bachelor of Computer Science — Artificial Intelligence &amp; Big
                Data
              </h3>
              <p className="font-mono text-xs text-signal/90 tracking-wide mt-2">
                University of Wollongong · Faculty of Engineering &amp;
                Information Sciences
              </p>
              <p className="text-muted text-sm leading-relaxed mt-3 max-w-2xl">
                One degree, two campuses: commenced at UOW Dubai in September
                2023, then transferred to the main Wollongong campus in
                February 2025 to finish in Australia. Coursework spans big data mining,
                generative AI, software methodologies, cybersecurity, and a
                year-long capstone combining NLP with program analysis.
              </p>

              {/* Campus ledger */}
              <div className="mt-6 border-t border-line" role="list" aria-label="Campus history">
                {CAMPUSES.map((c) => (
                  <div
                    key={c.period}
                    role="listitem"
                    className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-6 py-3.5 border-b border-line"
                  >
                    <span className="sm:col-span-3 font-mono text-xs text-muted">
                      {c.period}
                    </span>
                    <span className="sm:col-span-5 font-mono text-xs text-ink/85">
                      {c.place}
                    </span>
                    <span className="sm:col-span-4 font-mono text-xs text-muted">
                      {c.location}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
