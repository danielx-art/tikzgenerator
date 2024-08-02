import { vec, type vector } from "import/utils/math/linear-algebra/vetores";
import type { TentId, TtagId } from "./types";
import configStore from "../configStore";

export const tag = function (
    value: string = "",
    entityId: TentId,
    id: TtagId,
    pos: vector = vec(0, 0.35),
    anchor: vector,
  ) {
    return {
      id,
      entityId,
      value,
      size: configStore.getState().DEFAULT_TAG_SIZE,
      color: configStore.getState().DEFAULT_TAG_COLOR,
      pos,
      anchor,
      selected: false,
    };
  };
  
  export type Ttag = ReturnType<typeof tag>;