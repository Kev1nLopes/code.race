import { useQuery } from '@tanstack/react-query'
import * as service from './service'

export function useCurrentUser() {
  return useQuery({
    queryKey: ['usuarios', '@me'],
    queryFn: service.getCurrentUser(),
    select: res => res.data,
  })
}
