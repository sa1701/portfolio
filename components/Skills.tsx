"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SkillRow {
  ref: string;
  category: string;
  items: string[];
}

const MANIFEST: SkillRow[] = [
  {
    ref: "A1",
    category: "AI / ML",
    items: [
      "RAG",
      "LangChain",
      "FAISS",
      "Transformers",
      "Multimodal LLMs",
      "Ollama",
      "scikit-learn",
      "TensorFlow",
      "Spark MLlib",
      "NLP",
      "Prompt Engineering",
    ],
  },
  {
    ref: "B1",
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C", "C++", "Java", "PHP", "SQL"],
  },
  {
    ref: "C1",
    category: "Backend",
    items: ["FastAPI", "Node.js", "Express", "Prisma", "REST APIs"],
  },
  {
    ref: "C2",
    category: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS", "Zustand", "Framer Motion"],
  },
  {
    ref: "D1",
    category: "Data & Storage",
    items: ["PostgreSQL", "MySQL", "MongoDB", "ChromaDB", "Supabase", "pandas", "NumPy"],
  },
  {
    ref: "E1",
    category: "Tooling & Ops",
    items: ["Git", "GitHub Actions", "Docker", "PHPUnit", "Vercel", "Jupyter"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} aria-labelledby="skills-heading" className="py-28 px-6">
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
              id="skills-heading"
              className="font-display font-black text-3xl sm:text-4xl text-ink"
            >
              Stack
            </h2>
            <span className="spec-label ml-auto hidden sm:inline">
              Bill of materials
            </span>
          </motion.div>

          {/* Manifest table */}
          <motion.div variants={itemVariants} className="panel">
            {MANIFEST.map((row, i) => (
              <div
                key={row.ref}
                className={`group grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 px-6 py-5 hover:bg-signal-soft transition-colors duration-200 ${
                  i < MANIFEST.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <span className="sm:col-span-1 font-mono text-xs text-signal pt-0.5">
                  {row.ref}
                </span>
                <h3 className="sm:col-span-3 font-display font-bold text-lg text-ink leading-tight">
                  {row.category}
                </h3>
                <ul
                  className="sm:col-span-8 flex flex-wrap gap-x-4 gap-y-1.5 items-start pt-1"
                  aria-label={`${row.category} skills`}
                >
                  {row.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-xs text-muted group-hover:text-ink/80 transition-colors whitespace-nowrap"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
