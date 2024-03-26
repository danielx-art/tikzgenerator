
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { RES_FACTOR } from "public/generalConfigs";
import { vec } from "import/utils/math/vetores";

const TagsPreview: React.FC = () => {
  const tags = useStore(myStore, (state) => state.tags);

  if (!tags) return;

  return (
    <>
      { tags &&
        Array.from(tags.values()).map((tag) => {

          const {x, y} = vec().copy(tag.anchor).add(vec().copy(tag.pos));
 
          const textSize = ` ${tag.size * RES_FACTOR}px `;

          return (
            <g key={"svg_path_" + tag.id} transform={`scale(1, -1)`}>
              <text
                x={x * RES_FACTOR}
                y={y * RES_FACTOR}
                className={`cursor-pointer select-none`}
                fill={tag.color}
                fontSize={textSize}
                dominantBaseline="middle"
                textAnchor="middle"
              >
                {tag.value}
              </text>
            </g>
          );
        })}
    </>
  );
};

export default TagsPreview;
