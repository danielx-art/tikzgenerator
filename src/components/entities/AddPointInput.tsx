import { useState, type KeyboardEvent, useCallback } from "react";
import myStore from "import/utils/store/store";
import { ponto, type Tpoint } from "public/entidades";
import { vec } from "import/utils/math/vetores";
import useStore from "import/utils/store/useStore";
import { MAXIMUM_NUMBER_OF_POINTS } from "public/generalConfigs";
import { toast } from "sonner";
import { fromSelectionsGet } from "import/utils/storeHelpers/entityGetters";

const AddPointInput = () => {
  const store = useStore(myStore, (state) => state);

  const [input, setInput] = useState("");

  const addPoint = useCallback(()=>{

    if(!store) return;

    const {points, setPoints, selections, generateId} = store;

    if (points.size > MAXIMUM_NUMBER_OF_POINTS) {
      toast(
        `Devido à medidas de segurança, você atingiu o limite de ${MAXIMUM_NUMBER_OF_POINTS} pontos. Remova alguns pontos para que seja possível adicionar outros. `,
      );
      return;
    }

    const substrings = input.split(" ");

    let pointsToAdd = [] as Array<Tpoint>;

    for (let index = 0; index < substrings.length; index++) {
      let substring = substrings[index] as string;

      if (substring.includes(";")) {
        const [str1, str2] = substring.split(";");

        if (!(str1 && str2)) {
          toast.error(
            `O ponto "${substring}", da forma X;Y, não contém uma das coordenadas. `,
          );
          continue;
        }

        const num1 = parseFloat(str1);
        const num2 = parseFloat(str2);

        if (!isNaN(num1) && !isNaN(num2)) {
          const newId = generateId("point");
          const newPoint = ponto(vec(num1, num2), newId);

          pointsToAdd.push(newPoint);
          continue;
        }

        toast.error(
          `As coordenadas do ponto "${substring}" devem ser números. `,
        );
        return;

      } else if (substring.includes(":")) {

        const [str1, str2] = substring.split(":");
        if (!(str1 && str2)) {
          toast.error(
            `O ponto "${substring}", da forma R:θ, não contém uma das coordenadas. `,
          );
          continue;
        }

        let num1: number | undefined;
        let num2 = parseFloat(str2);

        let referencePoint: Tpoint | undefined;

        if(substring.startsWith("+")){
          //reference point should be last point in the list

          num1 = parseFloat(str1.substring(1).replace(/\s+/g, '')); //remove the + sign TEST REGEX

          const lastPoint = pointsToAdd[pointsToAdd.length-1];
          
          if(!lastPoint) {
            toast.error('Para utilizar a sintaxe +R:θ você deve adicionar outro ponto antes. ');
            return;
          } 

          referencePoint = lastPoint;
        } else {
          //reference point should be last point selected

          num1 = parseFloat(str1);

          if(!selections) {
            toast.error(
              "Para adicionar um ponto da forma R:θ, você deve ter pelo menos outro ponto selecionado. ",
            );
            continue;
          }
          const selectedPointIds = fromSelectionsGet("point", selections);
          const lastSelectedId = selectedPointIds[selectedPointIds.length-1];
          if(!lastSelectedId) {
            toast.error(
              "Há algum erro com o ponto selecionado. Para adicionar um ponto da forma R:θ, você deve ter pelo menos outro ponto selecionado. ",
            );
            continue;
          }
          const lastSelectedPoint = points.get(lastSelectedId);
          if(!lastSelectedPoint) {
            toast.error(
              "Há algum erro com o ponto selecionado. Para adicionar um ponto da forma R:θ, você deve ter pelo menos outro ponto selecionado. ",
            );
            continue;
          }
          referencePoint = lastSelectedPoint;
        }

        if (num1 && !isNaN(num1) && !isNaN(num2)) {
          //convert to radians
          const num2radians = (num2 * Math.PI) / 180;
          //new coord
          const preciseCoords = vec(num1, 0)
            .rotate(parseFloat(num2radians.toFixed(4)))
            .add(referencePoint.coords);

          // const roundedCoords = vec(
          //   parseFloat(preciseCoords.x.toFixed(1)),
          //   parseFloat(preciseCoords.y.toFixed(1)),
          // );

          const newId = generateId("point");
          const newPoint = ponto(preciseCoords, newId);
          pointsToAdd.push(newPoint);
          continue;
        }

        toast.error(
          `As coordenadas do ponto "${substring}" devem ser números. `,
        );
        return;
      } else {
        toast.error(
          `O ponto "${substring}" deve ser da forma absoluta X;Y e também das formas relativas +R:θ, partindo de um ponto selecionado, ou R:θ, partindo do ponto anterior sendo adicionado. `,
        );
      }
    }

    const updatedPoints = new Map(points);

    pointsToAdd.forEach((newPoint) => updatedPoints.set(newPoint.id, newPoint));

    setPoints(updatedPoints);
    setInput("");
  },[store, input]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addPoint();
    }
  };

  return (
    <div className="group my-2 flex w-full flex-row flex-nowrap gap-2 rounded-sm outline outline-2 outline-muted focus-within:outline-primary">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 px-2 focus:outline-none"
        placeholder="(X;Y) / +(R:&#x3B8;) / (R:&#x3B8;), separados por espaço"
      />
      <button
        className="rounded-sm bg-primary p-2 text-background outline-1 hover:bg-foreground"
        onClick={addPoint}
      >
        +
      </button>
    </div>
  );
};

export default AddPointInput;
