import type { ReactNode } from 'react'
import { cn } from './cn'

type PlaceholderProps = {
  /** Real content. If falsy/empty, the fallback is rendered in ghost style. */
  value?: ReactNode
  /** Faded text shown when value is empty. */
  fallback: ReactNode
  className?: string
}

export function Placeholder({ value, fallback, className }: PlaceholderProps) {
  const filled =
    typeof value === 'string'
      ? value.trim().length > 0
      : value !== undefined && value !== null && value !== false
  if (filled) {
    return <span className={className}>{value}</span>
  }
  return (
    <span
      className={cn(
        'italic text-[color:var(--color-ink-ghost)]',
        'underline decoration-[color:var(--color-rule-faint)] decoration-dotted underline-offset-4',
        className,
      )}
    >
      [{fallback}]
    </span>
  )
}

export function ClauseDim({ children }: { children: ReactNode }) {
  return (
    <span className="text-[color:var(--color-ink-faint)] italic">
      {children}
    </span>
  )
}
