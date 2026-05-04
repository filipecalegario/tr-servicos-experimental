export function Rule({ mark = '· · ·' }: { mark?: string }) {
  return (
    <div className="codex-rule my-10" aria-hidden="true">
      <span className="codex-rule__mark">{mark}</span>
    </div>
  )
}
