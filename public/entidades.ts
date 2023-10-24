import { vec, vector } from "./vetores";

const ponto = function(a: vector, group: number = 1 ) {
    return ({
        vec: a,
        etiqueta: "",
        visivel: true,
        tamanho: 0,
        group,
        selected: false,
    })
}

type Tponto = ReturnType<typeof ponto>;

const segmento = function(a: Tponto, b:Tponto) {
    const comprimento = a.vec.dist(b.vec);
    const normal = vec().copy(a.vec).cross(vec(0,0,1)).setMag(1);
    return({
        p1: a,
        p2: b,
        comprimento,
        normal,
        etiqueta: "",
        visivel: "",
        espessura: 1,
        estilo: "solid",
        cor: "black",
        selected: false,
    })
}

type Tsegmento = ReturnType<typeof segmento>;

const angulo = function(a: Tponto, b: Tponto, c: Tponto) {
    const ba = vec().copy(a.vec).sub(b.vec);
    const bc = vec().copy(c.vec).sub(b.vec);
    const valor = ba.angleBetween(bc);
    const valorExt = 2*Math.PI - valor;
    return ({
        valor,
        valorExt,
        etiqueta: "",
        visivel: true,
        tamanho: 0.5,
        destaque: 0,
        selected: false,
    })
}

type Tangulo = ReturnType<typeof angulo>;

// const group = function(n = 1){
//     return({
//         id: n,
//         pontos: [] as Tponto[],
//         segmentos: [] as Tsegmento[],
//         angulos: [] as Tangulo[]
//     })
// }

// type Tgroup = ReturnType<typeof group>;

export {ponto, type Tponto, segmento, type Tsegmento, angulo, type Tangulo};