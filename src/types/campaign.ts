export type CampaignStatus = 'active' | 'paused' | 'completed';

export interface Campaign {
  id: string;
  name: string;
  brand_id: string;
  status: CampaignStatus;
  budget: number;
  daily_budget: number;
  platforms: string[];
  created_at: string;
}

export interface CampaignInsight {
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;
  cpc: number;
  conversion_rate: number;
}
