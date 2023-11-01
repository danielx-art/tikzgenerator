import { Tponto } from "public/entidades";
import myStore from "import/utils/store";
import { RemoveButton } from "../../../micro/RemoveButton";
import useStore from "import/utils/useStore";
import Item from "./Item";

type PropsType = {
  point: Tponto;
  index: number;
};

const PointItem: React.FC<PropsType> = ({ point, index }) => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { points, setPoints, segments, setSegments, angles, setAngles, tags, setTags } = store;

  function handlePointClick(index: number) {
    const updatedPoints = [...points];
    let thisPoint = updatedPoints[index] as Tponto;
    thisPoint.selected = !thisPoint.selected;
    setPoints(updatedPoints);
  }

  function removePoint(index: number) {

    const pointIdToRemove = points[index]!.id;

    // Filter out the point from the points array
    const filteredPoints = points.filter((point) => point.id !== pointIdToRemove);
  
    // Filter out related segments and angles, and store their IDs
    const removedSegmentIds: string[] = [];
    const removedAngleIds: string[] = [];
  
    const filteredSegments = segments.filter((segment) => {
      if (segment.p1.id === pointIdToRemove || segment.p2.id === pointIdToRemove) {
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
    <Item highlight={point.selected}>
      <div onClick={() => handlePointClick(index)}>
        {point.coords.x};{point.coords.y}
      </div>
      <div>{tags.find((tag) => tag.entityId == point.id)?.value || ""}</div>
      <RemoveButton handleClick={() => removePoint(index)} />
    </Item>
  );
};

export default PointItem;
