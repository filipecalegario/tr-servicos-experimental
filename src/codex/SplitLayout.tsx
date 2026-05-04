import type { ReactNode } from 'react'

type SplitLayoutProps = {
  editor: ReactNode
  preview: ReactNode
}

export function SplitLayout({ editor, preview }: SplitLayoutProps) {
  return (
    <div className="codex-split">
      <section
        className="codex-split__editor"
        aria-label="Edição do Termo de Referência"
      >
        {editor}
      </section>
      <section
        className="codex-split__preview"
        aria-label="Pré-visualização do documento"
      >
        <div className="codex-preview-bar" aria-hidden="true">
          <span>Pré-visualização viva</span>
          <span>Atualiza enquanto você redige</span>
        </div>
        {preview}
      </section>
    </div>
  )
}
