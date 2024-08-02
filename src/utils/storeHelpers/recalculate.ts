import { circleFromOnePoint, circleFromTwoPoints, circleFromPointAndTangent, circleFromThreePoints } from "../store/entities/circles";
import { stdSegmentUpdateMethod } from "../store/entities/segments";
import { stdAngleUpdateMethod } from "../store/entities/angles";
import { stdPolygonUpdateMethod } from "../store/entities/polygons";
import { TentId, Tentity } from "../store/entities/types";
import { Action, State } from "../store/store";
import { getEntityById } from "./entityGetters";

const updateMethods = {
    stdSegmentUpdateMethod, stdAngleUpdateMethod, stdPolygonUpdateMethod, circleFromOnePoint, circleFromTwoPoints, circleFromPointAndTangent, circleFromThreePoints
};

type TmethodNames = keyof typeof updateMethods

export function recalculate(ent: TentId, store: State & Action){

    const thisEnt = getEntityById(ent, store) as Tentity;
    const methodName = thisEnt.updateMethod?.method;
    if(!methodName) return thisEnt;
    const method = updateMethods[methodName as TmethodNames] as ((store: State & Action, ent: Tentity)=>Tentity);
    const updatedEntity = method(store, thisEnt);
    return updatedEntity;    

}