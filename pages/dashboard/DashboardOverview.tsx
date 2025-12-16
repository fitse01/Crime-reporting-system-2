import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, Badge, Button } from '../../components/ui';
import { ApiService } from '../../services/mockApi';
import { Report, ReportStatus, Priority } from '../../types';
import { AlertCircle, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  
  useEffect(() => {
    ApiService.getReports().then(setReports);
  }, []);

  // Calculate Stats
  const total = reports.length;
  const pending = reports.filter(r => r.status === ReportStatus.PENDING).length;
  const resolved = reports.filter(r => r.status === ReportStatus.RESOLVED).length;
  
  // Mock Chart Data
  const data = [
    { name: 'Mon', crimes: 4 },
    { name: 'Tue', crimes: 3 },
    { name: 'Wed', crimes: 2 },
    { name: 'Thu', crimes: 7 },
    { name: 'Fri', crimes: 5 },
    { name: 'Sat', crimes: 9 },
    { name: 'Sun', crimes: 6 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <Button variant="primary">Download Report</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border-l-4 border-l-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Cases</p>
              <h3 className="text-2xl font-bold mt-1">{total}</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 flex items-center">
            <span className="font-bold">+12%</span> <span className="text-gray-400 ml-1">from last month</span>
          </p>
        </Card>

        <Card className="p-6 border-l-4 border-l-red-500">
           <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Action</p>
              <h3 className="text-2xl font-bold mt-1">{pending}</h3>
            </div>
            <div className="p-2 bg-red-50 rounded-lg text-red-600">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-red-600 mt-2 font-medium">Requires attention</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-green-500">
           <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Resolved</p>
              <h3 className="text-2xl font-bold mt-1">{resolved}</h3>
            </div>
            <div className="p-2 bg-green-50 rounded-lg text-green-600">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">Good progress</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-yellow-500">
           <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Response</p>
              <h3 className="text-2xl font-bold mt-1">14m</h3>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">-2m from avg</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <Card className="p-6">
          <h3 className="font-bold mb-6">Weekly Crime Trends</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="crimes" fill="#00B5E2" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-0 overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="font-bold">Recent Reports</h3>
          </div>
          <div className="divide-y">
            {reports.slice(0, 5).map(report => (
              <div key={report.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                <div>
                  <div className="font-medium text-gray-900 flex items-center gap-2">
                    {report.type}
                    {report.priority === Priority.HIGH && <span className="h-2 w-2 rounded-full bg-red-500"></span>}
                  </div>
                  <div className="text-sm text-gray-500">{report.caseNumber} • {new Date(report.createdAt).toLocaleDateString()}</div>
                </div>
                <Badge variant={report.status === 'PENDING' ? 'warning' : 'success'}>
                  {report.status}
                </Badge>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 text-center">
            <Button variant="ghost" className="text-cyan-600">View All Reports</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;