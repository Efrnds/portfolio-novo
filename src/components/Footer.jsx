import { useState, useEffect } from "react";

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

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <footer className="flex flex-col gap-5 p-5 sm:p-10">
            <row className="flex justify-between text-xl">
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
            </row>
            <row className="flex justify-between text-xl">
                <div className="flex flex-col">
                    <p className="text-sm font-UrbanistBold">LOCAL TIME</p>
                    <p className="text-sm">{time}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm font-UrbanistBold">LAST UPDATED</p>
                    <p className="ml-auto text-sm">2024-07-10</p>
                </div>
            </row>
            <row className="flex justify-between text-xl">
                <p className="text-sm">cookie settings</p>
                <p className="text-sm">privacy policy</p>
            </row>
        </footer>
    );
}

export default Footer;
