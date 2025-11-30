// src/algorithms/bfs.js
export function bfs(startId, graph) {
  const adj = buildAdj(graph.edges);
  const visited = new Set();
  const q = [startId];
  const order = [];

  visited.add(startId);
  while (q.length) {
    const u = q.shift();
    order.push(u);
    const neighbors = adj.get(u) || [];
    for (const v of neighbors) {
      if (!visited.has(v)) {
        visited.add(v);
        q.push(v);
      }
    }
  }
  return order;
}

function buildAdj(edges) {
  const adj = new Map();
  for (const e of edges) {
    if (!adj.has(e.from)) adj.set(e.from, []);
    adj.get(e.from).push(e.to);
  }
  return adj;
}