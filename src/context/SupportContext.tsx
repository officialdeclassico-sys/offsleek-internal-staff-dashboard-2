import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Ticket,
  Employee,
  Attachment,
  TicketStatus,
  Priority,
  NotificationItem,
  UserRole,
  KBArticle,
  ArticleUpdateSuggestion,
} from '../types/support';
import {
  INITIAL_TICKETS,
  CURRENT_EMPLOYEE,
  SUPPORT_TEAM_MEMBERS,
  INITIAL_NOTIFICATIONS,
  KNOWLEDGE_BASE_ARTICLES,
} from '../data/mockData';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface SupportContextType {
  currentUser: Employee;
  setCurrentUser: (emp: Employee) => void;
  teamMembers: Employee[];
  switchUserRole: (roleKey: UserRole) => void;
  isAuthorizedForTeamQueue: boolean;
  
  tickets: Ticket[];
  selectedTicketId: string;
  selectedTicket: Ticket;
  selectTicket: (ticketId: string) => void;
  
  activeNav: string;
  setActiveNav: (nav: string) => void;
  
  activeConversationTab: 'conversation' | 'internal_notes';
  setActiveConversationTab: (tab: 'conversation' | 'internal_notes') => void;
  
  // Draft states (preserved across tab switching)
  replyDraft: string;
  setReplyDraft: (text: string) => void;
  replyAttachments: Attachment[];
  setReplyAttachments: React.Dispatch<React.SetStateAction<Attachment[]>>;
  
  internalNoteDraft: string;
  setInternalNoteDraft: (text: string) => void;
  
  // Search & Notifications
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  notifications: NotificationItem[];
  unreadCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Review Reply Modal state
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;
  
  // Reassign Modal state
  isReassignModalOpen: boolean;
  setIsReassignModalOpen: (open: boolean) => void;
  
  // Resolve Confirmation Modal state
  isResolveModalOpen: boolean;
  setIsResolveModalOpen: (open: boolean) => void;
  
  // Toast notifications
  toast: Toast | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  
  // Ticket Actions
  sendReply: (ticketId: string, text: string, attachments?: Attachment[]) => Promise<{ success: boolean; error?: string }>;
  addInternalNote: (ticketId: string, text: string) => Promise<{ success: boolean; error?: string }>;
  updateTicketStatus: (ticketId: string, status: TicketStatus) => Promise<{ success: boolean; error?: string }>;
  updateTicketPriority: (ticketId: string, priority: Priority) => Promise<{ success: boolean; error?: string }>;
  reassignTicket: (ticketId: string, employeeId: string, reason?: string) => Promise<{ success: boolean; error?: string }>;
  resolveTicket: (ticketId: string, resolutionSummary?: string) => Promise<{ success: boolean; error?: string }>;

  // Knowledge Base State & Operations
  articles: KBArticle[];
  selectedArticleId: string;
  selectedArticle: KBArticle;
  selectArticle: (articleId: string) => void;
  copyArticleSolutionToReply: (article: KBArticle, mode?: 'append' | 'replace') => boolean;
  suggestions: ArticleUpdateSuggestion[];
  submitArticleUpdateSuggestion: (articleId: string, proposedCorrection: string, reason: string) => Promise<boolean>;
  isSuggestUpdateModalOpen: boolean;
  setIsSuggestUpdateModalOpen: (open: boolean) => void;
  isCopyChoiceModalOpen: boolean;
  setIsCopyChoiceModalOpen: (open: boolean) => void;
}

const SupportContext = createContext<SupportContextType | undefined>(undefined);

const STORAGE_KEY_TICKETS = 'offsleek_support_tickets_v1';
const STORAGE_KEY_USER = 'offsleek_current_user_v1';

