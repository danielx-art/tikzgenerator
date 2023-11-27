import PopMenu from "import/components/micro/PopMenu";
import { alphabeticalSmallLatinTags, lengthTags } from "import/utils/autoTags";
import myStore from "import/utils/store";
import useApplyTags from "import/utils/useApplyTags";
import useStore from "import/utils/useStore";

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
            () =>
              applyTags(lengthTags, store.segments, store.setSegments, store.tags, store.setTags, store.generateId),
            () =>
              applyTags(
                lengthTags,
                store.segments.filter((segment) => segment.selected),
                store.setSegments,
                store.tags,
                store.setTags,
                store.generateId
              ),
          ],
        },
        {
          title: "a...z aa...zz",
          action: [
            () =>
              applyTags(
                alphabeticalSmallLatinTags,
                store.segments,
                store.setSegments,
                store.tags,
                store.setTags,
                store.generateId
              ),
            () =>
              applyTags(
                alphabeticalSmallLatinTags,
                store.segments.filter((segment) => segment.selected),
                store.setSegments,
                store.tags,
                store.setTags,
                store.generateId
              ),
          ],
        },
      ]}
    />
  );
}
