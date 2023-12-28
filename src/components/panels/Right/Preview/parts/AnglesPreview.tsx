import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { DEFAULT_LINE_WIDTH, RES_FACTOR } from "public/generalConfigs";
import { Tangle } from "public/entidades";
import { vec } from "import/utils/math/vetores";

const AnglesPreview: React.FC = () => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { angles, toggleSelection } = store;

  return (
    <>
      {Array.from(angles.values()).map((angle, index) => (
        <g filter={angle.selected ? "url(#glow)" : "none"}>
          {
            <path
              key={"svg_path_" + angle.id}
              d={getAngleMarksPath(angle)}
              //stroke={angle.selected ? "#ff817a" : angle.color}
              stroke={angle.color}
              strokeWidth={DEFAULT_LINE_WIDTH}
              fill="none"
              fillOpacity={0.5}
              // onClick={() => toggleSelection(angle.id)}
              // className="cursor-pointer"
              // filter={angle.selected ? "url(#glow)" : "none"}
            />
          }
          <path
            key={"svg_path_" + angle.id}
            d={getAnglePath(angle)}
            //stroke={angle.selected ? "#ff817a" : angle.color}
            stroke={angle.color}
            strokeWidth={DEFAULT_LINE_WIDTH}
            fill={angle.dotstyle === 0 ? "none" : angle.color}
            fillOpacity={0.5}
            onClick={() => toggleSelection(angle.id)}
            className="cursor-pointer"
            // filter={angle.selected ? "url(#glow)" : "none"}
          />
        </g>
      ))}
    </>
  );
};

export default AnglesPreview;

export const getAnglePath = (angle: Tangle) => {
  const angleA = vec().copy(angle.a.coords).mult(RES_FACTOR);
  const angleB = vec().copy(angle.b.coords).mult(RES_FACTOR);
  const angleC = vec().copy(angle.c.coords).mult(RES_FACTOR);

  let vectorA = vec().copy(angleA).sub(angleB);
  let vectorB = vec().copy(angleC).sub(angleB);
  vectorA.setMag(angle.size * RES_FACTOR);
  vectorB.setMag(angle.size * RES_FACTOR);

  let startVector;
  let endVector;
  let startAngle;
  let endAngle;

  let angA = ((vectorA.heading() * 180) / Math.PI + 360) % 360; //in degrees and first positive arc
  let angB = ((vectorB.heading() * 180) / Math.PI + 360) % 360;
  let angleDifference = angB - angA;
  let sweepFlag = 1;

  if (angleDifference >= 0) {
    startVector = vectorA;
    startAngle = angA;
    endVector = vectorB;
    endAngle = angB;
  } else {
    startVector = vectorB;
    startAngle = angB;
    endVector = vectorA;
    endAngle = angA;
  }

  if (Math.abs(angleDifference) > 180) {
    sweepFlag = 0;
  }

  let start = vec().copy(startVector).add(angleB);
  let end = vec().copy(endVector).add(angleB);

  if (Math.abs(endAngle - startAngle) == 90) {
    let d = `M ${angleB.x + startVector.x} ${angleB.y + startVector.y} `;
    d += `l ${endVector.x} ${endVector.y} `;
    d += `l ${-startVector.x} ${-startVector.y} `;

    let circleCenter = vec()
      .copy(angleB)
      .add(
        vec()
          .copy(startVector)
          .add(vec().copy(endVector))
          .mult(1 / 2),
      );
    let radius = (angle.size * RES_FACTOR) / 12;
    d += `M ${circleCenter.x + radius} ${circleCenter.y} `;
    d += `A ${radius} ${radius} 0 0 1 ${circleCenter.x - radius} ${
      circleCenter.y
    } `;
    d += `A ${radius} ${radius} 0 0 1 ${circleCenter.x + radius} ${
      circleCenter.y
    } `;

    return d;
  } else {
    let d = ` M ${angleB.x} ${angleB.y} L ${start.x} ${start.y} A ${
      angle.size * RES_FACTOR
    } ${angle.size * RES_FACTOR} 0 0 ${sweepFlag} ${end.x} ${end.y} Z `;
    return d;
  }
};

