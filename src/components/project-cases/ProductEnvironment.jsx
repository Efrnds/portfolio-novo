import PropTypes from "prop-types";
import TratoEnvironment from "./environments/TratoEnvironment";
import OpiniotecaEnvironment from "./environments/OpiniotecaEnvironment";
import CalmeraEnvironment from "./environments/CalmeraEnvironment";
import VwrksEnvironment from "./environments/VwrksEnvironment";
import "./environments/environment.css";

const environments = { trato: TratoEnvironment, opinioteca: OpiniotecaEnvironment, "calmera-os": CalmeraEnvironment, vwrks: VwrksEnvironment };

export default function ProductEnvironment({ project }) {
  const Content = environments[project.slug];
  return Content ? <Content /> : null;
}

ProductEnvironment.propTypes = { project: PropTypes.shape({ slug: PropTypes.string.isRequired }).isRequired };
