"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  liveUrl?: string;
  /** Hex accent colour, e.g. "#4fc3f7" */
  accentHex: string;
  /** Tailwind text-colour class for the title */
  accentText: string;
  /** Tailwind border class at 15% opacity */
  accentBorder: string;
  /** Tailwind shadow-glow utility class */
  shadowGlow: string;
  icon: string;
}

type Direction = "top" | "right" | "bottom" | "left";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PROJECTS: Project[] = [
  {
    title: "RAG PDF Chat",
    icon: "🤖",
    accentHex: "#34d399",
    accentText: "text-[#34d399]",
    accentBorder: "border-[#34d399]/[0.15]",
    shadowGlow: "shadow-glow-green",
    description:
      "Privacy-first AI document Q&A — upload any PDF and ask questions. Uses FAISS vector search and local LLMs via Ollama. No API keys, no data leaves your machine.",
    tech: ["Python", "LangChain", "FAISS", "sentence-transformers", "Ollama", "Streamlit"],
    github: "https://github.com/sa1701/rag-pdf-chat",
  },
  {
    title: "TaskFlow",
    icon: "📋",
    accentHex: "#6366f1",
    accentText: "text-[#6366f1]",
    accentBorder: "border-[#6366f1]/[0.15]",
    shadowGlow: "shadow-glow-indigo",
    description:
      "Full-stack kanban task manager with drag-and-drop, priority labels, multi-project support, and JWT authentication. Live on Vercel.",
    tech: ["Next.js 16", "Supabase", "Prisma", "NextAuth.js", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/sa1701/taskflow",
    liveUrl: "https://taskflow-one-red.vercel.app",
  },
  {
    title: "Command Center",
    icon: "🛸",
    accentHex: "#f472b6",
    accentText: "text-[#f472b6]",
    accentBorder: "border-[#f472b6]/[0.15]",
    shadowGlow: "shadow-glow-pink",
    description:
      "16-widget productivity dashboard with Notion sync, drag-and-drop layout, and a command palette (Ctrl+K). Includes timetable, workout tracker, prayer times, and Pomodoro timer.",
    tech: ["Next.js 14", "TypeScript", "Zustand", "Notion API", "@dnd-kit", "Tailwind CSS"],
    github: "https://github.com/sa1701/command-center",
    liveUrl: "https://dashboard-omega-ivory-98.vercel.app",
  },
  {
    title: "Local AI Text Summariser",
    icon: "📝",
    accentHex: "#fb923c",
    accentText: "text-[#fb923c]",
    accentBorder: "border-[#fb923c]/[0.15]",
    shadowGlow: "shadow-glow-orange",
    description:
      "Summarise any text using locally-running LLMs — no API keys or internet required. Supports Mistral and LLaMA 3.2 with live streaming and 3 summary styles.",
    tech: ["Python", "Streamlit", "Ollama", "Mistral", "LLaMA 3.2"],
    github: "https://github.com/sa1701/text-summarizer-",
  },
  {
    title: "Recipe Web App",
    icon: "🍽",
    accentHex: "#4fc3f7",
    accentText: "text-[#4fc3f7]",
    accentBorder: "border-[#4fc3f7]/[0.15]",
    shadowGlow: "shadow-glow-cyan",
    description:
      "Full-stack recipe application supporting multi-cuisine filtering, keyword search, and a fully responsive interface.",
    tech: ["Node.js", "MySQL", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/sa1701/recipe-web-app",
  },
  {
    title: "Employee Management System",
    icon: "👥",
    accentHex: "#7c4dff",
    accentText: "text-[#7c4dff]",
    accentBorder: "border-[#7c4dff]/[0.15]",
    shadowGlow: "shadow-glow-purple",
    description:
      "Enterprise HR tool with session-based authentication, full CRUD operations, and role-aware access control.",
    tech: ["Node.js", "Express", "MySQL", "Session Auth", "HTML/CSS"],
    github: "https://github.com/sa1701/employee-management-system",
  },
  {
    title: "ai-commit",
    icon: "⚡",
    accentHex: "#fbbf24",
    accentText: "text-[#fbbf24]",
    accentBorder: "border-[#fbbf24]/[0.15]",
    shadowGlow: "shadow-glow-yellow",
    description:
      "CLI tool that generates conventional git commit messages from staged diffs using a local Ollama LLM. Supports model selection, dry-run mode, and inline message editing.",
    tech: ["Python", "Click", "Ollama", "Git"],
    github: "https://github.com/sa1701/ai-commit",
  },
  {
    title: "Notebook CLI",
    icon: "🗒️",
    accentHex: "#2dd4bf",
    accentText: "text-[#2dd4bf]",
    accentBorder: "border-[#2dd4bf]/[0.15]",
    shadowGlow: "shadow-glow-teal",
    description:
      "Command-line note-taking app with tag-based search, persistent JSON storage, and a clean menu-driven interface. Built with OOP principles.",
    tech: ["Python", "OOP", "JSON"],
    github: "https://github.com/sa1701/notebook-cli",
  },
  {
    title: "Big Data ML",
    icon: "📊",
    accentHex: "#f87171",
    accentText: "text-[#f87171]",
    accentBorder: "border-[#f87171]/[0.15]",
    shadowGlow: "shadow-glow-red",
    description:
      "Decision tree classifier built from scratch (info gain + Gini impurity) with weighted ensemble methods. Applied to UCI Heart Disease and Solar Flare datasets.",
    tech: ["Python", "scikit-learn", "pandas", "NumPy", "Jupyter"],
    github: "https://github.com/sa1701/big-data-ml",
  },
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 150, damping: 15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 150, damping: 15 },
  },
};

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 150, damping: 15 },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Determine which edge of `rect` the point (x, y) entered from.
 * Compares the point's distances to each edge and picks the smallest.
 */
