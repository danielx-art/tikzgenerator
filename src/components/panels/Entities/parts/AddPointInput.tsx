import { useEffect, useState } from "react";
import useMyStore from "store";
import { ponto, type Tponto } from "public/entidades";
import { vec } from "public/vetores";
import useStore from "import/utils/useStore";

const MAXIMUM_NUMBER_OF_POINTS = 3458;

export const AddPointInput = () => {
  const store = useStore(useMyStore, (state)=>state);

  const [input, setInput] = useState("");

  function addPoint() {

    if(!store) return;

    if (store.points.length > MAXIMUM_NUMBER_OF_POINTS) {
      store.setError(
        store.error +
          `Devido à medidas de segurança, você atingiu o limite de ${MAXIMUM_NUMBER_OF_POINTS} pontos. Remova alguns pontos para que seja possível adicionar outros. `,
      );
    }

    const substrings = input.split(" ");

    let pointsToAdd = [] as Tponto[];

    for (let index = 0; index < substrings.length; index++) {
      let substring = substrings[index] as string;

      if (substring.includes(";")) {
        const [str1, str2] = substring.split(";");

        if (!(str1 && str2)) {
          store.setError(
            store.error +
              `O ponto "${substring}", da forma X;Y, não contém uma das coordenadas. `,
          );
          continue;
        }

        const num1 = parseFloat(str1);
        const num2 = parseFloat(str2);

        if (!isNaN(num1) && !isNaN(num2)) {
          const newPointId = `point-${store.points.length + pointsToAdd.length}`;
          const newPoint = ponto(vec(num1, num2), newPointId, store.selectedGroup);
          pointsToAdd.push(newPoint);
          continue;
        }

        store.setError(
          store.error + `As coordenadas do ponto "${substring}" devem ser números. `,
        );
      } else if (substring.includes(":")) {
        const selectedPoints = store.points.filter((point) => point.selected);

        const pointsInTheSameGroup = store.points.filter(
          (point) => point.group == store.selectedGroup,
        );

        const referencePoint =
          selectedPoints[selectedPoints.length - 1] ||
          pointsInTheSameGroup[pointsInTheSameGroup.length - 1];

        if (referencePoint == undefined) {
          store.setError(
            store.error +
              "Para adicionar um ponto da forma R:θ, você deve ter pelo menos outro ponto no mesmo grupo, ou um ponto selecionado. ",
          );
          continue;
        }

        const [str1, str2] = substring.split(":");
        if (!(str1 && str2)) {
          store.setError(
            store.error +
              `O ponto "${substring}", da forma R:θ, não contém uma das coordenadas. `,
          );
          continue;
        }

        const num1 = parseFloat(str1);
        const num2 = parseFloat(str2);

        if (!isNaN(num1) && !isNaN(num2)) {
          //convert to radians
          const num2radians = (num2 * Math.PI) / 180;
          //new coord
          const preciseCoords = vec(num1, 0)
            .rotate(parseFloat(((num2 * Math.PI) / 180).toFixed(2)))
            .add(referencePoint.vec);

          const roundedCoords = vec(
            parseFloat(preciseCoords.x.toFixed(1)),
            parseFloat(preciseCoords.y.toFixed(1)),
          );
          
          const newPointId = `point-${store.points.length + pointsToAdd.length}`;
          const newPoint = ponto(roundedCoords, newPointId, store.selectedGroup);
          pointsToAdd.push(newPoint);
          continue;
        }

        store.setError(
          store.error + `As coordenadas do ponto "${substring}" devem ser números. `,
        );
      } else {
        store.setError(
          store.error +
            `O ponto "${substring}" deve ser da forma absoluta X;Y ou da forma relativa R:θ, partindo de um ponto selecionado ou do último ponto adicionado no mesmo grupo. `,
        );
      }
    }
    store.setPoints([...store.points, ...pointsToAdd]);
    setInput("");
  }

  return (
    <div className="my-2 flex w-full flex-row flex-nowrap">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full rounded-sm bg-a_highlight px-2 py-1 text-a_dark focus:outline-none"
      />
      <div
        className="rounded-sm bg-a_dark p-2 text-a_highlight outline-1"
        onClick={addPoint}
      >
        +
      </div>
    </div>
  );
};
