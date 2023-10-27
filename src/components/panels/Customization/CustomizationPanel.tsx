import {
  applyGreekTags,
  applyLatinTags,
  applyNumericalTags,
  applySmallLatinTags,
} from "import/utils/autoTags";
import { PopMenu } from "../../micro/PopMenu";

const CustomizationPanel = () => {
  return (
    <div className="h-1/2 w-full self-start p-4 text-a_dark sm:w-1/2 md:w-1/3">
      <div className="w-fit">Customização</div>
      <div className="flex h-[calc(100%-2rem)] w-full flex-col items-start justify-start gap-4 rounded-b-lg border-2 border-t-0 border-a_neutral bg-a_light p-4">
        <PopMenu
          title="Autoetiquetar pontos"
          withToggle={true}
          toggleMessages={["Todos", "Somente selecionados"]}
          Options={[
            { title: "A...Z AA...ZZ", action: () => applyLatinTags },
            { title: "Coordenadas (X;Y)" },
            { title: "P1...Pn", action: () => applyNumericalTags },
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
              action: applyGreekTags, //this is wrong! ()=>setAngles(applyGreekTags(angles))
            },
            { title: "\u{00C2} ... \u{1E90}" },
            { title: "a...z", action: applySmallLatinTags },
          ]}
        />
      </div>
    </div>
  );
};

export default CustomizationPanel;
