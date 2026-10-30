import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  EmployeeRequest,
  RequestCategory,
  RequestStatus,
  NewRequestPayload,
} from '../types/request';
import { INITIAL_REQUESTS } from '../data/requestData';
import { useSupport } from './SupportContext';

interface RequestContextType {
  requests: EmployeeRequest[];
  activeCategoryTab: 'All' | RequestCategory;
  setActiveCategoryTab: (tab: 'All' | RequestCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;

  // Pagination
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  filteredRequests: EmployeeRequest[];
  paginatedRequests: EmployeeRequest[];
  totalPages: number;

  // Category Counts
  categoryCounts: {
    All: number;
    Leave: number;
    'Salary Slip': number;
    Document: number;
    Access: number;
    Other: number;
  };

  // Create Modal
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  createModalCategory: RequestCategory;
  setCreateModalCategory: (cat: RequestCategory) => void;
  openCreateModal: (category: RequestCategory) => void;
  submitNewRequest: (payload: NewRequestPayload) => Promise<{ success: boolean; message: string; record?: EmployeeRequest }>;

  // View / Detail Modal
  viewedRequest: EmployeeRequest | null;
  setViewedRequest: (req: EmployeeRequest | null) => void;
  withdrawRequest: (requestId: string) => Promise<{ success: boolean; message: string }>;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

const STORAGE_KEY_REQUESTS = 'offsleek_employee_requests_v1';

export const RequestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser, showToast } = useSupport();

  const [requests, setRequests] = useState<EmployeeRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REQUESTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_REQUESTS;
  });

  const [activeCategoryTab, setActiveCategoryTab] = useState<'All' | RequestCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('2026-10');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // 6 rows per page matching screenshot: "Showing 1–6 of 12 requests"

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalCategory, setCreateModalCategory] = useState<RequestCategory>('Leave');
  const [viewedRequest, setViewedRequest] = useState<EmployeeRequest | null>(null);

  // Persist requests to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(requests));
    } catch {}
  }, [requests]);

  // Open modal for a category
  const openCreateModal = (category: RequestCategory) => {
    setCreateModalCategory(category);
    setIsCreateModalOpen(true);
  };

  // Filter requests
  const filteredRequests = requests.filter((r) => {
    // Only requests for the logged-in employee
    if (r.employeeId !== currentUser.id) return false;

    // Category filter
    if (activeCategoryTab !== 'All' && r.category !== activeCategoryTab) return false;

    // Month filter
    if (selectedMonth !== 'All' && r.monthKey !== selectedMonth) return false;

    // Status filter
    if (selectedStatus !== 'All' && r.status !== selectedStatus) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchId = r.id.toLowerCase().includes(q);
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchDesc = r.description.toLowerCase().includes(q);
      const matchType = r.requestType.toLowerCase().includes(q);
      const matchRemarks = r.remarks.toLowerCase().includes(q);
      if (!matchId && !matchTitle && !matchDesc && !matchType && !matchRemarks) return false;
    }

    return true;
  });

  // Reset page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategoryTab, selectedMonth, selectedStatus, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + pageSize);

  // Category counts based on current month/search
  const baseUserRequests = requests.filter((r) => r.employeeId === currentUser.id);
  const categoryCounts = {
    All: baseUserRequests.length,
    Leave: baseUserRequests.filter((r) => r.category === 'Leave').length,
    'Salary Slip': baseUserRequests.filter((r) => r.category === 'Salary Slip').length,
    Document: baseUserRequests.filter((r) => r.category === 'Document').length,
    Access: baseUserRequests.filter((r) => r.category === 'Access').length,
    Other: baseUserRequests.filter((r) => r.category === 'Other').length,
  };

  // Submit new request
  const submitNewRequest = async (
    payload: NewRequestPayload
  ): Promise<{ success: boolean; message: string; record?: EmployeeRequest }> => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthStr = months[now.getMonth()];
    const year = now.getFullYear();
    const dateFormatted = `${day} ${monthStr} ${year}`;
    const monthKey = `${year}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const timeFormatted = `${hours < 10 ? '0' + hours : hours}:${minutes} ${ampm}`;

    // Generate unique ID e.g. REQ-2026-013
    const nextSeq = requests.length + 1;
    const nextSeqStr = nextSeq < 10 ? `00${nextSeq}` : nextSeq < 100 ? `0${nextSeq}` : `${nextSeq}`;
    const uniqueId = `REQ-${year}-${nextSeqStr}`;

    // Determine routing team
    let routedTo = 'HR Operations';
    if (payload.category === 'Access') routedTo = 'IT Infrastructure & Security';
    if (payload.category === 'Salary Slip') routedTo = 'Finance & Payroll';
    if (payload.category === 'Other') routedTo = 'HR Operations & Facilities';

    const newRecord: EmployeeRequest = {
      id: uniqueId,
      recordNumber: requests.length + 1,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      category: payload.category,
      requestType: `${payload.category} Request`,
      title: payload.title,
      description: payload.description,
      submittedOn: dateFormatted,
      submittedTimestamp: now.getTime(),
      monthKey,
      requiredFor: payload.requiredFor || '—',
      status: 'Pending',
      remarks: 'Under review',
      routedTo,
      details: payload.details,
      history: [
        {
          id: `h-${Date.now()}`,
          action: 'Request Submitted',
          actor: currentUser.name,
          role: currentUser.role,
          timestamp: `${dateFormatted}, ${timeFormatted}`,
          comment: `Submitted into ${routedTo} queue.`,
        },
      ],
    };

    setRequests((prev) => [newRecord, ...prev]);
    setIsCreateModalOpen(false);
    showToast(`Request ${uniqueId} submitted successfully to ${routedTo}`, 'success');
    return { success: true, message: 'Request submitted', record: newRecord };
  };

  // Withdraw / Cancel a pending request
  const withdrawRequest = async (requestId: string): Promise<{ success: boolean; message: string }> => {
    const target = requests.find((r) => r.id === requestId);
    if (!target) {
      return { success: false, message: 'Request not found.' };
    }
    if (target.status !== 'Pending') {
      const msg = `Cannot withdraw request with status "${target.status}". Only Pending requests can be withdrawn.`;
      showToast(msg, 'error');
      return { success: false, message: msg };
    }

    const now = new Date();
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== requestId) return r;
        return {
          ...r,
          status: 'Rejected',
          remarks: 'Withdrawn by Employee',
          history: [
            ...r.history,
            {
              id: `h-${Date.now()}`,
              action: 'Withdrawn by Employee',
              actor: currentUser.name,
              role: currentUser.role,
              timestamp: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
              comment: 'Request cancelled prior to reviewer evaluation.',
            },
          ],
        };
      })
    );

    showToast(`Request ${requestId} withdrawn`, 'info');
    return { success: true, message: 'Request withdrawn' };
  };

  return (
    <RequestContext.Provider
      value={{
        requests,
        activeCategoryTab,
        setActiveCategoryTab,
        searchQuery,
        setSearchQuery,
        selectedMonth,
        setSelectedMonth,
        selectedStatus,
        setSelectedStatus,
        currentPage,
        setCurrentPage,
        pageSize,
        filteredRequests,
        paginatedRequests,
        totalPages,
        categoryCounts,
        isCreateModalOpen,
        setIsCreateModalOpen,
        createModalCategory,
        setCreateModalCategory,
        openCreateModal,
        submitNewRequest,
        viewedRequest,
        setViewedRequest,
        withdrawRequest,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequest = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequest must be used within a RequestProvider');
  }
  return context;
};
