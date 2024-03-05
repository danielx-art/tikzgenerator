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
type TstyleNames = (typeof styleNames)[number];
type TstyleIndexes = 0 | 1 | 2;

const FillStyleChanger: React.FC<PropsType> = ({ entId }) => {
  const store = useStore(myStore, (state) => state);
  const thisEnt = useStore(
    myStore,
    (state) => entId && getEntityById(entId, state),
  );

  const [selectedButton, setSelectedButton] = useState<TstyleIndexes>(0);
  const [selectedOption, setSelectedOption] = useState<ThachureOrientations>(0);

  useEffect(() => {
    if (entId && store && thisEnt && "fill" in thisEnt) {
      const [btnIndex, optionIndex] = parseFill(thisEnt.fill.style);
      setSelectedButton(btnIndex);
      setSelectedOption(optionIndex);
    } else {
      setSelectedButton(0);
      setSelectedOption(0);
    }
  }, [store, store?.angles, thisEnt]);

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
    const newStyle = getFillStyle(selectedButton, selectedOption);
    const newEnt = { ...thisEnt, fill: { ...thisEnt.fill, style: newStyle } };
    updatedEntities.set(entId, newEnt as any);
    entSetter(updatedEntities as any);
  };

  return (
    <div className={`flex flex-row flex-nowrap gap-2`}>
      <div className="grid items-center">Destaques: </div>
      <div className="flex w-full flex-row">
        {entId && thisEnt && "fill" in thisEnt && (
          <MultipleRadioGroup
            onChange={handleDisplayChange}
            initBtnSelected={selectedButton}
            initOptionSelected={selectedOption}
            disabled={!entId}
          >
            <div key="fill-solid-changer">
              <div className="h-6 w-6">
                <svg className="grid h-full w-full items-center overflow-hidden">
                  <rect
                    stroke="none"
                    fill={thisEnt.fill.color}
                    fillOpacity={thisEnt.fill.opacity}
                    width="100%"
                    height="100%"
                  />
                </svg>
              </div>
            </div>
            <div key="fill-hachure-changer">
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
                        stroke={thisEnt.fill.color}
                        stroke-width="1"
                      />
                    </pattern>
                  </defs>
                  <rect
                    stroke="none"
                    fill="url(#hatch0)"
                    fillOpacity={thisEnt.fill.opacity}
                    width="100%"
                    height="100%"
                  />
                </svg>
              </div>
              <div className="h-6 w-6" key="fill-hachure-changer-1">
                <svg className="grid h-full w-full items-center overflow-hidden">
                  <defs>
                    <pattern
                      id="hatch1"
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
                        stroke={thisEnt.fill.color}
                        stroke-width="1"
                      />
                    </pattern>
                  </defs>
                  <rect
                    stroke="none"
                    fill="url(#hatch1)"
                    fillOpacity={thisEnt.fill.opacity}
                    width="100%"
                    height="100%"
                  />
                </svg>
              </div>
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
                        stroke={thisEnt.fill.color}
                        stroke-width="1"
                      />
                    </pattern>
                  </defs>
                  <rect
                    stroke="none"
                    fill="url(#hatch2)"
                    fillOpacity={thisEnt.fill.opacity}
                    width="100%"
                    height="100%"
                  />
                </svg>
              </div>
              <div className="h-6 w-6" key="fill-hachure-changer-3">
                <svg className="grid h-full w-full items-center overflow-hidden">
                  <defs>
                    <pattern
                      id="hatch3"
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
                        stroke={thisEnt.fill.color}
                        stroke-width="1"
                      />
                    </pattern>
                  </defs>
                  <rect
                    stroke="none"
                    fill="url(#hatch3)"
                    fillOpacity={thisEnt.fill.opacity}
                    width="100%"
                    height="100%"
                  />
                </svg>
              </div>
            </div>
            <div key="fill-dotted-changer">
              <div className="h-6 w-6">
                <svg className="grid h-full w-full items-center overflow-hidden">
                  <defs>
                    <pattern
                      id="dots"
                      patternUnits="userSpaceOnUse"
                      width="6"
                      height="6"
                    >
                      <circle cx="3" cy="3" r="2" fill={thisEnt.fill.color} />
                    </pattern>
                  </defs>
                  <rect
                    stroke="none"
                    fill="url(#dots)"
                    fillOpacity={thisEnt.fill.opacity}
                    width="100%"
                    height="100%"
                  />
                </svg>
              </div>
            </div>
          </MultipleRadioGroup>
        )}
      </div>
    </div>
  );
};

export default FillStyleChanger;
