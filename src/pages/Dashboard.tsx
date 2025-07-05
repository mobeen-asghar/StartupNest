import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import OverviewTab from '../components/dashboard/OverviewTab';
import RoadmapTab from '../components/dashboard/RoadmapTab';
import MetricsTab from '../components/dashboard/MetricsTab';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<OverviewTab />} />
        <Route path="/overview" element={<OverviewTab />} />
        <Route path="/roadmap" element={<RoadmapTab />} />
        <Route path="/metrics" element={<MetricsTab />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;