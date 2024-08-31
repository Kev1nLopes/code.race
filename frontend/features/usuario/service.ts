import useApi from '@/hooks/useApi'

import { Usuario } from './types'

export function getCurrentUser() {
  const { api } = useApi()

  return () => api.get<Usuario>('/usuarios/@me')
}
