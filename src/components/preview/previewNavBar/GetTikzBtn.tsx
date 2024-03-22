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
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="h-full w-full p-1"
        >
          <path
            className=" scale-50 translate-x-1/2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
          />

          <text x={2.5} y={22} className="text-[0.7rem] font-thin">
            Tikz
          </text>
        </svg>
      </button>
    </ToolTip>
  );
};

export default GetTikzBtn;
