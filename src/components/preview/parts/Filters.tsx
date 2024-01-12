const Filters = () => (
  <>
    <defs>
      <filter
        id="glow"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
        //filterUnits="userSpaceOnUse"
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
        id="fatten"
        x="-10%"
        y="-10%"
        width="120%"
        height="120%"
        filterUnits="userSpaceOnUse"
      >
        <feMorphology operator="dilate" radius="0.1" />
      </filter>

      <filter
        id="dropshadow"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
        //filterUnits="userSpaceOnUse"
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
    </defs>
  </>
);

export default Filters;
