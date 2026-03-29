"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  accent: string;
  accentBorder: string;
  icon: string;
}

const PROJECTS: Project[] = [
  {
    title: "Recipe Web App",
    description:
      "Full-stack recipe browsing application with multi-cuisine filtering. Users can search, filter by cuisine type, and browse detailed recipe information. Features a clean, responsive UI backed by a relational database.",
    tech: ["Node.js", "MySQL", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/sa1701/recipe-web-app",
    accent: "text-[#4fc3f7]",
    accentBorder: "border-[#4fc3f7]/30",
    icon: "🍽",
  },
  {
    title: "Employee Management System",
    description:
      "Full-stack employee management platform with session-based authentication. Supports employee record creation, editing, and deletion with role-aware access control. Built with Express and a MySQL backend.",
    tech: ["Node.js", "Express", "MySQL", "Session Auth", "HTML/CSS"],
    github: "https://github.com/sa1701/employee-management-system",
    accent: "text-[#7c4dff]",
    accentBorder: "border-[#7c4dff]/30",
    icon: "👥",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      ref={ref}
      aria-labelledby="projects-heading"
      className="py-24 px-6 bg-[#111128]/40"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section heading */}
          <motion.div variants={cardVariants} className="text-center mb-16">
            <p className="text-sm font-mono text-[#7c4dff] tracking-widest uppercase mb-3">
              What I&apos;ve built
            </p>
            <h2
              id="projects-heading"
              className="text-3xl sm:text-4xl font-bold gradient-text inline-block"
            >
              Projects
            </h2>
            <div
              aria-hidden="true"
              className="mt-4 w-16 h-0.5 mx-auto bg-gradient-to-r from-[#7c4dff] to-[#f472b6] rounded-full"
            />
          </motion.div>

          {/* Project grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            role="list"
            aria-label="Projects"
          >
            {PROJECTS.map((project) => (
              <motion.article
                key={project.title}
                variants={cardVariants}
                role="listitem"
                className={`glass-card rounded-2xl border ${project.accentBorder} p-7 flex flex-col gap-5 group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300`}
                aria-labelledby={`project-${project.title.replace(/\s+/g, "-").toLowerCase()}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-2xl"
                      role="img"
                      aria-label={project.title + " icon"}
                    >
                      {project.icon}
                    </span>
                    <h3
                      id={`project-${project.title.replace(/\s+/g, "-").toLowerCase()}`}
                      className={`text-lg font-bold ${project.accent} group-hover:opacity-90 transition-opacity`}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {/* GitHub link */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-2 rounded-lg glass-card border border-white/[0.06] text-[#9999b8] hover:text-[#e8e8f0] hover:border-white/[0.12] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4fc3f7]"
                    aria-label={`View ${project.title} on GitHub (opens in new tab)`}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                </div>

                {/* Description */}
                <p className="text-[#9999b8] text-sm leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2" aria-label="Technologies used">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono rounded-md glass-card border border-white/[0.08] text-[#9999b8]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Footer link */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-sm font-medium ${project.accent} hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4fc3f7] rounded`}
                  aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
                >
                  View on GitHub
                  <svg
                    aria-hidden="true"
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </motion.article>
            ))}
          </div>

          {/* More projects hint */}
          <motion.div variants={cardVariants} className="mt-10 text-center">
            <a
              href="https://github.com/sa1701"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 glass-card rounded-xl border border-white/[0.08] text-[#9999b8] hover:text-[#e8e8f0] hover:border-white/[0.14] transition-all duration-200 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4fc3f7]"
              aria-label="View all projects on GitHub (opens in new tab)"
            >
              <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View all on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
