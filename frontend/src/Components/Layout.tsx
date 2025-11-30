import { useState } from "react";
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

  // ESTADOS PARA DESPLEGAR PANEL IZQUIERDO Y DERECHO
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  // CUANDO SELECCIONAN MUSEO DESDE EL PANEL IZQUIERDO
  function handleMuseumSelect(museumName: string) {
    const coords = museums[museumName];
    if (coords) setSelectedMuseumCoords(coords);

    setSelectedMuseum(museumName);
    setSelectedKhipu(null);
  }

  // CUANDO SELECCIONAN UN KHIPU
  async function handleKhipuSelect(khipu: any) {
  try {
    const res = await fetch(`/api/khipus/${khipu.id}`);
    const fullData = await res.json();

    setSelectedKhipu(fullData); // ahora sí incluye cords + graph
    setRightOpen(true);

  } catch (err) {
    console.error("Error cargando khipu:", err);
  }
}


  // BOTÓN "VOLVER AL MUSEO"
  function handleBack() {
    setSelectedKhipu(null);
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      <Navbar />

      {/* Contenedor principal, evita repintado de layout */}
      <div
        className="flex h-[calc(100vh-70px)] overflow-hidden"
        style={{ contain: "layout" }}
      >
        {/* PANEL IZQUIERDO */}
        <div
          className={`
            border-r border-gray-700 overflow-y-auto bg-[#1a1a1a] relative
            transition-[width] duration-300 
            ${leftOpen ? "w-[300px]" : "w-[40px]"}
          `}
        >
          {/* BOTÓN */}
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
          />
        </div>

        {/* PANEL DERECHO */}
        <div
          className={`
            border-l border-gray-700 overflow-y-auto bg-[#1a1a1a] relative
            transition-[width] duration-300
            ${rightOpen ? "w-[700px]" : "w-[40px]"}
          `}
        >
          {/* BOTÓN */}
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
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
