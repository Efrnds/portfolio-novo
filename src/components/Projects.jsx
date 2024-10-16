import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Project({ title, years, path, image1, image2, image3 }) {
    return (
        <div className="flex flex-col gap-2 my-12 sm:w-4/5 sm:mx-auto">
            <div className="flex justify-between">
                <Link
                    className="flex gap-2 transition hover:text-gray-500"
                    to={path}
                >
                    {title}
                    <svg
                        className="w-3 h-3 my-auto transition fill-black hover:fill-yellow-500"
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
                className="flex flex-col justify-center gap-5 sm:grid sm:grid-cols-2 h-[345px] overflow-hidden  sm:h-full"
            >
                <img
                    src={image1}
                    alt=""
                    className=" mx-auto h-full rounded-lg sm:h-[709px] w-full aspect-[9/16]"
                />
                <div className="flex-col hidden sm:flex gap-5 sm:h-[709px]">
                    <img
                        src={image2}
                        alt=""
                        className="w-4/5 mx-auto rounded-lg sm:h-[344.5px] sm:w-full aspect-video"
                    />
                    <img
                        src={image3}
                        alt=""
                        className="w-4/5 mx-auto rounded-lg sm:h-[344.5px] sm:w-full aspect-video"
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
