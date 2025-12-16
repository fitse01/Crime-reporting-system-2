import React, { useEffect, useState } from 'react';
import { Eye, Filter, MoreHorizontal, FileEdit } from 'lucide-react';
import { Button, Input, Card, Badge, Select } from '../../components/ui';
import { ApiService } from '../../services/mockApi';
import { Report } from '../../types';

const ReportsList: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await ApiService.getReports();
      setReports(data);
      setLoading(false);
    };
    load();
  }, []);

  const filteredReports = reports.filter(r => 
    r.type.toLowerCase().includes(filter.toLowerCase()) || 
    r.caseNumber.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Incident Reports</h1>
        <Button variant="primary">Create Manual Report</Button>
      </div>

      <Card className="p-4">
        <div className="flex gap-4 mb-4">
          <Input 
            placeholder="Search reports..." 
            className="max-w-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Case ID</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">Loading records...</td></tr>
              ) : filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{report.caseNumber}</td>
                  <td className="px-4 py-3">{report.type}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{report.location.address}</td>
                  <td className="px-4 py-3">
                    <Badge variant={report.priority === 'HIGH' ? 'danger' : report.priority === 'MEDIUM' ? 'warning' : 'default'}>
                      {report.priority}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${report.status === 'PENDING' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{new Date(report.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" className="h-8 w-8 p-0"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" className="h-8 w-8 p-0"><FileEdit className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ReportsList;