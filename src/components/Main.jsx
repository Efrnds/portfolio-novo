import About from "./About";
import Project from "./Projects";

function Main() {
    return (
        <main className="p-5 sm:p-10">
            <About />
            <Project title="Sakura Verse" path="/SakuraVerse" years="2023" image1="/images/Desktop - 1.png" image2="/images/Desktop - 1.png" image3="/images/Desktop - 1.png"/>
            <Project title="Apple" path="/SakuraVerse" years="2021_2023" image1="/images/hannaxu.com_apple_.png" image2="/images/hannaxu.com_apple_.png" image3="/images/hannaxu.com_apple_.png"/>
        </main>
    );
}

export default Main;
