import { LATEX_COLOR, LATEX_COLORS } from 'public/generalConfigs';
import React, { useState, useRef, useEffect } from 'react';

type PropsType = {
    selectedColor: string;
    setSelectedColor: React.Dispatch<React.SetStateAction<LATEX_COLOR>>;
}

const DicionarioCor = {
    "red": "vermelho",
    "green": "verde",
    "blue": "azul",
    "cyan": "ciano",
    "magenta": "magenta",
    "yellow": "amarelo",
    "black": "preto",
    "gray": "cinza",
    "white": "branco",
}

const ColorSelect: React.FC<PropsType> = ({selectedColor, setSelectedColor}) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-c_discrete shadow-sm px-4 py-2 bg-c_base text-sm font-medium text-c_scnd hover:bg-c_disabled focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedColor ? (
            <span className="flex items-center w-24">
              <span
                className="mr-2 inline-block h-4 w-4 rounded-full"
                style={{ backgroundColor: selectedColor }}
              />
              {DicionarioCor[selectedColor as LATEX_COLOR]}
            </span>
          ) : (
            'Select a color'
          )}
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-fit rounded-md shadow-lg bg-c_base ring-1 ring-c_scnd ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {LATEX_COLORS.map((color) => (
              <a
                key={color}
                className="text-c_scnd2 px-4 py-2 text-sm hover:bg-c_discrete cursor-pointer flex items-center"
                onClick={() => {
                  setSelectedColor(color);
                  setIsOpen(false);
                }}
              >
                <span
                  className="mr-2 inline-block h-4 w-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {DicionarioCor[color]}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorSelect;
