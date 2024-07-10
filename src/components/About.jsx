function About() {
    return (
        <div className="flex flex-col my-12 sm:mx-auto sm:w-4/5">
            <div className="flex flex-col">
                <h1 className="text-4xl sm:text-6xl">eduardo fernandes</h1>
                <h2 className="text-xl">
                    UX / UI Designer & Front-end Developer
                </h2>
                <h3 className="text-lg">
                    currently working at Texsa do Brasil LTDA.
                </h3>
            </div>
            <div className="mt-5">
                <p>
                    Based in Umuarama, Eduardo is a developer curious about user
                    interface / experience and how a website is built /
                    developed. He is currently working at Texsa do Brasil LTDA.
                    as a front-end developer and is always looking for new
                    challenges.
                </p>
                <a
                    href="mailto:contato.efrnds@outlook.com"
                    className="transition hover:text-gray-500 hover:cursor-pointer font-UrbanistBold"
                >
                    How about we talk a little more?
                </a>
            </div>
        </div>
    );
}

export default About;
