import React from "react";

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  privacy: string;
  recurring: boolean;
  coHosts: string[] | string; // Can be an array or a single string
}

interface RecommendationProps {
  events: Event[];
}

const Recommendation: React.FC<RecommendationProps> = ({ events }) => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🔍 Recommended Events
      </h2>
      {events.length === 0 ? (
        <p className="text-gray-500">No recommendations yet.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event, index) => {
            // Ensure coHosts is always treated as an array
            const coHostsArray = Array.isArray(event.coHosts)
              ? event.coHosts
              : event.coHosts
              ? [event.coHosts]
              : [];

            return (
              <div key={index} className="p-4 bg-white shadow-lg rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700">{event.title}</h3>
                <p className="text-gray-600">
                  📅 {event.date} | ⏰ {event.time} | 📍 {event.location}
                </p>
                <p className="text-gray-700">{event.description}</p>
                <p className="text-gray-500">
                  🎭 Category: {event.category} | 🔒 Privacy: {event.privacy}
                </p>
                <p className="text-gray-500">
                  🔁 Recurring: {event.recurring ? "Yes" : "No"}
                </p>
                <p className="text-gray-500">
                  👥 Co-Hosts: {coHostsArray.length > 0 ? coHostsArray.join(", ") : "No Co-Hosts"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Recommendation;
