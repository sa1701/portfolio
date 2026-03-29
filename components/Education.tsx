"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Grade {
  subject: string;
  grade: string;
  mark: number;
  color: string;
}

const GRADES: Grade[] = [
  { subject: "System Analysis", grade: "HD", mark: 85, color: "text-[#4fc3f7]" },
  { subject: "Generative AI", grade: "D", mark: 79, color: "text-[#7c4dff]" },
  { subject: "Python Programming", grade: "D", mark: 78, color: "text-[#7c4dff]" },
  { subject: "Cyber Security", grade: "D", mark: 77, color: "text-[#7c4dff]" },
  { subject: "IT Project Management", grade: "D", mark: 75, color: "text-[#7c4dff]" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const gradeVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="education"
      ref={ref}
      aria-labelledby="education-heading"
      className="py-24 px-6 bg-[#111128]/40"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section heading */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-sm font-mono text-[#4fc3f7] tracking-widest uppercase mb-3">
              Academic background
            </p>
            <h2
              id="education-heading"
              className="text-3xl sm:text-4xl font-bold gradient-text inline-block"
            >
              Education
            </h2>
            <div
              aria-hidden="true"
              className="mt-4 w-16 h-0.5 mx-auto bg-gradient-to-r from-[#4fc3f7] to-[#7c4dff] rounded-full"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Timeline column */}
            <div>
              <h3 className="sr-only">Education timeline</h3>

              {/* Timeline */}
              <div className="relative" role="list" aria-label="Education timeline">
                {/* Vertical line */}
                <div
                  aria-hidden="true"
                  className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#4fc3f7] via-[#7c4dff] to-transparent"
                />

                {/* Entry: UOW Main Campus */}
                <motion.div
                  variants={itemVariants}
                  role="listitem"
                  className="relative pl-10 pb-10"
                >
                  {/* Dot */}
                  <div
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#0a0a1a] border-2 border-[#4fc3f7] flex items-center justify-center"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#4fc3f7]" />
                  </div>

                  <div className="glass-card rounded-2xl border border-[#4fc3f7]/25 p-6">
                    {/* Date badge */}
                    <span className="inline-block mb-3 px-3 py-1 text-xs font-mono rounded-full bg-[#4fc3f7]/10 text-[#4fc3f7] border border-[#4fc3f7]/20">
                      2025 – Dec 2026 (expected)
                    </span>

                    <h4 className="text-[#e8e8f0] font-bold text-base mb-0.5">
                      Bachelor of Computer Science (AI &amp; Big Data)
                    </h4>
                    <p className="text-[#4fc3f7] text-sm font-medium mb-3">
                      University of Wollongong — Wollongong, NSW, Australia
                    </p>
                    <p className="text-[#9999b8] text-sm leading-relaxed">
                      Transferred to the main UOW campus in 2025 to continue the degree
                      on-campus, with a focus on AI, deep learning, and big data technologies.
                    </p>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2" aria-label="Focus areas">
                      {["AI & Big Data", "Deep Learning", "Software Engineering"].map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs rounded-md bg-[#4fc3f7]/10 text-[#4fc3f7] border border-[#4fc3f7]/15"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Entry: UOW Dubai */}
                <motion.div
                  variants={itemVariants}
                  role="listitem"
                  className="relative pl-10"
                >
                  {/* Dot */}
                  <div
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#0a0a1a] border-2 border-[#7c4dff] flex items-center justify-center"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#7c4dff]" />
                  </div>

                  <div className="glass-card rounded-2xl border border-[#7c4dff]/25 p-6">
                    <span className="inline-block mb-3 px-3 py-1 text-xs font-mono rounded-full bg-[#7c4dff]/10 text-[#7c4dff] border border-[#7c4dff]/20">
                      Feb 2023 – 2025
                    </span>

                    <h4 className="text-[#e8e8f0] font-bold text-base mb-0.5">
                      Bachelor of Computer Science (AI &amp; Big Data)
                    </h4>
                    <p className="text-[#7c4dff] text-sm font-medium mb-3">
                      University of Wollongong in Dubai — Dubai, UAE
                    </p>
                    <p className="text-[#9999b8] text-sm leading-relaxed">
                      Began the CS degree at UOW Dubai campus, completing core modules in
                      programming, databases, cybersecurity, and IT project management before
                      transferring to the main campus.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2" aria-label="Focus areas">
                      {["Programming", "Databases", "Cyber Security"].map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs rounded-md bg-[#7c4dff]/10 text-[#7c4dff] border border-[#7c4dff]/15"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Grades column */}
            <motion.div variants={gradeVariants}>
              <div className="glass-card rounded-2xl border border-white/[0.07] p-6">
                <h3 className="text-[#e8e8f0] font-bold text-base mb-1">
                  Grade Highlights
                </h3>
                <p className="text-[#9999b8] text-xs mb-5">
                  Selected subject results
                </p>

                <ul className="space-y-4" aria-label="Subject grades">
                  {GRADES.map((g, i) => (
                    <motion.li
                      key={g.subject}
                      variants={gradeVariants}
                      custom={i}
                      className="flex flex-col gap-1.5"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#e8e8f0]">{g.subject}</span>
                        <span className={`font-bold font-mono ${g.color}`}>
                          {g.mark} — {g.grade}
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div
                        className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden"
                        role="progressbar"
                        aria-valuenow={g.mark}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${g.subject}: ${g.mark}%`}
                      >
                        <motion.div
                          className={`h-full rounded-full ${
                            g.grade === "HD"
                              ? "bg-gradient-to-r from-[#4fc3f7] to-[#7c4dff]"
                              : "bg-gradient-to-r from-[#7c4dff] to-[#f472b6]"
                          }`}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${g.mark}%` } : { width: 0 }}
                          transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: "easeOut" as const }}
                        />
                      </div>
                    </motion.li>
                  ))}
                </ul>

                {/* Grade legend */}
                <div
                  className="mt-6 pt-5 border-t border-white/[0.06] flex gap-4 text-xs text-[#9999b8]"
                  aria-label="Grade legend"
                >
                  <span>
                    <span className="font-bold text-[#4fc3f7]">HD</span> — High Distinction
                    (85+)
                  </span>
                  <span>
                    <span className="font-bold text-[#7c4dff]">D</span> — Distinction (75–84)
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
