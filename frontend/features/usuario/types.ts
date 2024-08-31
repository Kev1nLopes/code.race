import { Area } from '../area/types'
import { Log } from '../log/types'
import { Marker } from '../marker/types'

export enum UserRole {
  USER = 'USER',
  INSTITUTION = 'INSTITUTION',
  FISCAL = 'FISCAL',
}

export type Usuario = {
  id: number
  nome: string
  senha: string
  email: string
  data_nasc: Date
  cpf: string
  telefone: string
  cep: string
  uf: string
  cidade: string
  bairro: string
  ativo: boolean
  logs: Log[]
  markers: Marker[]
  role: UserRole
  areas: Area[]
}
