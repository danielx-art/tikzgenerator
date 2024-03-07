import type { FILL_STYLES, STROKE_STYLES } from "public/generalConfigs";

export const getStrokeDasharray = (style: STROKE_STYLES) => {
  const styleArgs = style.split("-");
  switch (styleArgs[0]) {
    case "solid":
      return "";
    case "dashed": {
      const dashSize = styleArgs[1];
      const dashSpace = styleArgs[2];
      return `${dashSize}, ${dashSpace}`;
    }
    case "dotted":
      return "0.01, 1";
    default:
      return "";
  }
};

export const getFillMask = (style: FILL_STYLES) => {
  const styleArgs = style.split("-");

  switch (styleArgs[0]) {
    case "solid":
      return "none";
    case "hachure": {
      const hachureOrientation = style.split("-")[1];
      return `url(#mask-hatch-${hachureOrientation})`;
    }
    case "dotted":
      return "url(#mask-dotted)";
    default:
      return "transparent";
  }
};
