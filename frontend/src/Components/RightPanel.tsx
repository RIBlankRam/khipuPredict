import { useState } from "react";
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
  // ============================
  // Álbum de imágenes inicial
  // ============================
  const referenceImages = [
    {
      url: "https://coleccion.museolarco.org/public/uploads/ML600004/ML600004_SF1_1734450975.webp",
      title: "Khipu en la colección del Museo Larco",
      source: "Museo Larco",
    },
    {
      url: "https://culturacientifica.com/app/uploads/2015/09/quipu-2.jpg",
      title: "Detalle de khipu",
      source: "Cuaderno de Cultura Científica",
    },
    {
      url: "https://alponiente.com/wp-content/uploads/2020/07/Imagen-de-la-publicaci%C3%B3n.jpg",
      title: "Khipus en contexto visual",
      source: "Unravel Magazine",
    },
    {
      url: "https://mnaahp.cultura.pe/sites/default/files/te3.jpg",
      title: "Khipu en el Museo Nacional de Arqueología",
      source: "Museo Nacional de Arqueología",
    },
  ];

  const [imageIndex, setImageIndex] = useState(0);
  const totalImages = referenceImages.length;

  const goPrev = () => {
    setImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const goNext = () => {
    setImageIndex((prev) => (prev + 1) % totalImages);
  };

  /* ======================================================
     MODO 1 → NADA SELECCIONADO
  ====================================================== */
  if (!selectedMuseum && !selectedKhipu) {
    const current = referenceImages[imageIndex];

    return (
      <div>
        <h1 className="text-2xl font-bold mb-3">Bienvenido a KhipuPredict</h1>
        <p className="text-gray-300 mb-4">
          Selecciona un museo para ver su información, rutas óptimas y khipus.
        </p>

        <div className="bg-[#111] border border-gray-800 rounded-xl p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-3 text-gray-100">
            Khipus en museos y archivos
          </h2>

          <div className="relative">
            <div className="overflow-hidden rounded-lg border border-gray-700">
              <img
                src={current.url}
                alt={current.title}
                className="w-full h-96 object-cover"
              />
            </div>

            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white px-2 py-1 rounded-full text-sm"
            >
              ◀
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white px-2 py-1 rounded-full text-sm"
            >
              ▶
            </button>
          </div>

          <div className="mt-3">
            <p className="text-sm text-gray-100 font-semibold">
              {current.title}
            </p>
            <p className="text-xs text-gray-400">Fuente: {current.source}</p>
          </div>

          <div className="flex justify-center gap-2 mt-3">
            {referenceImages.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 w-2 rounded-full ${
                  idx === imageIndex ? "bg-cyan-400" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ======================================================
     MODO 3 → KHIPU SELECCIONADO
  ====================================================== */
  if (selectedKhipu) {
    const k = selectedKhipu.khipu;
    const cords = selectedKhipu.cords || [];
    const clusters = selectedKhipu.clusters || [];

    return (
      <div>
        <button
          onClick={onBack}
          className="mb-4 px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
        >
          ← Volver al Museo
        </button>

        <h1 className="text-2xl font-bold mb-3">
          {k.code || `Khipu ${k.id}`}
        </h1>

        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <p>
            <strong>ID:</strong> {k.id}
          </p>
          <p>
            <strong>Investigador:</strong> {k.investigator}
          </p>
          <p>
            <strong>Proveniencia:</strong> {k.provenance}
          </p>
          <p>
            <strong>Museo:</strong> {k.museum}
          </p>
        </div>

        <h2 className="text-xl font-bold mb-3">Cuerdas del Khipu</h2>

        {cords.length === 0 ? (
          <p className="italic text-gray-400">No hay cuerdas registradas.</p>
        ) : (
          <div className="space-y-4">
            {cords.map((cord: any, index: number) => (
              <div
                key={index}
                className="bg-gray-900 p-4 rounded-lg border border-gray-700"
              >
                <h3 className="font-semibold text-lg mb-1">
                  Cuerda: {cord.cord_name || `#${cord.cord_id}`}
                </h3>

                {cord.full_color && (
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: "#444" }}
                    ></div>
                    <span className="text-sm text-gray-300">
                      {cord.full_color}
                    </span>
                  </div>
                )}

                <p>
                  <strong>Color:</strong> {cord.full_color || "No registrado"}
                </p>

                <p>
                  <strong>Colores descriptivos:</strong>{" "}
                  {[
                    cord.color_name_1,
                    cord.color_name_2,
                    cord.color_name_3,
                    cord.color_name_4,
                    cord.color_name_5,
                  ]
                    .filter(Boolean)
                    .join(", ") || "Sin descripción"}
                </p>

                <p>
                  <strong>Códigos OKR:</strong>{" "}
                  {[
                    cord.color_cd_1,
                    cord.color_cd_2,
                    cord.color_cd_3,
                    cord.color_cd_4,
                    cord.color_cd_5,
                  ]
                    .filter(Boolean)
                    .join(" - ") || "Sin códigos"}
                </p>

                <p>
                  <strong>Longitud:</strong> {cord.length} cm
                </p>
                <p>
                  <strong>Torsión:</strong> {cord.twist || "No registrada"}
                </p>
                <p>
                  <strong>Posición:</strong>{" "}
                  {cord.position_desc || "Sin datos"}
                </p>

                {/* NUDOS */}
                <div className="mt-3">
                  <h4 className="font-semibold mb-2">Nudos</h4>

                  {!cord.knots || cord.knots.length === 0 ? (
                    <p className="italic text-gray-400">
                      No tiene nudos registrados.
                    </p>
                  ) : (
                    <ul className="space-y-2">
  {cord.knots.map((knot: any) => (
    <li key={knot.id} className="bg-gray-800 p-2 rounded border border-gray-700">
      <p><strong>Orden:</strong> {knot.orden}</p>
      <p><strong>Tipo:</strong> {knot.tipo}</p>
      <p><strong>Cantidad:</strong> {knot.cantidad}</p>
      <p><strong>Dirección:</strong> {knot.direccion}</p>
      <p><strong>Valor numérico:</strong> {knot.valor}</p>
    </li>
  ))}
</ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {clusters.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-3">Clusters del Khipu</h2>

            <div className="space-y-3">
              {clusters.map((cl: any, i: number) => (
                <div
                  key={i}
                  className="bg-gray-900 p-3 rounded border border-gray-700"
                >
                  <p>
                    <strong>ID del cluster:</strong> {cl.id}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {cl.description}
                  </p>
                  <p>
                    <strong>Cuerdas incluidas:</strong>{" "}
                    {cl.cords?.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TU GUÍA DE INTERPRETACIÓN ORIGINAL */}
        <div className="mt-10 bg-[#111] p-6 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Guía de Interpretación de Khipus
          </h2>

          <p className="text-gray-200 mb-4 leading-relaxed">
            Los khipus eran el sistema principal de registro del Imperio Inca,
            usados por los quipucamayos (expertos contadores) para llevar
            control de tributos, población y producción agrícola en todo el
            territorio.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-cyan-400">
                Sistema Numérico
              </h3>
              <ul className="list-disc ml-6 text-gray-300 space-y-2">
                <li>
                  <strong>Nudos simples</strong>: representan las unidades.
                </li>
                <li>
                  <strong>Nudos largos</strong>: indican decenas o centenas.
                </li>
                <li>
                  <strong>Ausencia de nudos</strong>: equivale a cero.
                </li>
                <li>
                  La lectura va de derecha a izquierda y de arriba hacia abajo.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-emerald-400">
                Códigos Cualitativos
              </h3>
              <ul className="list-disc ml-6 text-gray-300 space-y-2">
                <li>
                  <strong>Colores</strong>: categorías como oro, plata,
                  soldados, etc.
                </li>
                <li>
                  <strong>Torsión S/Z</strong>: grupos administrativos o género.
                </li>
                <li>
                  <strong>Posición</strong>: importancia o jerarquía de datos.
                </li>
              </ul>
            </div>
          </div>

          <p className="text-gray-400 italic mt-4 bg-gray-900 p-4 rounded-lg">
            Los quipucamayos podían registrar números enormes y clasificar
            poblaciones, tributos y datos económicos con precisión. Esta guía te
            ayudará a interpretar los elementos visibles del khipu seleccionado.
          </p>
        </div>
      </div>
    );
  }

  /* ======================================================
     MODO 2 — MUSEO SELECCIONADO
  ====================================================== */
  if (selectedMuseum) {
    const info = museumInfo[selectedMuseum];
    const origin = getMuseumByName(selectedMuseum);

    function generateRoute(scope: "global" | "country" | "city") {
      if (!origin) return;

      let dataset = MUSEUMS;

      if (scope === "country") {
        dataset = dataset.filter((m) => m.country === origin.country);
      } else if (scope === "city") {
        dataset = dataset.filter((m) => m.region === origin.region);
      }

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

        let best: number | null = null;
        let bestD = Infinity;

        for (const id of unvisited) {
          const d = dist.get(id) ?? Infinity;
          if (d < bestD) {
            bestD = d;
            best = id;
          }
        }

        if (best == null) break;

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
        },
      ]);

      setShowRoutes(true);
    }

    const readableRoute =
      routeResults &&
      routeResults[0]?.path
        ?.map((id: number) => {
          const m = MUSEUMS.find((x) => x.id === id);
          return m ? m.name : id;
        })
        .join(" → ");

    return (
      <div>
        <h1 className="text-2xl font-bold mb-3">{info?.name}</h1>

        {info?.image && (
          <img
            src={info.image}
            alt={info.name}
            className="w-full rounded-lg mb-4 shadow-lg"
          />
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

        {origin && (
          <div className="bg-gray-900 p-4 mt-4 rounded border border-gray-700 text-sm mb-4">
            <p>
              <strong>País:</strong> {origin.country}
            </p>
            <p>
              <strong>Ciudad/Región:</strong> {origin.region}
            </p>
          </div>
        )}

        <div className="mt-6 bg-[#111] p-4 rounded-lg border border-gray-700 space-y-3">
          <h2 className="text-lg font-semibold">Rutas Óptimas de Visita</h2>

          <button
            className="w-full bg-blue-700 hover:bg-blue-600 p-2 rounded"
            onClick={() => generateRoute("global")}
          >
            Ruta global (todos los museos)
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

          <label className="flex items-center gap-2 mt-3 text-sm">
            <input
              type="checkbox"
              checked={showRoutes}
              onChange={(e) => setShowRoutes(e.target.checked)}
            />
            Mostrar ruta en el mapa
          </label>

          {readableRoute && (
            <div className="text-sm text-gray-300 mt-2">
              <p className="font-semibold">Ruta sugerida:</p>
              <p>{readableRoute}</p>
              <p className="text-xs text-gray-400 mt-1">
                Distancia total: {routeResults![0].totalDistance.toFixed(2)} km
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
