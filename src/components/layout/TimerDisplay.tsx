import { formatarContagemRegressiva } from "../../domain/tempo";

interface TimerDisplayProps {
  segundosRestantes: number;
}

export function TimerDisplay({ segundosRestantes }: TimerDisplayProps) {
  const critico = segundosRestantes <= 5 * 60; // últimos 5 minutos

  return (
    <div
      role="timer"
      aria-live={critico ? "assertive" : "off"}
      className={[
        "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-semibold tabular-nums",
        critico
          ? "border-red-500 bg-red-50 text-red-700 dark:border-red-500 dark:bg-red-950/40 dark:text-red-300"
          : "border-neutral-300 bg-neutral-50 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
      ].join(" ")}
    >
      <span aria-hidden="true">⏱</span>
      {formatarContagemRegressiva(segundosRestantes)}
    </div>
  );
}