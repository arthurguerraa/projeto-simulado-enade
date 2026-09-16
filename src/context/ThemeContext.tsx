import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { carregarPreferencias, salvarPreferencias } from "../domain/storage";
import type { Tema } from "../types/simulado";

interface ThemeContextValue {
  tema: Tema;
  alternarTema: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preferencias, setPreferencias] = useState(() => carregarPreferencias());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", preferencias.tema);
  }, [preferencias]);

  const alternarTema = () => {
    setPreferencias((atual) => {
      const proximo: Tema = atual.tema === "dark" ? "light" : "dark";
      const preferenciasAtualizadas = { tema: proximo };
      salvarPreferencias(preferenciasAtualizadas);
      return preferenciasAtualizadas;
    });
  };

  return (
    <ThemeContext.Provider value={{ tema: preferencias.tema, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme deve ser usado dentro de <ThemeProvider>");
  return ctx;
}