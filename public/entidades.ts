import { DEFAULT_ANGLE_SIZE, DEFAULT_ANGLE_STYLE, DEFAULT_COLOR, DEFAULT_LINE_STYLE, DEFAULT_LINE_WIDTH, DEFAULT_POINT_SIZE, DEFAULT_POINT_STYLE } from "./generalConfigs";
import { vec, vector } from "./vetores";

const ponto = function (a: vector, id: string, group: number = 1) {
  return {
    id,
    coords: a,
    visible: true,
    dotstyle: DEFAULT_POINT_STYLE,
    size: DEFAULT_POINT_SIZE,
    color: DEFAULT_COLOR,
    group,
    selected: false,
  };
};

type Tpoint = ReturnType<typeof ponto>;

const segmento = function (a: Tpoint, b: Tpoint, id: string) {
  return {
    id,
    p1: a,
    p2: b,
    get length() {
      return vec().copy(this.p1.coords).dist(this.p2.coords);
    },
    get normal() {
      return vec()
        .copy(this.p1.coords)
        .cross(vec(0, 0, 1))
        .setMag(1);
    },
    visible: true,
    width: DEFAULT_LINE_WIDTH,
    style: DEFAULT_LINE_STYLE,
    color: DEFAULT_COLOR,
    selected: false,
  };
};

type Tsegment = ReturnType<typeof segmento>;

const angulo = function (a: Tpoint, b: Tpoint, c: Tpoint, id: string) {
  return {
    id,
    a,
    b,
    c,
    get valor() {
      const ba = vec().copy(this.a.coords).sub(this.b.coords);
      const bc = vec().copy(this.c.coords).sub(this.b.coords);
      const valor = Math.abs(ba.angleBetween(bc));
      return valor;
    },
    get valorExt() {
      return 2 * Math.PI - this.valor;
    },
    visible: true,
    size: DEFAULT_ANGLE_SIZE,
    dotstyle: DEFAULT_ANGLE_STYLE,
    color: DEFAULT_COLOR,
    selected: false,
  };
};

type Tangle = ReturnType<typeof angulo>;

type TentityWithKind =
  | (Tpoint & { kind: "point" })
  | (Tsegment & { kind: "segment" })
  | (Tangle & { kind: "angle" });

type Tentity = Tpoint | Tsegment | Tangle;

const tag = function (
  value: string = "",
  entityId: string,
  id: string,
  pos: vector = vec(0,1),
) {
  return {
    id,
    entityId,
    value,
    pos,
    selected: false,
  };
};

type Ttag = ReturnType<typeof tag>;

export {
  ponto,
  type Tpoint,
  segmento,
  type Tsegment,
  angulo,
  type Tangle,
  type Tentity,
  type TentityWithKind,
  tag,
  type Ttag,
};
