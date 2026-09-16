import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Tutorial from "./pages/Tutorial";
import Sobre from "./pages/Sobre";
import Creditos from "./pages/Creditos";
import Simulado from "./pages/Simulado";
import Resultado from "./pages/Resultado";
import Gabarito from "./pages/Gabarito";
import { SiteNav } from "./components/layout/SiteNav";
import { Footer } from "./components/layout/Footer";

const ROTAS_COM_FOOTER = ["/", "/tutorial", "/sobre", "/creditos"];

export default function App() {
  const location = useLocation();
  const mostrarFooter = ROTAS_COM_FOOTER.includes(location.pathname);

  return (
    <div
      className="flex min-h-screen flex-col text-neutral-900 dark:text-neutral-100"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <SiteNav />
      <div className="flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/creditos" element={<Creditos />} />
          <Route path="/simulado" element={<Simulado />} />
          <Route path="/resultado" element={<Resultado />} />
          <Route path="/gabarito" element={<Gabarito />} />
        </Routes>
      </div>
      {mostrarFooter && <Footer />}
    </div>
  );
}