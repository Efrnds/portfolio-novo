export default function Y() {
    return (
        <div className="flex flex-col flex-1 w-2/3 h-full py-10 mx-auto">
            <div className="m-auto">
                <div className="flex justify-between">
                    <h1 className="text-4xl ">Y</h1>
                    <p className="mt-auto text-2xl">2024</p>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-lg">
                        This project was developed to administer a college
                        course about backend and frontend development.
                    </p>
                    <p>
                        The project uses modern web technologies, including
                        React for the frontend, Node.js for server-side
                        rendering and routing, and TailwindCSS for styling. The
                        backend is powered by Express, handling API requests and
                        data management, while Axios facilitates seamless
                        communication between the client and server.
                    </p>
                    <p>
                        Our team developed a custom API to handle user
                        authentication, follow functionalities, and data
                        management. The primary goal was to create a scalable
                        and maintainable application that could be easily
                        extended and customized. Additionally, we aimed for the
                        project to serve as a reference for real-world
                        applications in a professional environment.
                    </p>
                    <p>
                        If you&apos;d like to keep up with me and the creators of Y,
                        feel free to follow us:
                        <br />
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/dankei"
                                className="text-blue-700 transition font-UrbanistBold hover:text-blue-500 hover:cursor-pointer "
                                target="_blank"
                            >
                                Dankei
                            </a>
                            <a
                                href="https://github.com/Efrnds"
                                className="text-blue-700 transition font-UrbanistBold hover:text-blue-500 hover:cursor-pointer "
                                target="_blank"
                            >
                                Efrnds (me)
                            </a>
                            <a
                                href="https://github.com/pedrordgsr"
                                className="text-blue-700 transition font-UrbanistBold hover:text-blue-500 hover:cursor-pointer "
                                target="_blank"
                            >
                                Pedrordgsr
                            </a>
                            <a
                                href="https://github.com/wendrellBr"
                                className="text-blue-700 transition font-UrbanistBold hover:text-blue-500 hover:cursor-pointer "
                                target="_blank"
                            >
                                WendrellBr
                            </a>
                        </div>
                    </p>
                    <p>
            <h2 className="text-xl">Technologies used:</h2>
            <div className="flex gap-4 font-semibold text-slate-500">
              <p>React</p>
              <p>Node.js</p>
              <p>Express</p>
              <p>MySQL</p>
              <p>TailwindCSS</p>
            </div>
          </p>
                </div>
                <img
                    src="/images/y-desktop.png"
                    alt=""
                    className="w-3/4 mx-auto"
                />
            </div>
        </div>
    );
}
