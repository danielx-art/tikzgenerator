import { vec } from "import/utils/math/linear-algebra/vetores";
import { ANGLE_MARKS_TYPE } from "public/generalConfigs";
import configStore from "../configStore";
import {
  TangId,
  Tangle,
  TangleCalculatedProperties,
  TangleStyles,
  Tfill,
  TInteractions,
  Tpoint,
  TpointId,
  Tstroke,
} from "./types";
import { M_PLUS_1 } from "next/font/google";
import { Action, State } from "../store";

export const createAngle = function (
  angle_args: { p1: Tpoint; p2: Tpoint; p3: Tpoint; id: TangId } & Partial<
    TangleStyles & TInteractions
  >,
): Tangle {
  const {
    p1,
    p2,
    p3,
    id,
    isBigAngle,
    size,
    stroke,
    fill,
    marks,
    visible,
    selected,
    locked,
  } = angle_args;

  const ba = vec().copy(p1.coords).sub(p2.coords);
  const bc = vec().copy(p3.coords).sub(p2.coords);
  const val = Math.min(
    Math.abs(ba.angleBetween(bc)),
    Math.abs(bc.angleBetween(ba)),
  );

  return {
    id,
    a: p1.id,
    b: p2.id,
    c: p3.id,
    p1,
    p2,
    p3,
    val,
    updateMethod: {
      method: "stdAngleUpdateMethod",
      anchors: [p1.id, p2.id, p3.id],
      args: [],
    },
    isBigAngle: isBigAngle || false,
    size: size || configStore.getState().DEFAULT_ANGLE_SIZE,
    stroke:
      stroke ||
      ({
        width: configStore.getState().DEFAULT_STROKE_WIDTH,
        style: configStore.getState().DEFAULT_STROKE_STYLE,
        color: configStore.getState().DEFAULT_COLOR,
        opacity: 1,
      } as Tstroke),
    fill:
      fill ||
      ({
        style: configStore.getState().DEFAULT_FILL_STYLE,
        color: configStore.getState().DEFAULT_COLOR,
        opacity: 0,
      } as Tfill),
    marks:
      marks || (configStore.getState().DEFAULT_ANGLE_MARKS as ANGLE_MARKS_TYPE),
    visible: visible || true,
    selected: selected || false,
    locked: locked || false,
  };
};

export const stdAngleUpdateMethod = (
  store: State & Action,
  thisAngle: Tangle,
): Tangle => {
  const P1 = store.points.get(thisAngle.a);
  const P2 = store.points.get(thisAngle.b);
  const P3 = store.points.get(thisAngle.c);

  const ba = vec().copy(P1.coords).sub(P2.coords);
  const bc = vec().copy(P3.coords).sub(P2.coords);
  const VAL = Math.min(
    Math.abs(ba.angleBetween(bc)),
    Math.abs(bc.angleBetween(ba)),
  );

  const updatedProperties = {
    p1: P1,
    p2: P2,
    p3: P3,
    val: VAL,
  } as TangleCalculatedProperties;

  return { ...updatedProperties, ...thisAngle };
};
