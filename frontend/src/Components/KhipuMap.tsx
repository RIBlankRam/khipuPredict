import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ResizeMap from "./ResizeMap";
import customMarker from "../assets/khipu-marker.png";
import museumCoordsJson from "../data/museumCoords.json";
import type { MuseumCoordsMap } from "../types/MuseumCoords";

// Fix Leaflet icons (fallback)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Configurar iconos por defecto
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Ícono personalizado para museos
const customIcon = L.icon({
  iconUrl: customMarker,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

// Casting del JSON
const museumCoords = museumCoordsJson as MuseumCoordsMap;

/* ---------------------------------------------------------
   Componente auxiliar: permite hacer zoom + centrar el mapa
   cuando seleccionas un museo desde el panel izquierdo
---------------------------------------------------------- */
function MapMover({ coords }: { coords: { lat: number; lng: number } | null }) {
  const map = useMap();

  if (coords) {
    map.setView([coords.lat, coords.lng], 10, { animate: true });
  }

  return null;
}

/* ---------------------------------------------------------
   Componente MarkerWithZoom:
   Ahora al hacer click en el marcador → zoom + centrado
---------------------------------------------------------- */
function MarkerWithZoom({
  position,
  zoom = 10,
  children,
  icon,
}: {
  position: LatLngExpression;
  zoom?: number;
  children: React.ReactNode;
  icon?: any;
}) {
  const map = useMap();

  function handleClick() {
    map.setView(position, zoom, { animate: true });
  }

  return (
    <Marker
      position={position}
      eventHandlers={{ click: handleClick }}
      icon={icon}
    >
      {children}
    </Marker>
  );
}

/* ---------------------------------------------------------
   KhipuMap PRINCIPAL
---------------------------------------------------------- */
export default function KhipuMap({
  selectedMuseumCoords,
  leftOpen,
  rightOpen,
}: {
  selectedMuseumCoords: { lat: number; lng: number } | null;
  leftOpen: boolean;
  rightOpen: boolean;
}) {
  const center: LatLngExpression = [-12.0464, -77.0428]; // Lima

  const markers = Object.entries(museumCoords).map(
    ([museumName, coords], index) => ({
      id: index,
      museum: museumName,
      position: [coords.lat, coords.lng] as LatLngExpression,
    })
  );

  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      <div
        style={{
          height: "80vh",
          width: "85%",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 0 25px rgba(0,0,0,0.4)",
        }}
      >
        <MapContainer center={center} zoom={4} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* Zoom + centrado DESDE el panel izquierdo */}
          <MapMover coords={selectedMuseumCoords} />

          {/* Markers con zoom + centrado al hacer click */}
          {markers.map((m) => (
            <MarkerWithZoom
              key={m.id}
              position={m.position}
              icon={customIcon}
              zoom={10}
            >
              <Popup>
                <strong>Museo:</strong> {m.museum}
              </Popup>
            </MarkerWithZoom>
          ))}
          <ResizeMap deps={[selectedMuseumCoords]} />
          <ResizeMap deps={[leftOpen, rightOpen, selectedMuseumCoords]} />

        </MapContainer>
      </div>
    </div>
  );
}
