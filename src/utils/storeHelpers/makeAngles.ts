import { type Tpoint, createAngle } from "public/entidades";
import type { Action, State } from "../store/store";
import { getSelected } from "./entityGetters";
import { toast } from "sonner";

export const makeAngles = (
  store: (State & Action) | undefined,
  cyclic: boolean = false,
) => {
  if (!store) return;

  const selectedPoints = getSelected("point", store);

  const { generateId } = store;

  if (selectedPoints.length < 3) {
    toast.error(
      "Você precisa selecionar no mínimo três pontos para criar um ângulo.",
    );
    return;
  }

  for (let i = 0; i < selectedPoints.length - 2; i++) {
    const pA = selectedPoints[i] as Tpoint;
    const pB = selectedPoints[i + 1] as Tpoint;
    const pC = selectedPoints[i + 2] as Tpoint;
    const newAngleId = generateId("angle");
    const newAngle = createAngle(pA.id, pB.id, pC.id, newAngleId);
    store.update(newAngle)
  }

  if (cyclic) {
    const closingAngId = generateId("angle");
    const scndlastPoint = selectedPoints[selectedPoints.length - 2] as Tpoint;
    const lastPoint = selectedPoints[selectedPoints.length - 1] as Tpoint;
    const firstPoint = selectedPoints[0] as Tpoint;
    const closingAng = createAngle(
      scndlastPoint.id,
      lastPoint.id,
      firstPoint.id,
      closingAngId,
    );
    store.update(closingAng)
  }
};
