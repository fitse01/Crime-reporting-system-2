import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PublicLayout, DashboardLayout } from './components/Layouts';

// Public Pages
import Home from './pages/public/Home';
import ReportCrime from './pages/public/ReportCrime';
import TrackReport from './pages/public/TrackReport';

// Dashboard Pages
import DashboardOverview from './pages/dashboard/DashboardOverview';
import ReportsList from './pages/dashboard/ReportsList';

// Placeholder Pages
const Notices = () => <div className="container mx-auto py-20 text-center text-2xl font-bold text-gray-400">Public Notices Page</div>;
const Blog = () => <div className="container mx-auto py-20 text-center text-2xl font-bold text-gray-400">Safety Blog Page</div>;
const Login = () => <div className="h-screen flex items-center justify-center bg-authBlue text-white">
  <div className="bg-white p-8 rounded-xl shadow-2xl w-96 text-gray-900">
    <h2 className="text-2xl font-bold mb-4 text-center text-authBlue">Staff Login</h2>
    <input className="w-full border p-2 rounded mb-4" placeholder="Badge ID" />
    <input className="w-full border p-2 rounded mb-6" type="password" placeholder="Password" />
    <a href="#/dashboard" className="block w-full bg-cyan-500 text-white text-center py-2 rounded font-bold hover:bg-cyan-600 transition">Login (Mock)</a>
  </div>
</div>;

// Route Wrapper Logic
const AppRoutes = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) {
    return (
      <DashboardLayout>
        <Routes>
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/dashboard/reports" element={<ReportsList />} />
          <Route path="/dashboard/officers" element={<div className="text-center py-10">Officers Management (Mock)</div>} />
          <Route path="/dashboard/map" element={<div className="text-center py-10">Live Map View (Mock)</div>} />
        </Routes>
      </DashboardLayout>
    );
  }

  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report/new" element={<ReportCrime />} />
        <Route path="/track" element={<TrackReport />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PublicLayout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;