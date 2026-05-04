import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'
import { cn } from './cn'

type FieldShellProps = {
  number?: string
  label: ReactNode
  hint?: ReactNode
  orientation?: ReactNode
  children: (id: string) => ReactNode
  className?: string
}

function FieldShell({
  number,
  label,
  hint,
  orientation,
  children,
  className,
}: FieldShellProps) {
  const id = useId()
  return (
    <div className={cn('codex-field flex flex-col', className)}>
      <label htmlFor={id} className="codex-label mb-2">
        {number ? <span className="codex-label__num">{number}</span> : null}
        <span>{label}</span>
      </label>
      {children(id)}
      {hint ? (
        <p className="mt-2 font-sans text-xs text-[color:var(--color-ink-faint)]">
          {hint}
        </p>
      ) : null}
      {orientation ? (
        <div className="mt-2">{orientation}</div>
      ) : null}
    </div>
  )
}

type TextInputProps = {
  number?: string
  label: ReactNode
  hint?: ReactNode
  orientation?: ReactNode
  containerClassName?: string
} & InputHTMLAttributes<HTMLInputElement>

export function TextInput({
  number,
  label,
  hint,
  orientation,
  containerClassName,
  className,
  ...rest
}: TextInputProps) {
  return (
    <FieldShell
      number={number}
      label={label}
      hint={hint}
      orientation={orientation}
      className={containerClassName}
    >
      {(id) => (
        <input
          id={id}
          className={cn('codex-input', className)}
          {...rest}
        />
      )}
    </FieldShell>
  )
}

type TextareaProps = {
  number?: string
  label: ReactNode
  hint?: ReactNode
  orientation?: ReactNode
  containerClassName?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export function Textarea({
  number,
  label,
  hint,
  orientation,
  containerClassName,
  className,
  rows = 4,
  ...rest
}: TextareaProps) {
  return (
    <FieldShell
      number={number}
      label={label}
      hint={hint}
      orientation={orientation}
      className={containerClassName}
    >
      {(id) => (
        <textarea
          id={id}
          rows={rows}
          className={cn('codex-textarea', className)}
          {...rest}
        />
      )}
    </FieldShell>
  )
}

type SelectProps = {
  number?: string
  label: ReactNode
  hint?: ReactNode
  orientation?: ReactNode
  containerClassName?: string
  placeholder?: string
  options: Array<{ value: string; label: string }>
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'>

export function Select({
  number,
  label,
  hint,
  orientation,
  containerClassName,
  className,
  placeholder = 'Selecionar uma opção',
  options,
  value,
  ...rest
}: SelectProps) {
  return (
    <FieldShell
      number={number}
      label={label}
      hint={hint}
      orientation={orientation}
      className={containerClassName}
    >
      {(id) => (
        <select
          id={id}
          className={cn('codex-select', className)}
          value={value ?? ''}
          required
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </FieldShell>
  )
}
