import About from "../components/About";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import WorkSection from "../components/WorkSection";

function Main() {
  return (
    <main className="w-full px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-10">
      <About />
      <Experience />
      <WorkSection />
      <Skills />
    </main>
  );
}

export default Main;
