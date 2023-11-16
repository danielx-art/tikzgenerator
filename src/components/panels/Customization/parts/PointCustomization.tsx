import Paginator from "import/components/micro/Paginator";
import { Tponto } from "public/entidades";
import { useState } from "react";

type PropsType = {
  points: Array<Tponto>;
  setPoints: (points: Array<Tponto>) => void;
};

const PointCustomization: React.FC<PropsType> = ({ points, setPoints }) => {
  const [curr, setCurr] = useState(0);

  const elements = points.filter((point) => point.selected);

  return (
    <div className="flex flex-col gap-1 text-c_scnd">
        <div className="w-full flex flex-row justify-between">
            <div className="text-c_scnd2 text-sm text-opacity-60 italic">{elements.length} pontos selecionados</div>
            <Paginator curr={curr} setCurr={setCurr} total={elements.length} />
        </div>
        <div>
            <div>Destaque</div>
            <div>Nenhum</div>
            <div>O</div>
            <div>*</div>
        </div>
    </div>
  );
};

export default PointCustomization;
