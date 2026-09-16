interface ResumoAproveitamentoProps {
  percentual: number;
}

export function ResumoAproveitamento({ percentual }: ResumoAproveitamentoProps) {
  const percentualArredondado = Math.round(percentual * 10) / 10;
  const graus = Math.min(360, Math.max(0, (percentual / 100) * 360));

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        role="img"
        aria-label={`Aproveitamento geral de ${percentualArredondado}%`}
        className="flex h-40 w-40 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(#2563eb ${graus}deg, rgb(229 231 235) ${graus}deg)`,
        }}
      >
        <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white dark:bg-neutral-900">
          <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            {percentualArredondado}%
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">de aproveitamento</span>
        </div>
      </div>
    </div>
  );
}