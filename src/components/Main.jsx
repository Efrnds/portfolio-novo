import About from "./About";
import Project from "./Projects";

function Main() {
    return (
        <main className="flex flex-col justify-center h-full p-5 sm:p-10">
            <About />
            <p className="mx-auto text-2xl text-red-600 ">Warning! The website is a Work in Progress</p>
            <Project title="Y" path="/Y" years="2023" image1="/images/y-mobile.png" image2="/images/y-desktop.png" image3="/images/y-tablet.png"/>
            <Project title="Apple" path="/Kitchen" years="2021_2023" image1="/images/mobile.png" image2="/images/notebook.png" image3="/images/ipad.png"/>
        </main>
    );
}

export default Main;
