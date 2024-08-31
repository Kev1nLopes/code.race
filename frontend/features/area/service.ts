import useApi from '@/hooks/useApi'
import { Area } from './types'

export function getAreasCurrentUser() {
  const { api } = useApi()

  return () => api.get<Area[]>('/areas/@me')
}
