// src/algorithms/bellmanFord.js
// nodesKeys: array de ids (ej: [...nodes.keys()])
// edges: [{from,to,weight}]
export function bellmanFord(startId, nodesKeys, edges) {
  const dist = new Map();
  const prev = new Map();

  nodesKeys.forEach(k => dist.set(k, Infinity));
  dist.set(startId, 0);

  const N = nodesKeys.length;
  for (let i = 0; i < N - 1; i++) {
    let changed = false;
    for (const e of edges) {
      const d = dist.get(e.from);
      if (d + e.weight < dist.get(e.to)) {
        dist.set(e.to, d + e.weight);
        prev.set(e.to, e.from);
        changed = true;
      }
    }
    if (!changed) break;
  }

  // detectar ciclo negativo
  for (const e of edges) {
    if (dist.get(e.from) + e.weight < dist.get(e.to)) {
      throw new Error("Negative-weight cycle detected");
    }
  }

  return { dist, prev };
}

// helper para reconstruir camino
export function reconstructPath(prevMap, targetId) {
  const path = [];
  let cur = targetId;
  while (cur) {
    path.unshift(cur);
    cur = prevMap.get(cur);
  }
  return path;
}