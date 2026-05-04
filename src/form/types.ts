export type Sim = 'sim' | 'nao' | ''

export type TipoRegistroPrecos = 'corporativo' | 'simples' | 'unificado' | ''

export type TipoParcelamento =
  | 'item-unico'
  | 'itens'
  | 'grupo-unico'
  | 'grupos'
  | ''

export type PermiteConsorcios = 'sim-livre' | 'sim-limitado' | 'nao' | ''

export type Section1Data = {
  objeto: string
  isRegistroPrecos: Sim
  tipoRegistroPrecos: TipoRegistroPrecos
  orgaosAtendidos: string
  reducaoEscopo: Sim
  justificativaReducao: string
  existeEtp: Sim
  justificativaSemEtp: string
  temParcelamento: Sim
  tipoParcelamento: TipoParcelamento
  permiteConsorcios: PermiteConsorcios
  justificativaConsorcio: string
  permiteCooperativa: Sim
  permitePessoaFisica: Sim
}

export const section1Initial: Section1Data = {
  objeto: '',
  isRegistroPrecos: '',
  tipoRegistroPrecos: '',
  orgaosAtendidos: '',
  reducaoEscopo: '',
  justificativaReducao: '',
  existeEtp: '',
  justificativaSemEtp: '',
  temParcelamento: '',
  tipoParcelamento: '',
  permiteConsorcios: '',
  justificativaConsorcio: '',
  permiteCooperativa: '',
  permitePessoaFisica: '',
}
