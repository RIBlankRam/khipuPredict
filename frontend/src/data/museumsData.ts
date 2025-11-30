// src/data/museumsData.ts
import rawCoords from "./museumCoords.json";

export interface Museum {
  id: number;
  name: string;
  lat: number;
  lng: number;
  country: string;
  continent: "America" | "Europe";
  region: string; // estado / provincia / departamento
}

// Metadatos por museo (país, continente, región)
const META: Record<
  string,
  { country: string; continent: "America" | "Europe"; region: string }
> = {
  "American Museum of Natural History, NY": {
    country: "United States",
    continent: "America",
    region: "New York",
  },
  "Centro Mallqui, Leymebamba, Amazonas": {
    country: "Peru",
    continent: "America",
    region: "Amazonas",
  },
  "Ethnologisches Museum, Berlin, Germany": {
    country: "Germany",
    continent: "Europe",
    region: "Berlin",
  },
  "Field Museum of Natural History, Chicago, IL": {
    country: "United States",
    continent: "America",
    region: "Illinois",
  },
  "Hood Museum of Art, Dartmouth College": {
    country: "United States",
    continent: "America",
    region: "New Hampshire",
  },
  "Joslyn Art Museum, Omaha, Nebraska": {
    country: "United States",
    continent: "America",
    region: "Nebraska",
  },
  "Lowe Art Museum, University of Miami": {
    country: "United States",
    continent: "America",
    region: "Florida",
  },
  "Lowie Museum, UC Berkeley": {
    country: "United States",
    continent: "America",
    region: "California",
  },
  "Musée du Quai Branly, Paris": {
    country: "France",
    continent: "Europe",
    region: "Paris",
  },
  "Museo de Arte Amano, Lima": {
    country: "Peru",
    continent: "America",
    region: "Lima",
  },
  "Museo Nacional de Arqueología, Antropología e Historia del Perú": {
    country: "Peru",
    continent: "America",
    region: "Lima",
  },
  "Museo de Ica": {
    country: "Peru",
    continent: "America",
    region: "Ica",
  },
  "Museo Chileno de Arte Precolombino": {
    country: "Chile",
    continent: "America",
    region: "Santiago",
  },
  "Museo Larco": {
    country: "Peru",
    continent: "America",
    region: "Lima",
  },
  "Museum für Völkerkunde, Vienna": {
    country: "Austria",
    continent: "Europe",
    region: "Vienna",
  },
  "Royal Ontario Museum, Toronto": {
    country: "Canada",
    continent: "America",
    region: "Ontario",
  },
  "Smithsonian National Museum, Washington D.C.": {
    country: "United States",
    continent: "America",
    region: "Washington D.C.",
  },
  "Museo Temple Radicati, Huaraz": {
    country: "Peru",
    continent: "America",
    region: "Ancash",
  },
  "Museo de Sitio de Pachacamac": {
    country: "Peru",
    continent: "America",
    region: "Lima",
  },
};

export const MUSEUMS: Museum[] = Object.entries(
  rawCoords as Record<string, { lat: number; lng: number }>
).map(([name, { lat, lng }], index) => {
  const meta = META[name];
  if (!meta) {
    throw new Error(`Faltan metadatos para el museo: ${name}`);
  }
  return {
    id: index + 1,
    name,
    lat,
    lng,
    country: meta.country,
    continent: meta.continent,
    region: meta.region,
  };
});

export function getMuseumByName(name: string): Museum | undefined {
  return MUSEUMS.find((m) => m.name === name);
}

export function getMuseumById(id: number): Museum | undefined {
  return MUSEUMS.find((m) => m.id === id);
}
