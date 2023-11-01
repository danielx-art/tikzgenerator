import PopMenu from "import/components/micro/PopMenu";
import { alphabeticalLatinTags, numericalTags } from "import/utils/autoTags";
import myStore from "import/utils/store";
import useApplyTags from "import/utils/useApplyTags";
import useStore from "import/utils/useStore";

export default function AutoTagPoints() {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const applyTags = useApplyTags(store);

  return (
    <PopMenu
      title="Autoetiquetar pontos"
      withToggle={true}
      toggleMessages={["Todos", "Somente selecionados"]}
      Options={[
        {
          title: "A...Z AA...ZZ",
          action: () =>
            applyTags(
              alphabeticalLatinTags,
              store.points,
              store.tags,
              store.setTags,
            ),
        },
        { title: "Coordenadas (X;Y)" },
        {
          title: "P1...Pn",
          action: () =>
            applyTags(numericalTags, store.points, store.tags, store.setTags),
        },
      ]}
    />
  );
}
