import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Início" },
  { to: "/tutorial", label: "Instruções" },
  { to: "/sobre", label: "Sobre" },
  { to: "/creditos", label: "Créditos" },
];

export function NavInstitucional() {
  const location = useLocation();

  return (
    <nav
      aria-label="Navegação institucional"
      className="flex flex-wrap gap-4 border-b border-neutral-200 bg-white px-4 py-3 text-sm dark:border-neutral-800 dark:bg-neutral-900"
    >
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
    </nav>
  );
}