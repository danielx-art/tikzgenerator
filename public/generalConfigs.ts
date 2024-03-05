export const MAXIMUM_NUMBER_OF_POINTS = 3458;
export const DECIMAL_POINTS = 2;
export const DEFAULT_COLOR = "black" as LATEX_COLOR;
export const DEFAULT_POINT_STYLE = 2;
export const DEFAULT_POINT_SIZE = 1;
export const DEFAULT_STROKE_STYLE = "solid";
export type STROKE_STYLES = "solid" | `dashed-${number}-${number}` | "dotted";
export const DEFAULT_FILL_STYLE = "solid";
export type FILL_STYLES = "solid" | `hachure-${number}` | `dotted-${number}`;
export const DEFAULT_STROKE_WIDTH = 0.5;
export const DEFAULT_SEGMENT_MARKS = 0;
export type SEGMENT_MARKS_TYPE = 0 | 1 | 2 | 3 | 4;
export const DEFAULT_ANGLE_STYLE = 0;
export const DEFAULT_ANGLE_MARKS = "mark-0";
export const DEFAULT_ANGLE_SIZE = 0.5;
export const DEFAULT_FILL_COLOR = "gray" as LATEX_COLOR;
export const DEFAULT_CIRCLE_RADIUS = 1;
export const DEFAULT_TAG_SIZE = 0.3;
export const DEFAULT_TAG_COLOR = "black" as LATEX_COLOR;
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
export const RES_FACTOR = 10;
