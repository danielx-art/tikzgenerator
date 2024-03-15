import Dropdown from "import/components/micro/Dropdown";
import { cn } from "import/utils/cn";
import { RES_FACTOR } from "public/generalConfigs";
import type { ButtonHTMLAttributes, Ref } from "react";
import { forwardRef } from "react";
import DownloadSVGBtn from "./DownloadSVGBtn";
import GetTikzBtn from "./GetTikzBtn";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement>;

const DownloadMenu = forwardRef<SVGSVGElement, PropsType>(function (
  { className, ...rest },
  ref: Ref<SVGSVGElement>,
) {
  return (
    <Dropdown
      keyword="download-menu"
      className="my-auto box-border"
      openClasses="translate-y-1 bg-c_base ring-2 rounded-sm ring-c_discrete"
    >
      <DownloadSVGBtn ref={ref} className={className} {...rest} />
      <GetTikzBtn className={className} {...rest} />
    </Dropdown>
  );
});

export default DownloadMenu;
