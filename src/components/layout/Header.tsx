import { TimerDisplay } from "./TimerDisplay";
import { TimerControls } from "./TimerControls";

interface HeaderProps {
  questaoAtual?: number;
  totalQuestoes?: number;
  segundosRestantes?: number;
  onAjustarTempo?: (minutos: number) => void;
  onResetarTempoPadrao?: () => void;
}

export function Header({
  questaoAtual,
  totalQuestoes,
  segundosRestantes,
  onAjustarTempo,
  onResetarTempoPadrao,
}: HeaderProps) {
  return (
    <header
      className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <span className="text-sm font-semibold">Simulado ENADE</span>

      <div className="flex flex-wrap items-center gap-4">
        {typeof segundosRestantes === "number" && <TimerDisplay segundosRestantes={segundosRestantes} />}

        {onAjustarTempo && onResetarTempoPadrao && (
          <TimerControls onAjustar={onAjustarTempo} onResetarPadrao={onResetarTempoPadrao} />
        )}

        {questaoAtual && totalQuestoes && (
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Questão {String(questaoAtual).padStart(2, "0")} / {totalQuestoes}
          </span>
        )}
      </div>
    </header>
  );
}