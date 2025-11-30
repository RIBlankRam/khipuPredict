// Construcción SIMPLE de grafo usando distancias entre khipus
// Útil para Bellman-Ford, DFS, BFS

export function buildGraph(khipus) {
    const graph = {};

    // Crear nodos
    khipus.forEach(k => {
        graph[k.id] = [];
    });

    // Conectar cada khipu con todos (grafo completo)
    // Peso = distancia geográfica aproximada
    for (let i = 0; i < khipus.length; i++) {
        for (let j = 0; j < khipus.length; j++) {
            if (i !== j) {
                const A = khipus[i];
                const B = khipus[j];

                const weight = geoDistance(A.lat, A.lng, B.lat, B.lng);

                graph[A.id].push({ to: B.id, weight });
            }
        }
    }

    return graph;
}

// Fórmula Haversine para distancia geográfica
function geoDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}