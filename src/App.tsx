import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CampaignDetails from './pages/CampaignDetails';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
