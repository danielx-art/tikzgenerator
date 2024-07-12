import {
  ANGLE_MARKS_TYPE,
  SEGMENT_MARKS_TYPE,
  STROKE_STYLES,
  FILL_STYLES,
  LATEX_COLOR,
} from "./generalConfigs";
import { vec, vector } from "../src/utils/math/linear-algebra/vetores";
import configStore from "import/utils/store/configStore";
import { Action, State } from "import/utils/store/store";

export type Tkind = "point" | "segment" | "angle" | "circle" | "polygon";
export type TallKind = Tkind | "tag";
export type TkindPlural =
  | "points"
  | "segments"
  | "angles"
  | "circles"
  | "polygons";
export type TallKindPlural = TkindPlural | "tags";
export type TpointId = `point_${number}`;
export type TsegId = `segment_${number}`;
export type TangId = `angle_${number}`;
export type TcircleId = `circle_${number}`;
export type TpolyId = `polygon_${number}`;
export type TtagId = `tag_${number}`;
export type TentId = TpointId | TsegId | TangId | TcircleId | TpolyId;
export type TallId = TentId | TtagId;

export type TidFromKind<TypeKind> = TypeKind extends "point"
  ? TpointId
  : TypeKind extends "segment"
    ? TsegId
    : TypeKind extends "angle"
      ? TangId
      : TypeKind extends "tag"
        ? TtagId
        : TypeKind extends "circle"
          ? TcircleId
          : TypeKind extends "polygon"
            ? TpolyId
            : never;
export type TkindPluralFrom<TypeKind> = TypeKind extends "point"
  ? "points"
  : TypeKind extends "segment"
    ? "segments"
    : TypeKind extends "angle"
      ? "angles"
      : TypeKind extends "tag"
        ? "tags"
        : TypeKind extends "circle"
          ? "circles"
          : TypeKind extends "polygon"
            ? "polygons"
            : never;

export type Tentity = Tpoint | Tsegment | Tangle | Tcircle | Tpolygon;

export type TallMap<T extends TallKind> = Map<TidFromKind<T>, T>;

export type MakeOptional<T, K extends keyof T> = Partial<Pick<T, K>> &
  Omit<T, K>;

export type MakeRequired<T, K extends keyof T> = Pick<T, K> &
  Partial<Omit<T, K>>;

export type Tstroke = {
  width: number;
  style: STROKE_STYLES;
  color: LATEX_COLOR;
  opacity: number;
};

export type Tfill = {
  style: FILL_STYLES;
  color: LATEX_COLOR;
  opacity: number;
};

export const createPoint = function (
  a: vector,
  id: TpointId,
  updateMethod?: string,
) {
  return {
    id,
    updateMethod: updateMethod,
    coords: a,
    dotstyle: configStore.getState().DEFAULT_POINT_STYLE,
    size: configStore.getState().DEFAULT_POINT_SIZE,
    color: configStore.getState().DEFAULT_COLOR,
    visible: true,
    selected: false,
  };
};

export type Tpoint = ReturnType<typeof createPoint>;

export const createSegment = function (a: TpointId, b: TpointId, id: TsegId) {
  return {
    id,
    a,
    b,
    visible: true,
    stroke: {
      width: configStore.getState().DEFAULT_STROKE_WIDTH,
      style: configStore.getState().DEFAULT_STROKE_STYLE,
      color: configStore.getState().DEFAULT_COLOR,
      opacity: 1,
    } as Tstroke,
    marks: configStore.getState().DEFAULT_SEGMENT_MARKS as SEGMENT_MARKS_TYPE,
    selected: false,
  };
};

export type Tsegment = ReturnType<typeof createSegment>;

export const getSegLength = (seg: Tsegment, points: State["points"]) => {
  const p1 = points.get(seg.a);
  const p2 = points.get(seg.b);
  if (!(p1 && p2)) return 0;
  return vec().copy(p1.coords).sub(vec().copy(p2.coords)).mag();
};

export const createAngle = function (
  a: TpointId,
  b: TpointId,
  c: TpointId,
  id: TangId,
) {
  return {
    id,
    a,
    b,
    c,
    isBigAngle: false,
    visible: true,
    size: configStore.getState().DEFAULT_ANGLE_SIZE,
    dotstyle: configStore.getState().DEFAULT_ANGLE_STYLE,
    marks: configStore.getState().DEFAULT_ANGLE_MARKS as ANGLE_MARKS_TYPE,
    color: configStore.getState().DEFAULT_COLOR,
    opacity: 1,
    stroke: {
      width: configStore.getState().DEFAULT_STROKE_WIDTH,
      style: configStore.getState().DEFAULT_STROKE_STYLE,
      color: configStore.getState().DEFAULT_COLOR,
      opacity: 1,
    } as Tstroke,
    selected: false,
  };
};

export type Tangle = ReturnType<typeof createAngle>;

export const getAngValue = (a: Tpoint, b: Tpoint, c: Tpoint) => {
  const ba = vec().copy(a.coords).sub(b.coords);
  const bc = vec().copy(c.coords).sub(b.coords);
  const valor = Math.min(
    Math.abs(ba.angleBetween(bc)),
    Math.abs(bc.angleBetween(ba)),
  );
  return valor;
};

export const circleMethods = [
  "circleFromOnePoint",
  "circleFromTwoPoints",
  "circleFromThreePoints",
  "circleFromPointAndTangent",
  //"circleFromThreeTangents"
] as const;

export type TcircleMethods = (typeof circleMethods)[number];

export type TcircFactoryArgs = {
  circleFromOnePoint: { anchors: { p1: TpointId } };
  circleFromTwoPoints: { anchors: { p1: TpointId; p2: TpointId } };
  circleFromThreePoints: {
    anchors: { p1: TpointId; p2: TpointId; p3: TpointId };
  };
  circleFromPointAndTangent: {
    anchors: { p: TpointId; a: TpointId; b: TpointId; seg: TsegId };
  };
};

export const createCircle = function <T extends TcircleMethods>(
  method: T,
  anchors: TcircFactoryArgs[T]["anchors"],
  center: vector,
  radius: number,
  id: TcircleId,
) {
  return {
    id,
    method,
    anchors,
    center,
    radius,
    arcOffset: 0,
    arcStart: 0,
    arcEnd: 360,
    showRadius: false,
    visible: true,
    stroke: {
      width: configStore.getState().DEFAULT_STROKE_WIDTH,
      style: configStore.getState().DEFAULT_STROKE_STYLE,
      color: configStore.getState().DEFAULT_COLOR,
      opacity: 1,
    } as Tstroke,
    fill: {
      style: configStore.getState().DEFAULT_FILL_STYLE,
      color: configStore.getState().DEFAULT_FILL_COLOR,
      opacity: 0,
    } as Tfill,
    selected: false,
  };
};

export type Tcircle = ReturnType<typeof createCircle>;

export const createPolygon = function (vertices: Array<TpointId>, id: TpolyId) {
  return {
    id,
    vertices,
    visible: true,
    selected: false,
    fill: {
      style: configStore.getState().DEFAULT_FILL_STYLE,
      color: configStore.getState().DEFAULT_FILL_COLOR,
      opacity: 1,
    } as Tfill,
  };
};

export type Tpolygon = ReturnType<typeof createPolygon>;

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

export type TaxisConfig = {
  shown: boolean;
  range: [number, number];
  partition: number | null;
  stroke: Tstroke;
  label: {
    text: string;
    color: LATEX_COLOR;
    pos: vector;
  };
  cap: "solid-arrow" | "thin-arrow" | "none";
};
