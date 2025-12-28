import { useParams, Link } from 'react-router-dom';
import { useCampaignById } from '../hooks/useCampaignById';
import { useCampaignInsights } from '../hooks/useCampaignInsights';
import { useCampaignStream } from '../hooks/useCampaignStream';
import StatusBadge from '../components/StatusBadge';

export default function CampaignDetails() {
  const { id } = useParams<{ id: string }>();

  // ✅ Always call hooks
  const campaignQuery = useCampaignById(id ?? '');
  const insightsQuery = useCampaignInsights(id ?? '');
  const liveInsights = useCampaignStream(id ?? '');

  // ✅ Handle missing ID AFTER hooks
  if (!id) {
    return <div className="p-6 text-red-600">Invalid campaign ID</div>;
  }

  // Loading
  if (campaignQuery.isLoading || insightsQuery.isLoading) {
    return <div className="p-6">Loading campaign details...</div>;
  }

  // Error
  if (
    campaignQuery.isError ||
    insightsQuery.isError ||
    !campaignQuery.data ||
    !insightsQuery.data
  ) {
    return (
      <div className="p-6 text-red-600">
        Failed to load campaign data
      </div>
    );
  }

  const campaign = campaignQuery.data.campaign;
  const insights = liveInsights || insightsQuery.data.insights;

  return (
    <div className="p-6 space-y-6">
      <Link to="/" className="text-blue-600 underline">
        ← Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold">{campaign.name}</h1>
      <StatusBadge status={campaign.status} />

      <div className="grid grid-cols-2 gap-4 border p-4 rounded">
        <div>Platforms: {campaign.platforms.join(', ')}</div>
        <div>Budget: ₹{campaign.budget}</div>
        <div>Daily Budget: ₹{campaign.daily_budget}</div>
        <div>Created: {new Date(campaign.created_at).toLocaleDateString()}</div>
      </div>

      <div className="grid grid-cols-3 gap-4 border p-4 rounded">
        <div>Impressions: {insights.impressions}</div>
        <div>Clicks: {insights.clicks}</div>
        <div>CTR: {insights.ctr}%</div>
        <div>Conversions: {insights.conversions}</div>
        <div>Spend: ₹{insights.spend}</div>
        <div>Conversion Rate: {insights.conversion_rate}%</div>
      </div>

      {liveInsights && (
        <p className="text-green-600 text-sm">● Live updating</p>
      )}
    </div>
  );
}
