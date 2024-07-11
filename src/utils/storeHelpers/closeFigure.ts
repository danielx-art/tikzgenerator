import {
  type Tpoint,
  type Tsegment,
  type TpointId,
  type TsegId,
  createPolygon,
} from "public/entidades";
import type { Action, State } from "../store/store";
import { getSelected } from "./entityGetters";
import { segmentsIntersect } from "../math/linear-algebra/segmentsIntersect";
import { toast } from "sonner";

type TAdjacencyList = { [key: TpointId]: TsegId[] };

export function createAdjacencyList(edges: Tsegment[]) {
  const adjacencyList = {} as TAdjacencyList;

  edges.forEach((edge) => {
    const { id, a, b } = edge;

    if (!adjacencyList[a]) {
      adjacencyList[a] = [];
    }
    if (!adjacencyList[b]) {
      adjacencyList[b] = [];
    }

    adjacencyList[a]!.push(id);
    adjacencyList[b]!.push(id);
  });

  return adjacencyList;
}

function allVerticesDegreeTwo(adjacencyList: TAdjacencyList): boolean {
  for (const vertexId in adjacencyList) {
    if (adjacencyList[vertexId as TpointId]!.length !== 2) {
      return false;
    }
  }
  return true;
}

function areThereIntersections(edges: Tsegment[], points: State["points"]): boolean {
  for (let i = 0; i < edges.length; i++) {
    for (let j = i + 1; j < edges.length; j++) {
      if (
        segmentsIntersect(
          edges[i]!.p1(points),
          edges[i]!.p2(points),
          edges[j]!.p1(points),
          edges[j]!.p2(points),
        )
      ) {
        return true;
      }
    }
  }
  return false;
}

export function isConnectedGraph(
  adjacencyList: TAdjacencyList,
  edges: Tsegment[],
): boolean {
  let visited: { [key: TpointId]: boolean } = {};
  let startVertex = Object.keys(adjacencyList)[0] as TpointId; // Start from the first vertex

  function dfs(vertex: TpointId) {
    visited[vertex] = true;
    if (adjacencyList[vertex]) {
      adjacencyList[vertex]!.forEach((edgeId) => {
        // Find the connected vertex through this edge
        const edge = edges.find((edge) => edge.id === edgeId);
        if (!edge) return; // Edge not found (should not happen ince at least the starting vertex have this edge)
        const connectedVertex = edge.a === vertex ? edge.b : edge.a;
        if (!visited[connectedVertex]) {
          dfs(connectedVertex);
        }
      });
    }
  }

  dfs(startVertex); // Start DFS from one of the vertices

  // Check if all vertices were visited
  return Object.keys(adjacencyList).every(
    (vertex) => visited[vertex as TpointId],
  );
}

type TEdges = Map<TsegId, Tsegment>;
type TEulerPath = TpointId[];

export function findEulerCycle(
  adjacencyList: TAdjacencyList,
  edges: TEdges,
): TEulerPath | null {
  let startVertex = Object.keys(adjacencyList)[0] as TpointId;

  let stack: TpointId[] = [startVertex]; // Stack for vertices
  let path: TEulerPath = []; // To store the Euler path
  let usedEdges: Set<TsegId> = new Set(); // To track the used edges

  while (stack.length > 0) {
    let currentVertexId = stack[stack.length - 1] as TpointId;
    if (
      adjacencyList[currentVertexId] &&
      adjacencyList[currentVertexId]!.length > 0
    ) {
      // Find an unused edge
      let unusedEdgeId = adjacencyList[currentVertexId]!.find(
        (edgeId) => !usedEdges.has(edgeId),
      );
      if (unusedEdgeId !== undefined) {
        usedEdges.add(unusedEdgeId); // Mark the edge as used
        let edge = edges.get(unusedEdgeId); // Get edge from Map
        if (!edge) continue; // If for some reason the edge isn't found, continue to the next iteration
        // Determine the next vertex to move to
        let nextVertexId =
          edge.a === currentVertexId ? edge.b : edge.a;
        stack.push(nextVertexId); // Move to the next vertex
      } else {
        // All edges from the current vertex have been used, backtrack
        path.push(stack.pop()!); // Pop vertex from stack and add it to Euler path
      }
    } else {
      // No outgoing edges, backtrack
      path.push(stack.pop()!);
    }
  }

  // The Euler path should use all edges if it's a proper Euler cycle
  if (usedEdges.size != edges.size) {
    return null; // Not all edges were used, so no Euler cycle exists
  }

  return path;
}

export const closeFigure = (store: (State & Action) | undefined) => {
  if (!store) return;

  const selectedSegments = getSelected("segment", store);

  if (selectedSegments.length < 3) {
    toast.error(
      "Selecione ao menos três segmentos, formando um polígono, para preenchê-lo. ",
    );
    return undefined;
  }

  const edgesMap: Map<TsegId, Tsegment> = new Map(
    selectedSegments.map((edge) => [edge.id, edge]),
  );

  const adjacencyList = createAdjacencyList(selectedSegments);
  if (!allVerticesDegreeTwo(adjacencyList)) {
    toast.error(
      "Por favor selecione apenas segmentos conectados um a um (sem que exustam bifurcações). ",
    );
    return undefined;
  }
  if (areThereIntersections(selectedSegments, store.points)) {
    toast.error(
      "Por favor selecione somente segmentos que não se interceptam. ",
    );
    return undefined;
  }
  if (!isConnectedGraph(adjacencyList, selectedSegments)) {
    toast.error(
      "Por favor selecione segmentos que em conjunto contornam uma única região do plano. ",
    );
    return undefined;
  }

  const eulerCycle = findEulerCycle(adjacencyList, edgesMap);

  if (!eulerCycle) {
    toast.error(
      "Não foi possível formar uma figura utilizando os segmentos selecionados. ",
    );
  } else {
    //Insert this euler cycle in figures sections of store.
    const vertices = [] as TpointId[];

    eulerCycle.forEach((pointId) => {
      vertices.push(pointId);
    });

    const newPolygonId = store.generateId("polygon");
    const newPolygon = createPolygon(vertices, newPolygonId);

    store.update(newPolygon);
  }
};
