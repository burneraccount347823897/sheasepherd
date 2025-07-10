import { Link } from "react-router"

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center gap-8 py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-4xl font-bold text-blue-700">
        Shea Sepherd – Rettung herrenloser Geisternetze
      </h1>
      <p className="max-w-2xl text-gray-700">
        Wir von Shea Sepherd setzen uns für den Schutz der Meere ein. Auf dieser Seite kannst du helfen, gefährliche Geisternetze zu melden oder aktiv an der Bergung teilnehmen.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 mt-8">
        <Link
          to="/melden"
          className="bg-green-600 text-white text-xl px-8 py-4 rounded-lg hover:bg-green-700 transition"
        >
          Geisternetz melden
        </Link>
        <Link
          to="/bergung-login"
          className="bg-blue-600 text-white text-xl px-8 py-4 rounded-lg hover:bg-blue-700 transition"
        >
          Zur Bergung (Login)
        </Link>
      </div>
    </section>
  )
}
