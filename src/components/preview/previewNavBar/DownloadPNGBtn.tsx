import ToolTip from "import/components/micro/ToolTip";
import { cn } from "import/utils/cn";
import configStore from "import/utils/store/configStore";
import useStore from "import/utils/store/useStore";
import { initConfigs } from "public/generalConfigs";
import type { ButtonHTMLAttributes, Ref, RefObject } from "react";
import { forwardRef } from "react";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement>;

const DownloadPNGBtn = forwardRef<SVGSVGElement, PropsType>(function (
  { className },
  ref: Ref<SVGSVGElement>,
) {

  const RES_FACTOR_SVG = useStore(configStore, (state)=>state.RES_FACTOR_SVG);

  const handleDownload = () => {
    if ((ref as RefObject<SVGSVGElement>).current) {
      downloadSvgAsPng(ref as RefObject<SVGSVGElement>, "figura_.png", RES_FACTOR_SVG || initConfigs.RES_FACTOR_SVG).catch(
        (error) => {
          console.error("Error downloading the image:", error);
        },
      );
    }
  };

  return (
    <ToolTip message="Salva a imagem como arquivo PNG">
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
            PNG
          </text>
        </svg>
      </button>
    </ToolTip>
  );
});

export default DownloadPNGBtn;

async function downloadSvgAsPng(
  svgRef: React.RefObject<SVGSVGElement>,
  fileName: string,
  scaleFactor: number
): Promise<void> {
  if (!svgRef.current) {
    console.error("SVG element not found");
    return;
  }

  const svgData = new XMLSerializer().serializeToString(svgRef.current);
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  const image = new Image();

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width * scaleFactor;
      canvas.height = image.height * scaleFactor;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Unable to get canvas context");
        reject(new Error("Canvas context not available"));
        return;
      }

      ctx.drawImage(
        image,
        0,
        0,
        image.width * scaleFactor,
        image.height * scaleFactor,
      );
      URL.revokeObjectURL(url);

      // Using toDataURL as a fallback method
      const imgDataUrl = canvas.toDataURL("image/png");

      // Convert data URL to blob
      fetch(imgDataUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const newUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = newUrl;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(newUrl);
          resolve();
        })
        .catch((error) => {
          console.error("Error converting canvas to Blob", error);
          reject(error);
        });
    };

    image.onerror = () => {
      console.error("Error loading SVG as image");
      reject(new Error("Error loading SVG as image"));
    };

    image.src = url;
  });
}
