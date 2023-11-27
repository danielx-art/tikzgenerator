import { Tsegment } from "public/entidades";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import Item from "./Item";

type PropsType = {
  segment: Tsegment;
  index: number;
};

const SegmentItem: React.FC<PropsType> = ({ segment, index }) => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const { segments, setSegments, tags } = store;

  function handleSegmentClick(index: number) {
    const updatedSegments = [...segments];
    let thisSeg = updatedSegments[index] as Tsegment;
    thisSeg.selected = !thisSeg.selected;
    setSegments(updatedSegments);
  }

  function removeSegment(index: number) {
    const updatedSegments = [...segments];
    updatedSegments.splice(index, 1);
    setSegments(updatedSegments);
  }

  return (
    <Item
      highlight={segment.selected}
      removeFn={() => removeSegment(index)}
      handleClickFn={() => handleSegmentClick(index)}
    >
      <div onClick={() => handleSegmentClick(index)}>
        {segment.p1.etiqueta.length > 0
          ? segment.p1.etiqueta
          : "(" + segment.p1.coords.x + ";" + segment.p1.coords.y + ")"}
        ---
        {segment.p2.etiqueta.length > 0
          ? segment.p2.etiqueta
          : "(" + segment.p2.coords.x + ";" + segment.p2.coords.y + ")"}
      </div>
      <div>{tags.find((tag) => tag.entityId == segment.id)?.value || ""}</div>
    </Item>
  );
};

export default SegmentItem;
