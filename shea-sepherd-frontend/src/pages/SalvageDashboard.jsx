// Übersicht, Karte, Aktionen für Bergung

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SalvageMap from "../components/SalvageMap";

export default function SalvageDashboard() {
  const navigate = useNavigate();
  const [nets, setNets] = useState([]);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("ALLE");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      navigate("/bergung-login");
    } else {
      setUser(savedUser);
      fetchNets();
    }
  }, []);

  const fetchNets = async () => {
    try {
      const response = await fetch("http://localhost:8080/ghostnets/open");
      if (response.ok) {
        const data = await response.json();
        setNets(data);
      } else {
        console.error("Fehler beim Abrufen der Netze");
      }
    } catch (err) {
      console.error("Fehler beim Laden der Netze:", err);
    }
  };

  if (!user) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Willkommen, {user.name}</h1>

      <h2 className="text-xl font-semibold mb-2">Übersicht über Geisternetze</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("ALLE")}
          className={`px-3 py-1 rounded ${filter === "ALLE" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Alle offenen Netze
        </button>
        <button
          onClick={() => setFilter("GEMELDET")}
          className={`px-3 py-1 rounded ${filter === "GEMELDET" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Gemeldete Netze
        </button>
        <button
          onClick={() => setFilter("BERGUNG")}
          className={`px-3 py-1 rounded ${filter === "BERGUNG" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Netze in Bergung
        </button>
        <button
          onClick={() => setFilter("MEINE")}
          className={`px-3 py-1 rounded ${filter === "MEINE" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Meine Netze
        </button>
      </div>

      <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scroll smooth">
        {nets
          .filter(net => {
            if (filter === "GEMELDET") return net.status === "GEMELDET";
            if (filter === "BERGUNG") return net.status === "BERGUNG_BEVORSTEHEND";
            if (filter === "MEINE") return net.salvager?.id === user.id;
            return net.status === "GEMELDET" || net.status === "BERGUNG_BEVORSTEHEND";
          })
          .map(net => (
            <li key={net.id} className="p-4 bg-gray-100 rounded shadow">
              📍 <strong>{net.latitude.toFixed(4)}, {net.longitude.toFixed(4)}</strong><br />
              Größe: {net.sizeEstimate} m<sup>2</sup><br />
              Status: {net.status}<br />

              {net.salvager?.id === user.id ? (
                <>
                  <span className="text-sm text-gray-600">
                    Du hast dieses Netz zur Bergung übernommen.
                  </span>
                  <button
                    onClick={() => unassignNet(net.id)}
                    className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Bergung Zurückziehen
                  </button>
                </>
              ) : net.salvager ? (
                <span className="text-sm text-gray-600">
                  Zur Bergung übernommen von {net.salvager.name}
                </span>
              ) : (
                <button
                  onClick={() => assignNet(net.id)}
                  className="mt-2 inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Bergung übernehmen
                </button>
              )}

              {net.salvager?.id === user.id && net.status !== "GEBORGEN" && (
                <button
                  onClick={() => markAsRecovered(net.id)}
                  className="ml-4 inline-block bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Als geborgen melden
                </button>
              )}
            </li>
          ))}
      </ul>

      <SalvageMap user={user} nets={nets} />
    </div>
  );

  // Netz zur Bergung übernehmen
  async function assignNet(id) {
    try {
      const response = await fetch(`http://localhost:8080/ghostnets/${id}/claim?personId=${user.id}`, {
        method: "PUT"
      });

      if (response.ok) {
        fetchNets();
      } else {
        alert("Fehler beim Übernehmen des Netzes");
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Netz nicht mehr zur Bergung übernehmen
  async function unassignNet(id) {
    try {
      const response = await fetch(`http://localhost:8080/ghostnets/${id}/unclaim?personId=${user.id}`, {
        method: "PUT"
      });

      if (response.ok) {
        fetchNets();
      } else {
        alert("Fehler beim Zurückziehen der Bergung");
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Netz als geborgen markieren
  async function markAsRecovered(id) {
    try {
      const response = await fetch(`http://localhost:8080/ghostnets/${id}/recover?personId=${user.id}`, {
        method: "PUT"
      });

      if (response.ok) {
        fetchNets();
      } else {
        alert("Fehler beim Abschluss der Bergung");
      }
    } catch (err) {
      console.error(err);
    }
  }
}
