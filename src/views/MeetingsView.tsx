import React from 'react';
import { MeetingsHeroBanner } from '../components/meetings/MeetingsHeroBanner';
import { MeetingActionCards } from '../components/meetings/MeetingActionCards';
import { UpcomingMeetingsCard } from '../components/meetings/UpcomingMeetingsCard';
import { CalendarIntegrationCard } from '../components/meetings/CalendarIntegrationCard';
import { MyMeetingLinksCard } from '../components/meetings/MyMeetingLinksCard';
import { RecentMeetingsCard } from '../components/meetings/RecentMeetingsCard';
import { ScheduleMeetingModal } from '../components/meetings/ScheduleMeetingModal';
import { InstantMeetingModal } from '../components/meetings/InstantMeetingModal';
import { JoinWithCodeModal } from '../components/meetings/JoinWithCodeModal';
import { MeetingDetailsModal } from '../components/meetings/MeetingDetailsModal';
import { CalendarViewModal } from '../components/meetings/CalendarViewModal';
import { VideoRoomModal } from '../components/meetings/VideoRoomModal';

export const MeetingsView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* 1. Hero Banner */}
      <MeetingsHeroBanner />

      {/* 2. Three Primary Action Cards (Start, Schedule, Join) */}
      <MeetingActionCards />

      {/* 3. Main Dashboard Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: Upcoming Meetings + Calendar Integration */}
        <div className="lg:col-span-8 min-w-0">
          <UpcomingMeetingsCard />
          <CalendarIntegrationCard />
        </div>

        {/* Right column: My Meeting Links + Recent Meetings */}
        <div className="lg:col-span-4 min-w-0">
          <MyMeetingLinksCard />
          <RecentMeetingsCard />
        </div>
      </div>

      {/* 4. Interactive Modals & Call Rooms */}
      <ScheduleMeetingModal />
      <InstantMeetingModal />
      <JoinWithCodeModal />
      <MeetingDetailsModal />
      <CalendarViewModal />
      <VideoRoomModal />
    </div>
  );
};
