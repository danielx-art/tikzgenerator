import {
  ANGLE_MARKS_TYPE,
  SEGMENT_MARKS_TYPE,
  STROKE_STYLES,
  FILL_STYLES,
  LATEX_COLOR,
  initConfigs,
} from "./generalConfigs";
import { vec, vector } from "../src/utils/math/vetores";
import myStore from "import/utils/store/store";
import configStore from "import/utils/store/configStore";

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
//export type TentId = `${Tkind}_${number}`;
export type TentId = TpointId | TsegId | TangId | TcircleId | TpolyId;
export type TallId = TentId | TtagId;

export type TinitKind<TypeKind> = TypeKind extends "point"
  ? Partial<Tpoint>
  : TypeKind extends "segment"
  ? Partial<Tsegment>
  : TypeKind extends "angle"
  ? Partial<Tangle>
  : TypeKind extends "tag"
  ? Partial<Ttag>
  : TypeKind extends "circle"
  ? Partial<Tcircle>
  : TypeKind extends "polygon"
  ? Partial<Tpolygon>
  : never;
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

export const ponto = function (a: vector, id: TpointId, group: number = 1) {
  return {
    id,
    coords: a,
    visible: true,
    dotstyle: configStore.getState().DEFAULT_POINT_STYLE,
    size: configStore.getState().DEFAULT_POINT_SIZE,
    color: configStore.getState().DEFAULT_COLOR,
    group,
    selected: false,
  };
};

export type Tpoint = ReturnType<typeof ponto>;

export const segmento = function (a: Tpoint, b: Tpoint, id: TsegId) {
  return {
    id,
    p1: a,
    p2: b,
    get length() {
      return vec().copy(this.p1.coords).dist(this.p2.coords);
    },
    get normal() {
      return vec()
        .copy(this.p1.coords)
        .cross(vec(0, 0, 1))
        .setMag(1);
    },
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

export type Tsegment = ReturnType<typeof segmento>;

export const angulo = function (a: Tpoint, b: Tpoint, c: Tpoint, id: TangId) {
  return {
    id,
    a,
    b,
    c,
    get valor() {
      const ba = vec().copy(this.a.coords).sub(this.b.coords);
      const bc = vec().copy(this.c.coords).sub(this.b.coords);
      const valor = Math.min(
        Math.abs(ba.angleBetween(bc)),
        Math.abs(bc.angleBetween(ba)),
      );
      return valor;
    },
    get valorExt() {
      return 2 * Math.PI - this.valor;
    },
    isBigAngle: false,
    visible: true,
    size: configStore.getState().DEFAULT_ANGLE_SIZE,
    dotstyle: configStore.getState().DEFAULT_ANGLE_STYLE,
    marks: configStore.getState().DEFAULT_ANGLE_MARKS as ANGLE_MARKS_TYPE,
    color: configStore.getState().DEFAULT_COLOR,
    opacity: 1,
    selected: false,
  };
};

export type Tangle = ReturnType<typeof angulo>;

export const circle = function (
  center: (() => vector) | vector,
  radius: (() => number) | number,
  id: TcircleId,
) {
  return {
    id,
    get center() {
      if ("x" in center && "y" in center && "z" in center)
        return vec(center.x as number, center.y as number);
      return center();
    },
    get radius() {
      if (typeof radius === "number") return radius;
      return radius();
    },
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

export type Tcircle = ReturnType<typeof circle>;

export const polygon = function (vertices: Array<Tpoint>, id: TpolyId) {
  return {
    id,
    vertices,
    visible: true,
    selected: false,
    stroke: {
      width: configStore.getState().DEFAULT_STROKE_WIDTH,
      style: configStore.getState().DEFAULT_STROKE_STYLE,
      color: configStore.getState().DEFAULT_COLOR,
      opacity: 1,
    } as Tstroke,
    fill: {
      style: configStore.getState().DEFAULT_FILL_STYLE,
      color: configStore.getState().DEFAULT_FILL_COLOR,
      opacity: 1,
    } as Tfill,
  };
};

export type Tpolygon = ReturnType<typeof polygon>;

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
