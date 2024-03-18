import { Tangle, Tpoint, Tsegment } from "public/entidades";
import { vec } from "../math/vetores";
import type { Action, State } from "../store/store";
import { getEntityById, getEntityKind, getSetterByKind } from "../storeHelpers/entityGetters";

export default function getTagsTikzCode(store: State & Action) {
    let tikzCode = '';

    store.tags.forEach(tag => {
        let pos = vec().copy(tag.pos).div(4);

        const entity = getEntityById(tag.entityId, store);
        if(!entity) return;
        const kind = getEntityKind(entity);

        switch(kind) {
            case "point": {
                let point = entity as Tpoint;
                pos.add(vec().copy(point.coords));
                break;
            }
            case "segment": {
                let segment = entity as Tsegment;
                let midpoint = vec().copy(segment.p1.coords).add(vec().copy(segment.p2.coords)).div(2);
                pos.add(midpoint);
                break;
            }
            case "angle": {
                let angle = entity as Tangle;
                pos.add(vec().copy(angle.b.coords));
                break;
            }
        }

        tikzCode += `\\node at (${pos.x},${pos.y}) {\\textcolor{${tag.color}}{\\fontsize{${tag.size*30}}{${tag.size*30}}\\selectfont ${tag.value}}};\n`;
    });

    return tikzCode;
}
