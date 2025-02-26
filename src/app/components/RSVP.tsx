import React, { useState } from "react";

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
}

const availableEvents: Event[] = [
  { id: 1, name: "Tech Conference 2025", date: "February 15, 2025", location: "Hyderabad" },
  { id: 2, name: "Yoga Health", date: "February 10, 2025", location: "Delhi" },
  { id: 3, name: "Arjit singh Music ", date: "February 22, 2025", location: "Coimbatore" },
  { id: 4, name: "Startup India", date: "February 5, 2025", location: "Waranagal" }
];

const RSVP: React.FC = () => {
  const [rsvpEvents, setRsvpEvents] = useState<Event[]>([]);

  // Handle RSVP action
  const handleRSVP = (event: Event) => {
    if (!rsvpEvents.some((rsvpEvent) => rsvpEvent.id === event.id)) {
      setRsvpEvents([...rsvpEvents, event]);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📅 RSVP to an Event</h2>

      {/* Available Events List */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">🎟 Available Events</h3>
        {availableEvents.length === 0 ? (
          <p className="text-gray-500">No events available.</p>
        ) : (
          <ul className="space-y-3">
            {availableEvents.map((event) => (
              <li key={event.id} className="flex justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-semibold">{event.name}</p>
                  <p className="text-sm text-gray-600">{event.date} - {event.location}</p>
                </div>
                <button
                  onClick={() => handleRSVP(event)}
                  disabled={rsvpEvents.some((rsvpEvent) => rsvpEvent.id === event.id)}
                  className={`px-3 py-1 rounded-lg ${
                    rsvpEvents.some((rsvpEvent) => rsvpEvent.id === event.id)
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {rsvpEvents.some((rsvpEvent) => rsvpEvent.id === event.id) ? "RSVP'd" : "RSVP"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* RSVP Confirmation List */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">✅ Your RSVP Events</h3>
        {rsvpEvents.length === 0 ? (
          <p className="text-gray-500">You haven't RSVP'd to any events yet.</p>
        ) : (
          <ul className="space-y-3">
            {rsvpEvents.map((event) => (
              <li key={event.id} className="p-3 border rounded-lg">
                <p className="font-semibold">{event.name}</p>
                <p className="text-sm text-gray-600">{event.date} - {event.location}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RSVP;
