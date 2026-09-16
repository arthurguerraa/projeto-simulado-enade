export function Footer() {
  return (
    <footer
      className="mt-auto flex flex-wrap items-center justify-center gap-10 border-t border-neutral-200 px-6 py-8 dark:border-neutral-800"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <a
        href="https://fateccarapicuiba.cps.sp.gov.br/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Site da FATEC Carapicuíba"
      >
        <img
          src="/img/logoFatec.png"
          alt="Logo da FATEC Carapicuíba"
          className="h-20 w-auto max-w-[180px] object-contain"
        />
      </a>

      <a
        href="https://www.cps.sp.gov.br/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Site do Centro Paula Souza"
      >
        <img
          src="/img/logoCPS.png"
          alt="Logo do Centro Paula Souza"
          className="h-20 w-auto max-w-[180px] object-contain"
        />
      </a>

      <a
        href="https://fateccarapicuiba.cps.sp.gov.br/analise-e-desenvolvimento-de-sistemas/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Página do curso de Análise e Desenvolvimento de Sistemas"
      >
        <img
          src="/img/adslogo.png"
          alt="Logo do curso de Análise e Desenvolvimento de Sistemas"
          className="h-20 w-auto max-w-[180px] object-contain"
        />
      </a>
    </footer>
  );
}