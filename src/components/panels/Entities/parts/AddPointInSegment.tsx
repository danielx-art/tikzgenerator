import Slider from "import/components/micro/Slider";
import { Tponto } from "public/entidades";
import { useCallback, useRef, useState } from "react";

type PropsType = {
  points: Array<Tponto>;
};

const AddPointInSegment: React.FC<PropsType> = ({ points }) => {
  const min = -10;
  const max = 10;
  
  const [value, setValue] = useState(0);
  
  // Ref for the slider track for calculating relative positions
  const trackRef = useRef<HTMLDivElement>(null);
  
  const getValueFromPosition = (n: number) => {
    return n*(max-min)+min;
  };

  // Handle slider movement
  const handleMouseMove = useCallback(
    (clientX: number) => {
      if (trackRef.current) {
        const { left, width } = trackRef.current.getBoundingClientRect();
        const positionPercentage = Math.max(0, Math.min(1, (clientX-left)/width));
        const newValue = getValueFromPosition(positionPercentage);
        const boundedValue = Math.min(Math.max(newValue, min), max);
        setValue(boundedValue);
      }
    },
    [getValueFromPosition, min, max],
  );

  // Handle mouse events
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    handleMouseMove(event.clientX);
    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMoveWindow);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    const handleMouseMoveWindow = (event: MouseEvent) =>
      handleMouseMove(event.clientX);

    window.addEventListener("mousemove", handleMouseMoveWindow);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // Convert the current value to a percentage for styling the thumb
  const valueToPercentage = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div>Inserir ponto em segmento</div>
      {points.length < 2 && (
        <div className="">Selecione ao menos dois pontos.</div>
      )}
      {points.length >= 2 && (
        <div className="flex flex-col flex-nowrap gap-4 p-2 relative">
            <div className={`border-r-2 border-l-2 border-a_dark w-1/2 h-2 left-[${Math.min(0,10)}%]`}/>
          <div className="relative h-16 w-full">
            <div
              ref={trackRef}
              onMouseDown={handleMouseDown}
              className="relative h-4 w-full cursor-pointer"
              role="slider"
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={value}
              aria-valuetext={`${value}`}
              tabIndex={0}
            >
              <div
                className="absolute h-4 w-4 cursor-pointer rounded-full bg-blue-600 shadow -translate-x-1/2"
                style={{
                  left: `${valueToPercentage}%`,
                }}
              />
              <div className="select-none pointer-events-none absolute top-1/2 w-full -translate-y-1/2 border-b-2 border-dashed border-a_dark" />
              <div className="select-none pointer-events-none absolute right-1/4 top-1/2 w-1/2 -translate-y-1/2 border-b-2 border-solid border-a_dark" />
              <div className="select-none pointer-events-none absolute left-1/4 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-a_dark " />
              <div className="select-none pointer-events-none absolute left-3/4 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-a_dark " />
            </div>
            <div className="absolute left-1/4 -translate-x-1/2 select-none">
              {points[0]!.etiqueta.length > 0
                ? points[0]!.etiqueta
                : `(${points[0]!.coords.x};${points[0]!.coords.y})`}
            </div>
            <div className="absolute left-3/4 -translate-x-1/2 select-none">
              {points[1]!.etiqueta.length > 0
                ? points[1]!.etiqueta
                : `(${points[1]!.coords.x};${points[1]!.coords.y})`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPointInSegment;
