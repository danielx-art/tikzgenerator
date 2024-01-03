import AddPointInSegment from "./parts/AddPointInSegment";
import AutoTags from "./parts/AutoTags";
import AccordionItem from "import/components/micro/AccordionItem";
import PointOrthoProjection from "./parts/PointOrthoProjection";

const Tools = () => {
  return (
      <AccordionItem title="Ferramentas" conditionalClassNames="border-none">
        <AutoTags />
        <AccordionItem title="Inserir ponto em segmento">
          <AddPointInSegment />
        </AccordionItem>
        <AccordionItem title="Projeção ortogonal de um ponto">
          <PointOrthoProjection />
        </AccordionItem>
      </AccordionItem>
  );
};

export default Tools;
