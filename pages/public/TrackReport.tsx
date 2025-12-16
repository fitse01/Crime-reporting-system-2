import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, CheckCircle, Clock, FileText, User, AlertCircle } from 'lucide-react';
import { Button, Input, Card, Badge } from '../../components/ui';
import { ApiService } from '../../services/mockApi';
import { Report, ReportStatus } from '../../types';

const TrackReport: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [caseNumber, setCaseNumber] = useState(searchParams.get('newCase') || '');
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    if (!caseNumber.trim()) return;
    setLoading(true);
    setError('');
    setReport(null);
    try {
      const data = await ApiService.getReportByCaseNumber(caseNumber);
      if (data) {
        setReport(data);
      } else {
        setError('No report found with that case number.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-search if param exists (e.g. redirect from submit)
  useEffect(() => {
    if (searchParams.get('newCase')) {
      handleTrack();
    }
  }, []);

  const getStatusStep = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.PENDING: return 1;
      case ReportStatus.ASSIGNED: return 2;
      case ReportStatus.IN_PROGRESS: return 3;
      case ReportStatus.RESOLVED: return 4;
      case ReportStatus.CLOSED: return 5;
      default: return 0;
    }
  };

  const currentStep = report ? getStatusStep(report.status) : 0;

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-charcoal">Track Your Report</h1>
        <p className="text-gray-500 mt-2">Enter your Case Number to view the real-time status of your investigation.</p>
      </div>

      <Card className="p-8 shadow-md mb-10">
        <div className="flex flex-col md:flex-row gap-4">
          <Input 
            placeholder="Enter Case Number (e.g. CAS-2023-001)" 
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
            className="text-lg py-6"
          />
          <Button variant="primary" onClick={handleTrack} isLoading={loading} className="md:w-48 py-6 text-lg">
            Track <Search className="ml-2 h-5 w-5" />
          </Button>
        </div>
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" /> {error}
          </div>
        )}
      </Card>

      {report && (
        <div className="space-y-8 animate-fadeIn">
          {/* Status Timeline */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-lg font-bold mb-6">Investigation Progress</h3>
            <div className="relative flex justify-between">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-0 h-1 bg-green-500 -z-10 -translate-y-1/2 transition-all duration-700" style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>

              {[
                { label: 'Received', icon: FileText },
                { label: 'Assigned', icon: User },
                { label: 'In Progress', icon: Clock },
                { label: 'Resolved', icon: CheckCircle }
              ].map((step, idx) => {
                const stepNum = idx + 1;
                const isCompleted = stepNum <= currentStep;
                return (
                  <div key={idx} className="flex flex-col items-center bg-white px-2">
                     <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-300'}`}>
                       <step.icon className="h-4 w-4" />
                     </div>
                     <span className={`text-xs font-semibold mt-2 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`}>{step.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details Card */}
          <Card className="p-0 overflow-hidden shadow-lg">
             <div className="bg-authBlue p-6 text-white flex justify-between items-center">
               <div>
                 <div className="text-blue-200 text-sm font-medium">Case Number</div>
                 <div className="text-2xl font-bold tracking-wider">{report.caseNumber}</div>
               </div>
               <Badge variant={report.status === 'RESOLVED' ? 'success' : 'warning'}>{report.status}</Badge>
             </div>
             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Incident Type</h4>
                  <p className="text-lg font-semibold text-charcoal">{report.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Date Reported</h4>
                  <p className="text-lg font-semibold text-charcoal">{new Date(report.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-gray-500">Location</h4>
                  <p className="text-gray-800">{report.location.address}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-gray-500">Officer's Note</h4>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-200 italic">
                    {report.assignedOfficerId ? "Officer assigned and reviewing evidence. We may contact you for further details." : "Your report has been received and is pending review by the dispatch unit."}
                  </div>
                </div>
             </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TrackReport;