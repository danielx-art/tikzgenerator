import Dropdown from "import/components/micro/Dropdown";
import type { ButtonHTMLAttributes, Ref } from "react";
import { forwardRef } from "react";
import DownloadSVGBtn from "./DownloadSVGBtn";
import GetTikzBtn from "./GetTikzBtn";
import DownloadPNGBtn from "./DownloadPNGBtn";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement>;

const DownloadMenu = forwardRef<SVGSVGElement, PropsType>(function (
  { className, ...rest },
  ref: Ref<SVGSVGElement>,
) {
  return (
    <Dropdown
      keyword="download-menu"
      className="my-auto box-border"
      openClasses="translate-y-1 bg-background ring-2 rounded-sm ring-muted"
    >
      <GetTikzBtn className={className} {...rest} />
      <DownloadSVGBtn ref={ref} className={className} {...rest} />
      <DownloadPNGBtn ref={ref} className={className} {...rest} />
    </Dropdown>
  );
});

export default DownloadMenu;
