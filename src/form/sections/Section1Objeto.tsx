import {
  Orientacao,
  RadioGroup,
  Rule,
  SectionHeader,
  Select,
  Textarea,
} from '@/codex'
import type {
  PermiteConsorcios,
  Section1Data,
  Sim,
  TipoParcelamento,
  TipoRegistroPrecos,
} from '../types'

type Props = {
  data: Section1Data
  onChange: <K extends keyof Section1Data>(
    key: K,
    value: Section1Data[K],
  ) => void
}

const SIM_NAO = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' },
]

const TIPO_RP = [
  { value: 'corporativo', label: 'Corporativo' },
  { value: 'simples', label: 'Simples' },
  { value: 'unificado', label: 'Unificado da Saúde' },
]

const TIPO_PARCEL = [
  { value: 'item-unico', label: 'Item único' },
  { value: 'itens', label: 'Item(ns)' },
  { value: 'grupo-unico', label: 'Grupo único' },
  { value: 'grupos', label: 'Grupo(s)' },
]

const CONSORCIO = [
  {
    value: 'sim-livre',
    label: 'Sim, sem restrições',
    description: 'Aberto a qualquer número de fornecedores em consórcio.',
  },
  {
    value: 'sim-limitado',
    label: 'Sim, com número limitado',
    description: 'Justificável por baixa complexidade técnica/operacional.',
  },
  {
    value: 'nao',
    label: 'Não',
    description: 'Vedação ao consórcio nesta contratação.',
  },
]

export function Section1Objeto({ data, onChange }: Props) {
  return (
    <section>
      <SectionHeader
        number="01"
        eyebrow="Capítulo I"
        title={
          <>
            Do <em>Objeto</em> da Licitação
          </>
        }
        lede={
          <>
            Identifique com precisão o objeto da contratação, suas modalidades
            de registro e parcelamento, e as condições de participação que
            dão forma à disputa.
          </>
        }
      />

      <div className="space-y-10">
        <Textarea
          number="1.1"
          label="Objeto"
          rows={5}
          value={data.objeto}
          onChange={(e) => onChange('objeto', e.target.value)}
          placeholder="Descreva o objeto da contratação de forma concisa, indicando finalidade e abrangência."
          orientation={
            <Orientacao>
              Redija em parágrafo único, evitando especificações operacionais
              que pertencem aos itens 3 e seguintes. Cite normas apenas quando
              indispensáveis à definição do objeto.
            </Orientacao>
          }
        />

        <Rule mark="§ Registro de Preços" />

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          <Select
            number="1.2"
            label="É Registro de Preços?"
            value={data.isRegistroPrecos}
            onChange={(e) =>
              onChange('isRegistroPrecos', e.target.value as Sim)
            }
            options={SIM_NAO}
          />

          {data.isRegistroPrecos === 'sim' ? (
            <Select
              number="1.2.1"
              label="Tipo de Registro de Preços"
              value={data.tipoRegistroPrecos}
              onChange={(e) =>
                onChange(
                  'tipoRegistroPrecos',
                  e.target.value as TipoRegistroPrecos,
                )
              }
              options={TIPO_RP}
            />
          ) : null}
        </div>

        {data.isRegistroPrecos === 'sim' ? (
          <Textarea
            number="1.2.2"
            label="Órgãos ou entidades atendidos"
            rows={3}
            value={data.orgaosAtendidos}
            onChange={(e) => onChange('orgaosAtendidos', e.target.value)}
            placeholder="Especifique os órgãos ou entidades que serão atendidos por esta contratação."
          />
        ) : null}

        {data.isRegistroPrecos === 'sim' ? (
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            <Select
              number="1.2.3"
              label="Haverá redução de escopo?"
              hint="Conforme art. 45 do Decreto Estadual nº 54.700/2023."
              value={data.reducaoEscopo}
              onChange={(e) =>
                onChange('reducaoEscopo', e.target.value as Sim)
              }
              options={SIM_NAO}
            />

            {data.reducaoEscopo === 'sim' ? (
              <Textarea
                number="1.2.3.1"
                label="Justificativa do escopo reduzido"
                rows={3}
                value={data.justificativaReducao}
                onChange={(e) =>
                  onChange('justificativaReducao', e.target.value)
                }
                placeholder="Justifique tecnicamente a redução de escopo."
              />
            ) : null}
          </div>
        ) : null}

        <Rule mark="§ Estudos & Parcelamento" />

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          <Select
            number="1.3"
            label="Existe ETP?"
            hint="Estudo Técnico Preliminar prévio à contratação."
            value={data.existeEtp}
            onChange={(e) => onChange('existeEtp', e.target.value as Sim)}
            options={SIM_NAO}
          />

          {data.existeEtp === 'nao' ? (
            <Textarea
              number="1.3.1"
              label="Justificativa da ausência de ETP"
              rows={3}
              value={data.justificativaSemEtp}
              onChange={(e) =>
                onChange('justificativaSemEtp', e.target.value)
              }
              placeholder="Indique a base legal e o motivo da dispensa do estudo."
            />
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          <Select
            number="1.4"
            label="Haverá parcelamento do objeto?"
            value={data.temParcelamento}
            onChange={(e) =>
              onChange('temParcelamento', e.target.value as Sim)
            }
            options={SIM_NAO}
            orientation={
              <Orientacao>
                O parcelamento favorece a competitividade e a participação de
                pequenas empresas. A vedação ao parcelamento exige
                justificativa técnica e econômica robusta.
              </Orientacao>
            }
          />

          {data.temParcelamento === 'sim' ? (
            <Select
              number="1.4.1"
              label="Forma de parcelamento"
              value={data.tipoParcelamento}
              onChange={(e) =>
                onChange(
                  'tipoParcelamento',
                  e.target.value as TipoParcelamento,
                )
              }
              options={TIPO_PARCEL}
            />
          ) : null}
        </div>

        <Rule mark="§ Participação" />

        <RadioGroup
          number="1.5"
          label="Permite consórcios?"
          value={data.permiteConsorcios}
          onChange={(v) =>
            onChange('permiteConsorcios', v as PermiteConsorcios)
          }
          options={CONSORCIO}
          orientation={
            <Orientacao>
              A vedação ao consórcio deve ser expressamente justificada
              quando aplicável.
            </Orientacao>
          }
        />

        {data.permiteConsorcios === 'nao' ? (
          <Textarea
            number="1.5.1"
            label="Justificativa da vedação ao consórcio"
            rows={3}
            value={data.justificativaConsorcio}
            onChange={(e) => onChange('justificativaConsorcio', e.target.value)}
            placeholder="Apresente a fundamentação técnica que justifica a vedação."
          />
        ) : null}

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          <Select
            number="1.6"
            label="Permite cooperativa?"
            value={data.permiteCooperativa}
            onChange={(e) =>
              onChange('permiteCooperativa', e.target.value as Sim)
            }
            options={SIM_NAO}
          />

          <Select
            number="1.7"
            label="Permite pessoa física?"
            value={data.permitePessoaFisica}
            onChange={(e) =>
              onChange('permitePessoaFisica', e.target.value as Sim)
            }
            options={SIM_NAO}
          />
        </div>
      </div>
    </section>
  )
}
