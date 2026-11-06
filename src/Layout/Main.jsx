import About from "../components/About";
import Experience from "../components/Experience";
import WorkSection from "../components/WorkSection";
import Profile from "../components/Profile";

function Main() {
  return (
    <main id="main-content" className="home-main">
      <About />
      <WorkSection />
      <Experience />
      <Profile />
    </main>
  );
}

export default Main;
