
import { museumInfo } from "../data/museumInfo";
import { MUSEUMS, getMuseumByName } from "../data/museumsData";
import { bellmanFord } from "../algorithms/bellmanFord";
import { buildGraph } from "../algorithms/graphBuilder";
import type { GeoNode, Graph, GraphEdge } from "../algorithms/graphBuilder";
interface RightPanelProps {
  selectedMuseum: string | null;
  selectedKhipu: any | null;
  onBack: () => void;

  routeResults: any[] | null;
  setRouteResults: (v: any[] | null) => void;

  showRoutes: boolean;
  setShowRoutes: (v: boolean) => void;
}

export default function RightPanel({
  selectedMuseum,
  selectedKhipu,
  onBack,

  routeResults,
  setRouteResults,
  showRoutes,
  setShowRoutes,
}: RightPanelProps) {
  /**
   * ======================================================
   * MODO 1 → NADA SELECCIONADO
   * ======================================================
   */
  if (!selectedMuseum && !selectedKhipu) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-3">Bienvenido a KhipuPredict</h1>
        <p className="text-gray-300">
          Selecciona un museo para ver su información y generar rutas de visita entre museos.
        </p>
      </div>
    );
  }

  /**
   * ======================================================
   * MODO 3 → KHIPU SELECCIONADO
   * (Tu código anterior se mantiene EXACTO)
   * ======================================================
   */
  if (selectedKhipu) {
    const data = selectedKhipu.khipu;
    const cords = selectedKhipu.cords || [];

    return (
      <div>
        <button
          onClick={onBack}
          className="mb-4 px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
        >
          ← Volver al Museo
        </button>

        <h1 className="text-2xl font-bold mb-3">{data.code || `Khipu ${data.id}`}</h1>

        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <p><strong>ID:</strong> {data.id}</p>
          <p><strong>Investigador:</strong> {data.investigator}</p>
          <p><strong>Proveniencia:</strong> {data.provenance}</p>
        </div>

        {/* ...resto igual */}
      </div>
    );
  }

  /**
   * ======================================================
   * MODO 2 → MUSEO SELECCIONADO
   * NUEVO SISTEMA DE RUTAS ÓPTIMAS (GLOBAL, PAÍS, CIUDAD)
   * ======================================================
   */
  if (selectedMuseum) {
    const info = museumInfo[selectedMuseum];
    const origin = getMuseumByName(selectedMuseum);

    // Genera una ruta óptima paso a paso usando Bellman-Ford
    function generateRoute(scope: "global" | "country" | "city") {
      if (!origin) return;

      // FILTRO AUTOMÁTICO
      let dataset = MUSEUMS;

      if (scope === "country") {
        dataset = dataset.filter((m) => m.country === origin.country);
      } else if (scope === "city") {
        dataset = dataset.filter((m) => m.region === origin.region);
      }

      if (dataset.length <= 1) {
        setRouteResults(null);
        return;
      }

      // Construcción del grafo
      const nodes: GeoNode[] = dataset.map((m) => ({
        id: m.id,
        lat: m.lat,
        lng: m.lng,
      }));

      const graph: Graph = buildGraph(nodes);

      const edges = Object.entries(graph).flatMap(([fromId, neighbors]) =>
        (neighbors as GraphEdge[]).map((e) => ({
          from: Number(fromId),
          to: e.to,
          weight: e.weight,
        }))
      );

      const nodeIds = nodes.map((n) => n.id);
      let current = origin.id;
      const unvisited = new Set(nodeIds.filter((id) => id !== origin.id));
      const finalPath: number[] = [origin.id];

      let totalDist = 0;

      while (unvisited.size > 0) {
        const { dist } = bellmanFord(current, nodeIds, edges);

        let best = null;
        let bestD = Infinity;

        for (const id of unvisited) {
          const d = dist.get(id) ?? Infinity;
          if (d < bestD) {
            bestD = d;
            best = id;
          }
        }

        if (best === null) break;

        totalDist += bestD;
        finalPath.push(best);
        unvisited.delete(best);
        current = best;
      }

      setRouteResults([
        {
          id: origin.id,
          name: `Ruta óptima desde ${origin.name}`,
          path: finalPath,
          totalDistance: totalDist,
        }
      ]);

      setShowRoutes(true);
    }

    const readableRoute =
      routeResults &&
      routeResults[0]?.path
        ?.map((id: number) => {
          const m = MUSEUMS.find((mm) => mm.id === id);
          return m ? m.name : id;
        })
        .join(" → ");

    return (
      <div>
        <h1 className="text-2xl font-bold mb-3">{info?.name || selectedMuseum}</h1>

        {info?.image && (
          <img src={info.image} alt={info.name} className="w-full rounded-lg mb-4 shadow-lg" />
        )}

        <p className="text-gray-300 mb-3">{info?.description}</p>
{info?.website && (
  <a
    href={info.website}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-400 underline font-semibold"
  >
    Visitar sitio web oficial del museo
  </a>
)}
        {/* Información automática del museo */}
        {origin && (
          <div className="bg-gray-900 p-4 mt-4 rounded border border-gray-700 mb-4 text-sm">
            <p><strong>País:</strong> {origin.country}</p>
            <p><strong>Ciudad/Región:</strong> {origin.region}</p>
          </div>
        )}

        {/* OPCIONES DE RUTA */}
        <div className="mt-6 bg-[#111] p-4 rounded-lg border border-gray-700 space-y-3">
          <h2 className="text-lg font-semibold">Rutas Óptimas</h2>

          <button
            className="w-full bg-blue-700 hover:bg-blue-600 p-2 rounded"
            onClick={() => generateRoute("global")}
          >
            Ruta global por todos los museos
          </button>

          <button
            className="w-full bg-green-700 hover:bg-green-600 p-2 rounded"
            onClick={() => generateRoute("country")}
          >
            Ruta dentro de {origin?.country}
          </button>

          <button
            className="w-full bg-purple-700 hover:bg-purple-600 p-2 rounded"
            onClick={() => generateRoute("city")}
          >
            Ruta dentro de {origin?.region}
          </button>

          {/* Mostrar / ocultar en mapa */}
          <label className="flex items-center gap-2 mt-3 text-sm">
            <input
              type="checkbox"
              checked={showRoutes}
              onChange={(e) => setShowRoutes(e.target.checked)}
            />
            Mostrar ruta en el mapa
          </label>

          {/* Ruta como texto */}
          {readableRoute && (
            <div className="text-sm text-gray-300 mt-2">
              <p className="font-semibold">Ruta sugerida:</p>
              <p>{readableRoute}</p>
              <p className="text-xs text-gray-400 mt-1">
                Distancia total aprox: {routeResults![0].totalDistance.toFixed(2)} km
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
