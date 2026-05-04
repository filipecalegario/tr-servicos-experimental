import type { ReactNode } from 'react'

type SectionHeaderProps = {
  number: string
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
}

export function SectionHeader({
  number,
  eyebrow,
  title,
  lede,
}: SectionHeaderProps) {
  return (
    <header className="mb-10">
      <div className="mb-5 flex items-baseline gap-4">
        <span className="codex-section-number">§ {number}</span>
        {eyebrow ? (
          <>
            <span className="hairline-x h-px flex-1" aria-hidden="true" />
            <span className="codex-section-number text-ink-faint">
              {eyebrow}
            </span>
          </>
        ) : (
          <span className="hairline-x h-px flex-1" aria-hidden="true" />
        )}
      </div>
      <h1 className="codex-section-title">{title}</h1>
      {lede ? <p className="codex-lede mt-5">{lede}</p> : null}
    </header>
  )
}
