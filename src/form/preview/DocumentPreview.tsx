import type { ReactNode } from 'react'

type DocumentPreviewProps = {
  children: ReactNode
  identifier?: string
}

export function DocumentPreview({
  children,
  identifier = '2026/01',
}: DocumentPreviewProps) {
  return (
    <div className="doc-shell">
      <header className="doc-cover">
        <div className="doc-cover__top">
          <span className="doc-cover__series">
            República Federativa do Brasil · Poder Público
          </span>
          <span className="doc-cover__id">Dossiê Nº {identifier}</span>
        </div>
        <h1 className="doc-cover__title">
          Termo <em>de</em> Referência
        </h1>
        <p className="doc-cover__subtitle">
          Documento composto em tempo de redação · revisão{' '}
          <em>preliminar</em>
        </p>
        <div className="doc-cover__rule">
          <span aria-hidden="true">· · ·</span>
        </div>
      </header>
      <div className="doc-body">{children}</div>
      <footer className="doc-footnote" aria-hidden="true">
        Pág. <em>1</em> · Lavrado eletronicamente
      </footer>
    </div>
  )
}
