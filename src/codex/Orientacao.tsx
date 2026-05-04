import type { ReactNode } from 'react'

export function Orientacao({ children }: { children: ReactNode }) {
  return (
    <aside className="codex-orientation mt-2" role="note">
      {children}
    </aside>
  )
}
