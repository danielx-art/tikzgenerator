import {
  Tangulo,
  TentityWithKind,
  Tetiqueta,
  Tponto,
  Tsegmento,
} from "public/entidades";
import { type Action, type State } from "import/utils/store";

export function getEntityById(
  id: string,
  store: (State & Action) | undefined,
): TentityWithKind | undefined {
  if (!store) return;

  const entityKind = id.split("_")[0];

  switch (entityKind) {
    case "point":
      const thisPoint = store.points.filter((point) => point.id == id)[0];
      if (!thisPoint) {
        return;
      }
      return { ...thisPoint, kind: "point" } as Tponto & { kind: "point" };
    case "segment":
      const thisSeg = store.segments.filter((seg) => seg.id == id)[0];
      if (!thisSeg) {
        return;
      }
      return { ...thisSeg, kind: "segment" } as Tsegmento & {
        kind: "segment";
      };
    case "angle":
      const thisAng = store.angles.filter((angle) => angle.id == id)[0];
      if (!thisAng) {
        return;
      }
      return { ...thisAng, kind: "angle" } as Tangulo & { kind: "angle" };
    default:
      return;
  }
}

export function updateTag(
  store: State & Action,
  thisTag: Tetiqueta,
  updatedTag: Tetiqueta,
): void {
  const updatedTags = [...store.tags].map((tag) =>
    tag.id == thisTag.id ? updatedTag : tag,
  );

  store.setTags(updatedTags);

  const thisEntity = getEntityById(thisTag.entityId, store);

  if (!thisEntity) return;

  switch (thisEntity.kind) {
    case "point": {
      const updatedPoints = [...store.points].map((point) =>
        point.id == thisEntity.id
          ? { ...point, etiqueta: updatedTag.value }
          : point,
      );
      store.setPoints(updatedPoints);
      break;
    }
    case "segment": {
      const updatedSegs = [...store.segments].map((seg) =>
        seg.id == thisEntity.id ? { ...seg, etiqueta: updatedTag.value } : seg,
      );
      store.setSegments(updatedSegs);
      break;
    }
    case "angle": {
      const updatedAngles = [...store.angles].map((angle) =>
        angle.id == thisEntity.id
          ? { ...angle, etiqueta: updatedTag.value }
          : angle,
      );
      store.setAngles(updatedAngles);
      break;
    }
  }

  return;
}
