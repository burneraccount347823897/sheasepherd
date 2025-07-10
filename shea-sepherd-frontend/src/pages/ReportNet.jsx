// Seite zum Melden von Geisternetzen

import { useState } from "react"

export default function ReportNet() {
  const [anonymous, setAnonymous] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    size: "",
    name: "",
    phone: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage(null)

    const data = {
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      sizeEstimate: formData.size,
      reporter: anonymous 
        ? { anonymous: true, name: "Anonym" }
        : { name: formData.name, phoneNumber: formData.phone }
    }

    try {
    const response = await fetch("http://localhost:8080/ghostnets/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      alert("Geisternetz erfolgreich gemeldet!")
    } else {
      const errorData = await response.json();
      const message = errorData?.error || "Unbekannter Fehler beim Melden"
      setErrorMessage(message)
    }
  } catch (error) {
    console.error("Fehler:", error)
    setErrorMessage("Verbindung zum Server fehlgeschlagen.")
  }
}

  return (
    <section className="max-w-xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        Geisternetz melden
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block font-medium mb-1">GPS-Koordinaten</label>
          <div className="flex gap-4">
            <input
              type="number"
              name="latitude"
              placeholder="Breitengrad (z. B. 53.5)"
              value={formData.latitude}
              onChange={handleChange}
              required
              className="w-1/2 border p-2 rounded"
            />
            <input
              type="number"
              name="longitude"
              placeholder="Längengrad (z. B. 9.9)"
              value={formData.longitude}
              onChange={handleChange}
              required
              className="w-1/2 border p-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Geschätzte Größe (Quadratmeter)</label>
          <input
            type="number"
            name="size"
            placeholder="z. B. 200"
            value={formData.size}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="anonymous"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
          <label htmlFor="anonymous">Ich möchte anonym bleiben</label>
        </div>

        {!anonymous && (
          <>
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required={!anonymous}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Telefonnummer</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required={!anonymous}
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
        >
          Geisternetz melden
        </button>
      </form>
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
    </section>
  )
}
