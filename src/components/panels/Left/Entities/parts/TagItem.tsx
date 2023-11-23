import { type Tetiqueta } from "public/entidades";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import Item from "./Item";
import { roundAndDisplayNicely } from "import/utils/misc";
import { getEntityById } from "import/utils/miscEntity";

type PropsType = {
  tag: Tetiqueta;
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
  } = store;

  function handleClick(index: number) {
    const updatedTags = [...tags];
    let thisTag = updatedTags[index] as Tetiqueta;
    thisTag.selected = !thisTag.selected;
    setTags(updatedTags);
  }

  function removeTag(index: number) {}

  function getEntityDisplay(id: string, store: Tstore) {
    const ent = getEntityById(id, store);
    if (!ent || !store) return "?";
    let kind = ent.kind;
    switch (ent.kind) {
      case "point":
        return `Ponto (${roundAndDisplayNicely(
          ent.coords.x,
        )};${roundAndDisplayNicely(ent.coords.y)})`;
      case "segment":
        return `Segmento (${roundAndDisplayNicely(
          ent.p1.coords.x,
        )};${roundAndDisplayNicely(ent.p1.coords.y)})--(${roundAndDisplayNicely(
          ent.p2.coords.x,
        )};${roundAndDisplayNicely(ent.p2.coords.y)})`;
      case "angle":
        let result = "";
        if (
          ent.a.etiqueta.length > 0 &&
          ent.b.etiqueta.length > 0 &&
          ent.c.etiqueta.length > 0
        ) {
          result +=
            ent.a.etiqueta + "-" + ent.b.etiqueta + "-" + ent.c.etiqueta;
        } else {
          result += `(${roundAndDisplayNicely(
            ent.a.coords.x,
          )};${roundAndDisplayNicely(ent.a.coords.y)})-(${roundAndDisplayNicely(
            ent.b.coords.x,
          )};${roundAndDisplayNicely(ent.b.coords.y)})-(${roundAndDisplayNicely(
            ent.c.coords.x,
          )};${roundAndDisplayNicely(ent.c.coords.y)})`;
        }
        return `Ângulo ${result}`;
      default:
        return `${kind}`;
    }
  }

  return (
    <Item
      highlight={tag.selected}
      removeFn={() => removeTag(index)}
      handleClickFn={() => handleClick(index)}
    >
      <div>{tag.value}</div>
      <div>{getEntityDisplay(tag.entityId, store)}</div>
    </Item>
  );
};

export default TagItem;
