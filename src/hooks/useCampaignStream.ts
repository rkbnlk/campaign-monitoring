import { useEffect, useState } from 'react';

export const useCampaignStream = (id: string) => {
  const [liveData, setLiveData] = useState<any>(null);

  useEffect(() => {
    const eventSource = new EventSource(
      `https://mixo-fe-backend-task.vercel.app/campaigns/${id}/insights/stream`
    );

    eventSource.onmessage = (event) => {
      setLiveData(JSON.parse(event.data));
    };

    return () => eventSource.close();
  }, [id]);

  return liveData;
};
