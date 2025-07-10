// globales Layout

import { Outlet, Link } from "react-router"

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen min-w-full">
      
      {/* Header */}
      <header className="bg-blue-700 text-white py-4 shadow-md w-full">
        <nav className="flex flex-wrap justify-between items-center w-full px-4">
          <h1 className="text-2xl font-bold">Shea Sepherd</h1>
          <ul className="flex flex-wrap gap-4 sm:gap-6 text-base sm:text-lg mt-2 sm:mt-0">
            <li>
              <Link to="/" className="hover:underline">Start</Link>
            </li>
            <li>
              <Link to="/melden" className="hover:underline">Melden</Link>
            </li>
            <li>
              <Link to="/bergung-login" className="hover:underline">Bergen</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hauptinhalt */}
      <main className="flex-grow w-full px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-sm text-gray-600 w-full">
        <div className="w-full px-4 py-4 text-center">
          © 2025 Shea Sepherd – Gemeinsam gegen Geisternetze
        </div>
      </footer>
    </div>
  )
}

