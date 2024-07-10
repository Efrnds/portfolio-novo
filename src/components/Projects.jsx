import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Project({ title, years, path, image1, image2, image3 }) {
    return (
        <div className="flex flex-col gap-2 my-12 sm:w-4/5 sm:mx-auto">
            <div className="flex justify-between">
                <span className="flex gap-2">
                    <Link to={path}>{title}</Link>
                    <img src="/images/Vector.svg" alt="" width={12} />
                </span>
                <p>{years}</p>
            </div>
            <Link
                to={path}
                className="flex flex-col justify-center gap-5 sm:grid sm:grid-cols-2 h-[345px] overflow-hidden  sm:h-full"
            >
                <img
                    src={image1}
                    alt=""
                    className="w-4/5 mx-auto h-full rounded-lg sm:h-[709px] sm:w-full"
                />
                <div className="flex-col hidden sm:flex gap-5 sm:h-[709px]">
                    <img
                        src={image2}
                        alt=""
                        className="w-4/5 mx-auto rounded-lg sm:h-[344.5px] sm:w-full"
                    />
                    <img
                        src={image3}
                        alt=""
                        className="w-4/5 mx-auto rounded-lg sm:h-[344.5px] sm:w-full"
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
