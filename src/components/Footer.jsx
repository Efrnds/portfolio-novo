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
                <p className="hidden sm:flex">contato.efrnds@outlook.com</p>
                <button onClick={ToTheTop}>
                    <img
                        className="w-[24px] sm:w-[32px]"
                        src="/images/arrow_up.svg"
                        alt=""
                    />
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
