import ToolTip from "import/components/micro/ToolTip";
import { cn } from "import/utils/cn";
import type { ButtonHTMLAttributes, Ref, RefObject } from "react";
import { forwardRef } from "react";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement>;

const DownloadSVGBtn = forwardRef<SVGSVGElement, PropsType>(function (
  { className },
  ref: Ref<SVGSVGElement>,
) {

  const handleDownload = () => {
    if ((ref as RefObject<SVGSVGElement>).current) {
      downloadSvgAsSvg(ref as RefObject<SVGSVGElement>, "figura_.svg").catch(
        (error) => {
          console.error("Error downloading the image:", error);
        },
      );
    }
  };

  return (
    <ToolTip message="Salva a imagem como arquivo SVG">
      <button className={cn("", className)} onClick={handleDownload}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-full w-full p-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 14 L12 18m0 0L7.5 14m4.5 4.5"
            className="translate-y-0.5"
          />
          <text x={2.5} y={12} className="text-[0.7rem] font-thin">
            SVG
          </text>
        </svg>
      </button>
    </ToolTip>
  );
});

export default DownloadSVGBtn;

async function downloadSvgAsSvg(
  svgRef: React.RefObject<SVGSVGElement>,
  fileName: string,
): Promise<void> {
  if (!svgRef.current) {
    console.error("SVG element not found");
    return;
  }

  const svgData = new XMLSerializer().serializeToString(svgRef.current);

  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });

  const url = URL.createObjectURL(svgBlob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
