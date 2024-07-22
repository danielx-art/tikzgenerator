import configStore from "../configStore";
import { Action, State } from "../store";
import {
  Tfill,
  TInteractions,
  Tpoint,
  Tpolygon,
  TpolygonStyles,
  TpolyId,
} from "./types";

export const createPolygon = function (
  polygon_args: { verticePoints: Array<Tpoint>; id: TpolyId } & Partial<
    TpolygonStyles & TInteractions
  >,
): Tpolygon {
  const { verticePoints, id, fill, visible, selected, locked } = polygon_args;

  const vertices = verticePoints.map((each) => each.id);

  return {
    id,
    vertices,
    updateMethod: {
      method: "stdPolygonUpdateMethod",
      anchors: vertices,
      args: [],
    },
    fill: {
      style: configStore.getState().DEFAULT_FILL_STYLE,
      color: configStore.getState().DEFAULT_FILL_COLOR,
      opacity: 1,
    } as Tfill,
    visible: visible || true,
    selected: selected || false,
    locked: locked || false,
  };
};

//for now polygons dont have any calculated property, they are here just so we canm add a fill to a region.
export const stdPolygonUpdateMethod = (
  store: State & Action,
  thisPolygon: Tpolygon,
): Tpolygon => {
  return thisPolygon;
};
