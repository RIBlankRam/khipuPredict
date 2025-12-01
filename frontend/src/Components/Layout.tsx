import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import KhipuMap from "./KhipuMap";

import museumCoords from "../data/museumCoords.json";

// Tipo para cada museo
interface MuseumCoord {
  lat: number;
  lng: number;
}

// Convertir JSON → diccionario indexable
const museums = museumCoords as Record<string, MuseumCoord>;

export default function Layout() {
  // MAPA: museo seleccionado
  const [selectedMuseumCoords, setSelectedMuseumCoords] =
    useState<MuseumCoord | null>(null);

  // PANEL DERECHO: museo seleccionado
  const [selectedMuseum, setSelectedMuseum] = useState<string | null>(null);

  // PANEL DERECHO: khipu seleccionado
  const [selectedKhipu, setSelectedKhipu] = useState<any | null>(null);

  // ESTADOS PANEL IZQUIERDO Y DERECHO
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  // RUTAS ÓPTIMAS
  const [routeResults, setRouteResults] = useState<any[] | null>(null);

  // Mostrar rutas
  const [showRoutes, setShowRoutes] = useState<boolean>(false);

  // =====================================================================
  // MODAL INTRODUCCIÓN — APARECE SOLO AL INICIO
  // =====================================================================
  const [showIntroModal, setShowIntroModal] = useState(true);

  useEffect(() => {
    // Evita que haga scroll mientras el modal está abierto
    if (showIntroModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showIntroModal]);

  // SELECCIÓN DE MUSEO
  function handleMuseumSelect(museumName: string) {
    const coords = museums[museumName];
    if (coords) setSelectedMuseumCoords(coords);

    setSelectedMuseum(museumName);
    setSelectedKhipu(null);
  }

  // SELECCIÓN DE KHIPU
  async function handleKhipuSelect(khipu: any) {
    try {
      const res = await fetch(`/api/khipus/${khipu.id}`);
      const fullData = await res.json();

      setSelectedKhipu(fullData);
      setRightOpen(true);

    } catch (err) {
      console.error("Error cargando khipu:", err);
    }
  }

  // BOTÓN VOLVER
  function handleBack() {
    setSelectedKhipu(null);
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white relative">
      <Navbar />

      {/* ============================================================
          MODAL DE INTRODUCCIÓN (solo al inicio)
      ============================================================ */}
      {showIntroModal && (
        <div className="
          fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm
          flex items-center justify-center z-[999]
          animate-fadeIn
        ">
          <div
            className="
              bg-[#181818] border border-gray-700 shadow-2xl
              p-8 rounded-2xl max-w-xl mx-4
              animate-scaleIn
            "
            style={{ boxShadow: "0 0 20px rgba(255,255,255,0.08)" }}
          >
            <h1 className="text-3xl font-bold text-center mb-4 tracking-wide">
              Bienvenido a KhipuPredict
            </h1>

            <p className="text-gray-300 leading-relaxed mb-6 text-center">
              Esta plataforma te permite explorar, analizar y visualizar khipus
              reales de museos internacionales.  
              Puedes revisar sus cuerdas, colores originales, nudos y estructuras,
              además de explorar rutas óptimas entre museos y análisis de patrones.
            </p>

            <p className="text-gray-400 text-sm text-center mb-6 italic">
              Selecciona un museo en el panel izquierdo o explora el mapa para comenzar.
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => setShowIntroModal(false)}
                className="
                  px-6 py-2 rounded-lg bg-blue-700 hover:bg-blue-600
                  transition font-semibold shadow-lg
                "
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTENEDOR PRINCIPAL */}
      <div
        className="flex h-[calc(100vh-70px)] overflow-hidden"
        style={{ contain: "layout" }}
      >

        {/* PANEL IZQUIERDO */}
        <div
          className={`
            border-r border-gray-700 bg-[#1a1a1a] relative
            transition-[width] duration-300
            overflow-y-scroll scrollbar-none
            ${leftOpen ? "w-[450px]" : "w-[40px]"}
          `}
          style={{ scrollbarWidth: "none" }}
        >
          <button
            className="absolute top-2 left-2 p-1 bg-gray-800 rounded hover:bg-gray-600 z-50"
            onClick={() => setLeftOpen(!leftOpen)}
          >
            {leftOpen ? "<" : ">"}
          </button>

          {leftOpen && (
            <div className="mt-8 p-4">
              <LeftPanel
                onMuseumSelect={handleMuseumSelect}
                onKhipuSelect={handleKhipuSelect}
                selectedMuseum={selectedMuseum}
              />
            </div>
          )}
        </div>

        {/* MAPA */}
        <div
          className={`
            transition-[width] duration-300
            ${
              leftOpen && rightOpen
                ? "w-[calc(100%-700px)]"
                : leftOpen && !rightOpen
                ? "w-[calc(100%-300px)]"
                : !leftOpen && rightOpen
                ? "w-[calc(100%-400px)]"
                : "w-full"
            }
          `}
        >
          <KhipuMap
            selectedMuseumCoords={selectedMuseumCoords}
            leftOpen={leftOpen}
            rightOpen={rightOpen}
            routeResults={showRoutes ? routeResults : null}
          />
        </div>

        {/* PANEL DERECHO */}
        <div
          className={`
            border-l border-gray-700 overflow-y-auto bg-[#1a1a1a] relative
            transition-[width] duration-300
            ${rightOpen ? "w-[500px]" : "w-[40px]"}
          `}
        >
          <button
            className="absolute top-2 right-2 p-1 bg-gray-800 rounded hover:bg-gray-600 z-50"
            onClick={() => setRightOpen(!rightOpen)}
          >
            {rightOpen ? ">" : "<"}
          </button>

          {rightOpen && (
            <div className="mt-8 p-4">
              <RightPanel
                selectedMuseum={selectedMuseum}
                selectedKhipu={selectedKhipu}
                onBack={handleBack}
                routeResults={routeResults}
                setRouteResults={setRouteResults}
                showRoutes={showRoutes}
                setShowRoutes={setShowRoutes}
              />
            </div>
          )}
        </div>
      </div>

      {/* ANIMACIONES DEL MODAL */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.85);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.35s ease-out;
        }
      `}</style>

    </div>
  );
}
