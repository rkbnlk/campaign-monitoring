import { useState } from 'react';
import { useCampaigns } from '../hooks/useCampaigns';
import { useGlobalInsights } from '../hooks/useGlobalInsights';
import { Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';

export default function Dashboard() {
  const { data, isLoading, isError } = useCampaigns();
  const { data: insightsData } = useGlobalInsights();

  const [statusFilter, setStatusFilter] = useState('');

  // ✅ 1. Handle loading
  if (isLoading) {
    return <div className="p-6">Loading campaigns...</div>;
  }

  // ✅ 2. Handle error
  if (isError || !data) {
    return <div className="p-6 text-red-600">Failed to load campaigns</div>;
  }

  // ✅ 3. Safe access AFTER checks
  const campaigns = data.campaigns.filter((c: any) =>
    statusFilter ? c.status === statusFilter : true
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Campaign Dashboard</h1>

      {/* KPIs */}
      {insightsData && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>Total Campaigns: {insightsData.insights.total_campaigns}</div>
          <div>Active: {insightsData.insights.active_campaigns}</div>
          <div>Total Spend: ₹{insightsData.insights.total_spend}</div>
        </div>
      )}

      {/* Filter */}
      <select
        className="border p-2 mb-4"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="completed">Completed</option>
      </select>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Name</th>
            <th>Status</th>
            <th>Budget</th>
            <th>Platforms</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c: any) => (
            <tr key={c.id} className="border-b">
              <td className="p-2">
                <Link
                  to={`/campaign/${c.id}`}
                  className="text-blue-600 underline"
                >
                  {c.name}
                </Link>
              </td>
              <td>
                <StatusBadge status={c.status} />
              </td>
              <td>₹{c.budget}</td>
              <td>{c.platforms.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty state */}
      {campaigns.length === 0 && (
        <p className="mt-4 text-gray-500">No campaigns found.</p>
      )}
    </div>
  );
}
