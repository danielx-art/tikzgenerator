import type {
  MakeRequired,
  Tpoint,
} from "./types";
import configStore from "../configStore";

export const createPoint = function (
  point_args: MakeRequired<Tpoint, "id" | "coords">,
): Tpoint {
  const { id, coords, updateMethod, style, size, color, visible, selected, locked } =
    point_args;

  return {
    id,
    coords,
    updateMethod,
    style: style || configStore.getState().DEFAULT_POINT_STYLE,
    size: size || configStore.getState().DEFAULT_POINT_SIZE,
    color: color || configStore.getState().DEFAULT_COLOR,
    visible: visible || true,
    selected: selected || false,
    locked: locked || false,
  };
};
