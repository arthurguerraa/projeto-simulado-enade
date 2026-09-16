import { useState } from "react";

interface TimerControlsProps {
  onAjustar: (minutos: number) => void;
  onResetarPadrao: () => void;
}

export function TimerControls({ onAjustar, onResetarPadrao }: TimerControlsProps) {
  const [minutosInput, setMinutosInput] = useState("");

  function aoConfirmar() {
    const minutos = Number(minutosInput);
    if (!Number.isFinite(minutos) || minutos < 0) return;
    onAjustar(minutos);
    setMinutosInput("");
  }

  return (
    <div className="flex items-center gap-2 text-xs">
      <label className="flex items-center gap-1">
        <span className="sr-only">Definir tempo restante em minutos</span>
        <input
          type="number"
          min={0}
          placeholder="min"
          value={minutosInput}
          onChange={(e) => setMinutosInput(e.target.value)}
          className="w-16 rounded-md border border-neutral-300 px-2 py-1 dark:border-neutral-700 dark:bg-neutral-800"
        />
      </label>
      <button
        type="button"
        onClick={aoConfirmar}
        className="rounded-md border border-neutral-300 px-2 py-1 font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
      >
        Definir
      </button>
      <button
        type="button"
        onClick={onResetarPadrao}
        className="rounded-md border border-neutral-300 px-2 py-1 font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
      >
        Resetar (2h)
      </button>
    </div>
  );
}