/*
import { Tpoint, createCircle } from "public/entidades";
import type { Action, State } from "../store/store";
import { vec } from "../math/vetores";
import { getSelected } from "./entityGetters";
import { distanceFromPointToLine } from "../math/distancePointToLine";
import { findCircleFromThreePoints } from "../math/findCircleFromThreePoints";
import { toast } from "sonner";
import configStore from "../store/configStore";

export function createCircleFromOnePoint(store: State & Action) {
  const selectedPoints = getSelected("point", store);

  if (!selectedPoints || selectedPoints.length !== 1 || !selectedPoints[0]) {
    toast.error(
      "Por favor selecione um ponto, e apenas um, para criar um círculo dessa maneira. ",
    );
    return;
  }

  const centerPoint = selectedPoints[0] as Tpoint;

  const center = (updatedStore: State & Action)=>updatedStore.points.get(centerPoint.id)?.coords || centerPoint.coords;

  if (!center) return;

  const newCircleId = store.generateId("circle");

  const newCircle = createCircle(center, configStore.getState().DEFAULT_CIRCLE_RADIUS, newCircleId);

  store.update(newCircle)

  return;
}

export function createCircleFromTwoPoints(store: State & Action) {
  const selectedPoints = getSelected("point", store);

  if (!selectedPoints || selectedPoints.length !== 2) {
    toast.error(
      "Por favor selecione ao dois pontos para criar um círculo dessa maneira. ",
    );
    return;
  }

  const centerPoint = selectedPoints[0] as Tpoint;
  const limitPoint = selectedPoints[1] as Tpoint;

  if (!centerPoint || !limitPoint) return;

  const center = (updatedStore: State & Action)=>updatedStore.points.get(centerPoint.id)?.coords || centerPoint.coords;

  const newCircleId = store.generateId("circle");

  const newRadius = (updatedStore: State & Action)=>{
    const limit = ()=>store.points.get(limitPoint.id)?.coords || limitPoint.coords;
    return vec().copy(center(updatedStore)).dist(vec().copy(limit()));
  };

  const newCircle = createCircle(center, newRadius, newCircleId);

  store.update(newCircle)

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

  const centerPoint = selectedPoints[0];
  const line = selectedLines[0];

  if (!centerPoint || !line) return;

  const center = (updatedStore: State & Action)=>updatedStore.points.get(centerPoint.id)?.coords || centerPoint.coords;

  const newCircleId = store.generateId("circle");

  const newRadius = (updatedStore: State & Action)=>{
    return distanceFromPointToLine(store.points.get(centerPoint.id) || centerPoint, store.segments.get(line.id) || line, store.points);
  }

  if (!newRadius(store)) {
    toast.error(
      "Por favor selecione um ponto que não esteja no próprio segmento selecionado, ou selecione outro segmento para criar um círculo dessa maneira. ",
    );
    return;
  }

  const newCircle = createCircle(center, newRadius as (updatedStore: State & Action)=>number, newCircleId);

  store.update(newCircle)

  return;
}

export function createCircleFromThreePoints(store: State & Action) {
  const selectedPoints = getSelected("point", store);

  if (!selectedPoints || selectedPoints.length == 3) {
    toast.error(
      "Por favor selecione três pontos não colineares para criar um círculo dessa maneira. ",
    );
    return;
  }

  const p1 = selectedPoints[0];
  const p2 = selectedPoints[1];
  const p3 = selectedPoints[2];

  if (!(p1 && p2 && p3)) return;

  const newCircleId = store.generateId("circle");

  const circleParams = (updatedStore: State & Action) => findCircleFromThreePoints(
    updatedStore.points.get(p1.id)?.coords || p1.coords,
    updatedStore.points.get(p2.id)?.coords || p2.coords,
    updatedStore.points.get(p3.id)?.coords || p3.coords,
  );

  if (!circleParams(store)) {
    toast.error(
      "Por favor selecione ao menos três pontos não colineares para criar um círculo dessa maneira. ",
    );
    return;
  }

  const center = (updatedStore: State & Action) => {
    const value = circleParams(updatedStore)?.center
    if(value) return value;
    toast.error("Opa, você tentou criar um círculo com centro no infinito!")
    return undefined;
  }

  const radius = (updatedStore: State & Action) => {
    const value = circleParams(updatedStore)?.radius
    if(value) return value;
    toast.error("Opa, você tentou criar um círculo com raio infinito, ou zero!")
    return undefined;
  }

  const newCircle = createCircle(center, radius, newCircleId);

  store.update(newCircle)

  return;
}
*/
