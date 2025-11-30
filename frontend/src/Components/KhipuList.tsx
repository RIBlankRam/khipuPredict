import { useEffect, useState } from "react";

interface KhipuDetail {
  id: number;
  code: string;
  investigator: string;
  museum: string;
  provenance: string;
}

interface KhipuListProps {
  onMuseumSelect: (museum: string) => void;
  onKhipuSelect: (khipu: KhipuDetail) => void;
  selectedMuseum: string | null;
}

export default function KhipuList({
  onMuseumSelect,
  onKhipuSelect,
  selectedMuseum,
}: KhipuListProps) {
  const [data, setData] = useState<Record<string, KhipuDetail[]>>({});

  useEffect(() => {
    fetch("/api/khipus/grouped")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(console.error);
  }, []);

  return (
    <div className="text-white p-4">
      <h2 className="text-xl font-bold">Khipus Registrados</h2>

      {Object.entries(data).map(([museum, khipus]) => (
        <details
          key={museum}
          className="mt-4"
          open={selectedMuseum === museum}
        >
          <summary
  className="cursor-crosshair text-lg font-semibold flex justify-between items-center"
  onClick={(e) => {
    // PREVENIMOS que el click abra/cierre automáticamente
    e.preventDefault();
    onMuseumSelect(museum);
  }}
>
  <span>{museum} ({khipus.length})</span>

  {/* Botón independiente para abrir/cerrar */}
  <button
    className="ml-3 text-sm bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
    onClick={(e) => {
      e.stopPropagation(); // evita que llame onMuseumSelect
      const details = (e.currentTarget as HTMLElement).closest("details")!;
      details.open = !details.open;
    }}
  >
    ▼
  </button>
</summary>


          {/* LISTA DE KHIPUS */}
          <div className="ml-4 mt-2">
            {khipus.map((k) => (
              <div
                key={k.id}
                className="ml-2 mt-2 p-2 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
                onClick={() => onKhipuSelect(k)}
              >
                <strong>{k.code || `Khipu ${k.id}`}</strong> —{" "}
                {k.investigator}
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
