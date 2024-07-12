import myStore, { Action, State } from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { getAngValue, Tangle, Tpoint } from "public/entidades";
import { vec } from "import/utils/math/linear-algebra/vetores";
import { roundToDecimalPlaces } from "import/utils/math/misc";
import configStore from "import/utils/store/configStore";

const AnglesPreview: React.FC = () => {
  const angles = useStore(myStore, (state) => state.angles);
  const configs = useStore(configStore, (state) => state);
  const store = useStore(myStore, (state) => state);

  if (!angles || !store || !configs) return;

  const { toggleSelection } = store;

  return (
    <>
      {Array.from(angles.values()).map((angle, index) => {
        <SingleAnglePreview
          angle={angle}
          RES={configs.RES_FACTOR_SVG}
          toggleSelection={toggleSelection}
          key={"svg_path_angle_" + angle.id}
        />;
      })}
    </>
  );
};

export default AnglesPreview;

const SingleAnglePreview: React.FC<{
  angle: Tangle;
  RES: number;
  toggleSelection: Action["toggleSelection"];
}> = ({ angle, RES, toggleSelection }) => {
  const a = useStore(myStore, (state) => state.points.get(angle.a));
  const b = useStore(myStore, (state) => state.points.get(angle.b));
  const c = useStore(myStore, (state) => state.points.get(angle.c));

  if (!(a && b && c)) return;

  const anglePath = getAnglePath(angle, a, b, c, RES);

  return (
    <g filter={angle.selected ? "url(#glow)" : "url(#dropshadow"}>
      {
        <path
          key={"svg_path_marks_" + angle.id}
          d={anglePath.dMarksPath}
          stroke={angle.color}
          strokeWidth={angle.stroke.width}
          fill="none"
          fillOpacity={0.5}
        />
      }
      {
        <path
          key={"svg_path_fill_" + angle.id}
          d={anglePath.dFillPath}
          stroke="none"
          fill={angle.dotstyle === 1 ? angle.color : "transparent"}
          fillOpacity={0.5}
          onClick={(event) => {
            event.stopPropagation();
            toggleSelection(angle.id);
          }}
          className="cursor-pointer"
        />
      }
      <path
        key={"svg_path_hitbox_" + angle.id}
        d={anglePath.d}
        stroke={"transparent"}
        strokeWidth={2 * angle.stroke.width}
        fill="transparent"
        onClick={(event) => {
          event.stopPropagation();
          toggleSelection(angle.id);
        }}
        className="cursor-pointer"
      />
      <path
        key={"svg_path_" + angle.id}
        d={anglePath.d}
        stroke={angle.color}
        strokeWidth={angle.stroke.width}
        fill="none"
        fillOpacity={0.5}
        className="pointer-events-none"
      />
    </g>
  );
};

const getAnglePath = (
  angle: Tangle,
  a: Tpoint,
  b: Tpoint,
  c: Tpoint,
  scaleFactor: number,
) => {
  const angleA = vec().copy(a.coords).mult(scaleFactor);
  const angleB = vec().copy(b.coords).mult(scaleFactor);
  const angleC = vec().copy(c.coords).mult(scaleFactor);

  let vectorA = vec().copy(angleA).sub(angleB);
  let vectorB = vec().copy(angleC).sub(angleB);
  vectorA.setMag(angle.size * scaleFactor);
  vectorB.setMag(angle.size * scaleFactor);

  const ang = getAngValue(a, b, c);
  const angExt = 2 * Math.PI - ang;

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
    sweepFlag = angle.isBigAngle ? 1 : 0;
  }

  let start = vec().copy(startVector).add(angleB);
  let end = vec().copy(endVector).add(angleB);

  let d = "";
  let dMarksPath = "";
  let dFillPath = "";

  const roundedDegrees = angle.isBigAngle
    ? parseFloat(roundToDecimalPlaces((angExt * 180) / Math.PI))
    : parseFloat(roundToDecimalPlaces((ang * 180) / Math.PI));

  if (roundedDegrees === 90) {
    d += `M ${angleB.x + startVector.x} ${angleB.y + startVector.y} `;
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
    let radius = (angle.size * scaleFactor) / 12;
    d += `M ${circleCenter.x + radius} ${circleCenter.y} `;
    d += `A ${radius} ${radius} 0 0 1 ${circleCenter.x - radius} ${
      circleCenter.y
    } `;
    d += `A ${radius} ${radius} 0 0 1 ${circleCenter.x + radius} ${
      circleCenter.y
    } `;

    dFillPath += ` 
    M ${angleB.x} ${angleB.y} 
    L ${angleB.x + startVector.x} ${angleB.y + startVector.y} 
    l ${endVector.x} ${endVector.y} 
    l ${-startVector.x} ${-startVector.y} 
    Z
    `;
  } else {
    d += ` M ${start.x} ${start.y} 
           A ${angle.size * scaleFactor} ${angle.size * scaleFactor} 
           0 0 ${sweepFlag} 
           ${end.x} ${end.y}  `;

    dFillPath += ` M ${angleB.x} ${angleB.y} L ${start.x} ${start.y}
              A ${angle.size * scaleFactor} ${angle.size * scaleFactor}
              0 0 ${sweepFlag}
              ${end.x} ${end.y} Z `;

    //------MARKS PATH
    if (angle.marks.split("-")[1] !== "0") {
      if (angle.marks.includes("marks")) {
        let dMarks = ``;
        const numMarks = parseInt(angle.marks.split("-")[1] as `${number}`);
        const markLen = (angle.size * scaleFactor) / 2;
        const r = angle.size * scaleFactor;
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
        dMarksPath += dMarks;
      } else if (angle.marks.includes("doubles")) {
        let dDoubles = ``;
        const numDoubles = parseInt(angle.marks.split("-")[1] as `${number}`);
        const doubleDist = (angle.size * scaleFactor) / 5;
        const r = angle.size * scaleFactor;
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
        dMarksPath += dDoubles;
      }
    }
  }

  return { d, dMarksPath, dFillPath };
};
