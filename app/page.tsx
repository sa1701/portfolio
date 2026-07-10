import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import CaseStudy from "@/components/CaseStudy";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <CaseStudy />
      <Skills />
      <Education />
      <Contact />
    </main>
  );
}
