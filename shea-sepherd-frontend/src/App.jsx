import { BrowserRouter, Routes, Route } from "react-router"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import ReportNet from "./pages/ReportNet"
import SalvageLogin from "./pages/SalvageLogin"
import SalvageDashboard from "./pages/SalvageDashboard"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/melden" element={<ReportNet />} />
          <Route path="/bergung-login" element={<SalvageLogin />} />
          <Route path="/bergung-dashboard" element={<SalvageDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


