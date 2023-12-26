import myStore from "import/utils/store/store";
import { getAnglePath } from "import/utils/svg/svgPaths";
import useStore from "import/utils/store/useStore";
import { DEFAULT_LINE_WIDTH } from "public/generalConfigs";

const AnglesPreview: React.FC = () => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { angles, toggleSelection } = store;

  return (
    <>
      {Array.from(angles.values()).map((angle, index) => (
        <path
          key={"svg_path_" + angle.id}
          d={getAnglePath(angle)}
          //stroke={angle.selected ? "#ff817a" : angle.color}
          stroke={angle.color}
          strokeWidth={DEFAULT_LINE_WIDTH / 100}
          fill={angle.dotstyle === 0 ? "none" : angle.color}
          fillOpacity={0.5}
          onClick={() => toggleSelection(angle.id)}
          className="cursor-pointer"
          filter={angle.selected ? "url(#purple-glow)" : "none"}
        />
      ))}
    </>
  );
};

export default AnglesPreview;
