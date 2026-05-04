import { ClauseDim, Placeholder } from '@/codex/Placeholder'
import type { Section1Data } from '../types'

const TIPO_RP_LABEL: Record<string, string> = {
  corporativo: 'Corporativo',
  simples: 'Simples',
  unificado: 'Unificado da Saúde',
}

const TIPO_PARCEL_LABEL: Record<string, string> = {
  'item-unico': 'item único',
  itens: 'itens',
  'grupo-unico': 'grupo único',
  grupos: 'grupos',
}

type Props = { data: Section1Data }

function Clause({
  number,
  children,
}: {
  number: string
  children: React.ReactNode
}) {
  return (
    <p className="doc-clause">
      <span className="doc-clause__num">{number}.</span>
      <span className="doc-clause__body">{children}</span>
    </p>
  )
}

export function Section1Preview({ data }: Props) {
  const rp = data.isRegistroPrecos
  const etp = data.existeEtp
  const par = data.temParcelamento
  const cons = data.permiteConsorcios

  return (
    <section className="doc-section">
      <h2 className="doc-chapter">Capítulo I</h2>
      <h1 className="doc-title">Do Objeto da Licitação</h1>

      <Clause number="1.1">
        Constitui objeto da presente contratação{' '}
        <Placeholder value={data.objeto} fallback="descrever sucintamente o objeto" />
        .
      </Clause>

      <Clause number="1.2">
        {rp === 'sim' ? (
          <>
            A presente contratação será realizada por meio de Sistema de
            Registro de Preços, na modalidade{' '}
            <Placeholder
              value={
                data.tipoRegistroPrecos
                  ? TIPO_RP_LABEL[data.tipoRegistroPrecos]
                  : ''
              }
              fallback="definir tipo de Registro de Preços"
            />
            .
          </>
        ) : rp === 'nao' ? (
          <>A presente contratação não será realizada por meio de Sistema de Registro de Preços.</>
        ) : (
          <ClauseDim>
            Definir se a contratação será realizada por meio de Sistema de
            Registro de Preços.
          </ClauseDim>
        )}
      </Clause>

      {rp === 'sim' && (
        <>
          <Clause number="1.2.1">
            Serão atendidos por esta contratação{' '}
            <Placeholder
              value={data.orgaosAtendidos}
              fallback="especificar os órgãos ou entidades atendidos"
            />
            .
          </Clause>

          <Clause number="1.2.2">
            {data.reducaoEscopo === 'sim' ? (
              <>
                Haverá redução de escopo, conforme art. 45 do Decreto Estadual
                nº 54.700/2023.{' '}
                <Placeholder
                  value={data.justificativaReducao}
                  fallback="justificar tecnicamente a redução de escopo"
                />
              </>
            ) : data.reducaoEscopo === 'nao' ? (
              <>Não haverá redução de escopo.</>
            ) : (
              <ClauseDim>Definir se haverá redução de escopo.</ClauseDim>
            )}
          </Clause>
        </>
      )}

      <Clause number="1.3">
        {etp === 'sim' ? (
          <>
            A presente contratação é precedida de Estudo Técnico Preliminar
            (ETP).
          </>
        ) : etp === 'nao' ? (
          <>
            Dispensa-se o Estudo Técnico Preliminar pelos seguintes
            fundamentos:{' '}
            <Placeholder
              value={data.justificativaSemEtp}
              fallback="apresentar justificativa para a dispensa do ETP"
            />
            .
          </>
        ) : (
          <ClauseDim>Definir se há Estudo Técnico Preliminar (ETP).</ClauseDim>
        )}
      </Clause>

      <Clause number="1.4">
        {par === 'sim' ? (
          <>
            O objeto será parcelado, organizado em{' '}
            <Placeholder
              value={
                data.tipoParcelamento
                  ? TIPO_PARCEL_LABEL[data.tipoParcelamento]
                  : ''
              }
              fallback="definir forma de parcelamento"
            />
            .
          </>
        ) : par === 'nao' ? (
          <>Não haverá parcelamento do objeto.</>
        ) : (
          <ClauseDim>Definir se haverá parcelamento do objeto.</ClauseDim>
        )}
      </Clause>

      <Clause number="1.5">
        {cons === 'sim-livre' ? (
          <>
            Será admitida a participação em consórcio, sem restrição quanto ao
            número de fornecedores.
          </>
        ) : cons === 'sim-limitado' ? (
          <>
            Será admitida a participação em consórcio com número limitado de
            fornecedores, em razão da baixa complexidade técnica e operacional
            do objeto.
          </>
        ) : cons === 'nao' ? (
          <>
            É vedada a participação em consórcio nesta contratação.{' '}
            <Placeholder
              value={data.justificativaConsorcio}
              fallback="justificar a vedação ao consórcio"
            />
          </>
        ) : (
          <ClauseDim>Definir as condições de participação em consórcio.</ClauseDim>
        )}
      </Clause>

      <Clause number="1.6">
        {data.permiteCooperativa === 'sim' ? (
          <>É admitida a participação de cooperativas.</>
        ) : data.permiteCooperativa === 'nao' ? (
          <>É vedada a participação de cooperativas.</>
        ) : (
          <ClauseDim>Definir se é admitida a participação de cooperativas.</ClauseDim>
        )}
      </Clause>

      <Clause number="1.7">
        {data.permitePessoaFisica === 'sim' ? (
          <>É admitida a participação de pessoa física.</>
        ) : data.permitePessoaFisica === 'nao' ? (
          <>É vedada a participação de pessoa física.</>
        ) : (
          <ClauseDim>Definir se é admitida a participação de pessoa física.</ClauseDim>
        )}
      </Clause>
    </section>
  )
}