export const getAngleMarksPath = (angle: Tangle) => {
  const angleA = vec().copy(angle.a.coords).mult(RES_FACTOR);
  const angleB = vec().copy(angle.b.coords).mult(RES_FACTOR);
  const angleC = vec().copy(angle.c.coords).mult(RES_FACTOR);

  let vectorA = vec().copy(angleA).sub(angleB);
  let vectorB = vec().copy(angleC).sub(angleB);
  vectorA.setMag(angle.size * RES_FACTOR);
  vectorB.setMag(angle.size * RES_FACTOR);

  let startVector;
  let endVector;
  let startAngle;
  let endAngle;

  let angA = ((vectorA.heading() * 180) / Math.PI + 360) % 360; //in degrees and first positive arc
  let angB = ((vectorB.heading() * 180) / Math.PI + 360) % 360;
  let angleDifference = angB - angA;
  let sweepFlag = 1;

  if (angleDifference >= 0) {
    startVector = vectorA;
    startAngle = angA;
    endVector = vectorB;
    endAngle = angB;
  } else {
    startVector = vectorB;
    startAngle = angB;
    endVector = vectorA;
    endAngle = angA;
  }

  let d = "";

  if (Math.abs(angleDifference) > 180) {
    sweepFlag = 0;
  }

  let start = vec().copy(startVector).add(angleB);
  let end = vec().copy(endVector).add(angleB);

  if (Math.abs(endAngle - startAngle) == 90) {
    return d;
  } else {
    const angleMark = angle.marks;

    if (angle.marks.split("-")[1] !== "0") {
      if (angle.marks.includes("marks")) {
        let dMarks = ``;
        const numMarks = parseInt(angle.marks.split("-")[1] as `${number}`);
        const markLen = (angle.size * RES_FACTOR) / 2;
        const r = angle.size * RES_FACTOR;
        const ang = angle.valor;
        const numDiv = numMarks + 1;
        for (let i = 0; i < numMarks; i++) {
          const rotateWise = sweepFlag === 0 ? -1 : 1;
          const toRotate = (rotateWise * ang * (i + 1)) / numDiv;

          const initialPoint = vec()
            .copy(startVector)
            .rotate(toRotate)
            .setMag(r - markLen / 2)
            .add(angleB);
          const finalPoint = vec()
            .copy(startVector)
            .setMag(r + markLen / 2)
            .rotate(toRotate)
            .add(angleB);
          dMarks += ` M ${initialPoint.x} ${initialPoint.y} L ${finalPoint.x} ${finalPoint.y} `;
        }
        d += dMarks;
      } else if (angle.marks.includes("doubles")) {
        let dDoubles = ``;
        const numDoubles = parseInt(angle.marks.split("-")[1] as `${number}`);
        const doubleDist = (angle.size * RES_FACTOR) / 5;
        const r = angle.size * RES_FACTOR;
        const ang = angle.valor;
        const rotateWise = sweepFlag === 0 ? -1 : 1;
        const toRotate = rotateWise * ang;
        for (let i = 0; i < numDoubles; i++) {
          const thisRad = r - doubleDist * (i + 1);
          const initialPoint = vec()
            .copy(startVector)
            .setMag(thisRad)
            .add(angleB);
          const finalPoint = vec()
            .copy(startVector)
            .setMag(thisRad)
            .rotate(toRotate)
            .add(angleB);
          dDoubles += ` M ${initialPoint.x} ${initialPoint.y} A ${thisRad} ${thisRad} 0 0 ${sweepFlag} ${finalPoint.x} ${finalPoint.y}  `;
        }
        d += dDoubles;
      }
    }
    return d;
  }
};
