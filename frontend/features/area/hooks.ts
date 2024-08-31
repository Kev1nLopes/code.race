import { useQuery } from '@tanstack/react-query'

import * as service from './service'

export function useAreasCurrentUser() {
  return useQuery({
    queryKey: ['areas', '@me'],
    queryFn: service.getAreasCurrentUser(),
    select: res => res.data,
  })
}
