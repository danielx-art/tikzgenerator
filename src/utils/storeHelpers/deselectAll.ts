import type { Action, State } from "../store/store";
import { getSelected } from "./entityGetters";

export const deselectAll = (store: (State & Action) | undefined) => {
  if (!store) return;

  const selectedPoints = getSelected("point", store);
  const selectedSegments = getSelected("segment", store);
  const selectedAngles = getSelected("angle", store);
  const selectedCircles = getSelected("circle", store);
  const selectedPolygons = getSelected("polygon", store);
  const selectedTags = getSelected("tag", store);

  const updatedPoints = new Map(store.points);
  const updatedSegments = new Map(store.segments);
  const updatedAngles = new Map(store.angles);
  const updatedCircles = new Map(store.circles);
  const updatedPolygons = new Map(store.polygons);
  // const updatedTags = new Map(store.tags);

  if (selectedPoints.length > 0) {
    selectedPoints.forEach((point) => {
      updatedPoints.set(point.id, { ...point, selected: false });
    });
  }

  if (selectedSegments.length > 0) {
    selectedSegments.forEach((seg) => {
      updatedSegments.set(seg.id, { ...seg, selected: false });
    });
  }

  if (selectedAngles.length > 0) {
    selectedAngles.forEach((ang) => {
      updatedAngles.set(ang.id, { ...ang, selected: false });
    });
  }

  if (selectedCircles.length > 0) {
    selectedCircles.forEach(circle => {
      updatedCircles.set(circle.id, {...circle, selected: false})
    });
  }

  if (selectedPolygons.length > 0) {
    selectedPolygons.forEach(polygon => {
      updatedPolygons.set(polygon.id, {...polygon, selected: false})
    });
  }

  if (selectedTags.length > 0) {
    // selectedTags.forEach(tag => {
    //   updatedTags.set(tag.id, {...tag, selected: false})
    // });
  }

  store.set({
    ...store,
    points: updatedPoints,
    segments: updatedSegments,
    angles: updatedAngles,
    circles: updatedCircles,
    polygons: updatedPolygons,
    selections: [],
  });
};
