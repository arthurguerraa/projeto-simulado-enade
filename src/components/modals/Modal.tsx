import { useEffect, useRef, type ReactNode } from "react";

interface ModalProps {
  aberto: boolean;
  titulo: string;
  onFechar: () => void;
  children: ReactNode;
}

/**
 * Usa <dialog> nativo: foco retido dentro do modal e fechamento com Esc
 * são comportamento padrão do navegador, sem precisar de listeners manuais
 * (o legado empilhava listeners no document a cada abertura — aqui não existe
 * esse risco porque não há addEventListener nenhum).
 */
export function Modal({ aberto, titulo, onFechar, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (aberto && !dialog.open) {
      dialog.showModal();
    } else if (!aberto && dialog.open) {
      dialog.close();
    }
  }, [aberto]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="modal-titulo"
      onClose={onFechar}
      onCancel={onFechar}
      className="w-full max-w-md rounded-xl border border-neutral-200 p-0 text-neutral-900 shadow-xl backdrop:bg-black/40 dark:border-neutral-800 dark:text-neutral-100"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-3 dark:border-neutral-800">
        <h2 id="modal-titulo" className="text-base font-semibold">
          {titulo}
        </h2>
        <button
          type="button"
          onClick={onFechar}
          aria-label="Fechar modal"
          className="rounded-md p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
        >
          ✕
        </button>
      </div>
      <div className="p-5">{children}</div>
    </dialog>
  );
}
