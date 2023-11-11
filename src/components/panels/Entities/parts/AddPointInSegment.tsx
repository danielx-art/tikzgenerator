import Slider from "import/components/micro/Slider";
import Switcher from "import/components/micro/Switcher";
import {
  Hyperb_Linear_Hyperb,
  clamp,
  inverse_Hyperb_Linear_Hyperb,
  lerp,
  roundToDecimalPlaces,
} from "import/utils/misc";
import { Tponto } from "public/entidades";
import { vec } from "public/vetores";
import { useCallback, useRef, useState } from "react";

type PropsType = {
  points: Array<Tponto>;
};

const AddPointInSegment: React.FC<PropsType> = ({ points }) => {
  if (!points[0] || !points[1]) {
    return (
      <div className="border-2 border-a_neutral rounded-md p-4 w-full">
        <div>Inserir ponto em segmento</div>
        <div className="">Selecione ao menos dois pontos.</div>
      </div>
    );
  }

  const bottomAssymptote = -5;
  const topAssymptote = 5;
  const sliderAPos = 0.25;
  const toA = 0;
  const sliderBPos = 0.75;
  const toB = 1;
  const dist = Math.abs(vec().copy(points[1].coords).dist(points[0].coords));

  const newPercentFromValue = (value: number) =>
    Hyperb_Linear_Hyperb(
      clamp(value, bottomAssymptote, topAssymptote),
      toA,
      sliderAPos,
      toB,
      sliderBPos,
      1,
      0,
    );

  const [sliderPos, setSliderPos] = useState(sliderAPos);
  const [isOutOfBoundary, setIsOutOfBoundary] = useState(false);
  const [value, setValue] = useState<number>(0);
  const [isPercent, setIsPercent] = useState(true);
  const [inputVal, setInputVal] = useState("0");
  const trackRef = useRef<HTMLDivElement>(null);

  // Handle slider movement
  const handleMouseMove = useCallback(
    (clientX: number) => {
      if (trackRef.current) {
        const { left, width } = trackRef.current.getBoundingClientRect();
        let positionPercentage = Math.max(
          0,
          Math.min(1, (clientX - left) / width),
        );

        let newValue = inverse_Hyperb_Linear_Hyperb(
          positionPercentage,
          toA,
          sliderAPos,
          toB,
          sliderBPos,
          0,
          1,
        );

        if (newValue > topAssymptote || newValue < bottomAssymptote) {
          positionPercentage = newPercentFromValue(newValue);

          newValue = inverse_Hyperb_Linear_Hyperb(
            positionPercentage,
            toA,
            sliderAPos,
            toB,
            sliderBPos,
            0,
            1,
          );
        }

        setValue(newValue);
        setSliderPos(positionPercentage);

        if (isPercent) {
          setInputVal(
            `${lerp(positionPercentage, sliderAPos, 0, sliderBPos, 100)}`,
          );
        } else {
          setInputVal(`${newValue * dist}`);
        }
        setIsOutOfBoundary(false);
      }
    },
    [trackRef.current, isPercent],
  );

  const handleIsPercentChange = () => {
    if (!isPercent) {
      setInputVal(`${lerp(sliderPos, sliderAPos, 0, sliderBPos, 100)}`);
    } else {
      setInputVal(`${value * dist}`);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputStr = event.target.value.replace(/\s/g, "");
    const inputValue = inputStr.length < 1 ? 0 : parseFloat(inputStr);
    setInputVal(inputStr);
    let newValue;
    let newPositionPercentage;

    if (isPercent) {
      newValue = inputValue / 100;
      setValue(newValue);

      newPositionPercentage = Hyperb_Linear_Hyperb(
        inputValue / 100,
        toA,
        sliderAPos,
        toB,
        sliderBPos,
        bottomAssymptote,
        topAssymptote,
      );
      if (newPositionPercentage > 1) {
        setIsOutOfBoundary(true);
        setSliderPos(1);
      } else if (newPositionPercentage < 0) {
        setIsOutOfBoundary(true);
        setSliderPos(0);
      } else {
        setIsOutOfBoundary(false);
        setSliderPos(newPositionPercentage);
      }
    } else {
      newValue = lerp(inputValue, 0, 0, dist, 1);
      setValue(newValue);

      newPositionPercentage = Hyperb_Linear_Hyperb(
        newValue,
        toA,
        sliderAPos,
        toB,
        sliderBPos,
        bottomAssymptote,
        topAssymptote,
      );
      if (newPositionPercentage > 1) {
        setIsOutOfBoundary(true);
        setSliderPos(1);
      } else if (newPositionPercentage < 0) {
        setIsOutOfBoundary(true);
        setSliderPos(0);
      } else {
        setIsOutOfBoundary(false);
        setSliderPos(newPositionPercentage);
      }
    }
  };

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

  const styles = {
    middleBarWidth: (sliderBPos - sliderAPos) * 100,
    leftApos: sliderAPos * 100,
    leftBpos: sliderBPos * 100,
    distBarWidth: Math.abs(sliderPos - sliderAPos) * 100,
    distBarMin: Math.min(sliderAPos, sliderPos) * 100,
  };

  return (
    <div className="border-2 border-a_neutral rounded-md p-4 w-full">
      <div className="select-none">Inserir ponto em segmento</div>
      {points.length < 2 && (
        <div className="">Selecione ao menos dois pontos.</div>
      )}
      {points.length >= 2 && (
        <div className="flex flex-col flex-nowrap gap-4  p-2">
          <div className="m-0 h-fit w-full p-0">
            <div
              className={"w-fit -translate-x-1/2"}
              style={{
                marginLeft:
                  ((sliderPos - sliderAPos) / 2 + sliderAPos) * 100 + "%",
              }}
            >
              {roundToDecimalPlaces(value * dist)}
            </div>
            <div
              className={`h-2 border-l-2 border-r-2 border-t-2 border-a_dark`}
              style={{
                width: styles.distBarWidth + "%",
                marginLeft: styles.distBarMin + "%",
              }}
            />
          </div>
          <div className="relative w-full">
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
                className={`h-4 w-4 absolute -translate-x-1/2 cursor-pointer rounded-full shadow ${
                  isOutOfBoundary
                    ? "bg-a_neutral bg-opacity-50"
                    : "bg-opacity-1 bg-blue-600"
                }`}
                style={{
                  left: `${sliderPos * 100}%`,
                }}
              />
              <div
                className={`pointer-events-none w-full absolute top-1/2 -translate-y-1/2 select-none border-b-2 border-dashed border-a_dark`}
              />
              <div
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 select-none border-b-2 border-solid border-a_dark`}
                style={{
                  left: styles.leftApos + "%",
                  width: styles.middleBarWidth + "%",
                }}
              />
              <div
                className={`pointer-events-none h-2 w-2 absolute top-1/2 -translate-x-1/2 -translate-y-1/2 select-none rounded-full bg-a_dark`}
                style={{
                  left: styles.leftApos + "%",
                }}
              />
              <div
                className={`pointer-events-none h-2 w-2 absolute top-1/2 -translate-x-1/2 -translate-y-1/2 select-none rounded-full bg-a_dark
                `}
                style={{
                  left: styles.leftBpos + "%",
                }}
              />
            </div>
            <div className="isolate h-fit">
              <div
                className="pointer-events-none -translate-x-1/2 w-fit select-none inline-block"
                style={{
                  marginLeft: styles.leftApos + "%",
                }}
              >
                {points[0]!.etiqueta.length > 0
                  ? points[0]!.etiqueta
                  : `(${points[0]!.coords.x};${points[0]!.coords.y})`}
              </div>
              <div
                className="pointer-events-none -translate-x-1/2 w-fit select-none inline-block"
                style={{
                  marginLeft: (styles.leftBpos-styles.leftApos)/2 + "%",
                }}
              >
                {points[1]!.etiqueta.length > 0
                  ? points[1]!.etiqueta
                  : `(${points[1]!.coords.x};${points[1]!.coords.y})`}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <input
              type="text"
              className="z-10 w-1/2 cursor-text rounded-sm bg-a_highlight px-2 py-1 text-a_dark focus:outline-a_aux"
              value={inputVal}
              onChange={handleInput}
            />
            <Switcher
              isChecked={isPercent}
              setIsChecked={setIsPercent}
              messageOne="%"
              messageTwo="d"
              onChange={handleIsPercentChange}
            />
            <button
              onClick={() =>
                console.log((sliderPos - sliderAPos) / 2 + sliderAPos)
              }
              className="rounded-sm bg-a_dark p-2 text-a_highlight shadow-md"
            >
              Criar ponto
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPointInSegment;
