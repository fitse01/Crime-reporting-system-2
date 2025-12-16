import { Report, ReportStatus, Priority, Notice, BlogSummary } from '../types';

const MOCK_REPORTS: Report[] = [
  {
    id: '1',
    caseNumber: 'CAS-2023-001',
    type: 'Theft',
    description: 'Stolen bicycle from downtown rack.',
    location: { lat: 8.54, lng: 39.27, address: 'Main St & 2nd Ave' },
    status: ReportStatus.PENDING,
    priority: Priority.LOW,
    createdAt: '2023-10-25T10:00:00Z',
    isAnonymous: false,
    evidenceCount: 2
  },
  {
    id: '2',
    caseNumber: 'CAS-2023-002',
    type: 'Assault',
    description: 'Physical altercation outside a bar.',
    location: { lat: 8.55, lng: 39.28, address: 'Nightclub District' },
    status: ReportStatus.ASSIGNED,
    priority: Priority.HIGH,
    createdAt: '2023-10-26T01:30:00Z',
    assignedOfficerId: 'OFF-101',
    isAnonymous: true,
    evidenceCount: 1
  },
  {
    id: '3',
    caseNumber: 'CAS-2023-003',
    type: 'Vandalism',
    description: 'Graffiti on public library wall.',
    location: { lat: 8.545, lng: 39.275, address: 'Public Library' },
    status: ReportStatus.RESOLVED,
    priority: Priority.MEDIUM,
    createdAt: '2023-10-24T14:15:00Z',
    assignedOfficerId: 'OFF-102',
    isAnonymous: false,
    evidenceCount: 4
  }
];

const MOCK_NOTICES: Notice[] = [
  {
    id: '1',
    type: 'WANTED',
    title: 'Suspect in Robbery Case',
    description: 'Male, approx 30 years old, last seen wearing a red hoodie.',
    imageUrl: 'https://picsum.photos/300/200?random=1',
    date: '2023-10-27',
    isPublished: true
  },
  {
    id: '2',
    type: 'ALERT',
    title: 'Severe Weather Warning',
    description: 'Heavy rains expected in the northern district. Please drive safely.',
    imageUrl: 'https://picsum.photos/300/200?random=2',
    date: '2023-10-28',
    isPublished: true
  }
];

const MOCK_BLOGS: BlogSummary[] = [
  {
    id: '1',
    title: 'Community Safety Tips',
    summary: 'How to keep your neighborhood safe through community watch programs.',
    imageUrl: 'https://picsum.photos/400/250?random=3',
    date: '2023-10-20',
    author: 'Chief of Police'
  },
  {
    id: '2',
    title: 'Cybercrime Awareness',
    summary: 'Protecting your personal information online.',
    imageUrl: 'https://picsum.photos/400/250?random=4',
    date: '2023-10-22',
    author: 'Cyber Unit'
  }
];

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ApiService = {
  getReports: async (): Promise<Report[]> => {
    await delay(800);
    return [...MOCK_REPORTS];
  },
  
  getReportByCaseNumber: async (caseNumber: string): Promise<Report | undefined> => {
    await delay(1000);
    return MOCK_REPORTS.find(r => r.caseNumber === caseNumber);
  },

  createReport: async (reportData: Partial<Report>): Promise<Report> => {
    await delay(1500);
    const newReport: Report = {
      id: Math.random().toString(36).substr(2, 9),
      caseNumber: `CAS-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
      type: reportData.type || 'Other',
      description: reportData.description || '',
      location: reportData.location || { lat: 0, lng: 0, address: 'Unknown' },
      status: ReportStatus.PENDING,
      priority: Priority.MEDIUM,
      createdAt: new Date().toISOString(),
      isAnonymous: !!reportData.isAnonymous,
      evidenceCount: 0
    };
    MOCK_REPORTS.push(newReport);
    return newReport;
  },

  getNotices: async (): Promise<Notice[]> => {
    await delay(600);
    return [...MOCK_NOTICES];
  },

  getBlogs: async (): Promise<BlogSummary[]> => {
    await delay(600);
    return [...MOCK_BLOGS];
  }
};