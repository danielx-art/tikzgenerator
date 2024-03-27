
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { vec } from "import/utils/math/vetores";
import configStore from "import/utils/store/configStore";

const TagsPreview: React.FC = () => {
  const tags = useStore(myStore, (state) => state.tags);
  const configs = useStore(configStore, (state)=>state);


  if (!tags || !configs) return;

  return (
    <>
      { tags &&
        Array.from(tags.values()).map((tag) => {

          const {x, y} = vec().copy(tag.anchor).add(vec().copy(tag.pos));
 
          const textSize = ` ${tag.size * configs.RES_FACTOR_SVG}px `;

          return (
            <g key={"svg_path_" + tag.id} transform={`scale(1, -1)`}>
              <text
                x={x * configs.RES_FACTOR_SVG}
                y={-y * configs.RES_FACTOR_SVG}
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
