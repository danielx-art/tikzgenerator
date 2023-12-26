import { vec } from "import/utils/math/vetores";
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { getSelected } from "import/utils/storeHelpers/miscEntity";
import { Tpoint, angulo, ponto, segmento } from "public/entidades";
import { useEffect, useState } from "react";

const PointOrthoProjection: React.FC = () => {
  const store = useStore(myStore, (state) => state);

  const [thisPoints, setThisPoints] = useState<
    [Tpoint, Tpoint, Tpoint] | undefined
  >();
  const [makeHeight, setMakeHeight] = useState(true);

  useEffect(() => {
    if (!store) return;
    const selectedPoints = getSelected("point", store);
    const fstPoint = selectedPoints[0];
    const secPoint = selectedPoints[1];
    const trdPoint = selectedPoints[2];
    if (!fstPoint || !secPoint || !trdPoint) {
      return;
    } else {
      setThisPoints([fstPoint, secPoint, trdPoint]);
    }
  }, [store, store?.selections]);

  const handleClick = () => {
    if (!thisPoints) return;
    if (!store) return;
    const [a, b, c] = thisPoints;
    const ba = vec().copy(a.coords).sub(vec().copy(b.coords));
    const bc = vec().copy(c.coords).sub(vec().copy(b.coords));
    const bcversor = vec().copy(bc).setMag(1);
    const baprojmag = vec().copy(ba).dot(bcversor);
    const baproj = vec().copy(ba).setMag(baprojmag);
    const newPointCoords = vec().copy(baproj).add(vec().copy(b.coords));
    const newId = store.generateId("point");
    const newPoint = ponto(newPointCoords, newId, store.selectedGroup);
    const updatedPoints = new Map(store.points);
    updatedPoints.set(newId, newPoint);
    store.setPoints(updatedPoints);
    if (!makeHeight) return;
    const newSegId = store.generateId("segment");
    const newAngId = store.generateId("angle");
    const newSeg = segmento(a, newPoint, newSegId);
    const newAng = angulo(a, newPoint, c, newAngId);
    const updatedSegments = new Map(store.segments);
    updatedSegments.set(newSegId, newSeg);
    const updatedAngles = new Map(store.angles);
    updatedAngles.set(newAngId, newAng);
    store.setSegments(updatedSegments);
    store.setAngles(updatedAngles);
  };

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <button
        onClick={handleClick}
        className="rounded-sm bg-c_interact p-2 text-c_base shadow-md hover:bg-c_high1"
        disabled={thisPoints ? false : true}
      >
        Criar ponto
      </button>
    </div>
  );
};

export default PointOrthoProjection;
