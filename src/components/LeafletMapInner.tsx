"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Marqueur custom (cercle doré) — évite le bug classique des icônes par défaut
// de Leaflet cassées par les bundlers, puisqu'on n'utilise jamais L.Icon.Default.
const markerIcon = L.divIcon({
  className: "",
  html: '<span class="block size-3.5 rounded-full border-2 border-cream bg-gold ring-4 ring-gold/25"></span>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const sites: { name: string; label: string; position: [number, number] }[] = [
  { name: "Siguiri", label: "Siège social", position: [11.91, -9.17] },
  { name: "Conakry", label: "Chantiers SNIES", position: [9.64, -13.58] },
];

export default function LeafletMapInner() {
  return (
    <MapContainer
      bounds={sites.map((s) => s.position)}
      boundsOptions={{ padding: [40, 40] }}
      scrollWheelZoom={false}
      className="dark-tiles size-full"
      style={{ background: "#181A1B" }}
    >
      {/* Tuiles OpenStreetMap standard (gratuites, sans clé) — le rendu sombre vient d'un
          filtre CSS sur .leaflet-tile-pane (voir globals.css), les tuiles "dark" de CARTO
          nécessitant désormais une clé API malgré leur réputation de service gratuit. */}
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {sites.map((site) => (
        <Marker key={site.name} position={site.position} icon={markerIcon}>
          <Popup>
            <strong>{site.name}</strong>
            <br />
            {site.label}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
