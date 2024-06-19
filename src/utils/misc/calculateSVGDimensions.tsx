import { vec } from "../math/vetores";
import { ConfigActions, ConfigState } from "../store/configStore";
import { State } from "../store/store";

export const calculateSVGDimensions = (
  points: State["points"],
  circles: State["circles"] | undefined,
  tags: State["tags"] | undefined,
  configs: ConfigState & ConfigActions,
  containerDimensions: { width: number; height: number },
) => {
  const { RES_FACTOR_SVG, DEFAULT_POINT_SIZE, PREVIEW_SCALE } = configs;

  let SVGDimensions = {
    width: 0,
    height: 0,
    viewBox: { x: 0, y: 0, width: 0, height: 0 },
  };

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  points.forEach((point) => {
    minX = Math.min(minX, point.coords.x);
    maxX = Math.max(maxX, point.coords.x);
    minY = Math.min(minY, point.coords.y);
    maxY = Math.max(maxY, point.coords.y);
  });

  if (circles && circles.size > 0) {
    circles.forEach((circle) => {
      const cLeft = circle.center.x - circle.radius;
      if (cLeft < minX) minX = cLeft;

      const cTop = circle.center.y + circle.radius;
      if (cTop > maxY) maxY = cTop;

      const cRight = circle.center.x + circle.radius;
      if (cRight > maxX) maxX = cRight;

      const cBottom = circle.center.y - circle.radius;
      if (cBottom < minY) minY = cBottom;
    });
  }

  if (configs.AUTO_PREVIEW_RESIZE === 1) {
    if (tags && tags.size > 0) {
      tags.forEach((tag) => {
        const tagPos = vec().copy(tag.anchor).add(vec().copy(tag.pos));

        const tLeft = tagPos.x - tag.size;
        if (tLeft < minX) minX = tLeft;

        const tTop = tagPos.y + tag.size;
        if (tTop > maxY) maxY = tTop;

        const tRight = tagPos.x + tag.size;
        if (tRight > maxX) maxX = tRight;

        const tBottom = tagPos.y - tag.size;
        if (tBottom < minY) minY = tBottom;
      });
    }
  }

  let padding = 0.5 / PREVIEW_SCALE; //of the maximum dimension

  //avoid infinities
  if (minX === Infinity) minX = 0;
  if (maxX === -Infinity) maxX = 2;
  if (minY === Infinity) minY = 0;
  if (maxY === -Infinity) maxY = 2;

  let properWidth = maxX - minX;
  let properHeight = maxY - minY;

  //avoid equal values when points are colinear

  const approximate = (a: number, b: number, tolerance = 0.05) => Math.abs(a-b) < tolerance ? true : false;

  if (approximate(minX, maxX) && approximate(minY, maxY)) {
    //cold be theres only one point or two identical points (maybe take care of that when creating points.)
    if (points.size >= 1) {
      const onepoint = Array.from(points.values())[0];
      const onesize = onepoint ? onepoint.size : DEFAULT_POINT_SIZE;
      //center the point
      minX -= onesize / 2;
      maxY += onesize / 2;

      properWidth = onesize;
      properHeight = properWidth;
      padding = 2;
    }
  } else if (approximate(minX, maxX) && !approximate(minY, maxY)) {
    const len = maxY - minY;
    if (points.size >= 1) {
      //center the point
      minX -= len / 2;
    }
    //make it a square
    maxX = minX + len;
    properWidth = len;
  } else if (!approximate(minX, maxX) && approximate(minY, maxY)) {
    const len = maxX - minX;
    if (points.size >= 1) {
      minY -= len / 2;
    }
    //make it a square again
    maxY = minY + len;
    properHeight = len;
  }

  const viewAR = properWidth / properHeight;

  //rescale
  minX *= RES_FACTOR_SVG * PREVIEW_SCALE;
  maxX *= RES_FACTOR_SVG * PREVIEW_SCALE;
  minY *= RES_FACTOR_SVG * PREVIEW_SCALE;
  maxY *= RES_FACTOR_SVG * PREVIEW_SCALE;
  properWidth *= RES_FACTOR_SVG * PREVIEW_SCALE;
  properHeight *= RES_FACTOR_SVG * PREVIEW_SCALE;

  padding = viewAR >= 1 ? (padding *= properWidth) : (padding *= properHeight);

  let viewBoxX = +(minX - padding);
  let viewBoxY = -(maxY + padding);
  let viewBoxWidth = properWidth + 2 * padding;
  let viewBoxHeight = properHeight + 2 * padding;

  const pixelAR = containerDimensions.width / containerDimensions.height;

  let updatedW = 0;
  let updatedH = 0;

  if (viewAR >= pixelAR) {
    //image is fatter than container, so image width needs to be cap set to the container width
    //and the image height should be set to keep viewAR

    updatedW = containerDimensions.width;
    updatedH = containerDimensions.width / viewAR;
  } else {
    //image is taller than container, so image height should be cap set to container height
    //and image width should be set to keep viewAR

    updatedW = viewAR * containerDimensions.height;
    updatedH = containerDimensions.height;
  }

  let updatedViewBox = {
    x: viewBoxX,
    y: viewBoxY,
    width: viewBoxWidth,
    height: viewBoxHeight,
  };

  SVGDimensions = {
    width: updatedW,
    height: updatedH,
    viewBox: updatedViewBox,
  };

  return SVGDimensions;
};