export const SupportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load tickets from localStorage or fallback to initial
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TICKETS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_TICKETS;
  });

  // Current Employee & Role
  const [currentUser, setCurrentUser] = useState<Employee>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return CURRENT_EMPLOYEE;
  });

  const [selectedTicketId, setSelectedTicketId] = useState<string>('ISS #1023');
  const [activeNav, setActiveNav] = useState<string>('attendance');
  const [activeConversationTab, setActiveConversationTab] = useState<'conversation' | 'internal_notes'>('conversation');

  // Knowledge Base State
  const [articles, setArticles] = useState<KBArticle[]>(() => {
    try {
      const saved = localStorage.getItem('offsleek_kb_articles_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return KNOWLEDGE_BASE_ARTICLES;
  });

  const [selectedArticleId, setSelectedArticleId] = useState<string>('kb-login-troubleshoot');
  const [suggestions, setSuggestions] = useState<ArticleUpdateSuggestion[]>(() => {
    try {
      const saved = localStorage.getItem('offsleek_kb_suggestions_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [isSuggestUpdateModalOpen, setIsSuggestUpdateModalOpen] = useState<boolean>(false);
  const [isCopyChoiceModalOpen, setIsCopyChoiceModalOpen] = useState<boolean>(false);

  // Save articles & suggestions
  useEffect(() => {
    try {
      localStorage.setItem('offsleek_kb_articles_v1', JSON.stringify(articles));
    } catch {}
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem('offsleek_kb_suggestions_v1', JSON.stringify(suggestions));
    } catch {}
  }, [suggestions]);

  // Select article & increment views
  const selectArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setArticles((prev) =>
      prev.map((a) => (a.id === articleId ? { ...a, views: (a.views || 0) + 1 } : a))
    );
  };

  const selectedArticle =
    articles.find((a) => a.id === selectedArticleId) || articles[0];

  // Copy Solution to Reply Composer
  const copyArticleSolutionToReply = (article: KBArticle, mode: 'append' | 'replace' = 'replace') => {
    const stepsFormatted = article.steps
      ? article.steps
          .map((s, idx) => {
            const sub = s.substeps.map((ss) => `   - ${ss}`).join('\n');
            return `${idx + 1}. ${s.title}\n${sub}`;
          })
          .join('\n\n')
      : article.content || '';

    const formattedSolution = `Hello,\n\nPlease follow our recommended troubleshooting steps to resolve this login issue:\n\n${stepsFormatted}\n\nPlease let us know if you need any additional assistance.\n\nWarm regards,\n${currentUser.name}\nOFFSLEEK Support Team`;

    if (mode === 'append' && replyDraft.trim()) {
      setReplyDraft(replyDraft + '\n\n' + formattedSolution);
    } else {
      setReplyDraft(formattedSolution);
    }

    showToast('Approved troubleshooting steps copied to reply composer', 'success');
    return true;
  };

  // Submit Suggestion (Kept strictly separate from published article)
  const submitArticleUpdateSuggestion = async (
    articleId: string,
    proposedCorrection: string,
    reason: string
  ): Promise<boolean> => {
    const newSuggestion: ArticleUpdateSuggestion = {
      id: `sug-${Date.now()}`,
      articleId,
      articleTitle: selectedArticle.title,
      submittedBy: currentUser.name,
      employeeEmail: currentUser.email,
      proposedCorrection,
      reason,
      status: 'Pending Review',
      createdAt: formatTimestamp(),
    };

    setSuggestions((prev) => [newSuggestion, ...prev]);
    showToast('Update suggestion submitted for editorial review', 'success');
    return true;
  };

  // Draft states
  const [replyDraft, setReplyDraft] = useState<string>('');
  const [replyAttachments, setReplyAttachments] = useState<Attachment[]>([]);
  const [internalNoteDraft, setInternalNoteDraft] = useState<string>('');

  // Modals
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState<boolean>(false);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState<boolean>(false);

  // Search & Notifications
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Toast
  const [toast, setToast] = useState<Toast | null>(null);

  // Save tickets to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(tickets));
    } catch {
      // storage unavailable
    }
  }, [tickets]);

  // Save user to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    } catch {
      // storage unavailable
    }
  }, [currentUser]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4000);
  };

  const isAuthorizedForTeamQueue = currentUser.roleKey === 'support_lead' || currentUser.roleKey === 'support_manager';

  const switchUserRole = (roleKey: UserRole) => {
    let newRoleTitle = 'Support Agent';
    if (roleKey === 'support_lead') newRoleTitle = 'Technical Support Lead';
    if (roleKey === 'support_manager') newRoleTitle = 'Support Operations Manager';

    const updatedUser: Employee = {
      ...currentUser,
      roleKey,
      role: newRoleTitle,
    };
    setCurrentUser(updatedUser);
    showToast(`Role switched to ${newRoleTitle}`, 'info');
  };

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  const selectTicket = (id: string) => {
    setSelectedTicketId(id);
    setActiveNav('dashboard');
  };

  const formatTimestamp = () => {
    const now = new Date();
    const day = now.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
  };

  // Reply Sender
  const sendReply = async (
    ticketId: string,
    text: string,
    attachments?: Attachment[]
  ): Promise<{ success: boolean; error?: string }> => {
    // Validation
    const trimmed = text.trim();
    if (!trimmed && (!attachments || attachments.length === 0)) {
      return { success: false, error: 'Reply cannot be empty. Please enter text or attach a file.' };
    }

    const timestamp = formatTimestamp();

    const newMessage = {
      id: `msg-${Date.now()}`,
      ticketId,
      sender: {
        id: currentUser.id,
        name: `${currentUser.name} (You)`,
        role: 'Support Team',
        schoolName: 'Support Team',
        isAgent: true,
        avatarText: currentUser.avatarText,
        avatarColor: 'bg-slate-200 text-slate-800',
      },
      timestamp,
      text: trimmed,
      attachments: attachments && attachments.length > 0 ? attachments : undefined,
    };

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        return {
          ...t,
          lastUpdated: timestamp,
          messages: [...t.messages, newMessage],
          history: [
            ...t.history,
            {
              id: `hist-${Date.now()}`,
              action: `Reply sent by ${currentUser.name}`,
              timestamp,
              actor: currentUser.name,
            },
          ],
        };
      })
    );

    // Clear sent draft
    setReplyDraft('');
    setReplyAttachments([]);

    showToast('Reply successfully sent to school', 'success');
    return { success: true };
  };

  // Add Internal Note
  const addInternalNote = async (ticketId: string, text: string): Promise<{ success: boolean; error?: string }> => {
    const trimmed = text.trim();
    if (!trimmed) {
      return { success: false, error: 'Internal note cannot be empty.' };
    }

    const timestamp = formatTimestamp();
    const newNote = {
      id: `note-${Date.now()}`,
      ticketId,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        role: currentUser.role,
      },
      timestamp,
      text: trimmed,
      tags: ['Internal', 'Support Note'],
    };

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        return {
          ...t,
          lastUpdated: timestamp,
          internalNotes: [...t.internalNotes, newNote],
          history: [
            ...t.history,
            {
              id: `hist-${Date.now()}`,
              action: `Internal note recorded by ${currentUser.name}`,
              timestamp,
              actor: currentUser.name,
            },
          ],
        };
      })
    );

    setInternalNoteDraft('');
    showToast('Internal note saved successfully', 'success');
    return { success: true };
  };

  // Update Status
  const updateTicketStatus = async (ticketId: string, status: TicketStatus): Promise<{ success: boolean; error?: string }> => {
    const timestamp = formatTimestamp();
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        return {
          ...t,
          status,
          lastUpdated: timestamp,
          history: [
            ...t.history,
            {
              id: `hist-${Date.now()}`,
              action: `Status changed to ${status}`,
              timestamp,
              actor: currentUser.name,
            },
          ],
        };
      })
    );
    showToast(`Ticket status updated to "${status}"`, 'success');
    return { success: true };
  };

  // Update Priority
  const updateTicketPriority = async (ticketId: string, priority: Priority): Promise<{ success: boolean; error?: string }> => {
    const timestamp = formatTimestamp();
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        return {
          ...t,
          priority,
          lastUpdated: timestamp,
          history: [
            ...t.history,
            {
              id: `hist-${Date.now()}`,
              action: `Priority modified to ${priority}`,
              timestamp,
              actor: currentUser.name,
            },
          ],
        };
      })
    );
    showToast(`Priority changed to "${priority}"`, 'success');
    return { success: true };
  };

  // Reassign Ticket
  const reassignTicket = async (ticketId: string, employeeId: string, reason?: string): Promise<{ success: boolean; error?: string }> => {
    const targetEmp = SUPPORT_TEAM_MEMBERS.find((m) => m.id === employeeId);
    if (!targetEmp) {
      return { success: false, error: 'Selected employee not found.' };
    }

    const timestamp = formatTimestamp();
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        const newHist = [
          ...t.history,
          {
            id: `hist-${Date.now()}`,
            action: `Ticket reassigned to ${targetEmp.name}${reason ? ` (${reason})` : ''}`,
            timestamp,
            actor: currentUser.name,
          },
        ];
        return {
          ...t,
          assignedTo: targetEmp,
          lastUpdated: timestamp,
          history: newHist,
        };
      })
    );

    showToast(`Ticket reassigned to ${targetEmp.name}`, 'success');
    return { success: true };
  };

  // Resolve Ticket
  const resolveTicket = async (ticketId: string, resolutionSummary?: string): Promise<{ success: boolean; error?: string }> => {
    const timestamp = formatTimestamp();
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        const newNotes = resolutionSummary
          ? [
              ...t.internalNotes,
              {
                id: `note-${Date.now()}`,
                ticketId,
                author: {
                  id: currentUser.id,
                  name: currentUser.name,
                  role: currentUser.role,
                },
                timestamp,
                text: `[Resolution Summary]: ${resolutionSummary}`,
                tags: ['Resolution'],
              },
            ]
          : t.internalNotes;

        return {
          ...t,
          status: 'Resolved',
          lastUpdated: timestamp,
          internalNotes: newNotes,
          history: [
            ...t.history,
            {
              id: `hist-${Date.now()}`,
              action: `Ticket resolved by ${currentUser.name}`,
              timestamp,
              actor: currentUser.name,
            },
          ],
        };
      })
    );

    showToast(`Ticket ${ticketId} resolved successfully`, 'success');
    return { success: true };
  };

  // Notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  return (
    <SupportContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        teamMembers: SUPPORT_TEAM_MEMBERS,
        switchUserRole,
        isAuthorizedForTeamQueue,
        tickets,
        selectedTicketId,
        selectedTicket,
        selectTicket,
        activeNav,
        setActiveNav,
        activeConversationTab,
        setActiveConversationTab,
        replyDraft,
        setReplyDraft,
        replyAttachments,
        setReplyAttachments,
        internalNoteDraft,
        setInternalNoteDraft,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        notifications,
        unreadCount,
        markNotificationRead,
        markAllNotificationsRead,
        isReviewModalOpen,
        setIsReviewModalOpen,
        isReassignModalOpen,
        setIsReassignModalOpen,
        isResolveModalOpen,
        setIsResolveModalOpen,
        toast,
        showToast,
        sendReply,
        addInternalNote,
        updateTicketStatus,
        updateTicketPriority,
        reassignTicket,
        resolveTicket,
        articles,
        selectedArticleId,
        selectedArticle,
        selectArticle,
        copyArticleSolutionToReply,
        suggestions,
        submitArticleUpdateSuggestion,
        isSuggestUpdateModalOpen,
        setIsSuggestUpdateModalOpen,
        isCopyChoiceModalOpen,
        setIsCopyChoiceModalOpen,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
};

export const useSupport = () => {
  const context = useContext(SupportContext);
  if (!context) {
    throw new Error('useSupport must be used within a SupportProvider');
  }
  return context;
};
