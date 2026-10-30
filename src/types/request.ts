export type RequestCategory = 'Leave' | 'Salary Slip' | 'Document' | 'Access' | 'Other';

export type RequestStatus = 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Completed';

export interface RequestHistoryEntry {
  id: string;
  action: string;
  actor: string;
  role: string;
  timestamp: string;
  comment?: string;
}

export interface EmployeeRequest {
  id: string; // e.g. "REQ-2026-001"
  recordNumber: number;
  employeeId: string;
  employeeName: string;
  category: RequestCategory;
  requestType: string; // e.g. "Leave Request", "Salary Slip", etc.
  title: string; // e.g. "Casual Leave"
  description: string; // e.g. "2 days leave for personal work"
  submittedOn: string; // "12 Oct 2026"
  submittedTimestamp: number;
  monthKey: string; // "2026-10"
  requiredFor: string; // "14 Oct 2026" or "—"
  status: RequestStatus;
  remarks: string; // "Approved by HR", "Under review", etc.
  routedTo: string; // "HR Operations", "IT Support", "Finance & Payroll"
  details: {
    startDate?: string;
    endDate?: string;
    leaveType?: string;
    salaryMonth?: string;
    documentType?: string;
    toolRequested?: string;
    accessLevel?: string;
    duration?: string;
    attachmentName?: string;
    downloadUrl?: string;
  };
  history: RequestHistoryEntry[];
}

export interface NewRequestPayload {
  category: RequestCategory;
  title: string;
  description: string;
  requiredFor?: string;
  details: {
    startDate?: string;
    endDate?: string;
    leaveType?: string;
    salaryMonth?: string;
    documentType?: string;
    toolRequested?: string;
    accessLevel?: string;
    duration?: string;
    attachmentName?: string;
  };
}
