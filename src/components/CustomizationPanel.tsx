import { useState } from "react";
import useMyStore from "store";
import { PopMenu } from "./parts/PopMenu";

const CustomizationPanel = () => {
  const { points, setPoints } = useMyStore();

  const [select, setSelect] = useState("Selecione como");

  const handleAutoTagPoints = () => {};

  function idOf(i) {
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const len = alpha.length;

    return (i >= len ? idOf(Math.floor(i / len) - 1) : "") + alpha[i % len];
  }

  return (
    <div className="h-1/2 w-full self-start p-4 text-a_dark sm:w-1/2 md:w-1/3">
      <div className="w-fit">Customização</div>
      <div className="flex h-[calc(100%-2rem)] w-full flex-col items-start justify-start gap-4 rounded-b-lg border-2 border-t-0 border-a_neutral bg-a_light p-4">
        <PopMenu
          title="Autoetiquetar pontos"
          withToggle={true}
          toggleMessages={["Todos", "Somente selecionados"]}
          Options={[
            { title: "A...Z AA...ZZ" },
            { title: "Coordenadas (X;Y)" },
            { title: "P1...Pn" },
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
            { title: "\u{237A} ... \u{2375}" },
            { title: "\u{00C2} ... \u{1E90}" },
            { title: "a...z" },
          ]}
        />
      </div>
    </div>
  );
};

export default CustomizationPanel;

/*
1. Etiquetar selecionados (s/n)
  a. Seleção etiquetas:
    "A B C ... Z AA AB AC ..." ou 
    "a b c ... z aa ab ac ..." ou 
    "1 2 3 ..." ou "p1 p2 p3 ..." ou
    por coordenadas (X;Y) em caso de pontos / valores em caso de segmentos ou ângulos  ou
    personalizadas
  b. Se personalizadas abrir caixa de input para digitação de text input customizado, separados por "," para cada ponto selecionado.
  // talvez procurar globalmente se já existirem as etiquetas mostrar erro ou sugerir outras etiquetas?

2. Destacar pontos selecionados com um círculo (s/n)
  a. raio

*/
