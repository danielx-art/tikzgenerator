import { Tsegment, Tangle, Tpoint } from "public/entidades";
import { vec } from "public/vetores";

export const getSegmentPath = (segment: Tsegment) => {
  return `M${segment.p1.coords.x},${segment.p1.coords.y} L${segment.p2.coords.x},${segment.p2.coords.y}`;
};

export const getAnglePath = (angle: Tangle) => {
  let vectorA = vec().copy(angle.a.coords).sub(angle.b.coords);
  let vectorB = vec().copy(angle.c.coords).sub(angle.b.coords);
  vectorA.setMag(angle.size);
  vectorB.setMag(angle.size);

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

  //console.log("angle is 90?: "+Math.abs(endAngle-startAngle) ); //debugg
  if (Math.abs(endAngle - startAngle) == 90) {
    let d = `M ${angle.b.coords.x + startVector.x} ${
      angle.b.coords.y + startVector.y
    } `;
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
    let radius = angle.size / 10;
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
      angle.size,
      angle.size,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");

    return d;
  }
};

export const getPointPath = (point: Tpoint) => {
  const { coords, dotstyle, size } = point;

  if (dotstyle === 0) {
    return "";
  }

  // Calculate the circle path
  const circlePath =
    `M ${coords.x} ${coords.y} ` +
    `m -${size * 0.1}, 0 ` +
    `a ${size * 0.1},${size * 0.1} 0 1,0 ${size * 0.1 * 2},0 ` +
    `a ${size * 0.1},${size * 0.1} 0 1,0 -${size * 0.1 * 2},0`;

  return circlePath;
};
