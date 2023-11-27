import { Tpoint } from "public/entidades";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import Item from "./Item";
import { roundAndDisplayNicely } from "import/utils/misc";

type PropsType = {
  point: Tpoint;
  index: number;
};

const PointItem: React.FC<PropsType> = ({ point, index }) => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const {
    points,
    setPoints,
    segments,
    setSegments,
    angles,
    setAngles,
    tags,
    setTags,
  } = store;

  function handlePointClick(index: number) {
    let thisPoint = points[index] as Tpoint;

    const updatedPoints = [...points].map(point=>(point.id===thisPoint.id ? {...point, selected: !point.selected} : point));

    setPoints(updatedPoints);
  }

  function removePoint(index: number) {
    const pointIdToRemove = points[index]!.id;

    // Filter out the point from the points array
    const filteredPoints = points.filter(
      (point) => point.id !== pointIdToRemove,
    );

    // Filter out related segments and angles, and store their IDs
    const removedSegmentIds: string[] = [];
    const removedAngleIds: string[] = [];

    const filteredSegments = segments.filter((segment) => {
      if (
        segment.p1.id === pointIdToRemove ||
        segment.p2.id === pointIdToRemove
      ) {
        removedSegmentIds.push(segment.id);
        return false;
      }
      return true;
    });

    const filteredAngles = angles.filter((angle) => {
      if (
        angle.a.id === pointIdToRemove ||
        angle.b.id === pointIdToRemove ||
        angle.c.id === pointIdToRemove
      ) {
        removedAngleIds.push(angle.id);
        return false;
      }
      return true;
    });

    // Filter out tags associated with the removed point, segments, and angles
    const filteredTags = tags.filter((tag) => {
      if (
        tag.entityId === pointIdToRemove ||
        removedSegmentIds.includes(tag.entityId) ||
        removedAngleIds.includes(tag.entityId)
      ) {
        return false;
      }
      return true;
    });

    // Update the arrays with the filtered data
    setPoints(filteredPoints);
    setSegments(filteredSegments);
    setAngles(filteredAngles);
    setTags(filteredTags);
  }

  return (
    <Item
      highlight={point.selected}
      removeFn={() => removePoint(index)}
      handleClickFn={() => handlePointClick(index)}
    >
      <div>
        {roundAndDisplayNicely(point.coords.x)};
        {roundAndDisplayNicely(point.coords.y)}
      </div>
      <div>{tags.find((tag) => tag.entityId == point.id)?.value || ""}</div>
      {point.selected ? (
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-c_base bg-opacity-60 text-xs font-bold text-c_high1 ring-1 ring-c_high1">
          {[...points].filter(point=>point.selected).findIndex((selpt) => selpt.id == point.id) + 1}
        </div>
      ) : (
        <div className="w-4"></div>
      )}
    </Item>
  );
};

export default PointItem;
