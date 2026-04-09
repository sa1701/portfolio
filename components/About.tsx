"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ---------------------------------------------------------------------------
// Animated number counter
// ---------------------------------------------------------------------------
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // Respect reduced-motion preference
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setCount(target);
      return;
    }

    const duration = 1500;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Stat data
// ---------------------------------------------------------------------------
interface Stat {
  numericValue: number | null;
  suffix: string;
  rawValue: string;
  label: string;
  description: string;
  color: string;
  border: string;
  glow: string;
}

const STATS: Stat[] = [
  {
    numericValue: 6,
    suffix: "+",
    rawValue: "6+",
    label: "Languages",
    description: "Python, C++, Java, JS, SQL, HTML/CSS",
    color: "text-[#4fc3f7]",
    border: "border-[#4fc3f7]/20",
    glow: "hover:shadow-glow-cyan",
  },
  {
    numericValue: 9,
    suffix: "+",
    rawValue: "9+",
    label: "Projects",
    description: "Full-stack & AI/ML applications",
    color: "text-[#7c4dff]",
    border: "border-[#7c4dff]/20",
    glow: "hover:shadow-glow-purple",
  },
  {
    numericValue: null,
    suffix: "",
    rawValue: "AI/ML",
    label: "Focus",
    description: "Deep Learning, NLP, Generative AI",
    color: "text-[#f472b6]",
    border: "border-[#f472b6]/20",
    glow: "hover:shadow-glow-pink",
  },
  {
    numericValue: 2,
    suffix: "",
    rawValue: "2",
    label: "Languages",
    description: "English (IELTS 7.5) & Arabic (Native)",
    color: "text-[#4fc3f7]",
    border: "border-[#4fc3f7]/20",
    glow: "hover:shadow-glow-cyan",
  },
];

// ---------------------------------------------------------------------------
// Tracing beam
// ---------------------------------------------------------------------------
function TracingBeam({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Map scroll progress to the SVG path length
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div
      aria-hidden="true"
      className="absolute left-0 top-0 bottom-0 w-8 hidden md:flex items-stretch pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <svg
        className="h-full w-full overflow-visible"
        viewBox="0 0 20 100"
        preserveAspectRatio="none"
      >
        {/* Static faint track */}
        <line
          x1="10"
          y1="0"
          x2="10"
          y2="100"
          stroke="rgba(79,195,247,0.08)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        {/* Animated bright beam */}
        <motion.line
          x1="10"
          y1="0"
          x2="10"
          y2="100"
          stroke="url(#beamGradient)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength, opacity }}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="beamGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4fc3f7" />
            <stop offset="100%" stopColor="#7c4dff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Animation variants — spring physics
// ---------------------------------------------------------------------------
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className="relative py-24 px-6 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Gradient mesh blob — decorative background drift */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(124,77,255,0.10) 0%, rgba(79,195,247,0.06) 50%, transparent 75%)",
          filter: "blur(60px)",
          animation: "blobDrift 18s ease-in-out infinite alternate",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(244,114,182,0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "blobDrift 22s ease-in-out infinite alternate-reverse",
        }}
      />

      {/* Tracing beam */}
      <TracingBeam sectionRef={ref} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative"
        style={{ zIndex: 1 }}
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
              key={`${stat.rawValue}-${stat.label}`}
              variants={itemVariants}
              role="listitem"
              className={`glass-card rounded-2xl p-6 text-center border ${stat.border} ${stat.glow} transition-all duration-300 hover:-translate-y-1`}
            >
              <p
                className={`text-3xl font-bold mb-1 ${stat.color}`}
                aria-label={`${stat.rawValue} ${stat.label}`}
              >
                {stat.numericValue !== null ? (
                  <AnimatedNumber target={stat.numericValue} suffix={stat.suffix} />
                ) : (
                  stat.rawValue
                )}
              </p>
              <p className="text-[#e8e8f0] font-semibold text-sm mb-2">{stat.label}</p>
              <p className="text-[#9999b8] text-xs leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Location badge */}
        <motion.div variants={itemVariants} className="mt-10 flex justify-center">
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
            <span className="text-sm text-[#9999b8]">Chippendale, NSW, Australia</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Blob drift keyframes — injected once via a style tag */}
      <style>{`
        @keyframes blobDrift {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(30px, -20px) scale(1.05); }
          100% { transform: translate(-20px, 30px) scale(0.97); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="blobDrift"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
