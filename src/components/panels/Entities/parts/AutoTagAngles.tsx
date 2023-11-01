import PopMenu from "import/components/micro/PopMenu";
import {
  alphabeticalGreekTags,
  alphabeticalSmallLatinTags,
  arcTags,
} from "import/utils/autoTags";
import myStore from "import/utils/store";
import useApplyTags from "import/utils/useApplyTags";
import useStore from "import/utils/useStore";

export default function AutoTagAngles() {
  const store = useStore(myStore, (state) => state);

  if (!store) return;

  const applyTags = useApplyTags(store);

  return (
    <PopMenu
      title="Autoetiquetar ângulos"
      withToggle={true}
      toggleMessages={["Todos", "Somente selecionados"]}
      Options={[
        {
          title: "Medida (radianos)",
          action: [
            () => applyTags(arcTags, store.angles, store.tags, store.setTags),
            () =>
              applyTags(
                arcTags,
                store.angles.filter((angle) => angle.selected),
                store.tags,
                store.setTags,
              ),
          ],
        },
        {
          title: "a...z aa...zz",
          action: [
            () =>
              applyTags(
                alphabeticalSmallLatinTags,
                store.angles,
                store.tags,
                store.setTags,
              ),
            () =>
              applyTags(
                alphabeticalSmallLatinTags,
                store.angles.filter((angle) => angle.selected),
                store.tags,
                store.setTags,
              ),
          ],
        },
        {
          title: `𝜶...𝝎`,
          action: [
            () =>
              applyTags(
                alphabeticalGreekTags,
                store.angles,
                store.tags,
                store.setTags,
              ),
            () =>
              applyTags(
                alphabeticalGreekTags,
                store.angles.filter((angle) => angle.selected),
                store.tags,
                store.setTags,
              ),
          ],
        },
        { title: "\u{00C2} ... \u{1E90}" },
      ]}
    />
  );
}
