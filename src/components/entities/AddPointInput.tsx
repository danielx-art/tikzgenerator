import { useState, type KeyboardEvent } from "react";
import myStore from "import/utils/store/store";
import { ponto, type Tpoint } from "public/entidades";
import { vec } from "import/utils/math/vetores";
import useStore from "import/utils/store/useStore";
import { MAXIMUM_NUMBER_OF_POINTS } from "public/generalConfigs";

const AddPointInput = () => {
  const store = useStore(myStore, (state) => state);

  const [input, setInput] = useState("");

  if (!store) return;

  const { points, setPoints, selectedGroup, error, setError, generateId } =
    store;

  function addPoint() {
    if (!store) return;

    if (points.size > MAXIMUM_NUMBER_OF_POINTS) {
      setError(
        error +
          `Devido à medidas de segurança, você atingiu o limite de ${MAXIMUM_NUMBER_OF_POINTS} pontos. Remova alguns pontos para que seja possível adicionar outros. `,
      );
    }

    const substrings = input.split(" ");

    let pointsToAdd = [] as Tpoint[];

    for (let index = 0; index < substrings.length; index++) {
      let substring = substrings[index] as string;

      if (substring.includes(";")) {
        const [str1, str2] = substring.split(";");

        if (!(str1 && str2)) {
          setError(
            error +
              `O ponto "${substring}", da forma X;Y, não contém uma das coordenadas. `,
          );
          continue;
        }

        const num1 = parseFloat(str1);
        const num2 = parseFloat(str2);

        if (!isNaN(num1) && !isNaN(num2)) {
          const newPointId = generateId("point");
          const newPoint = ponto(vec(num1, num2), newPointId, selectedGroup);
          pointsToAdd.push(newPoint);
          continue;
        }

        setError(
          error + `As coordenadas do ponto "${substring}" devem ser números. `,
        );
      } else if (substring.includes(":")) {
        const pointsArr = Array.from(points.values());

        const selectedPoints = pointsArr.filter((point) => point.selected);

        const pointsInTheSameGroup = pointsArr.filter(
          (point) => point.group == selectedGroup,
        );

        const referencePoint =
          selectedPoints[selectedPoints.length - 1] ||
          pointsInTheSameGroup[pointsInTheSameGroup.length - 1];

        if (referencePoint == undefined) {
          setError(
            error +
              "Para adicionar um ponto da forma R:θ, você deve ter pelo menos outro ponto no mesmo grupo, ou um ponto selecionado. ",
          );
          continue;
        }

        const [str1, str2] = substring.split(":");
        if (!(str1 && str2)) {
          setError(
            error +
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
            .add(referencePoint.coords);

          const roundedCoords = vec(
            parseFloat(preciseCoords.x.toFixed(1)),
            parseFloat(preciseCoords.y.toFixed(1)),
          );

          const newPointId = generateId("point");
          const newPoint = ponto(roundedCoords, newPointId, selectedGroup);
          pointsToAdd.push(newPoint);
          continue;
        }

        setError(
          error + `As coordenadas do ponto "${substring}" devem ser números. `,
        );
      } else {
        setError(
          error +
            `O ponto "${substring}" deve ser da forma absoluta X;Y ou da forma relativa R:θ, partindo de um ponto selecionado ou do último ponto adicionado no mesmo grupo. `,
        );
      }
    }

    const updatedPoints = new Map(points);

    pointsToAdd.forEach((newPoint) => updatedPoints.set(newPoint.id, newPoint));

    setPoints(updatedPoints);
    setInput("");
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addPoint();
    }
  };

  return (
    <div className="group my-2 flex w-full flex-row flex-nowrap gap-2 rounded-sm outline outline-2 outline-c_discrete focus-within:outline-c_interact">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 px-2 focus:outline-none"
        placeholder="(X;Y) ou (R:&#x3B8;) separados por espaço"
      />
      <button
        className="rounded-sm bg-c_interact p-2 text-c_base outline-1 hover:bg-c_high1"
        onClick={addPoint}
      >
        +
      </button>
    </div>
  );
};

export default AddPointInput;
