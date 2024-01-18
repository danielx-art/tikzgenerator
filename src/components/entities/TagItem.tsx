import type {
  TangId,
  TentId,
  Tkind,
  TpointId,
  TsegId,
  Ttag,
} from "public/entidades";
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import Item from "./Item";
import { roundAndDisplayNicely } from "import/utils/math/misc";
import {
  findTagByEntityId,
  getKindById,
} from "import/utils/storeHelpers/miscEntity";

type PropsType = {
  tag: Ttag;
  index?: number;
};

const TagItem: React.FC<PropsType> = ({ tag }) => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { points, segments, angles, tags, toggleSelection, deleteTag } = store;

  function getEntityDisplay(id: TentId) {
    if (!store) return "?";

    const entKind = getKindById(id) as Tkind;

    switch (entKind) {
      case "point": {
        const ent = points.get(id as TpointId);
        if (!ent) return;
        return `Ponto (${roundAndDisplayNicely(
          ent.coords.x,
        )};${roundAndDisplayNicely(ent.coords.y)})`;
      }
      case "segment": {
        const ent = segments.get(id as TsegId);
        if (!ent) return;
        return `Segmento (${roundAndDisplayNicely(
          ent.p1.coords.x,
        )};${roundAndDisplayNicely(ent.p1.coords.y)})--(${roundAndDisplayNicely(
          ent.p2.coords.x,
        )};${roundAndDisplayNicely(ent.p2.coords.y)})`;
      }
      case "angle": {
        const ent = angles.get(id as TangId);
        if (!ent) return;
        let result = "";

        const aDisplay =
          findTagByEntityId(ent.a.id, tags)?.value ||
          `(${roundAndDisplayNicely(ent.a.coords.x)};${roundAndDisplayNicely(
            ent.a.coords.y,
          )})-`;

        const bDisplay =
          findTagByEntityId(ent.b.id, tags)?.value ||
          `(${roundAndDisplayNicely(ent.b.coords.x)};${roundAndDisplayNicely(
            ent.b.coords.y,
          )})-`;

        const cDisplay =
          findTagByEntityId(ent.c.id, tags)?.value ||
          `(${roundAndDisplayNicely(ent.c.coords.x)};${roundAndDisplayNicely(
            ent.c.coords.y,
          )})`;

        result += aDisplay + bDisplay + cDisplay;

        return `Ângulo ${result}`;
      }
      default:
        return `${entKind}`;
    }
  }

  return (
    <Item
      highlight={tag.selected}
      removeFn={() => deleteTag(tag.id)}
      handleClickFn={() => toggleSelection(tag.id)}
    >
      <div>{tag.value}</div>
      <div>{getEntityDisplay(tag.entityId)}</div>
    </Item>
  );
};

export default TagItem;
