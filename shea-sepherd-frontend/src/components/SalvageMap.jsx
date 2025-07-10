// Karte mit Übersicht über Netze

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

const customIcon = new L.Icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function SalvageMap({ user, nets }) {
  
  const [filter, setFilter] = useState("ALLE"); 

  const filteredNets = nets.filter(net => {
    switch (filter) {
      case "GEMELDET":
        return net.status === "GEMELDET";
      case "BERGUNG":
        return net.status === "BERGUNG_BEVORSTEHEND";
      case "MEINE":
        return net.salvager?.id === user?.id;
      default:
        return true;
    }
  });

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Karte der Geisternetze</h2>

      <div className="mb-4 flex gap-2">
        <button onClick={() => setFilter("ALLE")} className={`px-3 py-1 rounded ${filter === "ALLE" ? "bg-gray-600 text-white" : "bg-gray-200"}`}>Alle</button>
        <button onClick={() => setFilter("GEMELDET")} className={`px-3 py-1 rounded ${filter === "GEMELDET" ? "bg-red-600 text-white" : "bg-gray-200"}`}>Nur gemeldete</button>
        <button onClick={() => setFilter("BERGUNG")} className={`px-3 py-1 rounded ${filter === "BERGUNG" ? "bg-yellow-400 text-white" : "bg-gray-200"}`}>Nur in Bergung</button>
        <button onClick={() => setFilter("MEINE")} className={`px-3 py-1 rounded ${filter === "MEINE" ? "bg-green-600 text-white" : "bg-gray-200"}`}>Nur meine</button>
      </div>

      <MapContainer
        center={[54.0, 10.0]} 
        zoom={6}
        minZoom={2}
        style={{ height: "600px", width: "100%" }}
        worldCopyJump={false}
        maxBounds={[
          [-90, -180],
          [90, 180]
        ]}
        maxBoundsViscosity={1} 
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
        />

        {filteredNets.map(net => (
          <Marker
            key={net.id}
            position={[net.latitude, net.longitude]}
            icon={customIcon}
          >
            <Popup>
              <strong>Status:</strong> {net.status}<br />
              <strong>Position:</strong> {net.latitude.toFixed(4)}, {net.longitude.toFixed(4)}<br />
              <strong>Größe:</strong> {net.sizeEstimate} m<sup>2</sup><br />
              {net.salvager && <span><strong>Bergung durch:</strong> {net.salvager.name}</span>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
