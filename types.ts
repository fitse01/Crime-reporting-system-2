export enum Role {
  CITIZEN = 'CITIZEN',
  OFFICER = 'OFFICER',
  ADMIN = 'ADMIN'
}

export enum ReportStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  avatarUrl?: string;
}

export interface Report {
  id: string;
  caseNumber: string;
  type: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: ReportStatus;
  priority: Priority;
  createdAt: string;
  assignedOfficerId?: string;
  isAnonymous: boolean;
  evidenceCount: number;
}

export interface Notice {
  id: string;
  type: 'WANTED' | 'MISSING' | 'ALERT';
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  isPublished: boolean;
}

export interface StatMetric {
  label: string;
  value: string | number;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
}

export interface BlogSummary {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  date: string;
  author: string;
}