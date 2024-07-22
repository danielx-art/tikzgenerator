import {
  ANGLE_MARKS_TYPE,
  SEGMENT_MARKS_TYPE,
  STROKE_STYLES,
  FILL_STYLES,
  LATEX_COLOR,
} from "../../../public/generalConfigs";
import { vec, vector } from "../math/linear-algebra/vetores";
import configStore from "import/utils/store/configStore";
import { Action, State } from "import/utils/store/store";

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
