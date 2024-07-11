import Dropdown from "import/components/micro/Dropdown";
import ToolTip from "import/components/micro/ToolTip";
import { cn } from "import/utils/misc/cn";
import { vec } from "import/utils/math/linear-algebra/vetores";
import myStore, { type Action, type State } from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import {
  getCircleFromOnePoint,
  getCircleFromTwoPoints,
  getCircleFromPointAndTangent,
  getCircleFromThreePoints,
} from "import/utils/storeHelpers/circleCreators";
import type { ButtonHTMLAttributes } from "react";
import { createCircle } from "public/entidades";
import { getSelected } from "import/utils/storeHelpers/entityGetters";
import { toast } from "sonner";
import { areCollinear } from "import/utils/math/linear-algebra/distancesAndAreas";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement>;

const CircleMenu: React.FC<PropsType> = ({ className, ...rest }) => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  return (
    <Dropdown
      keyword="generate-circle"
      className="my-auto box-border"
      openClasses="translate-y-1 bg-background ring-2 rounded-sm ring-muted"
    >
      <CircleFromOnePoint store={store} className={className} {...rest} />
      <CircleFromTwoPoints store={store} className={className} {...rest} />
      <CircleFromTangent store={store} className={className} {...rest} />
      <CircleFromThreePoints store={store} className={className} {...rest} />
    </Dropdown>
  );
};

export default CircleMenu;

//---------------------------------------------------------
//-------------------------OPTION 1 - CRICLE FROM ONE POINT
//---------------------------------------------------------

export const CircleFromOnePoint: React.FC<
  PropsType & { store: State & Action }
> = ({ className, store, ...rest }) => {
  const addCircle = () => {
    const selectedPoints = getSelected("point", store);
    if (selectedPoints.length !== 1 || !selectedPoints[0]) {
      toast.error(
        "Por favor selecione apenas um ponto para criar um círculo dessa maneira. ",
      );
      return;
    }
    const { center, radius } = getCircleFromOnePoint(selectedPoints[0].coords);
    const newCircleId = store.generateId("circle");
    const newCircle = createCircle(
      "circleFromOnePoint",
      { p1: selectedPoints[0].id },
      center,
      radius,
      newCircleId,
    );
    store.update(newCircle);
  };

  const realSize = 24;
  const p1 = vec(0.5, 0.5).mult(realSize);

  return (
    <ToolTip message="Cria círculo de raio 1 em torno do ponto selecionado. ">
      <button className={cn("", className)} onClick={addCircle} {...rest}>
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
    </ToolTip>
  );
};

//---------------------------------------------------------
//-------------------------OPTION 2 - CRICLE FROM TWO POINTS
//---------------------------------------------------------

export const CircleFromTwoPoints: React.FC<
  PropsType & { store: State & Action }
> = ({ className, store, ...rest }) => {
  const addCircle = () => {
    const selectedPoints = getSelected("point", store);
    const centerPoint = selectedPoints[0];
    const limitPoint = selectedPoints[1];
    if (!(selectedPoints.length == 2 && centerPoint && limitPoint)) {
      toast.error(
        "Por favor selecione dois pontos para criar um círculo dessa maneira. ",
      );
      return;
    }
    const { center, radius } = getCircleFromTwoPoints(
      centerPoint.coords,
      limitPoint.coords,
    );
    const newCircleId = store.generateId("circle");
    const newCircle = createCircle(
      "circleFromTwoPoints",
      { p1: centerPoint.id, p2: limitPoint.id },
      center,
      radius,
      newCircleId,
    );
    store.update(newCircle);
  };

  const realSize = 24;
  const p1 = vec(0.5, 0.5).mult(realSize);
  const radii = vec(0.5, 0)
    .rotate(0.6)
    .mult(0.85 * realSize);
  const p2 = vec().copy(p1).add(radii);

  return (
    <ToolTip message="Cria círculo com centro no primeiro ponto e com borda no segundo ponto selecionado. ">
      <button className={cn("", className)} onClick={addCircle} {...rest}>
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
    </ToolTip>
  );
};

