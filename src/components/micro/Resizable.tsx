import React from "react";
import { useState } from "react";

type ResizablePanelProps = {
  width: number;
  height: number;
  children: React.ReactNode;
};

export const ResizablePanel: React.FC<ResizablePanelProps> = ({
  width,
  height,
  children,
}) => {
  const style = {
    width: width ? `${width}px` : 'auto',
    height: height ? `${height}px` : 'auto',
  };

  return (
    <div style={style} className="overflow-auto">
      {children}
    </div>
  );
};

type ResizableHandleProps = {
  onDrag: (e: MouseEvent | TouchEvent) => void;
  //direction: "horizontal" | "vertical";
};

export const ResizableHandle: React.FC<ResizableHandleProps> = ({
  onDrag,
  //direction,
}) => {
  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("touchmove", onDrag);
    document.addEventListener("touchend", stopDragging);
  };

  const stopDragging = () => {
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDragging);
    document.removeEventListener("touchmove", onDrag);
    document.removeEventListener("touchend", stopDragging);
  };

  return (
    <div
      onMouseDown={startDragging}
      onTouchStart={startDragging}
      className="h-10 w-10 cursor-nwse-resize"
    ></div>
  );
};

type ResizablePanelGroupProps = {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
};

const ResizablePanelGroup: React.FC<ResizablePanelGroupProps> = ({
  direction,
  children,
}) => {
  const [panelSizes, setPanelSizes] = useState<number[]>(
    () => React.Children.map(children, () => 100) || [],
  );

  const minSize = 32; // Equivalent to 2rem assuming 1rem = 16px

  const handleDrag = (index: number, e: MouseEvent | TouchEvent) => {

    if(panelSizes.length < 1) return;

    const startSizes = [...panelSizes];
    const isTouchEvent = (event: MouseEvent | TouchEvent): event is TouchEvent => {
      return (event as TouchEvent).touches !== undefined;
    };
  
    const startPosition = isTouchEvent(e)
      ? (direction === 'horizontal' ? e.touches[0]!.clientX : e.touches[0]!.clientY)
      : (direction === 'horizontal' ? e.clientX : e.clientY);

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentPosition = isTouchEvent(moveEvent)
      ? (direction === 'horizontal' ? moveEvent.touches[0]!.clientX : moveEvent.touches[0]!.clientY)
      : (direction === 'horizontal' ? moveEvent.clientX : moveEvent.clientY);
      const delta = currentPosition - startPosition;

        if (index < startSizes.length - 1) {
          let newSize = startSizes[index]! + delta;
          let nextSize = startSizes[index + 1]! - delta;

          // Enforcing minimum size constraints
          if (newSize < minSize) {
            newSize = minSize;
            nextSize = startSizes[index]! + startSizes[index + 1]! - newSize;
          } else if (nextSize < minSize) {
            nextSize = minSize;
            newSize = startSizes[index]! + startSizes[index + 1]! - nextSize;
          }

          const newSizes = [...panelSizes];
          newSizes[index] = newSize;
          newSizes[index + 1] = nextSize;

          setPanelSizes(newSizes);
        }
    };

    const onEnd = () => {
      document.removeEventListener("mousemove", onMove as any);
      document.removeEventListener("touchmove", onMove as any);
    };

    document.addEventListener("mousemove", onMove as any);
    document.addEventListener("touchmove", onMove as any);
    document.addEventListener("mouseup", onEnd, { once: true });
    document.addEventListener("touchend", onEnd, { once: true });
  };

  return (
    <div
      className={`flex ${direction === "horizontal" ? "flex-row" : "flex-col"}`}
    >
      {React.Children.map(children, (child, index) => (
        <React.Fragment key={index}>
          {React.cloneElement(child as React.ReactElement<any>, {
            size: panelSizes[index],
          })}
          {index < React.Children.count(children) - 1 && (
            <ResizableHandle
              onDrag={(e) => handleDrag(index, e)}
              direction={direction}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
