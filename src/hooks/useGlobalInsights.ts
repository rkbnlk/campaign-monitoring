import { useQuery } from '@tanstack/react-query';
import { fetchGlobalInsights } from '../api/campaigns';

export const useGlobalInsights = () =>
  useQuery({
    queryKey: ['global-insights'],
    queryFn: fetchGlobalInsights,
    refetchInterval: 30000,
  });
  