function getEntryDirection(rect: DOMRect, x: number, y: number): Direction {
  const relX = x - rect.left;
  const relY = y - rect.top;
  const distances: [number, Direction][] = [
    [relY, "top"],
    [rect.width - relX, "right"],
    [rect.height - relY, "bottom"],
    [relX, "left"],
  ];
  distances.sort((a, b) => a[0] - b[0]);
  return distances[0][1];
}

/** Build the initial gradient position for the direction-aware overlay. */
function overlayGradient(dir: Direction, accentHex: string): string {
  const stop = `${accentHex}0d`; // ~5% opacity
  const transparent = `${accentHex}00`;
  const gradients: Record<Direction, string> = {
    top: `linear-gradient(to bottom, ${stop}, ${transparent})`,
    bottom: `linear-gradient(to top, ${stop}, ${transparent})`,
    left: `linear-gradient(to right, ${stop}, ${transparent})`,
    right: `linear-gradient(to left, ${stop}, ${transparent})`,
  };
  return gradients[dir];
}

// ---------------------------------------------------------------------------
// BorderBeam – a glowing dot that traces the card border
// ---------------------------------------------------------------------------

interface BorderBeamProps {
  accentHex: string;
  /** Milliseconds per full revolution */
  duration?: number;
}

function BorderBeam({ accentHex, duration = 3000 }: BorderBeamProps) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
    >
      <span
        className="border-beam-dot"
        style={
          {
            "--accent": accentHex,
            "--duration": `${duration}ms`,
          } as React.CSSProperties
        }
      />
    </span>
  );
}

// ---------------------------------------------------------------------------
// TiltCard – wraps a card with perspective 3-D tilt + shine overlay
// ---------------------------------------------------------------------------

interface TiltCardProps {
  children: React.ReactNode;
  accentHex: string;
  className?: string;
  /** Additional props forwarded to the outer element */
  motionProps?: React.ComponentPropsWithoutRef<typeof motion.article>;
}

