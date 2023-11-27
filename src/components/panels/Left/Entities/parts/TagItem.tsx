import { type Ttag } from "public/entidades";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import Item from "./Item";
import { roundAndDisplayNicely } from "import/utils/misc";
import { findTagByEntityId } from "import/utils/miscEntity";

type PropsType = {
  tag: Ttag;
  index: number;
};

const TagItem: React.FC<PropsType> = ({ tag, index }) => {
  const store = useStore(myStore, (state) => state);

  type Tstore = typeof store;

  if (!store) return;

  const {
    points,
    setPoints,
    segments,
    setSegments,
    angles,
    setAngles,
    tags,
    setTags,
    toggleSelection,
    deleteTag,
  } = store;

  function getEntityDisplay(id: string) {
    if (!store) return "?";
    const entityKind = id.split("_")[0] as "point"|"segment"|"angle";
    switch (entityKind) {
      case "point": {
        const ent = points.get(id);
        if(!ent) return;
        return `Ponto (${roundAndDisplayNicely(
          ent.coords.x,
        )};${roundAndDisplayNicely(ent.coords.y)})`;
      }
      case "segment": {
        const ent = segments.get(id);
        if(!ent) return;
        return `Segmento (${roundAndDisplayNicely(
          ent.p1.coords.x,
        )};${roundAndDisplayNicely(ent.p1.coords.y)})--(${roundAndDisplayNicely(
          ent.p2.coords.x,
        )};${roundAndDisplayNicely(ent.p2.coords.y)})`;
      }
      case "angle": {
        const ent = angles.get(id);
        if(!ent) return;
        let result = "";

        const aDisplay = findTagByEntityId(ent.a.id, tags)?.value || `(${roundAndDisplayNicely(
          ent.a.coords.x,
        )};${roundAndDisplayNicely(ent.a.coords.y)})-`

        const bDisplay = findTagByEntityId(ent.b.id, tags)?.value || `(${roundAndDisplayNicely(
          ent.b.coords.x,
        )};${roundAndDisplayNicely(ent.b.coords.y)})-`

        const cDisplay = findTagByEntityId(ent.c.id, tags)?.value || `(${roundAndDisplayNicely(
          ent.c.coords.x,
        )};${roundAndDisplayNicely(ent.c.coords.y)})`

        result += aDisplay + bDisplay + cDisplay;

        return `Ângulo ${result}`;
      }
      default:
        return `${entityKind}`;
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
