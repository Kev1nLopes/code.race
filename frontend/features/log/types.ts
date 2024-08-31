import { Usuario } from '../usuario/types'

export type Log = {
  id: Number
  descricao: String
  data_criacao: Date
  usuario: Usuario
}
