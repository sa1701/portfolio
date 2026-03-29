"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  {
    value: "6+",
    label: "Languages",
    description: "Python, C++, Java, JS, SQL, HTML/CSS",
    color: "text-[#4fc3f7]",
    border: "border-[#4fc3f7]/20",
    glow: "hover:shadow-glow-cyan",
  },
  {
    value: "5+",
    label: "Projects",
    description: "Full-stack & AI/ML applications",
    color: "text-[#7c4dff]",
    border: "border-[#7c4dff]/20",
    glow: "hover:shadow-glow-purple",
  },
  {
    value: "AI/ML",
    label: "Focus",
    description: "Deep Learning, NLP, Generative AI",
    color: "text-[#f472b6]",
    border: "border-[#f472b6]/20",
    glow: "hover:shadow-glow-pink",
  },
  {
    value: "2",
    label: "Languages",
    description: "English (IELTS 7.5) & Arabic (Native)",
    color: "text-[#4fc3f7]",
    border: "border-[#4fc3f7]/20",
    glow: "hover:shadow-glow-cyan",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className="py-24 px-6 max-w-6xl mx-auto"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Section heading */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-sm font-mono text-[#4fc3f7] tracking-widest uppercase mb-3">
            Get to know me
          </p>
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-bold gradient-text inline-block"
          >
            About Me
          </h2>
          <div
            aria-hidden="true"
            className="mt-4 w-16 h-0.5 mx-auto bg-gradient-to-r from-[#4fc3f7] to-[#7c4dff] rounded-full"
          />
        </motion.div>

        {/* Bio */}
        <motion.div
          variants={itemVariants}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-[#9999b8] text-lg leading-relaxed mb-4">
            I&apos;m a Computer Science student at the{" "}
            <span className="text-[#e8e8f0] font-medium">
              University of Wollongong, Australia
            </span>
            , specialising in <span className="text-[#4fc3f7]">AI and Big Data</span>.
            I started my studies at UOW Dubai in 2023, and transferred to the main campus in
            Wollongong in 2025 — chasing bigger opportunities and colder weather.
          </p>
          <p className="text-[#9999b8] text-lg leading-relaxed">
            I enjoy building{" "}
            <span className="text-[#e8e8f0] font-medium">full-stack applications</span> and
            exploring the intersection of software engineering and machine learning. When I&apos;m
            not coding, I&apos;m usually deep in a game or experimenting with the latest AI tools.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          role="list"
          aria-label="Key statistics"
        >
          {STATS.map((stat) => (
            <motion.div
              key={`${stat.value}-${stat.label}`}
              variants={itemVariants}
              role="listitem"
              className={`glass-card rounded-2xl p-6 text-center border ${stat.border} ${stat.glow} transition-all duration-300 hover:-translate-y-1`}
            >
              <p className={`text-3xl font-bold mb-1 ${stat.color}`} aria-label={`${stat.value} ${stat.label}`}>
                {stat.value}
              </p>
              <p className="text-[#e8e8f0] font-semibold text-sm mb-2">
                {stat.label}
              </p>
              <p className="text-[#9999b8] text-xs leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Location badge */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-white/[0.06]">
            <svg
              aria-hidden="true"
              className="w-4 h-4 text-[#4fc3f7]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-[#9999b8]">
              Chippendale, NSW, Australia
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
