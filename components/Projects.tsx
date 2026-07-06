"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ---------------------------------------------------------------------------
// Types & data
// ---------------------------------------------------------------------------

interface Project {
  title: string;
  designation: string;
  description: string;
  tech: string[];
  /** Omit for private repos — the card renders "available on request" */
  github?: string;
  liveUrl?: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: "GEARHEAD",
    designation: "Local-first AI car diagnosis",
    featured: true,
    description:
      "Describe a symptom or fault code, get interviewed like a mechanic, then receive a cited fix with the actual workshop-manual diagram. RAG over 22 service manuals (2,450 indexed chunks) with page-level citations on every answer — running on the Claude API or 100% offline on a local Ollama model, switched with one env var. Designed so adding a car is as simple as dropping in a PDF.",
    tech: ["Python", "FastAPI", "RAG", "Ollama", "ChromaDB", "PyMuPDF"],
    github: "https://github.com/sa1701/gearhead",
  },
  {
    title: "ZynTrace",
    designation: "Software update tracing — capstone",
    description:
      "Diffs code changes against release notes to surface bugs, silently-patched security vulnerabilities, and cloned defects that update descriptions never mention. Program analysis × transformer-based NLP, evaluated on CVE-fixing commit corpora.",
    tech: ["Python", "NLP", "Program Analysis", "Transformers"],
  },
  {
    title: "Talent Matching Platform",
    designation: "Team project — backend",
    description:
      "Job–candidate matching engine built by a five-person team. Weighted 55-point recommendation scoring, fuzzy search with Levenshtein + Soundex, and CI running lint and PHPUnit on every push.",
    tech: ["PHP 8", "MySQL", "PHPUnit", "GitHub Actions"],
  },
  {
    title: "RAG PDF Chat",
    designation: "Privacy-first document Q&A",
    description:
      "Upload any PDF and ask questions — cited answers from a locally-hosted LLM. FAISS vector search, no API keys, no data leaves the machine.",
    tech: ["Python", "LangChain", "FAISS", "Ollama", "Streamlit"],
    github: "https://github.com/sa1701/rag-pdf-chat",
  },
  {
    title: "Command Center",
    designation: "Productivity dashboard",
    description:
      "16-widget dashboard with Notion sync, drag-and-drop layout, and a Ctrl+K command palette. Timetable, workout tracker, prayer times, Pomodoro.",
    tech: ["Next.js", "TypeScript", "Zustand", "Notion API"],
    github: "https://github.com/sa1701/command-center",
    liveUrl: "https://dashboard-omega-ivory-98.vercel.app",
  },
  {
    title: "TaskFlow",
    designation: "Full-stack kanban",
    description:
      "Kanban task manager with drag-and-drop, priority labels, multi-project support, and JWT authentication. Live on Vercel.",
    tech: ["Next.js", "Supabase", "Prisma", "NextAuth.js"],
    github: "https://github.com/sa1701/taskflow",
    liveUrl: "https://taskflow-one-red.vercel.app",
  },
  {
    title: "Big Data ML",
    designation: "Classifiers from first principles",
    description:
      "Decision-tree classifiers written from scratch (information gain + Gini) with weighted ensembling, applied to UCI datasets.",
    tech: ["Python", "scikit-learn", "pandas", "NumPy"],
    github: "https://github.com/sa1701/big-data-ml",
  },
  {
    title: "ai-commit",
    designation: "CLI tooling",
    description:
      "Generates conventional git commit messages from staged diffs using a local Ollama LLM. Model selection, dry-run mode, inline editing.",
    tech: ["Python", "Click", "Ollama", "Git"],
    github: "https://github.com/sa1701/ai-commit",
  },
  {
    title: "Text Summariser",
    designation: "Local AI utility",
    description:
      "Summarises any text with locally-running LLMs — streaming output, three summary styles, zero API keys.",
    tech: ["Python", "Streamlit", "Ollama"],
    github: "https://github.com/sa1701/text-summarizer-",
  },
];

