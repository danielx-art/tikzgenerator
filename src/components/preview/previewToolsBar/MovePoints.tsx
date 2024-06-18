import ToolTip from "import/components/micro/ToolTip";
import { cn } from "import/utils/misc/cn";
import { vec } from "import/utils/math/vetores";
import useStore from "import/utils/store/useStore";

import { ButtonHTMLAttributes } from "react";
import { Toggle } from "import/components/micro/ui/toggle";
import configStore from "import/utils/store/configStore";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement>;

const MovePoints: React.FC<PropsType> = ({ className, onClick, ...rest }) => {
  const configs = useStore(configStore, (state) => state);

  if (!configs) return;

  const toggleMovement = () => {
    configs &&
      configs.setConfig("ENABLE_MOVE", configs?.ENABLE_MOVE === 0 ? 1 : 0);
  };

  const realSize = 24;
  const p1 = vec(0.6, 0.9).mult(realSize);
  const p2 = vec(0.9, 0.35).mult(realSize);
  const p3 = vec(0.5, 0.1).mult(realSize);
  const p4 = vec(0.1, 0.3).mult(realSize);
  const p5 = vec(0.15, 0.8).mult(realSize);
  const ps = [p1, p2, p3, p4, p5];

  return (
    <ToolTip message="Selecione para poder mover pontos. ">
      <Toggle
        className={cn("", className)}
        onPressedChange={toggleMovement}
        pressed={configs?.ENABLE_MOVE === 0 ? false : true}
        {...rest}
      >
        <p>H</p>
      </Toggle>
    </ToolTip>
  );
};

export default MovePoints;
