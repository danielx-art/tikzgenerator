import type { SEGMENT_MARKS_TYPE } from "public/generalConfigs";
import configStore from "../configStore";
import type { Action, State } from "../store";
import type {
  MakeRequired,
  TInteractions,
  Tpoint,
  TsegId,
  Tsegment,
  TsegmentCalculatedProperties,
  TsegmentStyles,
  Tstroke,
} from "./types";

export const createSegment = function (
  segment_args: { id: TsegId; p1: Tpoint; p2: Tpoint } & Partial<
    TsegmentStyles & TInteractions
  >,
): Tsegment {
  const { id, p1, p2, stroke, marks, visible, selected, locked } = segment_args;

  return {
    id,
    a: p1.id,
    b: p2.id,
    p1,
    p2,
    updateMethod: {
      method: "stdSegmentUpdateMethod",
      anchors: [p1.id, p2.id],
      args: [],
    },
    length: p1.coords.dist(p2.coords),
    visible: visible || true,
    stroke:
      stroke ||
      ({
        width: configStore.getState().DEFAULT_STROKE_WIDTH,
        style: configStore.getState().DEFAULT_STROKE_STYLE,
        color: configStore.getState().DEFAULT_COLOR,
        opacity: 1,
      } as Tstroke),
    marks:
      marks ||
      (configStore.getState().DEFAULT_SEGMENT_MARKS as SEGMENT_MARKS_TYPE),
    selected: selected || false,
    locked: locked || false,
  };
};

export const stdSegmentUpdateMethod = (
  store: State & Action,
  thisSegment: Tsegment,
): Tsegment => {
  const P1 = store.points.get(thisSegment.a);
  const P2 = store.points.get(thisSegment.b);
  const updatedProperties = {
    p1: P1,
    p2: P2,
    length: P1.coords.dist(P2.coords),
  } as TsegmentCalculatedProperties;

  return { ...updatedProperties, ...thisSegment };
};
