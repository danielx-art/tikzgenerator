const Filters = () => (
  <>
    <defs>
      <filter
        id="glow"
        x="-1000%"
        y="-1000%"
        width="2100%"
        height="2100%"
        filterUnits="userSpaceOnUse"
      >
        <feFlood result="flood" floodColor="#ff817a" floodOpacity="1"></feFlood>
        <feComposite
          in="flood"
          result="mask"
          in2="SourceGraphic"
          operator="in"
        ></feComposite>
        <feMorphology
          in="mask"
          result="dilated"
          operator="dilate"
          radius="0.3"
        ></feMorphology>
        <feGaussianBlur
          in="dilated"
          result="blurred"
          stdDeviation="0.2"
        ></feGaussianBlur>
        <feComposite
          in="blurred"
          in2="SourceGraphic"
          operator="arithmetic"
          k2="1"
          k3="-1"
          result="nocombine"
        ></feComposite>
        <feMerge>
          <feMergeNode in="nocombine"></feMergeNode>
          <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
      </filter>

      <filter
        id="dropshadow"
        x="-1000%"
        y="-1000%"
        width="2100%"
        height="2100%"
        filterUnits="userSpaceOnUse"
      >
        <feOffset result="offOut" in="SourceGraphic" dx=".3" dy="-.3" />
        <feColorMatrix
          result="matrixOut"
          in="offOut"
          type="matrix"
          values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0"
        />
        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="0.25" />
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
      </filter>
      <defs>
        <pattern
          id="hatch-0"
          patternUnits="userSpaceOnUse"
          width="0.4"
          height="0.4"
          patternTransform="rotate(0)"
          stroke="white"
          strokeWidth="0.2"
        >
          <line x1="0" y1="0" x2="0.4" y2="0" />
        </pattern>
        <mask id="mask-hatch-0" x="0" y="0" width="1" height="1">
          <rect
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            fill="url(#hatch-0)"
          />
        </mask>
        <pattern
          id="hatch-1"
          patternUnits="userSpaceOnUse"
          width="0.4"
          height="0.4"
          patternTransform="rotate(45)"
          stroke="white"
          strokeWidth="0.2"
        >
          <line x1="0" y1="0" x2="0.4" y2="0" />
        </pattern>
        <mask id="mask-hatch-1" x="0" y="0" width="1" height="1">
          <rect
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            fill="url(#hatch-1)"
          />
        </mask>
        <pattern
          id="hatch-2"
          patternUnits="userSpaceOnUse"
          width="0.4"
          height="0.4"
          patternTransform="rotate(90)"
          stroke="white"
          strokeWidth="0.2"
        >
          <line x1="0" y1="0" x2="0.4" y2="0" />
        </pattern>
        <mask id="mask-hatch-2" x="0" y="0" width="1" height="1">
          <rect
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            fill="url(#hatch-2)"
          />
        </mask>
        <pattern
          id="hatch-3"
          patternUnits="userSpaceOnUse"
          width="0.4"
          height="0.4"
          patternTransform="rotate(135)"
          stroke="white"
          strokeWidth="0.2"
        >
          <line x1="0" y1="0" x2="0.4" y2="0" />
        </pattern>
        <mask id="mask-hatch-3" x="0" y="0" width="1" height="1">
          <rect
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            fill="url(#hatch-3)"
          />
        </mask>
        <pattern
          id="dotted"
          patternUnits="userSpaceOnUse"
          width="0.4"
          height="0.4"
          fill="white"
        >
          <circle cx="0.1" cy="0.1" r="0.1" />
          <circle cx="0.3" cy="0.3" r="0.1" />
        </pattern>
        <mask id="mask-dotted" x="0" y="0" width="1" height="1">
          <rect
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            fill="url(#dotted)"
          />
        </mask>
      </defs>
    </defs>
  </>
);

export default Filters;
