import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Project({ title, years, path, image1, image2, image3 }) {
    const onHover = "transform scale-105 transition duration-500 ease-in-out";
    return (
        <div className="flex flex-col gap-2 my-12 group hover:text-gray-500 hover:scale-[1.01] transition sm:w-2/3 sm:mx-auto">
            <div className="flex justify-between">
                <Link className="flex gap-2 transition" to={path}>
                    {title}
                    <svg
                        className="w-3 h-3 my-auto transition fill-black group-hover:fill-gray-500"
                        viewBox="0 0 27 27"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M3.06659 26.75L0.208252 23.8917L19.8083 4.29168H2.24992V0.208344H26.7499V24.7083H22.6666V7.15001L3.06659 26.75Z" />
                    </svg>
                </Link>
                <p>{years}</p>
            </div>
            <Link
                to={path}
                className="flex flex-col justify-center gap-5 overflow-hidden sm:grid sm:grid-cols-2"
            >
                <img
                    src={image1}
                    alt=""
                    className="flex-1 object-cover h-full mx-auto transition rounded-lg w-fit group-hover:drop-shadow-xl"
                />
                <div className="flex-col hidden gap-5 sm:flex">
                    <img
                        src={image2}
                        alt=""
                        className="object-cover mx-auto transition rounded-lg h-fit w-fit group-hover:drop-shadow-xl"
                    />
                    <img
                        src={image3}
                        alt=""
                        className="object-cover mx-auto transition rounded-lg w-fit h-fit group-hover:drop-shadow-xl"
                    />
                </div>
            </Link>
        </div>
    );
}

Project.propTypes = {
    title: PropTypes.string.isRequired,
    years: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    image1: PropTypes.string.isRequired,
    image2: PropTypes.string.isRequired,
    image3: PropTypes.string.isRequired,
};

export default Project;
