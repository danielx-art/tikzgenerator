import { type Action, type State } from "import/utils/store";
import {
  Tangulo,
  Tentity,
  Tetiqueta,
  Tponto,
  Tsegmento,
} from "public/entidades";
import { vec } from "public/vetores";
import { useEffect, useState } from "react";

type PropsType = {
  store: State & Action;
  curr: number;
};

const TagCustomization: React.FC<PropsType> = ({ store, curr }) => {
  const [direction, setDirection] = useState(vec(0, 0));

  let selectedEntities: Array<Tentity> | Array<Tetiqueta>;
  let thisEntity: Tentity | Tetiqueta;
  let thisTag: Tetiqueta;

  useEffect(() => {
    switch (store.tab) {
      case "points":
        selectedEntities = store.points.filter((point) => point.selected);
        thisEntity = selectedEntities[curr]!;
        thisTag = store.tags.find((tag) => tag.id == thisEntity!.id)!;
        setDirection(thisTag.pos);
        break;

      case "segments":
        selectedEntities = store.segments.filter(
          (seg) => seg.selected,
        ) as Array<Tsegmento>;
        thisEntity = selectedEntities[curr] as Tsegmento;
        break;

      case "angles":
        selectedEntities = store.angles.filter(
          (ang) => ang.selected,
        ) as Array<Tangulo>;
        thisEntity = selectedEntities[curr] as Tangulo;
        break;

      case "tags":
        selectedEntities = store.tags.filter(
          (tag) => tag.selected,
        ) as Array<Tetiqueta>;
        thisEntity = selectedEntities[curr] as Tetiqueta;
        break;
    }
  }, [store.tab, curr]);

  return (
    <div className="mb-2 flex w-full flex-col gap-2">
      <div className="">Etiqueta</div>
      <div className="flex w-full flex-row">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
            />
          </svg>
        </button>
        {/*
        1.shows current selected entity tag, if none showns "Nenhuma"
        2.a button to the side, pencil, to enable edit mode
        3. if edit mode enabled, the tag turns into an editable input
        4.after editing input, user can submit it pressing enter or clicking the pencil button that now has turned into an enter symbol
        5.if so, tag is changed both in entity and on the tag object itself
        6.Choose tag positioning: rosa dos ventos, on click change orientation (8 options), and also set distance, also a button that changes distance shown on click
        7.when positioning is set and distance too, then show on preview
        */}
      </div>
    </div>
  );
};

export default TagCustomization;
