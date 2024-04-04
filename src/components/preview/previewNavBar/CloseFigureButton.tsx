import ToolTip from "import/components/micro/ToolTip";
import { cn } from "import/utils/misc/cn";
import { vec } from "import/utils/math/vetores";
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { closeFigure } from "import/utils/storeHelpers/closeFigure";

import { ButtonHTMLAttributes } from "react";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement>;

const CloseFigureButton: React.FC<PropsType> = ({
  className,
  onClick,
  ...rest
}) => {
  const store = useStore(myStore, (state) => state);

  const handleCloseFigure = () => closeFigure(store);

  const realSize = 24;
  const p1 = vec(0.6, 0.9).mult(realSize);
  const p2 = vec(0.9, 0.35).mult(realSize);
  const p3 = vec(0.5, 0.1).mult(realSize);
  const p4 = vec(0.1, 0.3).mult(realSize);
  const p5 = vec(0.15, 0.8).mult(realSize);
  const ps = [p1, p2, p3, p4, p5];

  return (
    <ToolTip message="Preenche uma região delimitada pelos segmentos selecionados. ">
      <button
        className={cn("", className)}
        onClick={handleCloseFigure}
        {...rest}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="gray"
          fillOpacity={0.4}
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="h-full w-full p-1"
        >
          {ps.map((point, index, ps) => {
            const nextPoint = index === ps.length - 1 ? ps[0]! : ps[index + 1]!;
            return (
              <g key={`closefigurebtn_${index}`}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={"5%"}
                  stroke="currentColor"
                  strokeWidth={"1"}
                  fill={"currentColor"}
                />
              </g>
            );
          })}
          <path
            d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y}L ${p4.x} ${p4.y}L ${p5.x} ${p5.y} Z`}
          />
        </svg>
      </button>
    </ToolTip>
  );
};

export default CloseFigureButton;
