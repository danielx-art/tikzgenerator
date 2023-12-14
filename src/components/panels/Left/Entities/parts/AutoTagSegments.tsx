import PopMenu from "import/components/micro/PopMenu";
import {
  alphabeticalSmallLatinTags,
  lengthTags,
} from "import/utils/storeHelpers/autoTags";
import myStore from "import/utils/store/store";
import useApplyTags from "import/utils/storeHelpers/useApplyTags";
import useStore from "import/utils/store/useStore";

export default function AutoTagSegments() {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const applyTags = useApplyTags(store);

  return (
    <PopMenu
      title="Autoetiquetar segmentos"
      withToggle={true}
      toggleMessages={["Todos", "Somente selecionados"]}
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
  );
}
