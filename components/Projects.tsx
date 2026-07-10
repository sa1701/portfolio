"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ---------------------------------------------------------------------------
// Types & data
// ---------------------------------------------------------------------------

interface IndexProject {
  title: string;
  designation: string;
  /** Right-column domain tag — maps the work back to the AI & Big Data major */
  domain: string;
  blurb: string;
  /** One line of hard numbers shown on the hover plate */
  metric: string;
  tech: string[];
  /** Omit for private repos — the row renders "available on request" */
  github?: string;
  liveUrl?: string;
}

const MAIN: IndexProject[] = [
  {
    title: "GEARHEAD",
    designation: "Local-first AI car diagnosis",
    domain: "AI / RAG",
    blurb:
      "Describe a fault, get interviewed like a mechanic, receive a cited fix with the workshop manual's own diagram — on the Claude API or fully offline.",
    metric: "22 manuals · 2,450 indexed chunks",
    tech: ["Python", "FastAPI", "RAG", "Ollama", "ChromaDB"],
    github: "https://github.com/sa1701/gearhead",
  },
  {
    title: "Sydney Tech Pulse",
    designation: "Live job-market data pipeline",
    domain: "Data Eng",
    blurb:
      "Daily ELT pipeline that mines Sydney job postings for the skills employers actually hire for, loading Postgres views behind a live trends dashboard.",
    metric: "90-pattern skill taxonomy · $0/mo to run",
    tech: ["Python", "PostgreSQL", "Docker", "GitHub Actions", "Supabase"],
    github: "https://github.com/sa1701/sydney-tech-pulse",
    liveUrl: "https://sydney-tech-pulse.vercel.app",
  },
  {
    title: "ZynTrace",
    designation: "Software update tracing — capstone",
    domain: "NLP × Sec",
    blurb:
      "Diffs code changes against release notes to surface silently-patched vulnerabilities and cloned defects that update descriptions never mention.",
    metric: "Program analysis × transformer NLP",
    tech: ["Python", "NLP", "Program Analysis", "Transformers"],
  },
  {
    title: "Command Center",
    designation: "Productivity dashboard",
    domain: "Full-Stack",
    blurb:
      "Everything-dashboard with Notion sync, drag-and-drop layout, and a Ctrl+K command palette — timetable, workouts, prayer times, Pomodoro.",
    metric: "16 widgets · Notion API sync",
    tech: ["Next.js", "TypeScript", "Zustand", "Notion API"],
    github: "https://github.com/sa1701/command-center",
    liveUrl: "https://dashboard-omega-ivory-98.vercel.app",
  },
  {
    title: "TaskFlow",
    designation: "Full-stack kanban",
    domain: "Full-Stack",
    blurb:
      "Kanban task manager with drag-and-drop, priority labels, multi-project boards, and JWT authentication.",
    metric: "Auth + DB + deploy, end to end",
    tech: ["Next.js", "Supabase", "Prisma", "NextAuth.js"],
    github: "https://github.com/sa1701/taskflow",
    liveUrl: "https://taskflow-one-red.vercel.app",
  },
  {
    title: "Talent Matching Platform",
    designation: "Team project — backend",
    domain: "Backend",
    blurb:
      "Job–candidate matching engine built by a five-person team. Owned the backend: weighted recommendation scoring and fuzzy search.",
    metric: "55-point scoring · CI on every push",
    tech: ["PHP 8", "MySQL", "PHPUnit", "GitHub Actions"],
  },
];

