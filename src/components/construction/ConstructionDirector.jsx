import { useMemo } from "react";
import PropTypes from "prop-types";
import { useScroll } from "motion/react";
import { ConstructionContext } from "./ConstructionContext";
import { useViewport } from "../../hooks/useViewport";

export default function ConstructionDirector({ children }) {
  const { scrollY } = useScroll();
  const compact = useViewport();
  const context = useMemo(() => ({ scrollY, compact }), [scrollY, compact]);

  return (
    <ConstructionContext.Provider value={context}>
      {children}
    </ConstructionContext.Provider>
  );
}

ConstructionDirector.propTypes = { children: PropTypes.node.isRequired };
