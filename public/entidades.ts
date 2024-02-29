import {
  ANGLE_MARKS_TYPE,
  DEFAULT_ANGLE_MARKS,
  DEFAULT_ANGLE_SIZE,
  DEFAULT_ANGLE_STYLE,
  DEFAULT_COLOR,
  DEFAULT_LINE_STYLE,
  DEFAULT_LINE_WIDTH,
  DEFAULT_POINT_SIZE,
  DEFAULT_POINT_STYLE,
  DEFAULT_SEGMENT_MARKS,
  DEFAULT_POLYGON_FILL,
  DEFAULT_TAG_COLOR,
  DEFAULT_TAG_SIZE,
  SEGMENT_MARKS_TYPE,
} from "./generalConfigs";
import { vec, vector } from "../src/utils/math/vetores";

export type Tkind = "point" | "segment" | "angle" | "circle" | "polygon";
export type TallKind = Tkind | "tag";
export type TkindPlural = "points" | "segments" | "angles" | "circles" | "polygons";
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

export type TbodyFromKind<TypeKind> = TypeKind extends "point"
  ? Tpoint
  : TypeKind extends "segment"
  ? Tsegment
  : TypeKind extends "angle"
  ? Tangle
  : TypeKind extends "tag"
  ? Ttag
  : TypeKind extends "circle"
  ? Tcircle
  : TypeKind extends "polygon"
  ? Tpolygon
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

export const ponto = function (a: vector, id: TpointId, group: number = 1) {
  return {
    id,
    coords: a,
    visible: true,
    dotstyle: DEFAULT_POINT_STYLE,
    size: DEFAULT_POINT_SIZE,
    color: DEFAULT_COLOR,
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
    width: DEFAULT_LINE_WIDTH,
    style: DEFAULT_LINE_STYLE,
    marks: DEFAULT_SEGMENT_MARKS as SEGMENT_MARKS_TYPE,
    color: DEFAULT_COLOR,
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
    visible: true,
    size: DEFAULT_ANGLE_SIZE,
    dotstyle: DEFAULT_ANGLE_STYLE,
    marks: DEFAULT_ANGLE_MARKS as ANGLE_MARKS_TYPE,
    color: DEFAULT_COLOR,
    selected: false,
  };
};

export type Tangle = ReturnType<typeof angulo>;

export const circle = function (
  center: () => vector | vector,
  radius: () => number | number,
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
    visible: true,
    width: DEFAULT_LINE_WIDTH,
    style: DEFAULT_LINE_STYLE,
    color: DEFAULT_COLOR,
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
    color: DEFAULT_POLYGON_FILL
  }
}

export type Tpolygon = ReturnType<typeof polygon>;

export const tag = function (
  value: string = "",
  entityId: TentId,
  id: TtagId,
  pos: vector = vec(0, 1),
) {
  return {
    id,
    entityId,
    value,
    size: DEFAULT_TAG_SIZE,
    color: DEFAULT_TAG_COLOR,
    pos,
    selected: false,
  };
};

export type Ttag = ReturnType<typeof tag>;
