import { useId } from "react";
import PropTypes from "prop-types";

export default function ProductCrop({ item, label, className = "" }) {
  const titleId = useId();
  return <svg className={`product-crop ${className}`} viewBox={item.crop.join(" ")} role="img" aria-labelledby={titleId}>
    <title id={titleId}>{label}</title>
    <image href={item.source} width={item.size[0]} height={item.size[1]} />
  </svg>;
}

ProductCrop.propTypes = { item: PropTypes.object.isRequired, label: PropTypes.string.isRequired, className: PropTypes.string };
