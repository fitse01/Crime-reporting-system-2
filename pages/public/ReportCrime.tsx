import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Camera, AlertTriangle, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button, Input, Select, Textarea, Card } from '../../components/ui';
import { ApiService } from '../../services/mockApi';

const steps = [
  { id: 1, title: 'Type', icon: AlertTriangle },
  { id: 2, title: 'Details', icon: MapPin },
  { id: 3, title: 'Evidence', icon: Camera },
  { id: 4, title: 'Review', icon: CheckCircle },
];

const ReportCrime: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    date: '',
    address: '',
    isAnonymous: false,
    contact: ''
  });

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const report = await ApiService.createReport({
        type: formData.type,
        description: formData.description,
        location: { lat: 8.54, lng: 39.27, address: formData.address }, // Mock geocoding
        isAnonymous: formData.isAnonymous
      });
      navigate(`/track?newCase=${report.caseNumber}`);
    } catch (error) {
      alert("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-charcoal">File a Crime Report</h1>
        <p className="text-gray-500 mt-2">Help us keep Adama City safe. Please provide as much detail as possible.</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between relative mb-12 max-w-2xl mx-auto">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>
        <div className={`absolute top-1/2 left-0 h-1 bg-cyan-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out`} style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>
        
        {steps.map((step) => {
          const isActive = step.id <= currentStep;
          const isCurrent = step.id === currentStep;
          return (
            <div key={step.id} className="flex flex-col items-center bg-linen px-2">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'bg-gray-200 text-gray-400'}`}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className={`text-xs font-semibold mt-2 ${isCurrent ? 'text-cyan-600' : 'text-gray-400'}`}>{step.title}</span>
            </div>
          );
        })}
      </div>

      <Card className="p-6 md:p-10 shadow-xl bg-white">
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-bold border-b pb-4">Incident Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Select 
                label="Crime Type"
                options={[
                  { value: '', label: 'Select incident type...' },
                  { value: 'Theft', label: 'Theft / Burglary' },
                  { value: 'Assault', label: 'Assault / Violence' },
                  { value: 'Vandalism', label: 'Vandalism / Property Damage' },
                  { value: 'Suspicious', label: 'Suspicious Activity' },
                  { value: 'Traffic', label: 'Traffic Violation' },
                  { value: 'Other', label: 'Other' }
                ]}
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              />
               <Input 
                type="date" 
                label="Date & Time of Incident" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <strong>Emergency?</strong> If this is a life-threatening emergency or the crime is in progress, please call <strong>911</strong> immediately instead of using this form.
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-bold border-b pb-4">Location & Description</h2>
            <Textarea 
              label="Describe what happened" 
              placeholder="Please describe the incident in detail. Include descriptions of suspects, vehicles involved, etc."
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <Input 
                  placeholder="Enter address or landmark"
                  className="pl-10"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <div className="mt-3 h-48 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center text-gray-400">
                {/* Mock Map Placeholder */}
                <div className="text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <span className="text-sm">Map Preview (Mock)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-bold border-b pb-4">Evidence & Contact</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer bg-gray-50">
              <Camera className="h-10 w-10 mx-auto text-gray-400 mb-3" />
              <p className="text-sm font-medium text-gray-700">Drag and drop photos/videos here</p>
              <p className="text-xs text-gray-500 mt-1">Or click to browse (Max 10MB)</p>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Submit Anonymously?</label>
                <button 
                  onClick={() => setFormData({...formData, isAnonymous: !formData.isAnonymous})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.isAnonymous ? 'bg-cyan-500' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isAnonymous ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              
              {!formData.isAnonymous && (
                <div className="space-y-4 animate-fadeIn">
                  <Input 
                    label="Full Name" 
                    placeholder="John Doe"
                  />
                  <Input 
                    label="Phone / Email" 
                    placeholder="For updates on your case"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-bold border-b pb-4">Review Report</h2>
            
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 text-sm">
              <div className="col-span-1">
                <dt className="font-medium text-gray-500">Incident Type</dt>
                <dd className="mt-1 text-gray-900 font-semibold">{formData.type || 'N/A'}</dd>
              </div>
              <div className="col-span-1">
                <dt className="font-medium text-gray-500">Date</dt>
                <dd className="mt-1 text-gray-900 font-semibold">{formData.date || 'N/A'}</dd>
              </div>
              <div className="col-span-1 md:col-span-2">
                <dt className="font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-gray-900">{formData.address || 'N/A'}</dd>
              </div>
              <div className="col-span-1 md:col-span-2">
                <dt className="font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-gray-900 bg-gray-50 p-3 rounded border">{formData.description || 'N/A'}</dd>
              </div>
              <div className="col-span-1">
                <dt className="font-medium text-gray-500">Submission Mode</dt>
                <dd className="mt-1 text-gray-900">
                  {formData.isAnonymous ? <span className="text-red-600 font-bold">Anonymous</span> : <span className="text-green-600 font-bold">Named Contact</span>}
                </dd>
              </div>
            </dl>

            <div className="bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800 flex items-start gap-2">
               <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
               <p>By submitting this report, you attest that the information provided is true to the best of your knowledge. False reporting is a punishable offense.</p>
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="mt-10 flex justify-between pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={handlePrev} 
            disabled={currentStep === 1}
            className={currentStep === 1 ? 'invisible' : ''}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          {currentStep < 4 ? (
            <Button variant="primary" onClick={handleNext}>
              Next Step <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button variant="primary" className="bg-green-600 hover:bg-green-700" onClick={handleSubmit} isLoading={isSubmitting}>
              Submit Report
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ReportCrime;