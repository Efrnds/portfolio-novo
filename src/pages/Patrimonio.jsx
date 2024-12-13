export default function Patrimonio() {
  return (
    <div className="flex flex-col flex-1 w-2/3 h-full py-10 mx-auto">
      <div className="m-auto">
        <div className="flex justify-between">
          <h1 className="text-4xl ">Property System</h1>
          <p className="mt-auto text-2xl">2023_2024</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-lg">
            Project developed to help with a necessity at my past job.
          </p>
          <p>
            Initially, the project was developed to address a need that arose at
            the company where I worked. We needed to maintain an inventory of
            the company&apos;s assets, but employees were using Excel
            spreadsheets, which became cumbersome to manage with a large amount
            of data.
          </p>
          <p>
            We concluded that developing a web-based system would be more
            practical and secure for managing this data. The system was built
            using the most modern technologies available, including React for
            the frontend, Node.js for the backend, and TailwindCSS for styling.
            The backend is powered by Express, which handles API requests and
            data management, while Axios facilitates communication between the
            client and the server. The database used was MySQL. Additionally, we
            created a component library alongside the project to streamline the
            development of future systems for the company.
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
        <img src="/images/pat-notebook.png" alt="" className="w-3/4 mx-auto" />
      </div>
    </div>
  );
}
