"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const handleScrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollDown = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden gradient-bg"
    >
      {/* Decorative gradient orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #7c4dff 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
        />
        <motion.div
          className="absolute top-1/4 -right-32 w-80 h-80 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #4fc3f7 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as const, delay: 1.5 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-12"
          style={{
            background: "radial-gradient(circle, #f472b6 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" as const, delay: 3 }}
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(79,195,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(79,195,247,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow label */}
        <motion.div
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass-card border border-[#4fc3f7]/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="w-2 h-2 rounded-full bg-[#4fc3f7] animate-pulse-slow" aria-hidden="true" />
          <span className="text-sm text-[#9999b8] font-mono tracking-wider">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-4 glow-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <span className="gradient-text">Seif Ali</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#e8e8f0] mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Computer Science{" "}
          <span className="text-[#4fc3f7]">|</span> AI &amp; Big Data
        </motion.p>

        {/* University */}
        <motion.p
          className="text-base sm:text-lg text-[#9999b8] mb-10 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
        >
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-[#4fc3f7] flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          University of Wollongong, Australia
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <button
            onClick={handleScrollToProjects}
            className="group relative px-8 py-3.5 rounded-xl font-semibold text-[#0a0a1a] bg-gradient-to-r from-[#4fc3f7] via-[#7c4dff] to-[#f472b6] hover:opacity-90 transition-all duration-200 shadow-glow-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a1a] min-w-[160px]"
            aria-label="Scroll to projects section"
          >
            <span className="relative flex items-center justify-center gap-2">
              View Projects
              <svg
                aria-hidden="true"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>

          <a
            href="/Seif_Ali_CV_v3.pdf"
            download
            className="px-8 py-3.5 rounded-xl font-semibold text-[#e8e8f0] glass-card border border-[#4fc3f7]/30 hover:border-[#4fc3f7]/60 hover:bg-[#4fc3f7]/5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4fc3f7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a1a] min-w-[160px] text-center"
            aria-label="Download Seif Ali's CV as PDF"
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                aria-hidden="true"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </span>
          </a>
        </motion.div>

        {/* Tech stack hint */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          aria-label="Key technologies"
        >
          {["Python", "Node.js", "AI/ML", "SQL", "JavaScript"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-mono text-[#9999b8] glass-card rounded-full border border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#9999b8] hover:text-[#4fc3f7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4fc3f7] rounded-lg p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-label="Scroll to about section"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
          aria-hidden="true"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  );
}
