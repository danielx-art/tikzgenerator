import { useState } from "react";
import Switcher from "import/components/micro/Switcher";
import useStore from "import/utils/store/useStore";
import myStore from "import/utils/store/store";
import useApplyTags from "import/utils/storeHelpers/useApplyTags";
import {
  alphabeticalGreekTags,
  alphabeticalLatinTags,
  alphabeticalSmallLatinTags,
  arcTags,
  coordTags,
  lengthTags,
  numericalTags,
} from "import/utils/storeHelpers/autoTags";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "import/components/micro/ui/accordion";

const AutoTags: React.FC = () => {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const applyTags = useApplyTags(store);

  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="Autoetiquetar pontos">
        <AccordionTrigger>Pontos</AccordionTrigger>
        <AccordionContent>

        
        <AutoTagEntityMenuBody
          Options={[
            {
              title: "A...Z AA...ZZ",
              action: [
                () => applyTags(alphabeticalLatinTags, store.points),
                () =>
                  applyTags(
                    alphabeticalLatinTags,
                    new Map(
                      Array.from(store.points).filter(
                        ([key, point]) => point.selected,
                      ),
                    ),
                  ),
              ],
            },
            {
              title: "Coordenadas (X;Y)",
              action: [
                () => applyTags(coordTags, store.points),
                () =>
                  applyTags(
                    coordTags,
                    new Map(
                      Array.from(store.points).filter(
                        ([key, point]) => point.selected,
                      ),
                    ),
                  ),
              ],
            },
            {
              title: "P1...Pn",
              action: [
                () => applyTags(numericalTags, store.points),
                () =>
                  applyTags(
                    numericalTags,
                    new Map(
                      Array.from(store.points).filter(
                        ([key, point]) => point.selected,
                      ),
                    ),
                  ),
              ],
            },
          ]}
        />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="segmentos">
        <AccordionTrigger>Segmentos</AccordionTrigger>
        <AccordionContent>

        
        <AutoTagEntityMenuBody
          Options={[
            {
              title: "Medida",
              action: [
                () => applyTags(lengthTags, store.segments),
                () =>
                  applyTags(
                    lengthTags,
                    new Map(
                      Array.from(store.segments).filter(
                        ([key, segment]) => segment.selected,
                      ),
                    ),
                  ),
              ],
            },
            {
              title: "a...z aa...zz", //WARNING - THERES AN AUTO TAG ANGLES WITH THE SAME TAG VALUES
              action: [
                () => applyTags(alphabeticalSmallLatinTags, store.segments),
                () =>
                  applyTags(
                    alphabeticalSmallLatinTags,
                    new Map(
                      Array.from(store.segments).filter(
                        ([key, segment]) => segment.selected,
                      ),
                    ),
                  ),
              ],
            },
          ]}
        />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Ângulos">
        <AccordionTrigger>Ângulos</AccordionTrigger>
        <AccordionContent>
        <AutoTagEntityMenuBody
          Options={[
            {
              title: "Medida (radianos)",
              action: [
                () => applyTags(arcTags, store.angles),
                () =>
                  applyTags(
                    arcTags,
                    new Map(
                      Array.from(store.angles).filter(
                        ([key, angle]) => angle.selected,
                      ),
                    ),
                  ),
              ],
            },
            {
              title: `𝜶...𝝎`,
              action: [
                () => applyTags(alphabeticalGreekTags, store.angles),
                () =>
                  applyTags(
                    alphabeticalGreekTags,
                    new Map(
                      Array.from(store.angles).filter(
                        ([key, angle]) => angle.selected,
                      ),
                    ),
                  ),
              ],
            },
            { title: "\u{00C2} ... \u{1E90}" },
          ]}
        />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
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
      <div className="w-auto py-2">
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
          className="flex w-auto select-none flex-row justify-between gap-2 whitespace-nowrap py-2 pl-0 pr-2 text-sm text-foreground hover:bg-primary hover:text-background"
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
