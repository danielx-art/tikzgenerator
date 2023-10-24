import { Tponto, ponto } from "public/entidades";
import { vec } from "public/vetores";
import { useState } from "react";
import useMyStore from "store";

export default function PointsTab() {
  const {
    points,
    setPoints,
    groups,
    setGroups,
    selectedGroup,
    setSelectedGroup,
  } = useMyStore();

  const [input, setInput] = useState("");

  const [err, setErr] = useState<string | null>(null);

  function handlePointClick(index: number) {
    const updatedPoints = [...points];
    let thisPoint = updatedPoints[index] as Tponto;
    thisPoint.selected = !thisPoint.selected;
    setPoints(updatedPoints);
  }

  function removePoint(index: number) {
    const updatedPoints = [...points];
    updatedPoints.splice(index, 1);
    setPoints(updatedPoints);
  }

  function addPoint() {
    const substrings = input.split(" ");

    let pointsToAdd = [] as Tponto[];

    for (let index = 0; index < substrings.length; index++) {
      let substring = substrings[index] as string;

      if (substring.includes(";")) {
        const [str1, str2] = substring.split(";");

        if (!(str1 && str2)) {
          setErr(
            `O ponto "${substring}", da forma X;Y, não contém uma das coordenadas.`,
          );
          continue;
        }

        const num1 = parseFloat(str1);
        const num2 = parseFloat(str2);

        if (!isNaN(num1) && !isNaN(num2)) {
          const newPoint = ponto(vec(num1, num2), selectedGroup);
          pointsToAdd.push(newPoint);
          continue;
        }

        setErr(`As coordenadas do ponto "${substring}" devem ser números.`);
      } else if (substring.includes(":")) {
        const selectedPoints = points.filter((point) => point.selected);

        const pointsInTheSameGroup = points.filter(
          (point) => point.group == selectedGroup,
        );

        const referencePoint =
          selectedPoints[selectedPoints.length - 1] ||
          pointsInTheSameGroup[pointsInTheSameGroup.length - 1];

        if (referencePoint == undefined) {
          setErr(
            "Para adicionar um ponto da forma R:θ, você deve ter pelo menos outro ponto no mesmo grupo, ou um ponto selecionado.",
          );
          continue;
        }

        const [str1, str2] = substring.split(":");
        if (!(str1 && str2)) {
          setErr(
            `O ponto "${substring}", da forma R:θ, não contém uma das coordenadas.`,
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

          const newPoint = ponto(roundedCoords, selectedGroup);
          pointsToAdd.push(newPoint);
          continue;
        }

        setErr(`As coordenadas do ponto "${substring}" devem ser números.`);
      } else {
        setErr(
          `O ponto "${substring}" deve ser da forma absoluta X;Y ou da forma relativa R:θ, partindo de um ponto selecionado ou do último ponto adicionado no mesmo grupo.`,
        );
      }
    }
    setPoints([...points, ...pointsToAdd]);
    setInput("");
  }

  function addGroup() {
    const numGroups = groups.length;
    const newGroup = numGroups + 1;
    setGroups([...groups, newGroup]);
    setSelectedGroup(numGroups + 1);
  }

  function handleGroupClick(groupId: number) {
    setSelectedGroup(groupId);
  }

  function removeGroup(groupId: number) {
    const updatedPoints = [...points].filter((point) => point.group != groupId);
    updatedPoints.forEach((point) => {
      if (point.group > groupId) point.group--;
    });

    setPoints(updatedPoints);

    if (selectedGroup == groupId) setSelectedGroup(0);

    const groupsAfterRemoval = [...groups].filter((group) => group != groupId);

    const updatedGroups = groupsAfterRemoval.map((group) =>
      group > groupId ? group - 1 : group,
    );

    setGroups(updatedGroups);
  }

  return (
    <div className="flex h-full flex-col flex-nowrap justify-between">
      <div className="flex-1 rounded-sm bg-gray-800 p-1">
        {groups.map((eachGroup, groupIndex) => (
          <div key={`group-${groupIndex}`}>
            <div
              className={`${
                eachGroup == selectedGroup
                  ? "bg-white bg-opacity-5 font-bold"
                  : null
              } flex flex-row flex-nowrap justify-between px-2 py-1 text-sm text-white`}
            >
              <div
                onClick={() => handleGroupClick(eachGroup)}
              >{`Grupo ${eachGroup}`}</div>
              <div
                className="text-white"
                onClick={() => removeGroup(eachGroup)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            </div>
            {points
              .filter((point) => point.group == eachGroup)
              .map((point, index) => {
                return (
                  <div
                    key={"point_" + index}
                    className={`${
                      point.selected
                        ? "border-1 border-dashed border-white bg-white bg-opacity-20"
                        : null
                    } flex w-full flex-row flex-nowrap justify-stretch text-sm text-white`}
                  >
                    <div className="flex w-full select-none flex-row justify-between py-1 pl-4 pr-2">
                      <div onClick={() => handlePointClick(index)}>
                        {point.vec.x};{point.vec.y}
                      </div>

                      <div
                        className="text-white"
                        onClick={() => removePoint(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>

      <div className="relative my-2 flex w-full flex-row flex-nowrap">
        {err && (
          <div className="absolute bottom-full m-2 mb-4 flex w-auto flex-row flex-nowrap bg-yellow-100 p-2 text-red-600 rounded-sm">
            <div>{err}</div>
            <div className="h-6 w-6" onClick={() => setErr(null)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        )}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-sm px-2 py-1"
        />
        <div
          className="rounded-sm bg-slate-100 p-2 outline-1"
          onClick={addPoint}
        >
          +
        </div>
      </div>
      <div className="flex flex-row flex-nowrap gap-2">
        <select
          className="w-20"
          value={`Grupo ${selectedGroup}`}
          onChange={(e) => {
            setSelectedGroup(parseInt(e.target.value.split(" ")[1] as string));
          }}
        >
          {groups.map((each, index) => (
            <option key={`group-${index}`}>Grupo {each}</option>
          ))}
        </select>
        <div className=" text-black" onClick={addGroup}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
