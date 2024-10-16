import About from "./About";
import Project from "./Projects";

function Main() {
    return (
        <main className="flex flex-col justify-center p-5 sm:p-10">
            <About />
            <p className="mx-auto text-2xl text-red-600 ">Warning! The website is a Work in Progress</p>
            <Project title="Sakura Verse" path="/Y" years="2023" image1="/images/mobile.png" image2="/images/notebook.webp" image3="/images/notebook.webp"/>
            <Project title="Apple" path="/Kitchen" years="2021_2023" image1="/images/mobile.png" image2="/images/notebook.webp" image3="/images/notebook.webp"/>
        </main>
    );
}

export default Main;
