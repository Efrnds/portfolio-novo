import About from "../components/About";
import Experience from "../components/Experience";
import WorkSection from "../components/WorkSection";

function Main() {
  return (
    <main id="main-content" className="w-full px-5 sm:px-8 lg:px-12 pt-20 sm:pt-24 pb-8 sm:pb-10">
      <About />
      <Experience />
      <WorkSection />
    </main>
  );
}

export default Main;
