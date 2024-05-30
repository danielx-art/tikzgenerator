import ToolTip from "import/components/micro/ToolTip";
import { cn } from "import/utils/misc/cn";
import { vec } from "import/utils/math/vetores";
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { connectPoints } from "import/utils/storeHelpers/connectPoints";
import { ButtonHTMLAttributes } from "react";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement>;

const CloseLoopButton: React.FC<PropsType> = ({
  className,
  onClick,
  ...rest
}) => {
  const store = useStore(myStore, (state) => state);

  const handleCloseFigure = () => connectPoints(store, true);

  const realSize = 24;
  const p1 = vec(0.6, 0.9).mult(realSize);
  const p2 = vec(0.9, 0.35).mult(realSize);
  const p3 = vec(0.5, 0.1).mult(realSize);
  const p4 = vec(0.1, 0.3).mult(realSize);
  const p5 = vec(0.15, 0.8).mult(realSize);
  const ps = [p1, p2, p3, p4, p5];

  return (
    <ToolTip message="Cria um polígono fechado a partir dos pontos selecionados. ">
      <button
        className={cn("", className)}
        onClick={handleCloseFigure}
        {...rest}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-full w-full p-1"
        >
          {ps.map((point, index, ps) => {
            const nextPoint = index === ps.length - 1 ? ps[0]! : ps[index + 1]!;
            return (
              <g key={`closeloopbtn_${index}`}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={"5%"}
                  stroke="currentColor"
                  strokeWidth={"1.5"}
                  fill={"currentColor"}
                />

                <line
                  x1={point.x}
                  y1={point.y}
                  x2={nextPoint.x}
                  y2={nextPoint.y}
                  stroke="currentColor"
                  strokeOpacity={index === 0 ? "1" : "0.6"}
                  strokeWidth={index === 0 ? "3" : "1.5"}
                />
              </g>
            );
          })}
        </svg>
      </button>
    </ToolTip>
  );
};

export default CloseLoopButton;
