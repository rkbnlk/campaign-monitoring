const BASE_URL = 'https://mixo-fe-backend-task.vercel.app';

export const fetchCampaigns = async () => {
  const res = await fetch(`${BASE_URL}/campaigns`);
  return res.json();
};

export const fetchGlobalInsights = async () => {
  const res = await fetch(`${BASE_URL}/campaigns/insights`);
  return res.json();
};

export const fetchCampaignInsights = async (id: string) => {
  const res = await fetch(`${BASE_URL}/campaigns/${id}/insights`);
  return res.json();
};

export const fetchCampaignById = async (id: string) => {
  const res = await fetch(
    `${BASE_URL}/campaigns/${id}`
  );
  return res.json();
};

