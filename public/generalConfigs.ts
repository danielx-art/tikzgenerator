export const initConfigs = {
  DECIMAL_POINTS: 1,
  SHOW_WHEN_ROUNDED_DECIMAL_TOLERANCE: 2,
  DEFAULT_COLOR: "black" as LATEX_COLOR,
  DEFAULT_POINT_STYLE: 2,
  DEFAULT_POINT_SIZE: 1,
  DEFAULT_STROKE_STYLE: "solid" as STROKE_STYLES,
  DEFAULT_FILL_STYLE: "solid" as FILL_STYLES,
  DEFAULT_STROKE_WIDTH: 0.5,
  DEFAULT_SEGMENT_MARKS: 0,
  DEFAULT_ANGLE_STYLE: 0,
  DEFAULT_ANGLE_MARKS: "mark-0",
  DEFAULT_ANGLE_SIZE: 0.5,
  DEFAULT_FILL_COLOR: "gray" as LATEX_COLOR,
  DEFAULT_CIRCLE_RADIUS: 1,
  DEFAULT_TAG_SIZE: 0.3,
  DEFAULT_TAG_COLOR: "black" as LATEX_COLOR,
  RES_FACTOR_SVG: 10,
  TIKZ_SCALE: 1,
  AUTO_PREVIEW_RESIZE: true,
  SHOW_AXIS: false,
};

export const MAXIMUM_NUMBER_OF_POINTS = 3458;
export type STROKE_STYLES = "solid" | `dashed-${number}-${number}` | "dotted";
export type ThachureOrientations = 0 | 1 | 2 | 3;
export type FILL_STYLES =
  | "solid"
  | `hachure-${ThachureOrientations}`
  | `dotted`;
export type SEGMENT_MARKS_TYPE = 0 | 1 | 2 | 3 | 4;
export const LATEX_COLORS = [
  "red",
  "green",
  "blue",
  "cyan",
  "magenta",
  "yellow",
  "gray",
  "black",
  "white",
] as const;
export type LATEX_COLOR = (typeof LATEX_COLORS)[number];
export type ANGLE_MARKS_TYPE =
  | "marks-0"
  | "marks-1"
  | "marks-2"
  | "marks-3"
  | "doubles-0"
  | "doubles-1"
  | "doubles-2"
  | "doubles-3";
export const ANGLE_MARKS = ["marks", "doubles"].flatMap((word) =>
  Array.from({ length: 4 }, (_, i) => `${word}-${i}`),
) as ANGLE_MARKS_TYPE[];
