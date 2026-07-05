"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CHANNELS = [
  {
    label: "Email",
    value: "seifarafa@hotmail.com",
    href: "mailto:seifarafa@hotmail.com",
    external: false,
  },
  {
    label: "LinkedIn",
    value: "in/seif-arafa-086744290",
    href: "https://www.linkedin.com/in/seif-arafa-086744290",
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/sa1701",
    href: "https://github.com/sa1701",
    external: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-heading"
      className="pt-28 px-6"
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
            <span className="font-mono text-sm text-signal">05</span>
            <h2
              id="contact-heading"
              className="font-display font-black text-3xl sm:text-4xl text-ink"
            >
              Contact
            </h2>
            <span className="spec-label ml-auto hidden sm:inline">
              Transmission channels
            </span>
          </motion.div>

          {/* Big statement */}
          <motion.p
            variants={itemVariants}
            className="font-display text-[clamp(1.6rem,4vw,3rem)] leading-tight text-ink/90 max-w-3xl"
          >
            Hiring for 2027 graduate roles or internships in Sydney?{" "}
            <em className="italic text-signal">Let&apos;s talk.</em>
          </motion.p>

          {/* Giant email */}
          <motion.div variants={itemVariants} className="mt-12">
            <a
              href="mailto:seifarafa@hotmail.com"
              className="group block font-display font-black text-[clamp(1.5rem,5.5vw,4.5rem)] leading-none tracking-tight text-ink hover:text-signal transition-colors duration-300 break-all focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
              aria-label="Email seifarafa@hotmail.com"
            >
              seifarafa@hotmail.com
              <span className="inline-block ml-3 text-signal group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300">
                ↗
              </span>
            </a>
          </motion.div>

          {/* Channels + CV */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-end"
          >
            <ul className="flex flex-col" role="list" aria-label="Contact channels">
              {CHANNELS.map((ch) => (
                <li key={ch.label}>
                  <a
                    href={ch.href}
                    target={ch.external ? "_blank" : undefined}
                    rel={ch.external ? "noopener noreferrer" : undefined}
                    className="group flex items-baseline gap-6 border-b border-line py-4 hover:border-signal transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                    aria-label={`${ch.label}: ${ch.value}${ch.external ? " (opens in new tab)" : ""}`}
                  >
                    <span className="spec-label w-20 shrink-0">{ch.label}</span>
                    <span className="font-mono text-sm text-ink/90 group-hover:text-signal transition-colors">
                      {ch.value}
                    </span>
                    <span className="ml-auto font-mono text-xs text-muted group-hover:text-signal group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="md:text-right">
              <a
                href="/Seif-Ali-CV.pdf"
                download
                className="inline-block bg-signal text-carbon font-mono text-xs tracking-[0.16em] uppercase px-8 py-4 hover:bg-ink transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-carbon"
                aria-label="Download CV as PDF"
              >
                Download CV ↧
              </a>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.footer
            variants={itemVariants}
            className="mt-24 border-t border-line py-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between"
          >
            <p className="spec-label">
              Designed &amp; built by Seif Ali — {new Date().getFullYear()}
            </p>
            <p className="spec-label">
              Sydney, AU · 33.87°S — 151.21°E · End of document
            </p>
          </motion.footer>
        </motion.div>
      </div>
    </section>
  );
}
