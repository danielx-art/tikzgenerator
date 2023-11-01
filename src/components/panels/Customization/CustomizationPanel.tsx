import {
  alphabeticalGreekTags,
  alphabeticalLatinTags,
  numericalTags,
  alphabeticalSmallLatinTags,
} from "import/utils/autoTags";
import PopMenu from "../../micro/PopMenu";
import myStore from "import/utils/store";
import useStore from "import/utils/useStore";
import useApplyTags from "import/utils/useApplyTags";

const CustomizationPanel = () => {
  const store = useStore(myStore, (state)=>state);

  if(!store) return;

  const applyTags = useApplyTags(store);

  return (
    <div className="h-1/2 w-full self-start p-4 text-a_dark sm:w-1/2 md:w-1/3">
      <div className="w-fit">Customização</div>
      <div className="flex h-[calc(100%-2rem)] w-full flex-col items-start justify-start gap-4 rounded-b-lg border-2 border-t-0 border-a_neutral bg-a_light p-4">
        <PopMenu
          title="Autoetiquetar pontos"
          withToggle={true}
          toggleMessages={["Todos", "Somente selecionados"]}
          Options={[
            {
              title: "A...Z AA...ZZ",
              action: () =>
                applyTags(alphabeticalLatinTags, store.points, store.tags, store.setTags),
            },
            { title: "Coordenadas (X;Y)" },
            {
              title: "P1...Pn",
              action: () => applyTags(numericalTags, store.points, store.tags, store.setTags),
            },
          ]}
        />
        <PopMenu
          title="Autoetiquetar segmentos"
          withToggle={true}
          toggleMessages={["Todos", "Somente selecionados"]}
          Options={[{ title: "Medida" }, { title: "a...z aa...zz" }]}
        />
        <PopMenu
          title="Autoetiquetar ângulos"
          withToggle={true}
          toggleMessages={["Todos", "Somente selecionados"]}
          Options={[
            { title: "Medida em graus" },
            { title: "Medida em radianos" },
            {
              title: `𝜶...𝝎`,
              action: () =>
                applyTags(alphabeticalGreekTags, store.angles, store.tags, store.setTags),
            },
            { title: "\u{00C2} ... \u{1E90}" },
            {
              title: "a...z",
              action: () =>
                applyTags(alphabeticalSmallLatinTags, store.angles, store.tags, store.setTags),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default CustomizationPanel;
