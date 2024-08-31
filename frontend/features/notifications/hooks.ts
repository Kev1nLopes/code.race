import { useQuery } from '@tanstack/react-query'

import * as service from './service'

export function useAllNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: service.getAllNotifications(),
    select: res => res.data,
    refetchInterval: 1000,
  })
}
