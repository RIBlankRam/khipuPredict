// src/algorithms/graphBuilder.ts

export interface GeoNode {
  id: number;
  lat: number;
  lng: number;
}

export interface GraphEdge {
  to: number;
  weight: number;
}

export type Graph = Record<number, GraphEdge[]>;

export function buildGraph(nodes: GeoNode[]): Graph {
  const graph: Graph = {};

  nodes.forEach((n) => {
    graph[n.id] = [];
  });

  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;

      const A = nodes[i];
      const B = nodes[j];

      const weight = geoDistance(A.lat, A.lng, B.lat, B.lng);

      graph[A.id].push({ to: B.id, weight });
    }
  }

  return graph;
}

function geoDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
