import {
  alphabeticalGreekTags,
  alphabeticalLatinTags,
  numericalTags,
  alphabeticalSmallLatinTags,
} from "import/utils/autoTags";
import { PopMenu } from "../../micro/PopMenu";
import useMyStore from "store";
import { etiqueta, type Tetiqueta, type Tentity } from "public/entidades";
import useStore from "import/utils/useStore";

const CustomizationPanel = () => {
  const store = useStore(useMyStore, (state)=>state);

  const applyTags = <T extends Tentity>(
    tagFunction: (i: number) => string,
    entities: T[],
    tags: Tetiqueta[],
    setTags: (etiqueta: Tetiqueta[]) => void,
  ) => {
    let tagsToAdd = [] as Tetiqueta[];
    let tagsToRemove = [] as Tetiqueta[];

    let foundError = false;

    for (let i = 0; i < entities.length; i++) {
      let currentEntity = entities[i] as T;

      //1.find if entity already has a tag, then add it to remove list.
      let tagOccupied = tags.find((tag) => tag.entityId == currentEntity.id);
      if (tagOccupied != undefined) tagsToRemove.push(tagOccupied);

      let newTagValue = tagFunction(i);
      const alreadyInUse = tags.find((tag) => tag.value == newTagValue);
      foundError = alreadyInUse != undefined ? true : false;
      if (foundError) {
        //dont write a tag for this one, just continue
        continue;
      }

      const newTagId = `tag-${
        tags.length + tagsToAdd.length
      }`;
      const newTag = etiqueta(currentEntity, newTagValue, newTagId);
      tagsToAdd.push(newTag);
    }

    for(let i=0; i<tagsToAdd.length; i++) {
      const currentTag = tagsToAdd[i] as Tetiqueta;
      const currentTagNumberStr = currentTag.id.split("-")[1] as string;
      const currentTagNumber = parseInt(currentTagNumberStr);
      currentTag.id = `tag-${currentTagNumber-tagsToRemove.length}`;
    }

    const updatedTags = [] as Tetiqueta[];

    for (let i = 0; i < tags.length; i++) {
      const currentTag = tags[i] as Tetiqueta;
      const toBeRemoved = tagsToRemove.find(
        (item) => (item.id = currentTag.id),
      );
      if (toBeRemoved) {
        continue;
      }
      updatedTags.push(currentTag);
    }

    updatedTags.push(...tagsToAdd);

    setTags(updatedTags);

    if (foundError) {
      store?.setError(
        store?.error +
          "Alguma(s) etiqueta(s) que já estão em uso não foram aplicadas, para evitar duplicatas. Caso deseje, limpe todas as etiquetas, depois selecione todos os objetos que deseja etiquetar e etiquete-os novamente. ",
      );
    }
  };

  return (
    <div className="h-1/2 w-full self-start p-4 text-a_dark sm:w-1/2 md:w-1/3">
      <div className="w-fit">Customização</div>
      <div className="flex h-[calc(100%-2rem)] w-full flex-col items-start justify-start gap-4 rounded-b-lg border-2 border-t-0 border-a_neutral bg-a_light p-4">
        {store && <><PopMenu
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
        /></>}
      </div>
    </div>
  );
};

export default CustomizationPanel;
