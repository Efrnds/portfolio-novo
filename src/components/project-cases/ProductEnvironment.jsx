import PropTypes from "prop-types";
import ProductSlice from "../../product-slices/ProductSlice";

const environments = { trato: ["trato", "https://trato.prismap.com.br"], opinioteca: ["opinioteca", "https://opinioteca.prismapp.com.br"], "calmera-os": ["calmera", "https://calmera.prismapp.com.br/"], vwrks: ["vwrks", "https://vwrks.cc"] };

export default function ProductEnvironment({ project }) {
  const screen = environments[project.slug];
  return screen ? <ProductSlice kind={screen[0]} href={screen[1]} /> : null;
}

ProductEnvironment.propTypes = { project: PropTypes.shape({ slug: PropTypes.string.isRequired }).isRequired };
