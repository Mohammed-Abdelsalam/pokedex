import { useQuery } from '@tanstack/react-query'
import { api } from '../api/axios'

export const usePokemonDetails = (name: string) =>
  useQuery({
    queryKey: ['pokemon', 'detail', name],
    queryFn: async () => (await api.get(`pokemon/${name}`)).data,
  })