function TiltCard({ children, accentHex, className = "", motionProps }: TiltCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  // Spring-animated raw rotation values
  const rotX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotY = useSpring(0, { stiffness: 200, damping: 20 });

  // Shine position (inverse of tilt)
  const shineX = useTransform(rotY, [-12, 12], [70, 30]);
  const shineY = useTransform(rotX, [-12, 12], [70, 30]);

  // Direction-aware hover overlay
  const [hoverOverlay, setHoverOverlay] = useState<string>("none");
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      const halfW = rect.width / 2;
      const halfH = rect.height / 2;

      // ±12 degrees max
      rotY.set(((relX - halfW) / halfW) * 12);
      rotX.set(-((relY - halfH) / halfH) * 12);
    },
    [rotX, rotY]
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dir = getEntryDirection(rect, e.clientX, e.clientY);
      setHoverOverlay(overlayGradient(dir, accentHex));
      setOverlayOpacity(1);
    },
    [accentHex]
  );

  const handleMouseLeave = useCallback(() => {
    rotX.set(0);
    rotY.set(0);
    setOverlayOpacity(0);
  }, [rotX, rotY]);

  return (
    <motion.article
      ref={cardRef as React.RefObject<HTMLElement>}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
      {...motionProps}
    >
      {/* Direction-aware gradient overlay */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-10"
        style={{
          background: hoverOverlay,
          opacity: overlayOpacity,
        }}
      />

      {/* Shine / glare layer */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl z-10"
        style={{
          background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.06) 0%, transparent 65%)`,
        }}
      />

      {children}
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// ProjectCard
// ---------------------------------------------------------------------------

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const slugId = `project-${project.title.replace(/\s+/g, "-").toLowerCase()}`;
  const [arrowHovered, setArrowHovered] = useState(false);

  return (
    <TiltCard
      accentHex={project.accentHex}
      className="group"
      motionProps={{
        variants: cardVariants,
        role: "listitem",
        "aria-labelledby": slugId,
      }}
    >
      {/* Border beam */}
      <BorderBeam accentHex={project.accentHex} />

      {/* Inner card surface */}
      <div
        className={`
          glass-card rounded-2xl border ${project.accentBorder}
          flex flex-col overflow-hidden h-full
          transition-shadow duration-300 group-hover:${project.shadowGlow}
        `}
      >
        {/* Decorative gradient banner */}
        <div
          aria-hidden="true"
          className="h-24 w-full flex-shrink-0 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.accentHex}33 0%, ${project.accentHex}08 60%, transparent 100%)`,
          }}
        >
          {/* Large faint icon in banner */}
          <span
            className="absolute right-5 top-1/2 -translate-y-1/2 text-5xl opacity-20 select-none"
            aria-hidden="true"
          >
            {project.icon}
          </span>
          {/* Subtle grid lines */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full opacity-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id={`grid-${slugId}`}
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 24 0 L 0 0 0 24"
                  fill="none"
                  stroke={project.accentHex}
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${slugId})`} />
          </svg>
        </div>

        {/* Card body */}
        <div className="flex flex-col gap-5 p-7 flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className="text-2xl"
                role="img"
                aria-label={`${project.title} icon`}
              >
                {project.icon}
              </span>
              <h3
                id={slugId}
                className={`text-lg font-bold ${project.accentText} group-hover:opacity-90 transition-opacity`}
              >
                {project.title}
              </h3>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-2.5 py-1.5 rounded-lg glass-card border text-xs font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4fc3f7]"
                style={{ borderColor: `${project.accentHex}40`, color: project.accentHex }}
                aria-label={`View ${project.title} live demo (opens in new tab)`}
              >
                Live ↗
              </a>
            )}
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
                className="px-2.5 py-1 text-xs font-mono rounded-md glass-card border border-white/[0.08] text-[#9999b8] transition-all duration-200 hover:border-current hover:text-current cursor-default"
                style={
                  {
                    "--tw-text-opacity": "1",
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = project.accentHex;
                  (e.currentTarget as HTMLElement).style.borderColor = `${project.accentHex}66`;
                  (e.currentTarget as HTMLElement).style.textShadow = `0 0 8px ${project.accentHex}80`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "";
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.textShadow = "";
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Footer CTA */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-sm font-medium ${project.accentText} hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4fc3f7] rounded w-fit overflow-hidden`}
            aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
            onMouseEnter={() => setArrowHovered(true)}
            onMouseLeave={() => setArrowHovered(false)}
          >
            View on GitHub
            <motion.svg
              aria-hidden="true"
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: arrowHovered ? 3 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </motion.svg>
          </a>
        </div>
      </div>
    </TiltCard>
  );
}

