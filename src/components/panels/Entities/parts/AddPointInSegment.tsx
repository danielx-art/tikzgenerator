import Slider from "import/components/micro/Slider";
import Switcher from "import/components/micro/Switcher";
import {
  Hyperb_Linear_Hyperb,
  lerp,
  safe_inverse_Hyperb_Linear_Hyperb,
} from "import/utils/misc";
import { Tponto } from "public/entidades";
import { useCallback, useRef, useState } from "react";

type PropsType = {
  points: Array<Tponto>;
};

const AddPointInSegment: React.FC<PropsType> = ({ points }) => {
  if (!points[0] || !points[1]) {
    return (
      <div>
        <div>Inserir ponto em segmento</div>
        <div className="">Selecione ao menos dois pontos.</div>
      </div>
    );
  }

  // To take the slider position
  const bottomAssymptote = -5;
  const topAssymptote = 5;
  const stepFromA = 0;
  const stepFromB = 1;
  const toA = 0;
  const toB = 1;

  const sliderAPos = 0.25;
  const sliderBPos = 0.75;

  const [sliderPos, setSliderPos] = useState(0);
  const [value, setValue] = useState<number | undefined>(0);
  //for the manual input
  const [isPercent, setIsPercent] = useState(false);


  // Ref for the slider track for calculating relative positions
  const trackRef = useRef<HTMLDivElement>(null);

  // Handle slider movement
  const handleMouseMove = useCallback(
    (clientX: number) => {
      if (trackRef.current) {
        const { left, width } = trackRef.current.getBoundingClientRect();
        const positionPercentage = Math.max(
          0,
          Math.min(1, (clientX - left) / width),
        );
        const stretchPositionPercentage = lerp(
          positionPercentage,
          sliderAPos,
          0,
          sliderBPos,
          1,
        );

        const newValue = safe_inverse_Hyperb_Linear_Hyperb(stretchPositionPercentage, stepFromA, toA, stepFromB, toB, -.5, -5, 1.5, 5);
        setValue(newValue);
        setSliderPos(positionPercentage);
      }
    },
    [trackRef.current],
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
  };

  return (
    <div>
      <div>Inserir ponto em segmento</div>
      {points.length < 2 && (
        <div className="">Selecione ao menos dois pontos.</div>
      )}
      {points.length >= 2 && (
        <div className="relative flex flex-col flex-nowrap gap-4 p-2">
          <div
            className={`h-2 w-1/2 border-l-2 border-r-2 border-a_dark left-[${Math.min(
              0,
              10,
            )}%]`}
          />
          <div className="relative h-16 w-full">
            <div
              ref={trackRef}
              onMouseDown={handleMouseDown}
              className="relative h-4 w-full cursor-pointer"
              role="slider"
              aria-valuemin={0}
              aria-valuemax={1}
              aria-valuenow={sliderPos}
              aria-valuetext={`${sliderPos * 100}%`}
              tabIndex={0}
            >
              <div
                className="absolute h-4 w-4 -translate-x-1/2 cursor-pointer rounded-full bg-blue-600 shadow"
                style={{
                  left: `${sliderPos * 100}%`,
                }}
              />
              <div className="pointer-events-none absolute top-1/2 w-full -translate-y-1/2 select-none border-b-2 border-dashed border-a_dark" />
              <div className="pointer-events-none absolute right-1/4 top-1/2 w-1/2 -translate-y-1/2 select-none border-b-2 border-solid border-a_dark" />
              <div className="pointer-events-none absolute left-1/4 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 select-none rounded-full bg-a_dark " />
              <div className="pointer-events-none absolute left-3/4 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 select-none rounded-full bg-a_dark " />
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
          <div>
            <Switcher isChecked={isPercent} setIsChecked={setIsPercent} messageOne="d" messageTwo="%"/>
            <input 
              type="text"
              
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPointInSegment;
