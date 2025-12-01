import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ResizeMap from "./ResizeMap";
import customMarker from "../assets/khipu-marker.png";
import museumCoordsJson from "../data/museumCoords.json";
import type { MuseumCoordsMap } from "../types/MuseumCoords";

// Fix Leaflet default icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom icon (khipu marker)
const customIcon = L.icon({
  iconUrl: customMarker,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

// Museums JSON
const museumCoords = museumCoordsJson as MuseumCoordsMap;

/* ---------------------------------------------------------
   Center map on selected museum
---------------------------------------------------------- */
function MapMover({ coords }: { coords: { lat: number; lng: number } | null }) {
  const map = useMap();
  if (coords) {
    map.setView([coords.lat, coords.lng], 10, { animate: true });
  }
  return null;
}

/* ---------------------------------------------------------
   Marker with zoom on click
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
    <Marker position={position} eventHandlers={{ click: handleClick }} icon={icon}>
      {children}
    </Marker>
  );
}

/* ---------------------------------------------------------
   COLORS FOR KHIPU-LIKE ROUTES 🌈
---------------------------------------------------------- */
const KHIPU_COLORS = [
  "#e63946", // rojo inca
  "#457b9d", // azul añil
  "#ffbe0b", // amarillo q'illu
  "#2a9d8f", // verde chillca
  "#9d4edd", // morado cochinilla
  "#fb5607", // naranja arcilla
  "#6a4c93", // púrpura
];

/* ---------------------------------------------------------
   Main KhipuMap improved
---------------------------------------------------------- */
export default function KhipuMap({
  selectedMuseumCoords,
  leftOpen,
  rightOpen,
  routeResults,
}: {
  selectedMuseumCoords: { lat: number; lng: number } | null;
  leftOpen: boolean;
  rightOpen: boolean;
  routeResults: any[] | null;
}) {
  const center: LatLngExpression = [-12.0464, -77.0428]; // Lima

  // Prepare markers
  const markers = Object.entries(museumCoords).map(
    ([museumName, coords], index) => ({
      id: index + 1,
      museum: museumName,
      lat: coords.lat,
      lng: coords.lng,
      position: [coords.lat, coords.lng] as LatLngExpression,
    })
  );

  /* ---------------------------------------------------------
     Convert Bellman-Ford paths → colorized polylines
  ---------------------------------------------------------- */
  const routePolylines =
    routeResults?.flatMap((r, routeIndex) => {
      if (!r.path || r.path.length < 2) return [];

      const segments = [];

      for (let i = 0; i < r.path.length - 1; i++) {
        const idA = r.path[i];
        const idB = r.path[i + 1];

        const A = markers.find((x) => x.id === idA);
        const B = markers.find((x) => x.id === idB);

        if (!A || !B) continue;

        // Select khipu color
        const color = KHIPU_COLORS[(i + routeIndex) % KHIPU_COLORS.length];

        segments.push({
          positions: [
            [A.lat, A.lng],
            [B.lat, B.lng],
          ] as LatLngExpression[],
          color,
        });
      }

      return segments;
    }) || [];

  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      <div
        style={{
          height: "80vh",
          width: "85%",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 0 35px rgba(0,0,0,0.6)",
          background: "linear-gradient(135deg, #1f1f1f, #2a2a2a)",
        }}
      >
        <MapContainer center={center}
  zoom={3}
  style={{ height: "100%", width: "100%" }}

  /* Limitar mapa global (sin repetición) */
  maxBounds={[[-85, -180], [85, 180]]}
  maxBoundsViscosity={1.0}
  worldCopyJump={false} 
  minZoom={2}
  maxZoom={40}
  zoomSnap={0.25}>
          {/* New Dark Modern Tile */}
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            attribution='&copy; Stadia Maps &copy; OpenMapTiles &copy; OpenStreetMap'
            /* PREVENIR MAPA DUPLICADO */
    noWrap={true}
    bounds={[[-85, -180], [85, 180]]}
    
          />

          <MapMover coords={selectedMuseumCoords} />

          {/* Markers */}
          {markers.map((m) => (
            <MarkerWithZoom key={m.id} position={m.position} icon={customIcon} zoom={10}>
              <Popup>
                <strong>Museo:</strong> {m.museum}
              </Popup>
            </MarkerWithZoom>
          ))}

          {/* =====================================================
                ROUTES MULTICOLOR (KHIPU STYLE + GLOW + ANIMATION)
              ===================================================== */}
          {routePolylines.map((s, idx) => (
            <>

              {/* Glow layer (halo) */}
              
              {/* Main colorful line */}
              <Polyline
                key={`main-${idx}`}
                positions={s.positions}
                pathOptions={{
                  color: s.color,
                  weight: 6,
                  opacity: 0.95,
                  lineCap: "round",
                  dashArray: "12 10",
                  className: "khipu-animated",
                }}
              />

            </>
          ))}

          <ResizeMap deps={[selectedMuseumCoords]} />
          <ResizeMap deps={[leftOpen, rightOpen, selectedMuseumCoords]} />
        </MapContainer>
      </div>
    </div>
  );
}
