import {
  calcCircleFromOnePoint,
  calcCircleFromPointAndTangent,
  calcCircleFromThreePoints,
  calcCircleFromTwoPoints,
} from "import/utils/storeHelpers/circleCreators";
import configStore from "../configStore";
import type { Action, State } from "../store";
import type {
  Tcircle,
  TcircleCalculatedProperties,
  TcircleId,
  TcircleStyles,
  TentId,
  Tfill,
  TInteractions,
  Tpoint,
  TpointId,
  TsegId,
  Tsegment,
  Tstroke,
} from "./types";

function getCircleFromOnePoint(p1: Tpoint, r?: number) {
  return calcCircleFromOnePoint(p1.coords, r);
}
function getCircleFromTwoPoints(p1: Tpoint, p2: Tpoint) {
  return calcCircleFromTwoPoints(p1.coords, p2.coords);
}
function getCircleFromPointAndTangent(p: Tpoint, t: Tsegment) {
  return calcCircleFromPointAndTangent(p.coords, t.p1.coords, t.p2.coords);
}
function getCircleFromThreePoints(p1: Tpoint, p2: Tpoint, p3: Tpoint) {
  return calcCircleFromThreePoints(p1.coords, p2.coords, p3.coords);
}

const _circleMethodInitializersDict = {
  circleFromOnePoint: getCircleFromOnePoint,
  circleFromTwoPoints: getCircleFromTwoPoints,
  circleFromPointAndTangent: getCircleFromPointAndTangent,
  circleFromThreePoints: getCircleFromThreePoints,
};

type TcircArgs = {
  [K in keyof typeof _circleMethodInitializersDict]: Parameters<
    (typeof _circleMethodInitializersDict)[K]
  >;
};

const circleMethodInitializersDict: {
  [K in keyof TcircArgs]: (
    ...args: TcircArgs[K]
  ) => TcircleCalculatedProperties;
} = _circleMethodInitializersDict;

export const createCircle = function <T extends keyof TcircArgs>(
  circle_args: {
    method: T;
    params: TcircArgs[T];
    id: TcircleId;
  } & Partial<TcircleStyles & TInteractions>,
): Tcircle {
  const {
    method,
    params,
    id,
    arcOffset,
    arcStart,
    showRadius,
    stroke,
    fill,
    visible,
    selected,
    locked,
  } = circle_args;

  function getAnchors<M extends keyof TcircArgs>(
    params: TcircArgs[M],
  ): TentId[] {
    const anchors: TentId[] = [];

    Object.values(params).forEach((value) => {
      if (value && typeof value === "object" && "id" in value) {
        anchors.push((value as { id: TentId }).id);
      }
    });

    return anchors;
  }

  const anchors = getAnchors(params);

  const initializer = circleMethodInitializersDict[method];

  const { center, radius } = initializer(...params);

  return {
    id,
    updateMethod: {
      method,
      anchors,
      args: [],
    },
    center,
    radius,
    arcOffset: arcOffset || 0,
    arcStart: arcStart || 0,
    showRadius: showRadius || false,
    stroke: stroke || {
      width: configStore.getState().DEFAULT_STROKE_WIDTH,
      style: configStore.getState().DEFAULT_STROKE_STYLE,
      color: configStore.getState().DEFAULT_COLOR,
      opacity: 1,
    },
    fill: fill || {
      style: configStore.getState().DEFAULT_FILL_STYLE,
      color: configStore.getState().DEFAULT_FILL_COLOR,
      opacity: 0,
    },
    selected: selected || false,
    visible: visible || true,
    locked: locked || false,
  };
};


  export const circleFromOnePoint = (store: State & Action, thisCircle: Tcircle): Tcircle => {
    const P1 = store.points.get(thisCircle.updateMethod.anchors[0] as TpointId)!;
    return { ...thisCircle, center: P1.coords };
  };

  export const circleFromTwoPoints = (
    store: State & Action,
    thisCircle: Tcircle,
  ): Tcircle => {
    const P1 = store.points.get(thisCircle.updateMethod.anchors[0] as TpointId)!;
    const P2 = store.points.get(thisCircle.updateMethod.anchors[1] as TpointId)!;
    const { center, radius } = getCircleFromTwoPoints(P1, P2);
    return { ...thisCircle, center, radius };
  };

  export const circleFromPointAndTangent = (
    store: State & Action,
    thisCircle: Tcircle,
  ): Tcircle => {
    const P = store.points.get(thisCircle.updateMethod.anchors[0] as TpointId)!;
    const T = store.segments.get(thisCircle.updateMethod.anchors[1] as TsegId)!;
    const { center, radius } = getCircleFromPointAndTangent(P, T);
    return { ...thisCircle, center, radius: radius };
  };

  export const circleFromThreePoints = (
    store: State & Action,
    thisCircle: Tcircle,
  ): Tcircle => {
    const P1 = store.points.get(thisCircle.updateMethod.anchors[0] as TpointId)!;
    const P2 = store.points.get(thisCircle.updateMethod.anchors[1] as TpointId)!;
    const P3 = store.points.get(thisCircle.updateMethod.anchors[2] as TpointId)!;
    const { center, radius } = getCircleFromThreePoints(P1, P2, P3);
    return { ...thisCircle, center, radius: radius };
  };



