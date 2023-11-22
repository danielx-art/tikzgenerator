import { type Action, type State } from "import/utils/store";

type PropsType = {
  store: State & Action;
  curr: number;
};

const TagCustomization: React.FC<PropsType> = ({ store, curr }) => {
  const { points, setPoints } = store;

  const selectedPoints = points.filter(point=>point.selected);

  const thisPoint = selectedPoints[curr];

  return (
    <div className="flex w-full flex-col gap-2 mb-2">
      <div className="">Etiqueta</div>
      <div className="flex flex-row w-full">
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
