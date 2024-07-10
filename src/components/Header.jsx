import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="flex justify-between m-5 sm:m-10">
            <Link to="/" className="text-xl">
                EF
            </Link>
            <p className="hidden text-xl sm:block">
                front-end developer & ux / ui designer
            </p>
            <div className="bg-black rounded-full h-[28px] w-[28px] content-none"></div>
        </header>
    );
}

export default Header;