const ARCHIVE: IndexProject[] = [
  {
    title: "RAG PDF Chat",
    designation: "Privacy-first document Q&A",
    domain: "AI / RAG",
    blurb:
      "Upload any PDF, ask questions, get cited answers from a locally-hosted LLM. No API keys, no data leaves the machine.",
    metric: "FAISS vector search · zero cloud",
    tech: ["Python", "LangChain", "FAISS", "Ollama"],
    github: "https://github.com/sa1701/rag-pdf-chat",
  },
  {
    title: "Big Data ML",
    designation: "Classifiers from first principles",
    domain: "ML",
    blurb:
      "Decision-tree classifiers written from scratch (information gain + Gini) with weighted ensembling, applied to UCI datasets.",
    metric: "No sklearn.fit() in sight",
    tech: ["Python", "pandas", "NumPy"],
    github: "https://github.com/sa1701/big-data-ml",
  },
  {
    title: "ai-commit",
    designation: "CLI tooling",
    domain: "Dev Tools",
    blurb:
      "Generates conventional git commit messages from staged diffs using a local Ollama LLM.",
    metric: "Local LLM · dry-run · inline edit",
    tech: ["Python", "Click", "Ollama"],
    github: "https://github.com/sa1701/ai-commit",
  },
  {
    title: "Text Summariser",
    designation: "Local AI utility",
    domain: "AI",
    blurb:
      "Summarises any text with locally-running LLMs — streaming output, three summary styles, zero API keys.",
    metric: "Streaming · 3 styles · offline",
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
// Pieces
// ---------------------------------------------------------------------------

function RowLinks({ project }: { project: IndexProject }) {
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

/**
 * Floating "data plate" revealed on row hover/focus — the drafting-sheet
 * answer to a screenshot thumbnail. Desktop only; mobile gets the same
 * content inline.
 */
function DataPlate({ project }: { project: IndexProject }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none hidden lg:block absolute right-4 top-1/2 z-20 w-[22rem] -translate-y-1/2 translate-x-6 rotate-[2.5deg] opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:rotate-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:rotate-0 group-focus-within:opacity-100"
    >
      <div className="panel border-line-strong p-6 shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
        <p className="spec-label !text-signal">{project.designation}</p>
        <p className="mt-3 text-sm text-ink/90 leading-relaxed">{project.blurb}</p>
        <p className="mt-4 font-mono text-xs tracking-[0.08em] text-signal border-t border-line pt-3">
          {project.metric}
        </p>
        <div className="mt-3">
          <TechList tech={project.tech} />
        </div>
      </div>
    </div>
  );
}

function IndexRow({ project, index }: { project: IndexProject; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  const primary = project.liveUrl ?? project.github;

  return (
    <motion.article
      variants={itemVariants}
      role="listitem"
      className="group relative border-b border-line"
    >
      <div className="py-7 lg:py-9 grid grid-cols-1 lg:grid-cols-12 lg:items-baseline gap-x-6 gap-y-3">
        {/* Index */}
        <span
          className="lg:col-span-1 font-mono text-sm text-muted group-hover:text-signal transition-colors"
          aria-hidden="true"
        >
          {num}
        </span>

        {/* Title */}
        <h3 className="lg:col-span-7 font-display font-black leading-[0.95] tracking-tight text-[clamp(2rem,5.5vw,4.25rem)] text-ink group-hover:text-signal transition-colors duration-200">
          {primary ? (
            <a
              href={primary}
              target="_blank"
              rel="noopener noreferrer"
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded-sm"
              aria-label={`${project.title} — ${project.designation} (opens in new tab)`}
            >
              {project.title}
              <span className="ml-3 inline-block text-[0.4em] align-[0.6em] text-muted group-hover:text-signal group-hover:-translate-y-1 group-hover:translate-x-1 transition-all">
                ↗
              </span>
            </a>
          ) : (
            project.title
          )}
        </h3>

        {/* Designation */}
        <p className="lg:col-span-3 spec-label lg:text-right lg:self-center">
          {project.designation}
        </p>

        {/* Domain tag */}
        <span className="lg:col-span-1 font-mono text-xs tracking-[0.14em] uppercase text-signal/80 lg:text-right lg:self-center whitespace-nowrap">
          {project.domain}
        </span>

        {/* Mobile / small-screen detail (the data plate content, inline) */}
        <div className="lg:hidden col-span-full flex flex-col gap-3 pt-1">
          <p className="text-muted text-sm leading-relaxed">{project.blurb}</p>
          <p className="font-mono text-xs text-signal">{project.metric}</p>
          <TechList tech={project.tech} />
          <RowLinks project={project} />
        </div>
      </div>

      <DataPlate project={project} />
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

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
            className="flex items-baseline gap-4 mb-6 border-b border-line pb-5"
          >
            <span className="font-mono text-sm text-signal">02</span>
            <h2
              id="projects-heading"
              className="font-display font-black text-3xl sm:text-4xl text-ink"
            >
              Selected Work
            </h2>
            <span className="spec-label ml-auto hidden sm:inline">
              {String(MAIN.length).padStart(2, "0")} entries — hover for spec
            </span>
          </motion.div>

          {/* Typographic index */}
          <div role="list" aria-label="Selected projects">
            {MAIN.map((project, i) => (
              <IndexRow key={project.title} project={project} index={i} />
            ))}
          </div>

          {/* Archive */}
          <motion.div
            variants={itemVariants}
            className="flex items-baseline gap-4 mt-20 mb-6 border-b border-line pb-4"
          >
            <h3 className="spec-label !text-ink">Archive</h3>
            <span className="spec-label ml-auto hidden sm:inline">
              Smaller builds &amp; tooling
            </span>
          </motion.div>

          <div
            role="list"
            aria-label="Archive projects"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {ARCHIVE.map((project) => (
              <motion.article
                key={project.title}
                variants={itemVariants}
                role="listitem"
                className="panel ticks group flex flex-col"
              >
                <div className="border-b border-line px-6 py-4 flex items-baseline justify-between gap-4">
                  <h4 className="font-display font-bold text-xl text-ink group-hover:text-signal transition-colors duration-200">
                    {project.title}
                  </h4>
                  <span className="font-mono text-xs tracking-[0.14em] uppercase text-signal/80 whitespace-nowrap">
                    {project.domain}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <p className="text-muted text-sm leading-relaxed flex-1">
                    {project.blurb}
                  </p>
                  <TechList tech={project.tech} />
                  <div className="border-t border-line pt-4">
                    <RowLinks project={project} />
                  </div>
                </div>
              </motion.article>
            ))}
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
