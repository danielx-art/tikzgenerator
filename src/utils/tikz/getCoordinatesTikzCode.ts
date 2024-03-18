import type { Action, State } from "../store/store";

export default function getCoordinatesTikzCode(store: State & Action) {
  let tikzCode = "";
  store.points.forEach((point) => {
    const radius = point.size / 10;
    const { x, y } = point.coords;

    tikzCode += `\\coordinate (${point.id}) at (${x},${y});\n`; //SET COORDINATES
  });
  return tikzCode;
}
