import ImageModal from "../components/ImageModal";

export default function Patrimonio() {
    return (
      <div className="flex flex-col flex-1 w-2/3 h-full py-10 mx-auto">
      <div className="m-auto">
      <div className="flex justify-between">
      <h1 className="text-4xl ">Vwrks</h1>
      <p className="mt-auto text-2xl">2024_2025</p>
      </div>
      <div className="flex flex-col gap-4">
      <p className="text-lg">
        Portfolio developed for a client of my agency, <a href="https://www.align-websites.tech/" className="text-blue-700 transition font-UrbanistBold hover:text-blue-500 hover:cursor-pointer " target="_blank">Align</a>.
      </p>
      <p>
        As one of the first client&rsquo;s of my agency, they approached us seeking a unique and sophisticated portfolio that would stand out in their industry.
      </p>
      <p>
        We chose Next.js as our framework, leveraging its powerful image optimization capabilities to deliver a highly performant website that handles the client&rsquo;s extensive image gallery efficiently.
      </p>
      <p>
        <h2 className="text-xl">Technologies used:</h2>
        <div className="flex gap-4 font-semibold text-slate-500">
        <p>Next.js</p>
        <p>React</p>
        <p>Node.js</p>
        <p>TailwindCSS</p>
        </div>
      </p>
      </div>
      <ImageModal
      src="/images/vwrks-desktop-full.png"
      thumbnail="/images/vwrks-desktop.png"
      alt="Vwrks Desktop Version"
      />
      </div>
      </div>
    );
}
