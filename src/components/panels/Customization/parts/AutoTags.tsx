import AccordionItem from "import/components/micro/AccordionItem";
import { useState } from "react";
import Switcher from "import/components/micro/Switcher";
import useStore from "import/utils/useStore";
import myStore from "import/utils/store";
import useApplyTags from "import/utils/useApplyTags";
import {
  alphabeticalGreekTags,
  alphabeticalLatinTags,
  alphabeticalSmallLatinTags,
  arcTags,
  coordTags,
  lengthTags,
  numericalTags,
} from "import/utils/autoTags";

const AutoTags: React.FC = () => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const applyTags = useApplyTags(store);

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <AccordionItem title="Autoetiquetar pontos">
        <AutoTagEntityMenuBody
          Options={[
            {
              title: "A...Z AA...ZZ",
              action: [
                () =>
                  applyTags(
                    alphabeticalLatinTags,
                    store.points.map((point)=>{return {...point, kind: "point"}}),
                    store.tags,
                    store.setTags,
                    store.generateId,
                  ),
                () =>
                  applyTags(
                    alphabeticalLatinTags,
                    store.points.filter((point) => point.selected).map((point)=>{return {...point, kind: "point"}}),
                    store.tags,
                    store.setTags,
                    store.generateId,
                  ),
              ],
            },
            {
              title: "Coordenadas (X;Y)",
              action: [
                () =>
                  applyTags(
                    coordTags,
                    store.points.map((point)=>{return {...point, kind: "point"}}),
                    store.tags,
                    store.setTags,
                    store.generateId,
                  ),
                () =>
                  applyTags(
                    coordTags,
                    store.points.filter((point) => point.selected).map((point)=>{return {...point, kind: "point"}}),
                    store.tags,
                    store.setTags,
                    store.generateId,
                  ),
              ],
            },
            {
              title: "P1...Pn",
              action: [
                () =>
                  applyTags(
                    numericalTags,
                    store.points.map((point)=>{return {...point, kind: "point"}}),
                    store.tags,
                    store.setTags,
                    store.generateId,
                  ),
                () =>
                  applyTags(
                    numericalTags,
                    store.points.filter((point) => point.selected).map((point)=>{return {...point, kind: "point"}}),
                    store.tags,
                    store.setTags,
                    store.generateId,
                  ),
              ],
            },
          ]}
        />
      </AccordionItem>
      <AccordionItem title="Autoetiquetar segmentos">
        <AutoTagEntityMenuBody
          Options={[
            {
              title: "Medida",
              action: [
                () =>
                  applyTags(
                    lengthTags,
                    store.segments.map((item)=>{return{...item, kind: "segment"}}),
                    store.tags,
                    store.setTags,
                    store.generateId,
                  ),
                () =>
                  applyTags(
                    lengthTags,
                    store.segments.filter((segment) => segment.selected).map((item)=>{return{...item, kind: "segment"}}),
                    store.tags,
                    store.setTags,
                    store.generateId,
                  ),
              ],
            },
            {
              title: "a...z aa...zz",
              action: [
                () =>
                  applyTags(
                    alphabeticalSmallLatinTags,
                    store.segments.map((item)=>{return{...item, kind: "segment"}}),
                    store.tags,
                    store.setTags,
                    store.generateId,
                  ),
                () =>
                  applyTags(
                    alphabeticalSmallLatinTags,
                    store.segments.filter((segment) => segment.selected).map((item)=>{return{...item, kind: "segment"}}),
                    store.tags,
                    store.setTags,
                    store.generateId,
                  ),
              ],
            },
          ]}
        />
      </AccordionItem>
      <AccordionItem title="Autoetiquetar ângulos">
        <AutoTagEntityMenuBody
          Options={[
            {
              title: "Medida (radianos)",
              action: [
                () =>
                  applyTags(
                    arcTags,
                    store.angles.map((item)=>{return{...item, kind: "angle"}}),
                    store.tags,
                    store.setTags,
                    store.generateId,
                  ),
                () =>
                  applyTags(
                    arcTags,
                    store.angles.filter((angle) => angle.selected).map((item)=>{return{...item, kind: "angle"}}),
                    store.tags,
                    store.setTags,
                    store.generateId,
                  ),
              ],
            },
            {
              title: "a...z aa...zz",
              action: [
                () =>
                  applyTags(
                    alphabeticalSmallLatinTags,
                    store.angles.map((item)=>{return{...item, kind: "angle"}}),
                    store.tags,
                    store.setTags,
                    store.generateId,
                  ),
                () =>
                  applyTags(
                    alphabeticalSmallLatinTags,
                    store.angles.filter((angle) => angle.selected).map((item)=>{return{...item, kind: "angle"}}),
                    store.tags,
                    store.setTags,
                    store.generateId,
                  ),
              ],
            },
            {
              title: `𝜶...𝝎`,
              action: [
                () =>
                  applyTags(
                    alphabeticalGreekTags,
                    store.angles.map((item)=>{return{...item, kind: "angle"}}),
                    store.tags,
                    store.setTags,
                    store.generateId,
                  ),
                () =>
                  applyTags(
                    alphabeticalGreekTags,
                    store.angles.filter((angle) => angle.selected).map((item)=>{return{...item, kind: "angle"}}),
                    store.tags,
                    store.setTags,
                    store.generateId,
                  ),
              ],
            },
            { title: "\u{00C2} ... \u{1E90}" },
          ]}
        />
      </AccordionItem>
    </div>
  );
};

export default AutoTags;

type AutoTagEntityMenuBodyProps = {
  Options: {
    title: string;
    action?: [() => void] | [() => void, () => void];
  }[];
};

const AutoTagEntityMenuBody: React.FC<AutoTagEntityMenuBodyProps> = ({
  Options,
}) => {
  const [isChecked, setIsChecked] = useState(true);

  const processedOptions = Options.map((option) => {
    let resultOptions = [];

    if (option.action == undefined) {
      resultOptions.push(
        () => {},
        () => {},
      );
    } else if (option.action.length == 1) {
      resultOptions.push(option.action[0], () => {});
    } else {
      resultOptions.push(option.action[0], option.action[1]);
    }

    return resultOptions as [() => void, () => void];
  });

  return (
    <div>
      <div className="w-full">
        <Switcher
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          messageOne="Todos"
          messageTwo="Somente selecionados"
        />
      </div>

      {Options.map((option, index) => (
        <div
          key={index}
          className="flex w-auto select-none flex-row justify-between gap-2 whitespace-nowrap py-2 pl-4 pr-2 text-sm text-c_scnd hover:bg-c_interact hover:text-c_base"
          role="menuitem"
          onClick={
            isChecked
              ? processedOptions![index]![0]
              : processedOptions![index]![1]
          }
        >
          <div>{option.title}</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
