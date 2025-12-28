import { useQuery } from "@tanstack/react-query";
import { fetchCampaignInsights } from "../api/campaigns";

export const useCampaignInsights = (id: string) => {
  return useQuery({
    queryKey: ['campaign-insights', id],
    queryFn: () => fetchCampaignInsights(id),
    enabled: !!id,
  });
};
