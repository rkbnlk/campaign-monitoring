import { useQuery } from "@tanstack/react-query";
import { fetchCampaignById } from "../api/campaigns";

export const useCampaignById = (id: string) => {
  return useQuery({
    queryKey: ['campaign', id],
    queryFn: () => fetchCampaignById(id),
    enabled: !!id, // ✅ prevents API call when id is empty
  });
};
