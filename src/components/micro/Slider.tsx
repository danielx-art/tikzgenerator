import React, { useState, useCallback, useRef } from 'react';

type SliderProps = {
  initialValue?: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  valueTextFunction?: (value: number) => string; // For custom value calculation for ARIA
  getValueFromPosition: (percentage: number) => number; // Custom function for value calculation
};

const Slider: React.FC<SliderProps> = ({
  initialValue = 0,
  min,
  max,
  step = 1,
  onChange,
  valueTextFunction = (value) => `${value}`,
  getValueFromPosition,
}) => { 

  const [value, setValue] = useState(initialValue);

  // Ref for the slider track for calculating relative positions
  const trackRef = useRef<HTMLDivElement>(null);

  // Handle slider movement
  const handleMouseMove = useCallback(
    (clientX: number) => {
      if (trackRef.current) {
        const { left, width } = trackRef.current.getBoundingClientRect();
        const position = (clientX - left)*max / width; // position is a ratio (0 to 1)
        const newValue = getValueFromPosition(position);
        const boundedValue = Math.min(Math.max(newValue, min), max); // Ensure value is within bounds
        setValue(boundedValue);
        onChange(boundedValue);
      }
    },
    [getValueFromPosition, min, max, onChange]
  );

  // Handle mouse events
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    handleMouseMove(event.clientX);
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMoveWindow);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    const handleMouseMoveWindow = (event: MouseEvent) => handleMouseMove(event.clientX);

    window.addEventListener('mousemove', handleMouseMoveWindow);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Convert the current value to a percentage for styling the thumb
  const valueToPercentage = ((value - min) / (max - min)) * 100;

  return (
    <div
      ref={trackRef}
      onMouseDown={handleMouseDown}
      className="h-1 bg-gray-300 relative w-full cursor-pointer"
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={valueTextFunction(value)}
      tabIndex={0}
    >
      <div
        className="absolute bg-blue-600 h-4 w-4 rounded-full shadow cursor-pointer"
        style={{ left: `calc(${valueToPercentage}% - 8px)`, top: '50%', transform: 'translateY(-50%)' }}
      />
    </div>
  );
};

export default Slider;