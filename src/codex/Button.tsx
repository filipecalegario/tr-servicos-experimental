import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from './cn'

type Variant = 'primary' | 'ghost' | 'seal' | 'danger'

type ButtonProps = {
  variant?: Variant
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

const VARIANT_CLASS: Record<Variant, string> = {
  primary: '',
  ghost: 'codex-button--ghost',
  seal: 'codex-button--seal',
  danger: 'codex-button--danger',
}

export function Button({
  variant = 'primary',
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn('codex-button', VARIANT_CLASS[variant], className)}
      {...rest}
    >
      {children}
    </button>
  )
}
