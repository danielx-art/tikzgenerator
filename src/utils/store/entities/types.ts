import { vector } from "import/utils/math/linear-algebra/vetores";
import {
  ANGLE_MARKS_TYPE,
  FILL_STYLES,
  LATEX_COLOR,
  POINT_STYLES,
  SEGMENT_MARKS_TYPE,
  STROKE_STYLES,
} from "public/generalConfigs";

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

export type TRecalcInstructions = {
  method: string; //later this could be TmethodName as "method1" | "mehtod2" | ... |"mehtodN": T exends TmethodName
  anchors: Array<TentId>; //then this could use a helper type that would take the methodName as a generic: Tanchors<T>
  args: Array<any>; //The same here: TMethodArgs<T>, maybe it should just be the store.
};

/*
maybe should construct a type for the update methods themselves:

export type TupdateMethod<T> = (store: State & Action, thisEnt: T, anchors: Array<TentId>)=>T

*/

export type TInteractions = {
  visible: boolean;
  selected: boolean;
  locked: boolean;
};

export type TpointCore = {
  id: TpointId;
  coords: vector;
  updateMethod: TRecalcInstructions | undefined;
};

export type TpointStyles = {
  style: POINT_STYLES;
  size: number;
  color: LATEX_COLOR;
};

export type Tpoint = TpointCore & TpointStyles & TInteractions;

export type TsegmentCore = {
  id: TsegId;
  a: TpointId;
  b: TpointId;
  updateMethod: TRecalcInstructions;
};

export type TsegmentCalculatedProperties = {
  p1: Tpoint;
  p2: Tpoint;
  length: number;
};

export type TsegmentStyles = {
  stroke: Tstroke;
  marks: SEGMENT_MARKS_TYPE;
};

export type Tsegment = TsegmentCore &
TsegmentCalculatedProperties &
TsegmentStyles &
TInteractions;

export type TangleCore = {
  id: TangId;
  a: TpointId;
  b: TpointId;
  c: TpointId
  updateMethod: TRecalcInstructions;
};

export type TangleCalculatedProperties = {
  p1: Tpoint;
  p2: Tpoint;
  p3: Tpoint;
  val: number;
};

export type TangleStyles = {
  isBigAngle: boolean;
  size: number;
  stroke: Tstroke;
  fill: Tfill;
  marks: ANGLE_MARKS_TYPE
};

export type Tangle = TangleCore &
  TangleCalculatedProperties &
  TangleStyles &
  TInteractions;

export type TcircleCore = {
  id: TcircleId;
  updateMethod: TRecalcInstructions;
};

export type TcircleCalculatedProperties = {
  center: vector;
  radius: number;
};

export type TcircleStyles = {
  arcOffset: number;
  arcStart: number;
  showRadius: boolean;
  stroke: Tstroke;
  fill: Tfill;
};

export type Tcircle = TcircleCore & TcircleCalculatedProperties & TcircleStyles & TInteractions;

export type TpolygonCore = {
  id: TpolyId;
  vertices: Array<TpointId>;
  updateMethod: TRecalcInstructions;
};

export type TpolygonCalculatedProperties ={ //this is just flowering
  /*
  area: number,
  numberOfDiagonals: number,
  diagonalsLengths: number[],
  sumOfAngles: number,
  angleValues: number[],
  ...
  */
};

export type TpolygonStyles = {
  fill: Tfill,
};

export type Tpolygon = TpolygonCore & TpolygonCalculatedProperties & TpolygonStyles & TInteractions;

export type Tentity = Tpoint | Tsegment | Tangle | Tcircle | Tpolygon;
