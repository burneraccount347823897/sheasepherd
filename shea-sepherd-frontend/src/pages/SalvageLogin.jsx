// Login für die Bergung

import { useState } from "react";
import { useNavigate } from "react-router";

export default function SalvageLogin() {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response = await fetch("http://localhost:8080/persons/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phoneNumber: formData.phone,
        }),
      });

      if (response.ok) {
        const person = await response.json();

        localStorage.setItem("user", JSON.stringify(person));

        navigate("/bergung-dashboard");
      } else {
        const errorData = await response.json()
        const message = errorData?.error || "Unbekannter Fehler beim Login"
        setErrorMessage(message)
      }
    } catch (err) {
      console.error("Fehler beim Login:", err);
      setErrorMessage("Verbindung zum Server fehlgeschlagen.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Login für Bergung</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Telefonnummer"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Einloggen
        </button>
      </form>

      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
