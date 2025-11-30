import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function ResizeMap({ deps }: { deps: any[] }) {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300); // esperar animación del panel
  }, deps);

  return null;
}
