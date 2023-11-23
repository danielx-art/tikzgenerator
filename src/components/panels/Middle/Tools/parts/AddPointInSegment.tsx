import Switcher from "import/components/micro/Switcher";
import {
  Hyperb_Linear_Hyperb,
  clamp,
  inverse_Hyperb_Linear_Hyperb,
  lerp,
  roundToDecimalPlaces,
} from "import/utils/misc";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import { ponto } from "public/entidades";
import { vec } from "public/vetores";
import { useRef, useState } from "react";

const AddPointInSegment: React.FC = () => {
  const store = useStore(myStore, (state) => state);

  const bottomAssymptote = -5;
  const topAssymptote = 5;
  const sliderAPos = 0.25;
  const toA = 0;
  const sliderBPos = 0.75;
  const toB = 1;

  const [sliderPos, setSliderPos] = useState(sliderAPos);
  const [isOutOfBoundary, setIsOutOfBoundary] = useState(false);
  const [value, setValue] = useState<number>(0);
  const [isPercent, setIsPercent] = useState(true);
  const [inputVal, setInputVal] = useState("0");
  const trackRef = useRef<HTMLDivElement>(null);

  if (!store) return;

  const { generateId, selectedGroup, points, setPoints } = store;

  const selectedPoints = points.filter((point) => point.selected);

  const segPoints = [selectedPoints[0], selectedPoints[1]];

  if (!segPoints[0] || !segPoints[1]) {
    return (
      <div className=" italic text-c_scnd2 opacity-75">
        Selecione ao menos dois pontos.
      </div>
    );
  }

  const dist = Math.abs(
    vec().copy(segPoints[1].coords).dist(segPoints[0].coords),
  );

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

  // Handle slider movement
  const handleMouseMove = (clientX: number) => {
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
  };

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

  const handleAddPoint = () => {
    if (!segPoints[0] || !segPoints[1]) return;
    let ab = vec()
      .copy(segPoints[1].coords)
      .sub(vec().copy(segPoints[0].coords));
    ab.mult(value);
    const newCoords = vec().copy(segPoints[0].coords).add(ab);
    const newId = generateId("point");
    const newPoint = ponto(newCoords, newId, selectedGroup);
    setPoints([...points, newPoint]);
  };

  const styles = {
    middleBarWidth: (sliderBPos - sliderAPos) * 100,
    leftApos: sliderAPos * 100,
    leftBpos: sliderBPos * 100,
    distBarWidth: Math.abs(sliderPos - sliderAPos) * 100,
    distBarMin: Math.min(sliderAPos, sliderPos) * 100,
  };

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div className="flex flex-col flex-nowrap gap-2  p-2">
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
            className={`h-2 border-l-2 border-r-2 border-t-2 border-c_scnd`}
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
              className={`absolute z-10 h-4 w-4 -translate-x-1/2 cursor-pointer rounded-full shadow-sm shadow-c_scnd ${
                isOutOfBoundary
                  ? "bg-c_faded hover:ring-1 hover:ring-c_interact"
                  : "bg-c_interact hover:z-0"
              }`}
              style={{
                left: `${sliderPos * 100}%`,
              }}
            />
            <div
              className={`pointer-events-none absolute top-1/2 w-full -translate-y-1/2 select-none border-b-2 border-dashed border-c_scnd`}
            />
            <div
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 select-none border-b-2 border-solid border-c_scnd`}
              style={{
                left: styles.leftApos + "%",
                width: styles.middleBarWidth + "%",
              }}
            />
            <div
              className={`pointer-events-none absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 select-none rounded-full bg-c_scnd2`}
              style={{
                left: styles.leftApos + "%",
              }}
            />
            <div
              className={`pointer-events-none absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 select-none rounded-full bg-c_scnd2
                `}
              style={{
                left: styles.leftBpos + "%",
              }}
            />
          </div>
          <div className="isolate h-fit">
            <div
              className="pointer-events-none inline-block w-fit -translate-x-1/2 select-none"
              style={{
                marginLeft: styles.leftApos + "%",
              }}
            >
              {segPoints[0]!.etiqueta.length > 0
                ? segPoints[0]!.etiqueta
                : `(${segPoints[0]!.coords.x};${segPoints[0]!.coords.y})`}
            </div>
            <div
              className="pointer-events-none inline-block w-fit -translate-x-1/2 select-none"
              style={{
                marginLeft: (styles.leftBpos - styles.leftApos) / 2 + "%",
              }}
            >
              {segPoints[1]!.etiqueta.length > 0
                ? segPoints[1]!.etiqueta
                : `(${segPoints[1]!.coords.x};${segPoints[1]!.coords.y})`}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <input
            type="text"
            className="focus:outline-c_high z-10 w-1/2 cursor-text rounded-sm bg-c_base px-2 py-1 text-c_scnd"
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
            onClick={handleAddPoint}
            className="rounded-sm bg-c_interact p-2 text-c_base shadow-md hover:bg-c_high1"
          >
            Criar ponto
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPointInSegment;
