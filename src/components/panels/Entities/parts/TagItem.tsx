import {
  Tangulo,
  Tentity,
  TentityWithKind,
  Tetiqueta,
  Tponto,
  Tsegmento,
} from "public/entidades";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import Item from "./Item";
import { roundAndDisplayNicely } from "import/utils/misc";

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
    selectedPoints,
    setSelectedPoints,
  } = store;

  function handleClick(index: number) {
    const updatedTags = [...tags];
    let thisTag = updatedTags[index] as Tetiqueta;
    thisTag.selected = !thisTag.selected;
    setTags(updatedTags);
  }

  function removeTag(index: number) {}

  function getEntityById(
    id: string,
    store: Tstore,
  ): TentityWithKind | undefined {
    if (!store) return;

    const entityKind = id.split("_")[0];

    switch (entityKind) {
      case "point":
        const thisPoint = points.filter((point) => point.id == id)[0];
        if (!thisPoint) {
          return;
        }
        return { ...thisPoint, kind: "point" } as Tponto & { kind: "point" };
      case "segment":
        const thisSeg = segments.filter((seg) => seg.id == id)[0];
        if (!thisSeg) {
          return;
        }
        return { ...thisSeg, kind: "segment" } as Tsegmento & {
          kind: "segment";
        };
      case "angle":
        const thisAng = angles.filter((angle) => angle.id == id)[0];
        if (!thisAng) {
          return;
        }
        return { ...thisAng, kind: "angle" } as Tangulo & { kind: "angle" };
      default:
        return;
    }
  }

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
