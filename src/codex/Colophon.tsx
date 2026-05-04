export function Colophon({ folio = 'i' }: { folio?: string }) {
  return (
    <footer
      className="codex-colophon mx-auto flex w-full max-w-5xl items-center gap-4 px-6 py-10"
      aria-hidden="true"
    >
      <span>Colófon</span>
      <span className="hairline-x flex-1" />
      <span className="hidden sm:inline">
        Composto em Fraunces &amp; Geist
      </span>
      <span className="hairline-x hidden flex-1 sm:block" />
      <span>
        Fol. <em className="font-display not-italic">{folio}</em>
      </span>
    </footer>
  )
}
