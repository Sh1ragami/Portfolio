import useSectionSnapScroll from "./hooks/useSectionSnapScroll";
import useActiveSection from "./hooks/useActiveSection";
import ParticleMorphCanvas from "./components/ParticleMorphCanvas";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Awards from "./components/Awards";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Footer from "./components/Footer";

function App() {
  useSectionSnapScroll();
  useActiveSection();


  return (
    <div className="relative bg-black text-white overflow-hidden">
      <ParticleMorphCanvas />

      <main className="scroll-pt-16">
        <section data-section="hero" className="min-h-screen scroll-mt-16">
          <Hero />
        </section>
        <section data-section="about" className="min-h-screen scroll-mt-16">
          <About />
        </section>
        <section data-section="skills" className="min-h-screen scroll-mt-16">
          <Skills />
        </section>
        <section data-section="projects" className="min-h-screen scroll-mt-16">
          <Projects />
        </section>
        <section data-section="awards" className="min-h-screen scroll-mt-16">
          <Awards />
        </section>
        <section data-section="Footer" className="min-h-screen scroll-mt-16">
          <Footer />
        </section>
      </main>
      {/* スクロールトップボタン */}
      <ScrollToTopButton />
    </div>
  );
}
export default App;
