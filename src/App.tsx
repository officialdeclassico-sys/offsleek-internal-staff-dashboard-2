/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { SupportProvider, useSupport } from './context/SupportContext';
import { BreakProvider } from './context/BreakContext';
import { RequestProvider } from './context/RequestContext';
import { MeetingProvider } from './context/MeetingContext';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { TicketHeader } from './components/TicketHeader';
import { ConversationPanel } from './components/ConversationPanel';
import { TicketDetailsCard } from './components/TicketDetailsCard';
import { SchoolInfoCard } from './components/SchoolInfoCard';
import { QuickActionsCard } from './components/QuickActionsCard';
import { ReviewReplyModal } from './components/ReviewReplyModal';
import { ReassignModal } from './components/ReassignModal';
import { ResolveModal } from './components/ResolveModal';
import { ToastNotification } from './components/ToastNotification';
import { TeamQueueView } from './views/TeamQueueView';
import { AssignedTicketsView } from './views/AssignedTicketsView';
import { KnowledgeBaseView } from './views/KnowledgeBaseView';
import { ProfileSettingsView } from './views/ProfileSettingsView';
import { PunchBreakDashboard } from './views/PunchBreakDashboard';
import { KnowledgeBaseDetailView } from './views/KnowledgeBaseDetailView';
import { MyRequestsView } from './views/MyRequestsView';
import { MeetingsView } from './views/MeetingsView';
import { RosterView } from './views/RosterView';
import { AttendanceView } from './views/AttendanceView';
import { AttendanceProvider } from './context/AttendanceContext';

const WorkspaceContent: React.FC = () => {
  const { activeNav } = useSupport();

  return (
    <div className="flex-1 flex flex-col min-w-0 w-full bg-[#fafafa]">
      <TopNav />

      <main className="flex-1 p-6 md:p-8 w-full min-w-0">
        {/* Attendance Dashboard */}
        {activeNav === 'attendance' && <AttendanceView />}

        {/* Meetings Dashboard */}
        {activeNav === 'meetings' && <MeetingsView />}

        {/* Team Roster Dashboard */}
        {activeNav === 'roster' && <RosterView />}

        {/* Profile & Settings */}
        {activeNav === 'settings' && <ProfileSettingsView />}

        {/* My Requests Employee Dashboard */}
        {activeNav === 'my_requests' && <MyRequestsView />}

        {/* Knowledge Base Article Details Page */}
        {activeNav === 'knowledge_base' && <KnowledgeBaseDetailView />}

        {/* Punch Break Dashboard */}
        {activeNav === 'punch_break' && <PunchBreakDashboard />}

        {/* Support Ticket Details Dashboard */}
        {activeNav === 'dashboard' && (
          <div>
            <TicketHeader />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Central Conversation / Internal Notes (approx 8 columns on desktop) */}
              <div className="lg:col-span-8 min-w-0">
                <ConversationPanel />
              </div>

              {/* Right Information Cards (approx 4 columns on desktop) */}
              <div className="lg:col-span-4 space-y-4">
                <TicketDetailsCard />
                <SchoolInfoCard />
                <QuickActionsCard />
              </div>
            </div>
          </div>
        )}

        {activeNav === 'my_tickets' && <AssignedTicketsView />}
        {activeNav === 'team_queue' && <TeamQueueView />}
      </main>

      {/* Global Modals */}
      <ReviewReplyModal />
      <ReassignModal />
      <ResolveModal />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <SupportProvider>
        <AttendanceProvider>
          <BreakProvider>
            <RequestProvider>
              <MeetingProvider>
                <div className="flex min-h-screen w-full bg-white font-sans antialiased text-gray-900 selection:bg-black selection:text-white">
                  <Sidebar />
                  <WorkspaceContent />
                </div>
              </MeetingProvider>
            </RequestProvider>
          </BreakProvider>
        </AttendanceProvider>
      </SupportProvider>
    </AuthProvider>
  );
}