// ---------------------------------------------------------------------------
// Projects section
// ---------------------------------------------------------------------------

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <>
      {/*
        Border-beam keyframe styles injected once into the document head.
        Using a <style> tag inside the component is intentional here – it keeps
        the animation self-contained and avoids a global CSS file dependency for
        just this one effect.
      */}
      <style>{`
        @keyframes border-beam-trace {
          0%   { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }

        .border-beam-dot {
          display: block;
          position: absolute;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 10px 3px var(--accent);
          offset-path: border-box;
          offset-rotate: 0deg;
          animation: border-beam-trace var(--duration, 3000ms) linear infinite;
          pointer-events: none;
        }
      `}</style>

      <section
        id="projects"
        ref={sectionRef}
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
            <motion.div variants={headerVariants} className="text-center mb-16">
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              role="list"
              aria-label="Projects"
            >
              {PROJECTS.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>

            {/* View all on GitHub */}
            <motion.div variants={footerVariants} className="mt-10 text-center">
              <a
                href="https://github.com/sa1701"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 glass-card rounded-xl border border-white/[0.08] text-[#9999b8] hover:text-[#e8e8f0] hover:border-white/[0.14] transition-all duration-200 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4fc3f7]"
                aria-label="View all projects on GitHub (opens in new tab)"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View all on GitHub
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/*
  Usage
  -----
  import Projects from "@/components/Projects";

  // Drop it anywhere in your page layout:
  <Projects />

  -------------------------------------------------------------------------------
  Unit Test Structure (Jest + React Testing Library)
  -------------------------------------------------------------------------------

  // __tests__/Projects.test.tsx
  import { render, screen, fireEvent } from "@testing-library/react";
  import Projects from "@/components/Projects";

  // Mock framer-motion so tests run synchronously without layout engines
  jest.mock("framer-motion", () => {
    const actual = jest.requireActual("framer-motion");
    return {
      ...actual,
      useInView: () => true,
      motion: {
        div: ({ children, ...p }: any) => <div {...p}>{children}</div>,
        article: ({ children, ...p }: any) => <article {...p}>{children}</article>,
        span: ({ children, ...p }: any) => <span {...p}>{children}</span>,
        svg: ({ children, ...p }: any) => <svg {...p}>{children}</svg>,
      },
    };
  });

  describe("Projects", () => {
    it("renders the section heading", () => {
      render(<Projects />);
      expect(screen.getByRole("heading", { name: /projects/i })).toBeInTheDocument();
    });

    it("renders all project titles", () => {
      render(<Projects />);
      expect(screen.getByText("Recipe Web App")).toBeInTheDocument();
      expect(screen.getByText("Employee Management System")).toBeInTheDocument();
    });

    it("renders GitHub links with correct hrefs", () => {
      render(<Projects />);
      const links = screen.getAllByRole("link", { name: /github/i });
      const hrefs = links.map((l) => l.getAttribute("href"));
      expect(hrefs).toContain("https://github.com/sa1701/recipe-web-app");
      expect(hrefs).toContain("https://github.com/sa1701/employee-management-system");
    });

    it("renders the view all on GitHub footer link", () => {
      render(<Projects />);
      expect(
        screen.getByRole("link", { name: /view all projects on github/i })
      ).toHaveAttribute("href", "https://github.com/sa1701");
    });

    it("all external links have rel=noopener noreferrer", () => {
      render(<Projects />);
      const external = screen.getAllByRole("link");
      external.forEach((link) => {
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });
    });

    it("tech badges render for each project", () => {
      render(<Projects />);
      expect(screen.getByText("Node.js")).toBeInTheDocument();
      expect(screen.getByText("MySQL")).toBeInTheDocument();
      expect(screen.getByText("Express")).toBeInTheDocument();
    });

    it("tilt card resets rotation on mouse leave", () => {
      render(<Projects />);
      const cards = screen.getAllByRole("listitem");
      fireEvent.mouseEnter(cards[0], { clientX: 100, clientY: 50 });
      fireEvent.mouseMove(cards[0], { clientX: 120, clientY: 60 });
      fireEvent.mouseLeave(cards[0]);
      // Visual spring values are internal; this confirms no thrown errors
    });
  });
*/
