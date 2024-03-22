import { circle } from "public/entidades";
import type { Action, State } from "../store/store";
import { DEFAULT_CIRCLE_RADIUS } from "public/generalConfigs";
import { vec } from "../math/vetores";
import { getSelected } from "./entityGetters";
import { distanceFromPointToLine } from "../math/distancePointToLine";
import { findCircleFromThreePoints } from "../math/findCircleFromThreePoints";
import { toast } from "sonner";

export function createCircleFromOnePoint(store: State & Action) {
  const selectedPoints = getSelected("point", store);

  if (!selectedPoints || selectedPoints.length == 0) {
    toast.error(
      "Por favor selecione um ponto para criar um círculo dessa maneira. ",
    );
    return;
  }

  const center = selectedPoints[0];

  if (!center) return;

  const updatedCircles = new Map(store.circles);

  const newCircleId = store.generateId("circle");

  const newCircle = circle(center.coords, DEFAULT_CIRCLE_RADIUS, newCircleId);

  updatedCircles.set(newCircleId, newCircle);

  store.setCircles(updatedCircles);

  return;
}

export function createCircleFromTwoPoints(store: State & Action) {
  const selectedPoints = getSelected("point", store);

  if (!selectedPoints || selectedPoints.length < 2) {
    toast.error(
      "Por favor selecione ao menos dois pontos para criar um círculo dessa maneira. ",
    );
    return;
  }

  const center = selectedPoints[0];
  const limit = selectedPoints[1];

  if (!center || !limit) return;

  const updatedCircles = new Map(store.circles);

  const newCircleId = store.generateId("circle");

  const newRadius = vec().copy(center.coords).dist(vec().copy(limit.coords));

  const newCircle = circle(center.coords, newRadius, newCircleId);

  updatedCircles.set(newCircleId, newCircle);

  store.setCircles(updatedCircles);

  return;
}

export function createCircleFromTangent(store: State & Action) {
  const selectedPoints = getSelected("point", store);
  const selectedLines = getSelected("segment", store);

  if (
    !(selectedPoints && selectedLines) ||
    selectedPoints.length == 0 ||
    selectedLines.length == 0
  ) {
    toast.error(
      "Por favor selecione um ponto e um segmento para criar um círculo dessa maneira. ",
    );
    return;
  }

  const center = selectedPoints[0];
  const line = selectedLines[0];

  if (!center || !line) return;

  const updatedCircles = new Map(store.circles);

  const newCircleId = store.generateId("circle");

  const newRadius = distanceFromPointToLine(center, line);

  if (!newRadius) {
    toast.error(
      "Por favor selecione um ponto que não esteja no próprio segmento selecionado, ou selecione outro segmento para criar um círculo dessa maneira. ",
    );
    return;
  }

  const newCircle = circle(center.coords, newRadius, newCircleId);

  updatedCircles.set(newCircleId, newCircle);

  store.setCircles(updatedCircles);

  return;
}

export function createCircleFromThreePoints(store: State & Action) {
  const selectedPoints = getSelected("point", store);

  if (!selectedPoints || selectedPoints.length < 3) {
    toast.error(
      "Por favor selecione ao menos três pontos não colineares para criar um círculo dessa maneira. ",
    );
    return;
  }

  const p1 = selectedPoints[0];
  const p2 = selectedPoints[1];
  const p3 = selectedPoints[2];

  if (!(p1 && p2 && p3)) return;

  const updatedCircles = new Map(store.circles);

  const newCircleId = store.generateId("circle");

  const circleParams = findCircleFromThreePoints(
    p1.coords,
    p2.coords,
    p3.coords,
  );

  if (!circleParams) {
    toast.error(
      "Por favor selecione ao menos três pontos não colineares para criar um círculo dessa maneira. ",
    );
    return;
  }

  const { center, radius } = circleParams;

  const newCircle = circle(center, radius, newCircleId);

  updatedCircles.set(newCircleId, newCircle);

  store.setCircles(updatedCircles);

  return;
}
