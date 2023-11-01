import { vec, vector } from "./vetores";

const ponto = function(a: vector, id: string, group: number = 1 ) {
    return ({
        id,
        coords: a,
        etiqueta: "",
        visivel: true,
        tamanho: 0,
        group,
        selected: false,
    })
}

type Tponto = ReturnType<typeof ponto>;

const segmento = function(a: Tponto, b:Tponto, id: string) {
    const comprimento = a.coords.dist(b.coords);
    const normal = vec().copy(a.coords).cross(vec(0,0,1)).setMag(1);
    return({
        id,
        p1: a,
        p2: b,
        comprimento,
        normal,
        etiqueta: "",
        visivel: true,
        espessura: 1,
        estilo: "solid",
        cor: "black",
        selected: false,
    })
}

type Tsegmento = ReturnType<typeof segmento>;

const angulo = function(a: Tponto, b: Tponto, c: Tponto, id: string,) {
    const ba = vec().copy(a.coords).sub(b.coords);
    const bc = vec().copy(c.coords).sub(b.coords);
    const valor = ba.angleBetween(bc);
    const valorExt = 2*Math.PI - valor;
    return ({
        id,
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

type Tentity = Tponto|Tsegmento|Tangulo;

const etiqueta = function(entity: Tentity, value:string = "", id:string, pos: vector = vec(0,0)) {

    entity.etiqueta =  value; //test

    return {
        id,
        entityId: entity.id,
        value,
        pos,
    }
}  

type Tetiqueta = ReturnType<typeof etiqueta>;

export {ponto, type Tponto, segmento, type Tsegmento, angulo, type Tangulo, type Tentity, etiqueta, type Tetiqueta};