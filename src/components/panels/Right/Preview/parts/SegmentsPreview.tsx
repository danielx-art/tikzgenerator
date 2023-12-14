import myStore from "import/utils/store/store";
import { getSegmentPath } from "import/utils/svg/svgPaths";
import useStore from "import/utils/store/useStore";

const SegmentsPreview: React.FC = () => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { segments, toggleSelection } = store;

  return (
    <>
      {Array.from(segments.values()).map((segment, index) => (
        <path
          key={"svg_path_" + segment.id}
          d={getSegmentPath(segment)}
          stroke={segment.selected ? "#ff817a" : "#333333"}
          strokeLinecap="round"
          strokeWidth="0.05"
          fill="none"
          onClick={() => toggleSelection(segment.id)}
          className="cursor-pointer"
        />
      ))}
    </>
  );
};

export default SegmentsPreview;
