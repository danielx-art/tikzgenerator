import { instanceOf } from "import/utils/misc";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import {
  type Tentity,
  type Tponto,
  type Tsegmento,
  type Tangulo,
} from "public/entidades";

type PropsType = {
  highlight: boolean;
  children?: React.ReactNode;
};

const Item: React.FC<PropsType> = ({ highlight, children }) => {
  //   const store = useStore(myStore, (state) => state);

  //   if(!store) return;

  //   const {points, setPoints, segments, setSegments, angles, setAngles} = store;

  //   function handleClick(index: number) {
  //     if(instanceOf<Tponto>(entity, "coords")) {
  //         const updatedPoints = [...points];
  //         let thisPoint = updatedPoints[index] as Tponto;
  //         thisPoint.selected = !thisPoint.selected;
  //         setPoints(updatedPoints);
  //     } else if(instanceOf<Tsegmento>(entity, "comprimento")) {
  //         const updatedSegments = [...segments];
  //         let thisSeg = updatedSegments[index] as Tsegmento;
  //         thisSeg.selected = !thisSeg.selected;
  //         setSegments(updatedSegments);
  //     } else if(instanceOf<Tangulo>(entity, "valor")) {
  //         const updatedAngles = [...angles];
  //         let thisAng = updatedAngles[index] as Tangulo;
  //         thisAng.selected = !thisAng.selected;
  //         setAngles(updatedAngles);
  //     }
  //   }

  return (
    <div
      className={`${
        highlight ? "bg-white bg-opacity-20" : null
      } flex w-full flex-row flex-nowrap justify-stretch text-sm text-a_highlight`}
    >
      <div className="flex-1 select-none py-1 pl-4 pr-2 grid grid-cols-[1fr_1fr_auto_auto]">
        {children}
      </div>
    </div>
  );
};

export default Item;
