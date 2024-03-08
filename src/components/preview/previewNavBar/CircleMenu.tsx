import Dropdown from "import/components/micro/Dropdown";
import { cn } from "import/utils/cn";
import { vec } from "import/utils/math/vetores";
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import {
  createCircleFromOnePoint,
  createCircleFromTangent,
  createCircleFromThreePoints,
  createCircleFromTwoPoints,
} from "import/utils/storeHelpers/circleCreators";

import { ButtonHTMLAttributes } from "react";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement>;

const CircleMenu: React.FC<PropsType> = ({ className, ...rest }) => {
  return (
    <Dropdown
      keyword="generate-circle"
      className="my-auto box-border"
      openClasses="translate-y-1 bg-c_base ring-2 rounded-sm ring-c_discrete"
    >
      <CircleFromOnePoint className={className} {...rest} />
      <CircleFromTwoPoints className={className} {...rest} />
      <CircleFromTangent className={className} {...rest} />
      <CircleFromThreePoints className={className} {...rest} />
    </Dropdown>
  );
};

export default CircleMenu;

//---------------------------------------------------------
//-------------------------OPTION 1 - CRICLE FROM ONE POINT
//---------------------------------------------------------

export const CircleFromOnePoint: React.FC<PropsType> = ({
  className,
  ...rest
}) => {
  const store = useStore(myStore, (state) => state);

  const circleFromOnePoint = () => {
    if (!store) return;
    createCircleFromOnePoint(store);
  };

  const realSize = 24;
  const p1 = vec(0.5, 0.5).mult(realSize);

  return (
    <button
      className={cn("", className)}
      onClick={circleFromOnePoint}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="gray"
        fillOpacity={1}
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="h-full w-full p-1"
      >
        <circle
          cx={p1.x}
          cy={p1.y}
          r={"10%"}
          stroke="currentColor"
          strokeWidth={"1"}
          fill={"red"}
        />
        <circle
          cx={p1.x}
          cy={p1.y}
          r={"45%"}
          stroke="currentColor"
          strokeWidth={"2"}
          fill={"none"}
        />
      </svg>
    </button>
  );
};

//---------------------------------------------------------
//-------------------------OPTION 2 - CRICLE FROM TWO POINTS
//---------------------------------------------------------

export const CircleFromTwoPoints: React.FC<PropsType> = ({
  className,
  ...rest
}) => {
  const store = useStore(myStore, (state) => state);

  const circleFromTwoPoints = () => {
    if (!store) return;
    createCircleFromTwoPoints(store);
  };

  const realSize = 24;
  const p1 = vec(0.5, 0.5).mult(realSize);
  const radii = vec(0.5, 0)
    .rotate(0.6)
    .mult(0.85 * realSize);
  const p2 = vec().copy(p1).add(radii);

  return (
    <button
      className={cn("", className)}
      onClick={circleFromTwoPoints}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="gray"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="h-full w-full p-1"
      >
        <circle
          cx={p1.x}
          cy={p1.y}
          r={"5%"}
          stroke="currentColor"
          strokeWidth={"1"}
          fill={"currentColor"}
        />
        <circle
          cx={p1.x}
          cy={p1.y}
          r={"45%"}
          stroke="currentColor"
          strokeWidth={"2"}
          fill={"none"}
        />
        <line
          x1={p1.x}
          y1={p1.y}
          x2={p2.x}
          y2={p2.y}
          strokeWidth={2}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.5}
        />
        <circle
          cx={p2.x}
          cy={p2.y}
          r={"10%"}
          stroke="currentColor"
          strokeWidth={"1"}
          fill={"red"}
        />
      </svg>
    </button>
  );
};

//---------------------------------------------------------
//-------------------------OPTION 3 - CRICLE FROM ONE POINT AND TANGENT
//---------------------------------------------------------

export const CircleFromTangent: React.FC<PropsType> = ({
  className,
  ...rest
}) => {
  const store = useStore(myStore, (state) => state);

  const circleFromTangent = () => {
    if (!store) return;
    createCircleFromTangent(store);
  };

  const realSize = 24;
  const p1 = vec(0.5, 0.5).mult(realSize);
  const radii = vec(0.5, 0).mult(realSize * 0.7);
  const p2 = vec().copy(p1).add(radii);
  const l1 = vec().copy(p1).add(radii).add(vec(0, 0.5).mult(realSize));
  const l2 = vec().copy(p1).add(radii).add(vec(0, -0.5).mult(realSize));
  return (
    <button className={cn("", className)} onClick={circleFromTangent} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="gray"
        fillOpacity={1}
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="h-full w-full p-1"
      >
        <g transform="rotate(-45, 12, 12) translate(-4, 0)">
          <circle
            cx={p1.x}
            cy={p1.y}
            r={"5%"}
            stroke="currentColor"
            strokeWidth={"1"}
            fill={"currentColor"}
          />
          <circle
            cx={p1.x}
            cy={p1.y}
            r={"35%"}
            stroke="currentColor"
            strokeWidth={"1.5"}
            strokeOpacity={0.5}
            fill={"none"}
          />
          <line
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            strokeWidth={1}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.5}
          />
          <line
            x1={l1.x}
            y1={l1.y}
            x2={l2.x}
            y2={l2.y}
            strokeWidth={1.5}
            stroke="red"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={1}
          />
          <circle
            cx={p2.x}
            cy={p2.y}
            r={"8%"}
            stroke="currentColor"
            strokeWidth={"1"}
            fill={"red"}
          />
        </g>
      </svg>
    </button>
  );
};

//---------------------------------------------------------
//-------------------------OPTION 4 - CRICLE FROM THREE POINTS
//---------------------------------------------------------

export const CircleFromThreePoints: React.FC<PropsType> = ({
  className,
  ...rest
}) => {
  const store = useStore(myStore, (state) => state);

  const circleFromThreePoints = () => {
    if (!store) return;
    createCircleFromThreePoints(store);
  };

  const realSize = 24;
  const p1 = vec(0.5, 0.5).mult(realSize);
  const radii = vec(0.5, 0).mult(realSize * 0.8);
  const p2 = vec().copy(p1).add(vec().copy(radii));
  const p3 = vec()
    .copy(p1)
    .add(
      vec()
        .copy(radii)
        .rotate((2 * Math.PI) / 3),
    );
  const p4 = vec()
    .copy(p1)
    .add(
      vec()
        .copy(radii)
        .rotate((4 * Math.PI) / 3),
    );

  return (
    <button
      className={cn("", className)}
      onClick={circleFromThreePoints}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="gray"
        fillOpacity={1}
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="h-full w-full p-1"
      >
        <g transform="translate(-1, 0)">
          <circle
            cx={p1.x}
            cy={p1.y}
            r={"5%"}
            stroke="currentColor"
            strokeWidth={"1"}
            fill={"currentColor"}
          />
          <circle
            cx={p1.x}
            cy={p1.y}
            r={"40%"}
            stroke="currentColor"
            strokeWidth={"2"}
            fill={"none"}
          />
          <circle
            cx={p2.x}
            cy={p2.y}
            r={"9%"}
            stroke="currentColor"
            strokeWidth={"1"}
            fill={"red"}
          />
          <circle
            cx={p3.x}
            cy={p3.y}
            r={"9%"}
            stroke="currentColor"
            strokeWidth={"1"}
            fill={"red"}
          />
          <circle
            cx={p4.x}
            cy={p4.y}
            r={"9%"}
            stroke="currentColor"
            strokeWidth={"1"}
            fill={"red"}
          />
        </g>
      </svg>
    </button>
  );
};
