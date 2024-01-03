import { vec } from "import/utils/math/vetores";
import { LATEX_COLOR } from "public/generalConfigs";

export type AngDisplayProps = {
  r?: number;
  ang?: number;
  numMarks?: number;
  numDoubles?: number;
  markLen?: number;
  doubleDist?: number;
  strokeWidth?: number;
  fill?: "none" | LATEX_COLOR;
  fillOpacity?: number;
};

const AngDisplay: React.FC<AngDisplayProps> = ({
  r = 16,
  ang = (60 * Math.PI) / 180,
  numMarks = 0,
  numDoubles = 0,
  markLen = 10,
  doubleDist = 3,
  strokeWidth = 2,
  fill = "none",
  fillOpacity = 1,
}) => {
  const start = vec(r, 0);
  const end = vec().copy(start).rotate(ang);
  let marks;
  let doubles;

  if (numMarks > 0) {
    const numDiv = numMarks + 1;
    let dMarks = ``;
    for (let i = 0; i < numMarks; i++) {
      const initialPoint = vec()
        .copy(start)
        .setMag(r - markLen / 2)
        .rotate((ang * (i + 1)) / numDiv);
      const finalPoint = vec()
        .copy(start)
        .setMag(r + markLen / 2)
        .rotate((ang * (i + 1)) / numDiv);
      dMarks += ` M ${initialPoint.x} ${initialPoint.y} L ${finalPoint.x} ${finalPoint.y} `;
    }
    marks = (
      <path
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill={"none"}
        d={dMarks}
        key={`angdisplaymarks`}
      />
    );
  }

  if (numDoubles > 0) {
    let dDoubles = ``;
    for (let i = 0; i < numDoubles; i++) {
      const thisRad = r - doubleDist * (i + 1);
      const initialPoint = vec().copy(start).setMag(thisRad);
      const finalPoint = vec().copy(start).setMag(thisRad).rotate(ang);
      dDoubles += ` M ${initialPoint.x} ${initialPoint.y} A ${r} ${r} 0 0 1 ${finalPoint.x} ${finalPoint.y}  `;
    }
    doubles = (
      <path
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        d={dDoubles}
        key={`angdisplaydoubles`}
      />
    );
  }

  return (
    <div className="h-6 w-6">
      <svg className="grid h-full w-full items-center overflow-hidden">
        <g className="translate-x-[10%] translate-y-[75%] scale-y-[-1]">
          <path
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill={fill}
            fillOpacity={fillOpacity}
            d={`M 0 0 L ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y} Z`}
          />
          {marks && marks}
          {doubles && doubles}
        </g>
      </svg>
    </div>
  );
};

export default AngDisplay;
