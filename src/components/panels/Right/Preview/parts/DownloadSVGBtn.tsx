import { RES_SVG_FACTOR } from "public/generalConfigs";

type PropsType = {
  svgRef: React.RefObject<SVGSVGElement>;
};

const DownloadSVGBtn: React.FC<PropsType> = ({ svgRef }) => {

  const handleDownload = () => {
    if (svgRef.current) {
      downloadSvgAsPng(svgRef, "figura_.png").catch((error) => {
        console.error("Error downloading the image:", error);
      });
    }
  };

  return (
    <button className="" onClick={handleDownload}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
      </svg>
    </button>
  );
};

export default DownloadSVGBtn;

async function downloadSvgAsPng(svgRef: React.RefObject<SVGSVGElement>, fileName: string): Promise<void> {
    if (!svgRef.current) {
        console.error('SVG element not found');
        return;
    }

    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const image = new Image();

    return new Promise((resolve, reject) => {
        image.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = image.width*RES_SVG_FACTOR;
            canvas.height = image.height*RES_SVG_FACTOR;

            const ctx = canvas.getContext("2d");
            if (!ctx) {
                console.error('Unable to get canvas context');
                reject(new Error('Canvas context not available'));
                return;
            }

            ctx.drawImage(image, 0, 0, image.width*RES_SVG_FACTOR, image.height*RES_SVG_FACTOR);
            URL.revokeObjectURL(url);

            // Using toDataURL as a fallback method
            const imgDataUrl = canvas.toDataURL("image/png");

            // Convert data URL to blob
            fetch(imgDataUrl)
                .then(res => res.blob())
                .then(blob => {
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
                .catch(error => {
                    console.error('Error converting canvas to Blob', error);
                    reject(error);
                });
        };

        image.onerror = () => {
            console.error('Error loading SVG as image');
            reject(new Error('Error loading SVG as image'));
        };

        image.src = url;
    });
}