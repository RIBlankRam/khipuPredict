// src/algorithms/dfs.js
export function dfs(startId, graph) {
  // graph: { nodes: Map, edges: [ {from,to,...} ] }
  const adj = buildAdj(graph.edges);
  const visited = new Set();
  const order = [];

  function visit(u) {
    if (visited.has(u)) return;
    visited.add(u);
    order.push(u);
    const neighbors = adj.get(u) || [];
    for (const v of neighbors) visit(v);
  }

  visit(startId);
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
