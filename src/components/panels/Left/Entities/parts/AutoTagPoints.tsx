import PopMenu from "import/components/micro/PopMenu";
import { alphabeticalLatinTags, coordTags, numericalTags } from "import/utils/autoTags";
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
          action: 
          [
            () => applyTags(
              alphabeticalLatinTags,
              store.points,
            ), 
            () => applyTags(
              alphabeticalLatinTags,
              new Map(Array.from(store.points).filter(([key, point]) => point.selected)),
            )
          ],
        },
        { 
          title: "Coordenadas (X;Y)" ,
          action: [
            ()=>applyTags(coordTags, store.points),
            ()=>applyTags(coordTags, new Map(Array.from(store.points).filter(([key, point]) => point.selected))),
          ]
        },
        {
          title: "P1...Pn",
          action: [
            () => applyTags(numericalTags, store.points),
            () => applyTags(numericalTags, new Map(Array.from(store.points).filter(([key, point]) => point.selected)))
          ],
        },
      ]}
    />
  );
}
