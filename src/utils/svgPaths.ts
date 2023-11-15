import { Tsegmento, Tangulo } from "public/entidades";
import { vec } from "public/vetores";

export const getSegmentPath = (segment: Tsegmento) => {
  return `M${segment.p1.coords.x},${segment.p1.coords.y} L${segment.p2.coords.x},${segment.p2.coords.y}`;
};

export const getAnglePath = (angle: Tangulo) => {
  let vectorA = vec().copy(angle.a.coords).sub(angle.b.coords);
  let vectorB = vec().copy(angle.c.coords).sub(angle.b.coords);
  vectorA.setMag(angle.tamanho);
  vectorB.setMag(angle.tamanho);

  let startVector;
  let endVector;

  if (vectorA.heading() >= vectorB.heading()) {
    startVector = vectorA;
    endVector = vectorB;
  } else {
    startVector = vectorB;
    endVector = vectorA;
  }

  let startAngle = startVector.heading() * (180 / Math.PI);
  let endAngle = endVector.heading() * (180 / Math.PI);

  // Normalize angles to positive range (0 to 360 degrees)
  startAngle = (startAngle + 360) % 360;
  endAngle = (endAngle + 360) % 360;

  let start = vec().copy(startVector).add(angle.b.coords);
  let end = vec().copy(endVector).add(angle.b.coords);

  if (Math.abs(endAngle - startAngle) == 90) {
    let d = `M ${angle.b.coords.x + startVector.x} ${angle.b.coords.y + startVector.y} `;
    d += `l ${endVector.x} ${endVector.y} `;
    d += `l ${-startVector.x} ${-startVector.y} `;

    let circleCenter = vec()
      .copy(angle.b.coords)
      .add(
        vec()
          .copy(startVector)
          .add(vec().copy(endVector))
          .mult(1 / 2),
      );
    let radius = angle.tamanho / 10;
    d += `M ${circleCenter.x + radius} ${circleCenter.y} `;
    d += `A ${radius} ${radius} 0 0 1 ${circleCenter.x - radius} ${
      circleCenter.y
    } `;
    d += `A ${radius} ${radius} 0 0 1 ${circleCenter.x + radius} ${
      circleCenter.y
    } `;

    return d;
  } else {
    let largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? 0 : 1;
    let d = [
      "M",
      start.x,
      start.y,
      "A",
      angle.tamanho,
      angle.tamanho,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");

    return d;
  }
};
