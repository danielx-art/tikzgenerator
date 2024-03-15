import getHachureLines from "../math/getHachureLines";
import type { Action, State } from "../store/store";

export default function getCirclesTikzCode(store: State & Action) {
  let tikzCode = "";
  store.circles.forEach((circle) => {
    if (circle.visible) {
      let strokeSettings = `line width=${circle.stroke.width}pt, ${circle.stroke.style}, draw=${circle.stroke.color}, draw opacity=${circle.stroke.opacity}`;

      // Start defining the TikZ code for this circle
      let circleCommands = "";

      // Fill settings depend on the style
      if (circle.fill.style === "solid") {
        circleCommands += `\\fill [fill=${circle.fill.color}, fill opacity=${circle.fill.opacity}] (${circle.center.x}, ${circle.center.y}) circle (${circle.radius});\n`;
      } else {
        // Clipping for the special fill pattern (used for both dotted and hachure)
        circleCommands += `\\begin{scope}\n\\clip (${circle.center.x}, ${circle.center.y}) circle (${circle.radius});\n`;

        // Dotted or hachure pattern, similar logic as with polygons but now within a circle
        if (circle.fill.style === "dotted") {
          circleCommands += `\\foreach \\x in {${
            circle.center.x - circle.radius
          },${circle.center.x - circle.radius + 0.2},...,${
            circle.center.x + circle.radius
          }}{\n`;
          circleCommands += `\\foreach \\y in {${
            circle.center.y - circle.radius
          },${circle.center.y - circle.radius + 0.2},...,${
            circle.center.y + circle.radius
          }}{\n`;
          circleCommands += `\\fill [fill=${circle.fill.color}, fill opacity=${circle.fill.opacity}] (\\x,\\y) circle (0.5pt);\n`;
          circleCommands += `}\n}\n`;
        } else if (circle.fill.style.startsWith("hachure")) {
          // Extract angle from the fill style
          const angleOption = circle.fill.style.split("-")[1];
          if (!angleOption) return "";
          const angle = parseFloat(angleOption);
          const minX = circle.center.x - circle.radius;
          const maxX = circle.center.x + circle.radius;
          const minY = circle.center.y - circle.radius;
          const maxY = circle.center.y + circle.radius;
          const HACHURE_DIST = 0.2;
          const pattern = getHachureLines(minX,maxX, minY, maxY, HACHURE_DIST, angle);
          circleCommands += `\\foreach \\i in {0,1,...,${pattern.number}}{\n`;
          circleCommands += `\\draw [thin, ${circle.fill.color}, opacity=${circle.fill.opacity}] (${pattern.points[i]?.x1},${}) -- (${},${});\n`;
          circleCommands += `}\n`;
        }

        circleCommands += `\\end{scope}\n`;
      }

      // Draw the circle outline (stroke)
      circleCommands += `\\draw [${strokeSettings}] (${circle.center.x}, ${circle.center.y}) circle (${circle.radius});\n`;

      // Append the generated commands for this circle to the main TikZ code
      tikzCode += circleCommands;
    }
  });
  return tikzCode;
}