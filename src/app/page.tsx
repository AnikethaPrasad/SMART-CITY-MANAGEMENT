"use client";

import { useState } from "react";
import Calendar from "./components/Calendar";
import RSVP from "./components/RSVP";
import SocialWall from "./components/SocialWall";
import Recommendation from "./components/Recommendation";
import CreateEvent from "./components/CreateEvent";

export default function Page() {
  const [events, setEvents] = useState<any[]>([]);

  // Function to handle new event creation
  const handleCreateEvent = (newEvent: any) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">🎉 Community Events</h1>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section - Calendar & Create Event */}
        <div className="md:col-span-1 space-y-6">
          <CreateEvent onCreateEvent={handleCreateEvent} />
          <Calendar />
        </div>

        {/* Middle Section - Social Wall */}
        <div className="md:col-span-1 space-y-6">
          <SocialWall />
        </div>

        {/* Right Section - RSVP & Recommendations */}
        <div className="md:col-span-1 space-y-6">
          <RSVP />
          <Recommendation events={events} />
        </div>
      </div>
    </div>
  );
}
