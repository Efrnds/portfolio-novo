import About from "./About";
import Project from "./Projects";

function Main() {
    return (
        <main className="flex flex-col justify-center p-5 sm:p-10">
            <About />
            <p className="mx-auto text-2xl text-red-600 ">Warning! The website is a Work in Progress</p>
            <Project title="Sakura Verse" path="/Y" years="2023" image1="/images/Desktop - 1.png" image2="/images/Desktop - 1.png" image3="/images/Desktop - 1.png"/>
            <Project title="Apple" path="/Kitchen" years="2021_2023" image1="/images/hannaxu.com_apple_.png" image2="/images/hannaxu.com_apple_.png" image3="/images/hannaxu.com_apple_.png"/>
        </main>
    );
}

export default Main;
