import { RemoveButton } from "import/components/micro/RemoveButton";
import myStore from "import/utils/store/store";
import useStore from "import/utils/store/useStore";
import { getKindById } from "import/utils/storeHelpers/miscEntity";
import type { TentId, TtagId } from "public/entidades";
import { ButtonHTMLAttributes } from "react";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement>;

const RemoveEntityButton: React.FC<PropsType> = ({
  className,
  onClick,
  ...rest
}) => {
  const store = useStore(myStore, (state) => state);

  const handleRemove = () => {
    if (!store) return;
    const selections = store.selections;
    selections.forEach((sel) => {
      let kind = getKindById(sel);
      if (kind == "tag") {
        store.deleteTag(sel as TtagId);
      } else {
        store.deleteEntity(sel as TentId);
      }
    });
  };

  return (
    <RemoveButton onClick={handleRemove} className={className} {...rest} />
  );
};

export default RemoveEntityButton;
