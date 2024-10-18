import { useState, useEffect } from "react";
import axios from "axios";

function Footer() {
    function ToTheTop() {
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

    const [lastUpdated, setLastUpdated] = useState("Loading...");

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
                const response = await axios.get(
                    "https://api.github.com/repos/Efrnds/portfolio-novo/commits"
                );
                const latestCommit = response.data[0];
                const commitDate = new Date(latestCommit.commit.author.date);
                setLastUpdated(
                    commitDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    })
                );
            } catch (error) {
                console.error("Erro ao buscar o último commit:", error);
                setLastUpdated("Erro ao buscar data");
            }
        };

        fetchLastUpdated();
    }, []);

    return (
        <footer className="flex flex-col gap-5 p-5 sm:p-10">
            <div className="flex justify-between text-xl">
                <p className="text-lg sm:text-xl">©2024</p>
                <a
                    href="mailto:contato.efrnds@outlook.com"
                    className="hidden transition hover:text-gray-500 sm:flex"
                >
                    contato.efrnds@outlook.com
                </a>
                <button onClick={ToTheTop}>
                    <svg
                        className="w-[24px] sm:w-[32px] transition fill-black hover:fill-gray-500 sm:flex"
                        viewBox="0 0 31 31"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.625 30.5V7.67188L3.125 18.1719L0.5 15.5L15.5 0.5L30.5 15.5L27.875 18.1719L17.375 7.67188V30.5H13.625Z"
                        />
                    </svg>
                </button>
            </div>
            <div className="flex justify-between text-xl">
                <div className="flex flex-col">
                    <p className="text-sm font-bold">LOCAL TIME</p>
                    <p className="text-sm">{time}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm font-bold">LAST UPDATED</p>
                    <p className="ml-auto text-sm">{lastUpdated}</p>
                </div>
            </div>
            <div className="flex justify-between text-xl">
                <p className="text-sm">cookie settings</p>
                <p className="text-sm">privacy policy</p>
            </div>
        </footer>
    );
}

export default Footer;
