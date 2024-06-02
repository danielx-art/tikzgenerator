import Dropdown from "import/components/micro/Dropdown";
import type { ButtonHTMLAttributes, Ref } from "react";
import ConnectButton from "./ConnectButton";
import CloseLoopButton from "./CloseLoopButton";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement>;

const ConnectMenu: React.FC<PropsType> = ({ className, ...rest }) => {
  return (
    <Dropdown
      keyword="download-menu"
      className="my-auto box-border"
      openClasses="translate-y-1 bg-background ring-2 rounded-sm ring-muted"
    >
      <ConnectButton className={className} {...rest} />
      <CloseLoopButton className={className} {...rest} />
    </Dropdown>
  );
};

export default ConnectMenu;
