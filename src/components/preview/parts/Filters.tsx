const Filters = () => (
  <>
    <defs>
      <filter
        id="glow"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
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
          radius="0.1"
        ></feMorphology>
        <feGaussianBlur
          in="dilated"
          result="blurred"
          stdDeviation="0.1"
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
    </defs>
  </>
);

export default Filters