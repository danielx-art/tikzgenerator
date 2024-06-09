import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../micro/ui/accordion";
import AddPointInSegment from "./parts/AddPointInSegment";
import AutoTags from "./parts/AutoTags";
//import AccordionItem from "import/components/micro/old/AccordionItem";
import PointOrthoProjection from "./parts/PointOrthoProjection";

const Tools = () => {
  return (
      <AccordionItem value="tools">
        <AccordionTrigger>
          <div className="">Ferramentas</div>
        </AccordionTrigger>
        <AccordionContent>
          <Accordion type="multiple">
            <AccordionItem value="point-in-segment">
              <AccordionTrigger>
                <div>Inserir ponto em segmento</div>
              </AccordionTrigger>
              <AccordionContent>
                <AddPointInSegment />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="orthogonal-projection">
              <AccordionTrigger>
                <div>Projeção ortogonal de um ponto</div>
              </AccordionTrigger>
              <AccordionContent>
                <PointOrthoProjection />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
        {/* <AutoTags /> */}
        {/* <AccordionItem title="Inserir ponto em segmento">
          <AddPointInSegment />
        </AccordionItem>
        <AccordionItem title="Projeção ortogonal de um ponto">
          <PointOrthoProjection />
        </AccordionItem> */}
      </AccordionItem>
  );
};

export default Tools;
