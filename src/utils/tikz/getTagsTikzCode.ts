import { vec } from "../math/vetores";
import type { Action, State } from "../store/store";

export default function getTagsTikzCode(store: State & Action) {
    let tikzCode = '';

    store.tags.forEach(tag => {
        const {x, y} = vec().copy(tag.anchor).add(vec().copy(tag.pos));

        tikzCode += `\\node at (${x},${y}) {\\textcolor{${tag.color}}{\\fontsize{${tag.size*30}}{${tag.size*30}}\\selectfont ${tag.value}}};\n`;
    });

    return tikzCode;
}
