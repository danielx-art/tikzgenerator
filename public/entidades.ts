import { vec, vector } from "./vetores";

const ponto = function (a: vector, id: string, group: number = 1) {
  return {
    id,
    coords: a,
    etiqueta: "",
    visivel: true,
    tamanho: 0,
    group,
    selected: false,
  };
};

type Tponto = ReturnType<typeof ponto>;

const segmento = function (a: Tponto, b: Tponto, id: string) {
  return {
    id,
    p1: a,
    p2: b,
    get comprimento() {
      return vec().copy(this.p1.coords).dist(this.p2.coords);
    },
    get normal() {
      return vec()
        .copy(this.p1.coords)
        .cross(vec(0, 0, 1))
        .setMag(1);
    },
    etiqueta: "",
    visivel: true,
    espessura: 1,
    estilo: "solid",
    cor: "black",
    selected: false,
  };
};

type Tsegmento = ReturnType<typeof segmento>;

const angulo = function (a: Tponto, b: Tponto, c: Tponto, id: string) {
  return {
    id,
    a,
    b,
    c,
    get valor() {
      const ba = vec().copy(this.a.coords).sub(this.b.coords);
      const bc = vec().copy(this.c.coords).sub(this.b.coords);
      const valor = ba.angleBetween(bc);
      return valor;
    },
    get valorExt() {
      return 2 * Math.PI - this.valor;
    },
    etiqueta: "",
    visivel: true,
    tamanho: 0.5,
    destaque: 0,
    selected: false,
  };
};

type Tangulo = ReturnType<typeof angulo>;

type Tentity = Tponto | Tsegmento | Tangulo;

const etiqueta = function (
  entity: Tentity,
  value: string = "",
  id: string,
  pos: vector = vec(0, 0),
) {
  entity.etiqueta = value; //test - it is working!

  return {
    id,
    entityId: entity.id,
    value,
    pos,
  };
};

type Tetiqueta = ReturnType<typeof etiqueta>;

export {
  ponto,
  type Tponto,
  segmento,
  type Tsegmento,
  angulo,
  type Tangulo,
  type Tentity,
  etiqueta,
  type Tetiqueta,
};
