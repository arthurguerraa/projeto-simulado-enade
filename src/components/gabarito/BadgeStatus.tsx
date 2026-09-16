import type { StatusGabarito } from "../../domain/gabarito";

const ESTILOS: Record<StatusGabarito, { texto: string; classes: string }> = {
  correto: {
    texto: "Correto",
    classes: "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300",
  },
  incorreto: {
    texto: "Incorreto",
    classes: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
  },
  "em-branco": {
    texto: "Em branco",
    classes: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
  },
  anulada: {
    texto: "Anulada",
    classes: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  },
};

export function BadgeStatus({ status }: { status: StatusGabarito }) {
  const { texto, classes } = ESTILOS[status];
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${classes}`}>
      {texto}
    </span>
  );
}