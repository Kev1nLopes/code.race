import { Usuario } from '../usuario/types'

export type Marker = {
  id: number
  descricao: string
  latitude: string
  longitude: string
  ativo: boolean
  usuario: Usuario
}
