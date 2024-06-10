import { useState } from "react";
import DialogBox from "../micro/DialogBox";
import Link from "next/link";

const What = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6 transition-all duration-75 hover:-translate-y-0.5 hover:text-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
          />
        </svg>
      </button>
      <DialogBox
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeButton
        className="max-w-[60%] leading-10"
      >
        <p>
          <span className="inline text-foreground">GeoSimples</span> é uma
          ferramenta para desenhar figuras geométricas simples, criada por{" "}
          <Link
            href={"https://danielx-art.github.io/astro-folio/"}
            className=" italic underline underline-offset-4 hover:text-foreground"
            target="_blanck"
            rel="noopener noreferrer"
          >
            Daniel
          </Link>
          .
        </p>
        <p>
          Feita para educadores (e por um educador), especialmente os criadores
          de conteúdo educativo, como materiais didáticos e testes.
        </p>
      </DialogBox>
    </>
  );
};

export default What;
