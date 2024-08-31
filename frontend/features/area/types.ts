import { Usuario } from '../usuario/types'

export enum StatusArea {
  EM_RISCO = 'EM_RISCO',
  EM_ALERTA = 'EM_ALERTA',
  EM_PERIGO = 'EM_PERIGO',
  SEM_RISCO = 'SEM_RISCO',
  SEGURADA = 'SEGURADA',
  EM_ANALISE = 'EM_ANALISE',
}

export type Area = {
  id: number
  nome: string
  tipo: string
  poligonos: Perimetro
  status: StatusArea
  aprovado: boolean
  analisadoEm: string
  ativa: boolean
  notificacoes: any[]
  createdAt: string
  updatedAt: string
  createdBy: Usuario
}

export type Perimetro = {
  perimetro: Poligonos[]
}

export type Poligonos = {
  latitude: String
  longitude: String
}
