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

  return (
    <div
      className={`${
        highlight ? "bg-c_scnd_int bg-opacity-10" : null
      } flex w-full flex-row flex-nowrap justify-stretch text-sm text-c_scnd_int`}
    >
      <div className="flex-1 select-none py-1 pl-4 pr-2 grid grid-cols-[1fr_1fr_auto_auto]">
        {children}
      </div>
    </div>
  );
};

export default Item;
