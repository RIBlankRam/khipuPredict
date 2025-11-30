// src/algorithms/bellmanFord.ts

export interface Edge {
  from: number;
  to: number;
  weight: number;
}

export function bellmanFord(
  startId: number,
  nodesKeys: number[],
  edges: Edge[]
): {
  dist: Map<number, number>;
  prev: Map<number, number | null>;
} {
  const dist = new Map<number, number>();
  const prev = new Map<number, number | null>();

  nodesKeys.forEach((k) => {
    dist.set(k, Infinity);
    prev.set(k, null);
  });
  dist.set(startId, 0);

  const N = nodesKeys.length;

  for (let i = 0; i < N - 1; i++) {
    let changed = false;

    for (const e of edges) {
      const d = dist.get(e.from)!;
      const toDist = dist.get(e.to)!;

      if (d + e.weight < toDist) {
        dist.set(e.to, d + e.weight);
        prev.set(e.to, e.from);
        changed = true;
      }
    }

    if (!changed) break;
  }

  for (const e of edges) {
    const dFrom = dist.get(e.from)!;
    const dTo = dist.get(e.to)!;

    if (dFrom + e.weight < dTo) {
      throw new Error("Negative-weight cycle detected");
    }
  }

  return { dist, prev };
}

export function reconstructPath(
  prevMap: Map<number, number | null>,
  targetId: number
): number[] {
  const path: number[] = [];
  let cur: number | null = targetId;

  while (cur != null) {
    path.unshift(cur);
    cur = prevMap.get(cur) ?? null;
  }

  return path;
}
