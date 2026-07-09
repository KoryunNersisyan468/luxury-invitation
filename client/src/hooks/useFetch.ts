import { useState, useEffect, useCallback } from 'react'
import type { AxiosRequestConfig } from 'axios'
import { api } from '@/api/client'

interface UseFetchState<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
}

export function useFetch<T>(config: AxiosRequestConfig, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    if (!config.url) {
      setData(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await api.request<any>(config)
      // If backend uses envelope { status, data }, unwrap it
      const payload = response.data && response.data.data !== undefined ? response.data.data : response.data
      setData(payload)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch data'))
    } finally {
      setIsLoading(false)
    }
  }, [config.url, config.method, config.params, config.data, ...deps])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  } as UseFetchState<T> & { refetch: () => Promise<void> }
}
