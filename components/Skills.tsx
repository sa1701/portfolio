"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SkillCategory {
  title: string;
  skills: string[];
  accent: string;
  tagBg: string;
  tagText: string;
  border: string;
  icon: string;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    icon: "{ }",
    skills: ["Python", "C++", "Java", "JavaScript", "SQL", "HTML/CSS"],
    accent: "text-[#4fc3f7]",
    tagBg: "bg-[#4fc3f7]/10",
    tagText: "text-[#4fc3f7]",
    border: "border-[#4fc3f7]/20",
  },
  {
    title: "Frameworks & Libraries",
    icon: "⚙",
    skills: ["Node.js", "NumPy", "Pandas", "scikit-learn", "Matplotlib", "Streamlit"],
    accent: "text-[#7c4dff]",
    tagBg: "bg-[#7c4dff]/10",
    tagText: "text-[#7c4dff]",
    border: "border-[#7c4dff]/20",
  },
  {
    title: "Databases",
    icon: "🗄",
    skills: ["MySQL", "PostgreSQL", "MongoDB"],
    accent: "text-[#f472b6]",
    tagBg: "bg-[#f472b6]/10",
    tagText: "text-[#f472b6]",
    border: "border-[#f472b6]/20",
  },
  {
    title: "AI / Machine Learning",
    icon: "🤖",
    skills: [
      "Generative AI",
      "RAG",
      "Prompt Engineering",
      "CNNs",
      "NLP",
      "Deep Learning",
      "Ollama",
    ],
    accent: "text-[#4fc3f7]",
    tagBg: "bg-[#4fc3f7]/10",
    tagText: "text-[#4fc3f7]",
    border: "border-[#4fc3f7]/20",
  },
  {
    title: "Tools & Environments",
    icon: "🛠",
    skills: ["Git", "VS Code", "Visual Studio", "PyCharm", "Jupyter"],
    accent: "text-[#7c4dff]",
    tagBg: "bg-[#7c4dff]/10",
    tagText: "text-[#7c4dff]",
    border: "border-[#7c4dff]/20",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      ref={ref}
      aria-labelledby="skills-heading"
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section heading */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-sm font-mono text-[#f472b6] tracking-widest uppercase mb-3">
              What I work with
            </p>
            <h2
              id="skills-heading"
              className="text-3xl sm:text-4xl font-bold gradient-text inline-block"
            >
              Skills
            </h2>
            <div
              aria-hidden="true"
              className="mt-4 w-16 h-0.5 mx-auto bg-gradient-to-r from-[#f472b6] to-[#4fc3f7] rounded-full"
            />
          </motion.div>

          {/* Skills grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            role="list"
            aria-label="Skill categories"
          >
            {SKILL_CATEGORIES.map((category) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                role="listitem"
                className={`glass-card rounded-2xl border ${category.border} p-6 hover:-translate-y-1 transition-all duration-300`}
                aria-labelledby={`skill-cat-${category.title.replace(/\s+/g, "-").toLowerCase()}`}
              >
                {/* Category header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span
                    className="text-lg"
                    role="img"
                    aria-label={category.title + " icon"}
                  >
                    {category.icon}
                  </span>
                  <h3
                    id={`skill-cat-${category.title.replace(/\s+/g, "-").toLowerCase()}`}
                    className={`font-semibold text-sm ${category.accent}`}
                  >
                    {category.title}
                  </h3>
                </div>

                {/* Skill tags */}
                <ul
                  className="flex flex-wrap gap-2"
                  aria-label={`Skills in ${category.title}`}
                >
                  {category.skills.map((skill) => (
                    <li key={skill}>
                      <span
                        className={`inline-block px-2.5 py-1 text-xs rounded-lg font-medium ${category.tagBg} ${category.tagText} border border-current/20`}
                      >
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
