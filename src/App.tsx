import { useCallback, useState } from 'react'
import { Button, SplitLayout } from '@/codex'
import { Section1Objeto } from './form/sections/Section1Objeto'
import { Section1Preview } from './form/preview/Section1Preview'
import { DocumentPreview } from './form/preview/DocumentPreview'
import { section1Initial, type Section1Data } from './form/types'

export function App() {
  const [data, setData] = useState<Section1Data>(section1Initial)

  const update = useCallback(
    <K extends keyof Section1Data>(key: K, value: Section1Data[K]) => {
      setData((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  return (
    <SplitLayout
      editor={
        <div className="mx-auto w-full max-w-2xl">
          <header className="codex-editor-head">
            <span className="codex-chip self-start">
              <span aria-hidden="true">●</span>
              Em edição · Capítulo I
            </span>
            <h2 className="font-display text-2xl leading-tight tracking-tight text-[color:var(--color-ink)]">
              Mesa de redação
            </h2>
            <p className="font-display italic text-sm text-[color:var(--color-ink-soft)]">
              Preencha os campos à esquerda; o documento à direita é composto
              em tempo real.
            </p>
          </header>

          <Section1Objeto data={data} onChange={update} />

          <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--color-rule-soft)] pt-6">
            <p className="font-display italic text-xs text-[color:var(--color-ink-faint)]">
              Próximas seções serão acrescidas em folhas subsequentes.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost">Salvar rascunho</Button>
              <Button variant="seal">Avançar &rarr;</Button>
            </div>
          </div>
        </div>
      }
      preview={
        <DocumentPreview>
          <Section1Preview data={data} />
        </DocumentPreview>
      }
    />
  )
}
