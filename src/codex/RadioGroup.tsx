import { useId, type ReactNode } from 'react'
import { cn } from './cn'

type Option = { value: string; label: string; description?: string }

type RadioGroupProps = {
  number?: string
  label: ReactNode
  options: Option[]
  value: string
  onChange: (next: string) => void
  orientation?: ReactNode
  name?: string
  className?: string
}

export function RadioGroup({
  number,
  label,
  options,
  value,
  onChange,
  orientation,
  name,
  className,
}: RadioGroupProps) {
  const fallback = useId()
  const groupName = name ?? fallback
  return (
    <fieldset className={cn('flex flex-col', className)}>
      <legend className="codex-label mb-3">
        {number ? <span className="codex-label__num">{number}</span> : null}
        <span>{label}</span>
      </legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const checked = value === opt.value
          return (
            <label
              key={opt.value}
              className={cn(
                'group flex cursor-pointer items-start gap-3 border px-4 py-3 transition-colors',
                checked
                  ? 'border-[color:var(--color-seal)] bg-[color:var(--color-seal-wash)]'
                  : 'border-[color:var(--color-rule-soft)] hover:border-[color:var(--color-ink-faint)]',
              )}
            >
              <input
                type="radio"
                name={groupName}
                value={opt.value}
                checked={checked}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              <span
                className={cn(
                  'mt-1 inline-block h-3 w-3 shrink-0 rounded-full border transition-all',
                  checked
                    ? 'border-[color:var(--color-seal)] bg-[color:var(--color-seal)] shadow-[inset_0_0_0_2px_var(--color-paper)]'
                    : 'border-[color:var(--color-ink-faint)] bg-transparent group-hover:border-[color:var(--color-ink)]',
                )}
                aria-hidden="true"
              />
              <span className="flex flex-col">
                <span className="font-display text-base text-[color:var(--color-ink)]">
                  {opt.label}
                </span>
                {opt.description ? (
                  <span className="font-sans text-xs text-[color:var(--color-ink-faint)] mt-0.5">
                    {opt.description}
                  </span>
                ) : null}
              </span>
            </label>
          )
        })}
      </div>
      {orientation ? <div className="mt-3">{orientation}</div> : null}
    </fieldset>
  )
}
