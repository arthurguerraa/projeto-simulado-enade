interface CardMetricaProps {
  titulo: string;
  valor: string | number;
  corTexto?: string;
}

export function CardMetrica({ titulo, valor, corTexto }: CardMetricaProps) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-neutral-200 bg-white p-4 text-center dark:border-neutral-800 dark:bg-neutral-900">
      <span className={`text-2xl font-bold ${corTexto ?? "text-neutral-900 dark:text-neutral-100"}`}>
        {valor}
      </span>
      <span className="text-xs text-neutral-500 dark:text-neutral-400">{titulo}</span>
    </div>
  );
}