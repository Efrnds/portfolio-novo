import { useState, useEffect } from "react";

function Footer() {
  function toTheTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  const [lastUpdated, setLastUpdated] = useState("—");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchLastUpdated = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/Efrnds/portfolio-novo/commits?per_page=1"
        );
        if (!response.ok) throw new Error("GitHub API error");
        const data = await response.json();
        const commitDate = new Date(data[0].commit.author.date);
        setLastUpdated(
          commitDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        );
      } catch {
        setLastUpdated("—");
      }
    };

    fetchLastUpdated();
  }, []);

  return (
    <footer className="flex flex-col gap-6 px-5 sm:px-8 lg:px-12 py-8 sm:py-10">
      <div className="flex items-center justify-between text-base sm:text-xl">
        <p className="text-sm sm:text-base">© {new Date().getFullYear()} EF</p>
        <a
          href="mailto:contato.efrnds@outlook.com"
          className="hidden sm:inline transition-colors hover:text-neutral-500"
        >
          contato.efrnds@outlook.com
        </a>
        <button
          type="button"
          onClick={toTheTop}
          className="p-1 hover:opacity-60 transition-opacity"
          aria-label="Back to top"
        >
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 fill-black"
            viewBox="0 0 31 31"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M13.625 30.5V7.67188L3.125 18.1719L0.5 15.5L15.5 0.5L30.5 15.5L27.875 18.1719L17.375 7.67188V30.5H13.625Z" />
          </svg>
        </button>
      </div>

      <div className="flex justify-between gap-4">
        <div>
          <p className="text-xs font-UrbanistBold uppercase tracking-wider">
            Local time
          </p>
          <p className="text-sm tabular-nums">{time} (BRT)</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-UrbanistBold uppercase tracking-wider">
            Last updated
          </p>
          <p className="text-sm">{lastUpdated}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 sm:gap-8 text-sm text-neutral-600">
        <a
          href="https://github.com/Efrnds"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/edudfrs"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="mailto:contato.efrnds@outlook.com"
          className="sm:hidden hover:text-black transition-colors"
        >
          Email
        </a>
      </div>
    </footer>
  );
}

export default Footer;
