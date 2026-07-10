"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const NAV_LINKS = [
  { index: "01", label: "Profile", href: "#about" },
  { index: "02", label: "Work", href: "#projects" },
  { index: "03", label: "Case File", href: "#gearhead" },
  { index: "04", label: "Stack", href: "#skills" },
  { index: "05", label: "Education", href: "#education" },
  { index: "06", label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll progress hairline across the very top
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-carbon/90 backdrop-blur-sm border-b border-line" : "bg-transparent"
      }`}
    >
      {/* Scroll progress hairline */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px] bg-signal origin-left"
        style={{ scaleX: progress }}
      />

      <nav
        role="navigation"
        aria-label="Main navigation"
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
      >
        {/* Mark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-mono text-sm tracking-[0.2em] uppercase text-ink hover:text-signal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded-sm"
          aria-label="Seif Ali — scroll to top"
        >
          SEIF<span className="text-signal">·</span>ALI
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7" role="list">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`group font-mono text-xs tracking-[0.14em] uppercase transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded-sm ${
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span
                    className={`mr-1.5 transition-colors ${
                      isActive ? "text-signal" : "text-muted/50 group-hover:text-signal"
                    }`}
                  >
                    {link.index}
                  </span>
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="menu"
            className="md:hidden bg-carbon border-t border-line"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="px-6 py-4 flex flex-col" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href} role="none">
                  <button
                    role="menuitem"
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-2 py-3 font-mono text-xs tracking-[0.14em] uppercase text-muted hover:text-ink border-b border-line last:border-b-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                  >
                    <span className="text-signal mr-2">{link.index}</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
