import useApi from '@/hooks/useApi'
import { Notificacao } from './types'

export function getAllNotifications() {
  const { api } = useApi()
  return () => api.get<Notificacao[]>('/notificacoes')
}
