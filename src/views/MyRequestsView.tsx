import React from 'react';
import { RaiseRequestHeader } from '../components/RaiseRequestHeader';
import { RequestTypeCards } from '../components/RequestTypeCards';
import { MyRequestsTable } from '../components/MyRequestsTable';
import { RequestFormModal } from '../components/RequestFormModal';
import { RequestDetailModal } from '../components/RequestDetailModal';

export const MyRequestsView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header section with title, subtitle, and illustration */}
      <RaiseRequestHeader />

      {/* 5 Request-type cards arranged horizontally */}
      <RequestTypeCards />

      {/* Main My Requests Table with filters, tabs, search, and pagination */}
      <MyRequestsTable />

      {/* Interactive Modals */}
      <RequestFormModal />
      <RequestDetailModal />
    </div>
  );
};
