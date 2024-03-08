import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import {
  getEntityById,
  getKindById,
  getMapByKind,
  getSetterByKind,
} from "import/utils/storeHelpers/entityGetters";
import type { TentId } from "public/entidades";
import {
  type ThachureOrientations,
  type FILL_STYLES,
} from "public/generalConfigs";
import { useState, useEffect } from "react";
import MultipleRadioGroup from "import/components/micro/MultipleRadioGroup";

type PropsType = {
  entId: TentId | undefined;
};

const styleNames = ["solid", "hachure", "dotted"] as const;
const minOpacity = 0.3;
type TstyleNames = (typeof styleNames)[number];
type TstyleIndexes = 0 | 1 | 2;

const FillStyleChanger: React.FC<PropsType> = ({ entId }) => {
  const store = useStore(myStore, (state) => state);
  const thisEnt = useStore(
    myStore,
    (state) => entId && getEntityById(entId, state),
  );

  const [disabled, setDisabled] = useState(true);
  const [selectedButton, setSelectedButton] = useState<TstyleIndexes | null>(
    null,
  );
  const [selectedOption, setSelectedOption] =
    useState<ThachureOrientations | null>(null);

  useEffect(() => {
    if (entId && store && thisEnt && "fill" in thisEnt) {
      const [btnIndex, optionIndex] = parseFill(thisEnt.fill.style);
      setSelectedButton(btnIndex);
      setSelectedOption(optionIndex);
    }
  }, [store, thisEnt]);

  useEffect(() => {
    if (selectedButton !== null && selectedOption !== null) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [selectedButton, selectedOption]);

  const parseFill = (
    fillStyle: FILL_STYLES,
  ): [TstyleIndexes, ThachureOrientations] => {
    const parts = fillStyle.split("-");
    const btnIndex = styleNames.indexOf(
      parts[0] as TstyleNames,
    ) as TstyleIndexes;
    const optionIndex = parts[1]
      ? (parseInt(parts[1]) as ThachureOrientations)
      : 0;
    return [btnIndex, optionIndex];
  };

  const getFillStyle = (
    style_index: TstyleIndexes,
    hachure_orientation: ThachureOrientations,
  ): FILL_STYLES => {
    if (style_index === 1) {
      return `${styleNames[style_index]}-${hachure_orientation}`;
    } else {
      return styleNames[style_index];
    }
  };

  const handleDisplayChange = (btnIndex: number, optionSel: number) => {
    if (!entId || !store || !thisEnt || !("fill" in thisEnt)) return;
    const kind = getKindById(entId as TentId);
    const entMap = getMapByKind(kind, store);
    const entSetter = getSetterByKind(kind, store);
    if (!entMap || !entSetter) return;
    const updatedEntities = new Map(entMap);
    const newStyle = getFillStyle(
      btnIndex as TstyleIndexes,
      optionSel as ThachureOrientations,
    );
    const newEnt = { ...thisEnt, fill: { ...thisEnt.fill, style: newStyle } };
    updatedEntities.set(entId, newEnt as any);
    entSetter(updatedEntities as any);
  };

  return (
    <div className={`flex flex-row flex-nowrap gap-2`}>
      <div className="grid items-center">Destaques: </div>
      <div className="flex w-full flex-row">
        {!disabled && selectedButton !== null && selectedOption !== null && (
          <MultipleRadioGroup
            onChange={handleDisplayChange}
            initBtnSelected={selectedButton}
            initOptionSelected={selectedOption}
            disabled={!entId}
          >
            <div key="fill-solid-changer">
              {[
                <div className="h-6 w-6" key="fill-solid-changer-inner">
                  <svg className="grid h-full w-full items-center overflow-hidden">
                    <rect
                      stroke="#333333"
                      strokeWidth={2}
                      fill={
                        thisEnt && "fill" in thisEnt
                          ? thisEnt.fill.color
                          : "#333333"
                      }
                      fillOpacity={
                        thisEnt && "fill" in thisEnt
                          ? Math.max(thisEnt.fill.opacity, minOpacity)
                          : 1
                      }
                      width="100%"
                      height="100%"
                    />
                  </svg>
                </div>,
              ]}
            </div>
            <div key="fill-hachure-changer">
              {[
                <div className="h-6 w-6" key="fill-hachure-changer-0">
                  <svg className="grid h-full w-full items-center overflow-hidden">
                    <defs>
                      <pattern
                        id="hatch0"
                        patternUnits="userSpaceOnUse"
                        width="4"
                        height="4"
                        patternTransform="rotate(0)"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="4"
                          y2="0"
                          stroke={
                            thisEnt && "fill" in thisEnt
                              ? thisEnt.fill.color
                              : "#333333"
                          }
                          strokeWidth="5"
                        />
                      </pattern>
                    </defs>
                    <rect
                      stroke="#333333"
                      strokeWidth={2}
                      fill="url(#hatch0)"
                      fillOpacity={
                        thisEnt && "fill" in thisEnt
                          ? Math.max(thisEnt.fill.opacity, minOpacity)
                          : 1
                      }
                      width="100%"
                      height="100%"
                    />
                  </svg>
                </div>,
                <div className="h-6 w-6" key="fill-hachure-changer-1">
                  <svg className="grid h-full w-full items-center overflow-hidden">
                    <defs>
                      <pattern
                        id="hatch1"
                        patternUnits="userSpaceOnUse"
                        width="4"
                        height="4"
                        patternTransform="rotate(135)"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="4"
                          y2="0"
                          stroke={
                            thisEnt && "fill" in thisEnt
                              ? thisEnt.fill.color
                              : "#333333"
                          }
                          strokeWidth="5"
                        />
                      </pattern>
                    </defs>
                    <rect
                      stroke="#333333"
                      strokeWidth={2}
                      fill="url(#hatch1)"
                      fillOpacity={
                        thisEnt && "fill" in thisEnt
                          ? Math.max(thisEnt.fill.opacity, minOpacity)
                          : 1
                      }
                      width="100%"
                      height="100%"
                    />
                  </svg>
                </div>,
                <div className="h-6 w-6" key="fill-hachure-changer-2">
                  <svg className="grid h-full w-full items-center overflow-hidden">
                    <defs>
                      <pattern
                        id="hatch2"
                        patternUnits="userSpaceOnUse"
                        width="4"
                        height="4"
                        patternTransform="rotate(90)"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="4"
                          y2="0"
                          stroke={
                            thisEnt && "fill" in thisEnt
                              ? thisEnt.fill.color
                              : "#333333"
                          }
                          strokeWidth="5"
                        />
                      </pattern>
                    </defs>
                    <rect
                      stroke="#333333"
                      strokeWidth={2}
                      fill="url(#hatch2)"
                      fillOpacity={
                        thisEnt && "fill" in thisEnt
                          ? Math.max(thisEnt.fill.opacity, minOpacity)
                          : 1
                      }
                      width="100%"
                      height="100%"
                    />
                  </svg>
                </div>,
                <div className="h-6 w-6" key="fill-hachure-changer-3">
                  <svg className="grid h-full w-full items-center overflow-hidden">
                    <defs>
                      <pattern
                        id="hatch3"
                        patternUnits="userSpaceOnUse"
                        width="4"
                        height="4"
                        patternTransform="rotate(45)"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="4"
                          y2="0"
                          stroke={
                            thisEnt && "fill" in thisEnt
                              ? thisEnt.fill.color
                              : "#333333"
                          }
                          strokeWidth="5"
                        />
                      </pattern>
                    </defs>
                    <rect
                      stroke="#333333"
                      strokeWidth={2}
                      fill="url(#hatch3)"
                      fillOpacity={
                        thisEnt && "fill" in thisEnt
                          ? Math.max(thisEnt.fill.opacity, minOpacity)
                          : 1
                      }
                      width="100%"
                      height="100%"
                    />
                  </svg>
                </div>,
              ]}
            </div>
            <div key="fill-dotted-changer">
              {[
                <div className="h-6 w-6" key="fill-dotted-changer-inner">
                  <svg className="grid h-full w-full items-center overflow-hidden">
                    <defs>
                      <pattern
                        id="dots"
                        patternUnits="userSpaceOnUse"
                        width="6"
                        height="6"
                      >
                        <circle
                          cx="1.5"
                          cy="1.5"
                          r="1.5"
                          fill={
                            thisEnt && "fill" in thisEnt
                              ? thisEnt.fill.color
                              : "#333333"
                          }
                        />
                        <circle
                          cx="4.5"
                          cy="4.5"
                          r="1.5"
                          fill={
                            thisEnt && "fill" in thisEnt
                              ? thisEnt.fill.color
                              : "#333333"
                          }
                        />
                      </pattern>
                    </defs>
                    <rect
                      stroke="#333333"
                      strokeWidth={2}
                      fill="url(#dots)"
                      fillOpacity={
                        thisEnt && "fill" in thisEnt
                          ? Math.max(thisEnt.fill.opacity, minOpacity)
                          : 1
                      }
                      width="100%"
                      height="100%"
                    />
                  </svg>
                </div>,
              ]}
            </div>
          </MultipleRadioGroup>
        )}
      </div>
    </div>
  );
};

export default FillStyleChanger;
