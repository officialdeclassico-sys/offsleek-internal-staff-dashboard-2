export type UserRole = 'support_agent' | 'support_lead' | 'support_manager';

export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type TicketStatus = 'Open' | 'In Progress' | 'Pending School' | 'Resolved' | 'Closed';

export type Category = 
  | 'Authentication'
  | 'Billing & Fees'
  | 'Admissions'
  | 'Biometrics & Attendance'
  | 'Gradebook & Exams'
  | 'Integration';

export interface Employee {
  id: string;
  name: string;
  role: string;
  roleKey: UserRole;
  email: string;
  avatarText: string;
  avatarBg?: string;
  status?: 'Available' | 'In Meeting' | 'Offline';
}

export interface School {
  id: string;
  name: string;
  initials: string;
  contactPerson: string;
  roleTitle: string;
  email: string;
  phone: string;
  location: string;
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url?: string;
}

export interface MessageSender {
  id: string;
  name: string;
  role: string;
  schoolName?: string;
  isAgent: boolean;
  avatarText: string;
  avatarColor: string;
}

export interface Message {
  id: string;
  ticketId: string;
  sender: MessageSender;
  timestamp: string;
  text: string;
  attachments?: Attachment[];
}

export interface InternalNote {
  id: string;
  ticketId: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
  timestamp: string;
  text: string;
  tags?: string[];
}

export interface TicketHistoryItem {
  id: string;
  action: string;
  timestamp: string;
  actor: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: Category;
  schoolId: string;
  school: School;
  reportedBy: string;
  createdOn: string;
  lastUpdated: string;
  priority: Priority;
  status: TicketStatus;
  assignedTo: Employee;
  messages: Message[];
  internalNotes: InternalNote[];
  history: TicketHistoryItem[];
}

export interface KBArticleStep {
  title: string;
  substeps: string[];
}

export interface KBArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  articleType: string;
  publishedOn: string;
  updatedAt: string;
  views: number;
  readTime: string;
  author: string;
  status: 'Published' | 'Draft' | 'Under Review';
  version: string;
  tags: string[];
  overview: string;
  symptoms: string[];
  possibleCauses: string[];
  steps: KBArticleStep[];
  relatedArticleIds?: string[];
  summary?: string;
  content?: string;
}

export interface ArticleUpdateSuggestion {
  id: string;
  articleId: string;
  articleTitle: string;
  submittedBy: string;
  employeeEmail: string;
  proposedCorrection: string;
  reason: string;
  status: 'Pending Review' | 'Approved' | 'Rejected';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  ticketId?: string;
  type: 'reply' | 'assign' | 'status' | 'sla';
}
