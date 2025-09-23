import About from "../components/About";
import Project from "../components/Projects";

function Main() {
  return (
    <main className="flex flex-col justify-center h-full p-5 sm:p-10 pt-20 sm:pt-24">
      <About />
      <p className="mx-auto text-2xl text-red-600 ">
        Warning! The website is a Work in Progress
      </p>
      <Project
        title="Y"
        path="/Y"
        years="2024"
        image1="/images/y-mobile.png"
        image2="/images/y-desktop.png"
        image3="/images/y-tablet.png"
      />
      <Project
        title="Property System"
        path="/sistema-patrimonio"
        years="2023_2024"
        image1="/images/pat-mobile.png"
        image2="/images/pat-notebook.png"
        image3="/images/pat-ipad.png"
      />
      <Project
        title="Vwrks"
        path="/vwrks"
        years="2024_2025"
        image1="/images/vwrks-mobile.png"
        image2="/images/vwrks-desktop.png"
        image3="/images/vwrks-tablet.png"
      />
    </main>
  );
}

export default Main;
