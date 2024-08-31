import { Usuario } from '../usuario/types'

export enum TipoNotificacao {
  INFO = 'info',
  SUCESSO = 'sucesso',
  ALERTA = 'alerta',
  ERRO = 'erro',
}

export type Notificacao = {
  id: number
  titulo: string
  descricao: string
  tipo: TipoNotificacao
  ativo: boolean
  data_criacao: string
  sender: Usuario
}
