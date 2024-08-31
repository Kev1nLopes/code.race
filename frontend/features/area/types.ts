import { Usuario } from '../usuario/types'

export type Area = {
  id: number
  tipo: string
  poligonos: Perimetro
  aprovado: boolean
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
