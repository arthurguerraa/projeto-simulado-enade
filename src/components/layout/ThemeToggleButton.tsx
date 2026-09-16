import { useTheme } from "../../context/ThemeContext";

export function ThemeToggleButton() {
  const { tema, alternarTema } = useTheme();
  const modoEscuroAtivo = tema === "dark";

  return (
    <button
      type="button"
      aria-pressed={modoEscuroAtivo}
      onClick={alternarTema}
      className="rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 aria-pressed:border-blue-600 aria-pressed:bg-blue-600 aria-pressed:text-white dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
    >
      {modoEscuroAtivo ? "Modo claro" : "Modo escuro"}
    </button>
  );
}