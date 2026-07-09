import { useFetch } from '@/hooks/useFetch'
import type { WeddingInvitation } from '@/types'

export function useInvitation(id: string | undefined) {
  const { data, isLoading, error, refetch } = useFetch<WeddingInvitation>(
    {
      url: id ? `/invitations/${id}` : '',
      method: 'get',
    },
    [id],
  )

  return { data, isLoading, error, refetch }
}
