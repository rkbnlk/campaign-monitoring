import { useQuery } from '@tanstack/react-query';
import { fetchCampaigns } from '../api/campaigns';

export const useCampaigns = () =>
  useQuery({
    queryKey: ['campaigns'],
    queryFn: fetchCampaigns,
  });
