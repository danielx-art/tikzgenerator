import PopMenu from "import/components/micro/PopMenu";
import {
  alphabeticalGreekTags,
  alphabeticalSmallLatinTags,
  arcTags,
} from "import/utils/storeHelpers/autoTags";
import myStore from "import/utils/store/store";
import useApplyTags from "import/utils/storeHelpers/useApplyTags";
import useStore from "import/utils/store/useStore";

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
          title: "a...z aa...zz",
          action: [
            () => applyTags(alphabeticalSmallLatinTags, store.angles),
            () =>
              applyTags(
                alphabeticalSmallLatinTags,
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
  );
}
