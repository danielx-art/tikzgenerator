import getHachureLines from "../math/getHachureLines";
import configStore from "../store/configStore";
import type { Action, State } from "../store/store";

export default function getCirclesTikzCode(store: State & Action) {
  let tikzCode = "";

  const { TIKZ_SCALE } = configStore.getState();

  store.circles.forEach((circle) => {
    if (circle.visible) {

      const center = "x" in circle.center ? circle.center : circle.center(store);
      const radius = (typeof circle.radius === "number") ? circle.radius : circle.radius(store);

      if(!center || !radius) return;

      const circleCenter = `(${center.x}, ${center.y})`;
      const arcAngleSize = circle.arcEnd - circle.arcStart;
      const startAngle = circle.arcStart + circle.arcOffset;
      const endAngle = circle.arcEnd + circle.arcOffset;
      const circleSector =
        arcAngleSize == 360
          ? `(${center.x}, ${center.y}) circle (${radius})`
          : `${circleCenter} -- ${circleCenter} ++(${startAngle}:${radius}) arc (${startAngle}:${endAngle}:${radius}) -- ${circleCenter}`;
      const circleArc = `${circleCenter} ++(${startAngle}:${radius}) arc (${startAngle}:${endAngle}:${radius})`;
      const circleRadialsOne = `${circleCenter} ++(${endAngle}:${circle.radius}) -- ${circleCenter}`;
      const circleRadialsTwo = `${circleCenter} ++(${startAngle}:${circle.radius}) -- ${circleCenter}`;

      const strokeStyle = circle.stroke.style.includes("dashed")
        ? "dashed"
        : circle.stroke.style;

      let strokeSettings = `line width=${circle.stroke.width}pt, ${strokeStyle}, draw=${circle.stroke.color}, draw opacity=${circle.stroke.opacity}`;

      // Start defining the TikZ code for this circle
      let circleCommands = "";
      circleCommands += "\n%the circle fill: \n ";

      // Fill settings depend on the style
      if (circle.fill.opacity !== 0) {
        if (circle.fill.style === "solid") {
          circleCommands += `\\fill [fill=${circle.fill.color}, fill opacity=${circle.fill.opacity}] ${circleSector};\n`;
        } else {
          // Clipping for the special fill pattern (used for both dotted and hachure)
          circleCommands += `\\begin{scope}\n\\clip ${circleSector};\n`;

          // Dotted or hachure pattern, similar logic as with polygons but now within a circle
          if (circle.fill.style === "dotted") {
            const step =
              TIKZ_SCALE < 0.5 ? 0.2 * TIKZ_SCALE : 0.02 * TIKZ_SCALE;

            circleCommands += `\\foreach \\x in {${
              center.x - radius
            },${center.x - radius + step},...,${
              center.x + radius
            }}{\n`;
            circleCommands += `\\foreach \\y in {${
              center.y - radius
            },${center.y - radius + step},...,${
              center.y + radius
            }}{\n`;
            circleCommands += `\\fill [fill=${
              circle.fill.color
            }, fill opacity=${circle.fill.opacity}] (\\x,\\y) circle (${
              5 * step
            });\n`;
            circleCommands += `}\n}\n`;
          } else if (circle.fill.style.startsWith("hachure")) {
            // Extract angle from the fill style
            const angleOption = circle.fill.style.split("-")[1];
            if (!angleOption) return "";
            const angle = parseInt(angleOption) * 45;
            const minX = center.x - radius;
            const maxX = center.x + radius;
            const minY = center.y - radius;
            const maxY = center.y + radius;
            const HACHURE_DIST = TIKZ_SCALE < 1 ? 0.1 : 0.02 * TIKZ_SCALE;
            const pattern = getHachureLines(
              minX,
              maxX,
              minY,
              maxY,
              HACHURE_DIST,
              angle,
            );
            pattern.points.forEach((point) => {
              circleCommands += `\\draw [thin, ${circle.fill.color}, opacity=${circle.fill.opacity}] (${point.x1},${point.y1}) -- (${point.x2},${point.y2});\n`;
            });
          }

          circleCommands += `\\end{scope}\n`;
        }
      }

      // Draw the circle outline (stroke)

      if (circle.showRadius) {
        circleCommands += "\n%show the radials: \n ";
        circleCommands += `\\draw [${strokeSettings}] ${circleRadialsOne};\n`;
        circleCommands += `\\draw [${strokeSettings}] ${circleRadialsTwo};\n`;
      }

      circleCommands += "\n%the circle arc: \n ";
      circleCommands += `\\draw [${strokeSettings}] ${circleArc};\n`;

      // Append the generated commands for this circle to the main TikZ code
      tikzCode += circleCommands;
    }
  });
  return tikzCode;
}
