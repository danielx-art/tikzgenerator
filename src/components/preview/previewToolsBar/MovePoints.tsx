import ToolTip from "import/components/micro/ToolTip";
import { cn } from "import/utils/misc/cn";
import { vec } from "import/utils/math/vetores";
import useStore from "import/utils/store/useStore";
import { Move } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { Toggle } from "import/components/micro/ui/toggle";
import configStore from "import/utils/store/configStore";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement>;

const MovePoints: React.FC<PropsType> = ({ className, onClick, ...rest }) => {
  const configs = useStore(configStore, (state) => state);

  const toggleMovement = () => {
    configs &&
      configs.setConfig("ENABLE_MOVE", configs?.ENABLE_MOVE === 0 ? 1 : 0);
  };

  return (
    <ToolTip message="Selecione para poder mover pontos. ">
      <Toggle
        className={cn("", className)}
        onPressedChange={toggleMovement}
        pressed={configs?.ENABLE_MOVE === 0 ? false : true}
        disabled = {configs === undefined}
        {...rest}
      >
        <Move className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </Toggle>
    </ToolTip>
  );
};

export default MovePoints;
