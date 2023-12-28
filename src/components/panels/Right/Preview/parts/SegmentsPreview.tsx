import myStore from "import/utils/store/store";
import { getSegmentPath } from "import/utils/svg/svgPaths";
import useStore from "import/utils/store/useStore";
import { vec } from "import/utils/math/vetores";

const SegmentsPreview: React.FC = () => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { segments, toggleSelection } = store;

  const getStrokeDasharray = (style: string) => {
    switch (style) {
      case "solid":
        return "";
      case "dashed":
        return "0.5, 1";
      case "dotted":
        return "0.01, 1";
      default:
        return "";
    }
  };

  return (
    <>
      {Array.from(segments.values()).map((segment, index) => (
          <path
            key={"svg_path_" + segment.id}
            d={getSegmentPath(segment)}
            stroke={segment.color}
            strokeLinecap="round"
            strokeWidth={segment.width}
            fill="none"
            onClick={() => toggleSelection(segment.id)}
            className="cursor-pointer"
            strokeDasharray={getStrokeDasharray(segment.style)}
            filter={segment.selected ? "url(#glow)" : "none"}
          />
      ))}
    </>
  );
};

export default SegmentsPreview;