// ---------------------------------------------------------------------------
// Animation
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
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
// Card pieces
// ---------------------------------------------------------------------------

function CardLinks({ project }: { project: Project }) {
  if (!project.github && !project.liveUrl) {
    return (
      <span className="font-mono text-xs text-muted tracking-wide">
        Private repo — available on request
      </span>
    );
  }
  return (
    <span className="flex flex-wrap gap-5">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link font-mono text-xs tracking-[0.14em] uppercase text-signal hover:text-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded-sm"
          aria-label={`Open ${project.title} live site (opens in new tab)`}
        >
          Live site{" "}
          <span className="inline-block group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform">
            ↗
          </span>
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link font-mono text-xs tracking-[0.14em] uppercase text-ink/80 hover:text-signal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded-sm"
          aria-label={`View ${project.title} source on GitHub (opens in new tab)`}
        >
          Source{" "}
          <span className="inline-block group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform">
            ↗
          </span>
        </a>
      )}
    </span>
  );
}

function TechList({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5" aria-label="Technologies used">
      {tech.map((t) => (
        <li key={t} className="font-mono text-xs text-muted whitespace-nowrap">
          <span className="text-signal/70 mr-1.5">/</span>
          {t}
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const featured = PROJECTS.find((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-labelledby="projects-heading"
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
            <span className="font-mono text-sm text-signal">02</span>
            <h2
              id="projects-heading"
              className="font-display font-black text-3xl sm:text-4xl text-ink"
            >
              Selected Work
            </h2>
            <span className="spec-label ml-auto hidden sm:inline">
              {String(PROJECTS.length).padStart(2, "0")} entries
            </span>
          </motion.div>

          <div role="list" aria-label="Projects">
            {/* Featured entry */}
            {featured && (
              <motion.article
                variants={itemVariants}
                role="listitem"
                className="panel ticks mb-6 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Index gutter */}
                  <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-line p-7 flex lg:flex-col justify-between gap-4">
                    <span
                      className="font-display font-black text-[clamp(3rem,6vw,5.5rem)] leading-none text-signal"
                      aria-hidden="true"
                    >
                      01
                    </span>
                    <span className="spec-label self-end lg:self-start">
                      Flagship build
                    </span>
                  </div>
                  {/* Body */}
                  <div className="lg:col-span-9 p-7 lg:p-9 flex flex-col gap-5">
                    <div>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-ink group-hover:text-signal transition-colors duration-200">
                        {featured.title}
                      </h3>
                      <p className="spec-label mt-2">{featured.designation}</p>
                    </div>
                    <p className="text-muted leading-relaxed max-w-3xl">
                      {featured.description}
                    </p>
                    <TechList tech={featured.tech} />
                    <div className="pt-2 border-t border-line mt-auto pt-4">
                      <CardLinks project={featured} />
                    </div>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Grid entries */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rest.map((project, i) => (
                <motion.article
                  key={project.title}
                  variants={itemVariants}
                  role="listitem"
                  className="panel ticks group flex flex-col"
                >
                  <div className="border-b border-line px-6 py-4 flex items-baseline justify-between gap-4">
                    <h3 className="font-display font-bold text-xl text-ink group-hover:text-signal transition-colors duration-200">
                      {project.title}
                    </h3>
                    <span className="font-mono text-xs text-muted" aria-hidden="true">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col gap-4 flex-1">
                    <p className="spec-label">{project.designation}</p>
                    <p className="text-muted text-sm leading-relaxed flex-1">
                      {project.description}
                    </p>
                    <TechList tech={project.tech} />
                    <div className="border-t border-line pt-4">
                      <CardLinks project={project} />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Footer link */}
          <motion.div variants={itemVariants} className="mt-10 text-center">
            <a
              href="https://github.com/sa1701"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-line-strong px-7 py-4 font-mono text-xs tracking-[0.16em] uppercase text-ink hover:border-signal hover:text-signal transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
              aria-label="View all repositories on GitHub (opens in new tab)"
            >
              Full archive on GitHub ↗
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
