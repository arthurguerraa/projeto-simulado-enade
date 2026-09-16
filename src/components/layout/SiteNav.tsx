import { Link, useLocation } from "react-router-dom";
import { ThemeToggleButton } from "./ThemeToggleButton";

const LINKS = [
  { to: "/", label: "Início" },
  { to: "/tutorial", label: "Instruções" },
  { to: "/sobre", label: "Sobre" },
  { to: "/creditos", label: "Créditos" },
];

export function SiteNav() {
  const location = useLocation();

  return (
    <nav
      aria-label="Navegação principal"
      className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <Link to="/" className="flex items-center">
        <img
          src="/img/newSimucadLogoCrop.jpeg"
          alt="Simucad"
          className="h-12 w-auto object-contain"
        />
      </Link>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap gap-4 text-sm">
          {LINKS.map((link) => {
            const ativo = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={ativo ? "page" : undefined}
                className={
                  ativo
                    ? "font-semibold text-blue-600 dark:text-blue-400"
                    : "text-neutral-600 hover:text-blue-600 dark:text-neutral-300 dark:hover:text-blue-400"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <ThemeToggleButton />
      </div>
    </nav>
  );
}
