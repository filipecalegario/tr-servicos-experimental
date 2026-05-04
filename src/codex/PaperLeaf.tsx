import type { ReactNode } from 'react'

export function PaperLeaf({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6">
      <article
        className="codex-leaf relative px-6 py-10 sm:px-12 sm:py-14 md:px-20 md:py-20"
        style={{ animation: 'var(--animate-paper-rise)' }}
      >
        {/* Selo decorativo no canto */}
        <div className="absolute top-6 right-6 hidden md:block">
          <div className="codex-seal">
            TERMO
            <br />
            DE REF.
          </div>
        </div>
        {children}
      </article>
    </div>
  )
}