//---------------------------------------------------------
//-------------------------OPTION 3 - CRICLE FROM ONE POINT AND TANGENT
//---------------------------------------------------------

export const CircleFromTangent: React.FC<
  PropsType & { store: State & Action }
> = ({ className, store, ...rest }) => {
  const addCircle = () => {
    const selectedPoints = getSelected("point", store);
    const selectedSegments = getSelected("segment", store);
    const centerPoint = selectedPoints[0];
    const line = selectedSegments[0];
    const a = line ? store.points.get(line.a) : undefined;
    const b = line ? store.points.get(line.b) : undefined;
    if (
      !(
        selectedPoints.length == 1 &&
        selectedSegments.length == 1 &&
        centerPoint &&
        line &&
        a &&
        b
      )
    ) {
      toast.error(
        "Por favor selecione um ponto e um segmento para criar um círculo dessa maneira. ",
      );
      return;
    }
    const { center, radius } = getCircleFromPointAndTangent(
      centerPoint.coords,
      a.coords,
      b.coords,
    );
    if (radius == undefined) {
      toast.error(
        "Para criar um círculo dessa forma, selecione um ponto que não é colinear com o segmento selecionado. ",
      );
      return;
    }
    const newCircleId = store.generateId("circle");
    const newCircle = createCircle(
      "circleFromPointAndTangent",
      { p: centerPoint.id, a: a.id, b: b.id, seg: line.id },
      center,
      radius,
      newCircleId,
    );
    store.update(newCircle);
  };

  const realSize = 24;
  const p1 = vec(0.5, 0.5).mult(realSize);
  const radii = vec(0.5, 0).mult(realSize * 0.7);
  const p2 = vec().copy(p1).add(radii);
  const l1 = vec().copy(p1).add(radii).add(vec(0, 0.5).mult(realSize));
  const l2 = vec().copy(p1).add(radii).add(vec(0, -0.5).mult(realSize));
  return (
    <ToolTip message="Cria círculo com centro no ponto e tangente à direção do segmento selecionados. ">
      <button className={cn("", className)} onClick={addCircle} {...rest}>
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
    </ToolTip>
  );
};

//---------------------------------------------------------
//-------------------------OPTION 4 - CRICLE FROM THREE POINTS
//---------------------------------------------------------

export const CircleFromThreePoints: React.FC<
  PropsType & { store: State & Action }
> = ({ className, store, ...rest }) => {
  const addCircle = () => {
    const selectedPoints = getSelected("point", store);
    const p1 = selectedPoints[0];
    const p2 = selectedPoints[1];
    const p3 = selectedPoints[2];
    if (!(selectedPoints && selectedPoints.length === 3 && p1 && p2 && p3)) {
      toast.error(
        "Por favor selecione três pontos não colineares para criar um círculo dessa maneira. ",
      );
      return;
    }

    if (areCollinear(p1.coords, p2.coords, p3.coords)) {
      toast.error(
        "Por favor selecione três pontos não colineares, isto é, que não estão alinhados. ",
      );
      return;
    }

    const { center, radius } = getCircleFromThreePoints(
      p1.coords,
      p2.coords,
      p3.coords,
    );

    if (radius === 0) {
      toast.error(
        "Parece que você selecionou pontos iguais entre si. Por favor selecione pontos diferentes, e não colineares. ",
      );
      return;
    }

    const newCircleId = store.generateId("circle");

    const newCircle = createCircle(
      "circleFromThreePoints",
      { p1: p1.id, p2: p2.id, p3: p3.id },
      center,
      radius,
      newCircleId,
    );

    store.update(newCircle);

    return;
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
    <ToolTip message="Cria círculo que passa pelos três pontos selecionados. ">
      <button className={cn("", className)} onClick={addCircle} {...rest}>
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
    </ToolTip>
  );
};
