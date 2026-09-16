/**
 * Resolve um caminho de asset em public/ para a URL correta, respeitando
 * o `base` configurado no vite.config.ts (necessário para funcionar em
 * subpastas, como GitHub Pages).
 *
 * Uso: assetUrl("/img/Q1_text.PNG") -> "/projeto-simulado-enade/img/Q1_text.PNG"
 */
export function assetUrl(caminho: string): string {
  const base = import.meta.env.BASE_URL; // ex: "/projeto-simulado-enade/" ou "/"
  const caminhoSemBarraInicial = caminho.replace(/^\//, "");
  return `${base}${caminhoSemBarraInicial}`;
}