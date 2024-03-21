import ToolTip from "import/components/micro/ToolTip";
import { cn } from "import/utils/cn";
import { vec } from "import/utils/math/vetores";
import myStore, { Action, State } from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import getTikzCode from "import/utils/tikz/getTikzCode";
import { ButtonHTMLAttributes } from "react";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement>;

const GetTikzBtn: React.FC<PropsType> = ({ className, ...rest }) => {
  const store = useStore(myStore, (state) => state);

  const copyTextToClipboard = async (text: string) => {
    if ("clipboard" in navigator) {
      // New Clipboard API
      try {
        await navigator.clipboard.writeText(text);
        console.log("Tikz code copied to clipboard");
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    } else {
      // Fallback: Document.execCommand (deprecated)
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand("copy");
        const msg = successful ? "successful" : "unsuccessful";
        console.log("Fallback: Copying text command was " + msg);
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <ToolTip message="Copia o código tikz da imagem para a área de transferência. ">
      <button
        className={cn("", className)}
        onClick={() => {
          const tikzCode = getTikzCode(store);
          if (!tikzCode) return;
          copyTextToClipboard(tikzCode);
        }}
        {...rest}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="gray"
          fillOpacity={1}
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="h-full w-full p-1"
        >
          <text x={2} y={20}>
            TZ
          </text>
        </svg>
      </button>
    </ToolTip>
  );
};

export default GetTikzBtn;
