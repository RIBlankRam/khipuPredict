import { museumInfo } from "../data/museumInfo";

interface RightPanelProps {
  selectedMuseum: string | null;
  selectedKhipu: any | null;
  onBack: () => void;
}

export default function RightPanel({
  selectedMuseum,
  selectedKhipu,
  onBack,
}: RightPanelProps) {
  /* -------------------------------------------------------------
     MODO 1 → Nada seleccionado
  ------------------------------------------------------------- */
  if (!selectedMuseum && !selectedKhipu) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-3">Bienvenido a KhipuExplorer</h1>
        <p className="text-gray-300">
          Selecciona un museo del panel izquierdo para ver su información y los
          khipus registrados.
        </p>
      </div>
    );
  }

  /* -------------------------------------------------------------
     MODO 2 → Museo seleccionado pero NO un khipu
     -> Mostramos información del museo
  ------------------------------------------------------------- */
  if (selectedMuseum && !selectedKhipu) {
    const info = museumInfo[selectedMuseum];

    return (
      <div>
        <h1 className="text-2xl font-bold mb-3">{info?.name || selectedMuseum}</h1>

        {/* Imagen */}
        {info?.image && (
          <img
            src={info.image}
            alt={info.name}
            className="w-full rounded-lg mb-4 shadow-lg"
          />
        )}

        {/* Descripción */}
        <p className="text-gray-300 mb-3">{info?.description}</p>

        {/* Puntos clave */}
        {info?.highlights && (
          <ul className="list-disc ml-6 text-gray-300 space-y-1 mb-4">
            {info.highlights.map((p: string, i: number) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        )}

        {/* Website */}
        {info?.website && (
          <a
            href={info.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            Visitar sitio web oficial
          </a>
        )}
      </div>
    );
  }

  /* -------------------------------------------------------------
     MODO 3 → Khipu seleccionado
     -> Mostramos cords + knots
  ------------------------------------------------------------- */
  if (selectedKhipu) {
    const data = selectedKhipu.khipu;
    const cords = selectedKhipu.cords || [];

    return (
      <div>
        {/* Volver */}
        <button
          onClick={onBack}
          className="mb-4 px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
        >
          ← Volver al Museo
        </button>

        {/* Título */}
        <h1 className="text-2xl font-bold mb-3">
          {data.code || `Khipu ${data.id}`}
        </h1>

        {/* Info básica */}
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <p><strong>ID:</strong> {data.id}</p>
          <p><strong>Investigador:</strong> {data.investigator}</p>
          <p><strong>Proveniencia:</strong> {data.provenance}</p>
        </div>

        {/* CUERDAS */}
        <h2 className="text-xl font-bold mb-3">Cuerdas del Khipu</h2>

        <div className="space-y-4">
          {cords.map((cord: any, index: number) => (
            <div
              key={index}
              className="bg-gray-900 p-4 rounded-lg border border-gray-700"
            >
              <h3 className="font-semibold text-lg mb-1">
                Cuerda: {cord.cord_name || `#${cord.id}`}
              </h3>

              <p><strong>Color:</strong> {cord.color || "No registrado"}</p>
              <p><strong>Longitud:</strong> {cord.length} cm</p>
              <p><strong>Torsión:</strong> {cord.twist || "No registrada"}</p>
              <p><strong>Posición:</strong> {cord.position_desc || "Sin datos"}</p>

              {/* NUDOS */}
              <div className="mt-3">
                <h4 className="font-semibold mb-2">Nudos</h4>

                {!cord.knots || cord.knots.length === 0 ? (
                  <p className="italic text-gray-400">
                    No tiene nudos registrados.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {cord.knots.map((knot: any, idx: number) => (
                      <li key={idx} className="bg-gray-800 p-2 rounded">
                        <p><strong>Tipo:</strong> {knot.knot_type}</p>
                        <p><strong>Cantidad:</strong> {knot.knot_count}</p>
                        <p><strong>Offset:</strong> {knot.knot_offset} cm</p>
                        <p><strong>Dirección:</strong> {knot.direction}</p>
                        <p><strong>Valor numérico:</strong> {knot.numeric_value}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Guía */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Interpretación</h2>
          <p className="text-gray-300 mb-2">
            Los nudos representan valores dentro del sistema contable inca. 
            Evaluar su tipo, cantidad y posición permite reconstruir registros 
            económicos, censos y categorías jerárquicas.
          </p>
        </div>
      </div>
    );
}


  return null;
}
