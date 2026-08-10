/* Grain as real SVG in the DOM — CSS feTurbulence backgrounds are unreliable */
export default function GrainOverlay() {
  return (
    <div className="site-grain" aria-hidden="true">
      <svg className="site-grain__svg" xmlns="http://www.w3.org/2000/svg">
        <filter id="site-grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.55 0"
            in="noise"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#site-grain-filter)" />
      </svg>
    </div>
  );
}
