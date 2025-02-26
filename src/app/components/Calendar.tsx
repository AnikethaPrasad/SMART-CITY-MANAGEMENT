import React, { useState } from "react";
import { 
  format, startOfWeek, addDays, startOfMonth, endOfMonth, 
  isSameMonth, isSameDay, addWeeks, subWeeks, addMonths, subMonths 
} from "date-fns";

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  category: string;
}

const allEvents: Event[] = [
  { id: 1, name: "Tech Conference", date: "2025-03-15", location: "Hyderabad", category: "Technology" },
  { id: 2, name: "Startup Pitch Night", date: "2025-03-10", location: "Delhi", category: "Business" },
  { id: 2, name: "Startup Pitch Night", date: "2025-04-09", location: "Mumbai", category: "Business" },
  { id: 3, name: "AI & ML Summit", date: "2025-05-22", location: "Boston", category: "Technology" },
  { id: 4, name: "Blockchain Expo", date: "2025-06-05", location: "Bihar", category: "Finance" }
];

const categoryColors: { [key: string]: string } = {
  Technology: "bg-blue-500",
  Business: "bg-green-500",
  Finance: "bg-yellow-500"
};

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week">("month");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [rsvpEvents, setRsvpEvents] = useState<number[]>([]);

  // Adjust navigation based on the view
  const navigateNext = () => setSelectedDate(view === "month" ? addMonths(selectedDate, 1) : addWeeks(selectedDate, 1));
  const navigatePrev = () => setSelectedDate(view === "month" ? subMonths(selectedDate, 1) : subWeeks(selectedDate, 1));

  // Filtered events based on search & category
  const filteredEvents = allEvents.filter(event => 
    (!search || event.name.toLowerCase().includes(search.toLowerCase())) &&
    (!filterCategory || event.category === filterCategory)
  );

  const startWeek = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const startMonth = startOfMonth(selectedDate);
  const endMonthDate = endOfMonth(selectedDate);

  const handleRSVP = (eventId: number) => {
    if (!rsvpEvents.includes(eventId)) setRsvpEvents([...rsvpEvents, eventId]);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📅 Event Calendar</h2>

      {/* View & Navigation Controls */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <button className={`px-4 py-2 rounded-lg ${view === "month" ? "bg-blue-500 text-white" : "bg-gray-300"}`} onClick={() => setView("month")}>Monthly</button>
          <button className={`px-4 py-2 rounded-lg ml-2 ${view === "week" ? "bg-blue-500 text-white" : "bg-gray-300"}`} onClick={() => setView("week")}>Weekly</button>
        </div>
        <div>
          <button className="px-3 py-1 bg-gray-300 rounded-lg" onClick={navigatePrev}>⏮️</button>
          <span className="mx-4 font-semibold">{format(selectedDate, view === "month" ? "MMMM yyyy" : "MMMM d, yyyy")}</span>
          <button className="px-3 py-1 bg-gray-300 rounded-lg" onClick={navigateNext}>⏭️</button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex gap-4 mb-4">
        <input type="text" placeholder="🔍 Search events..." value={search} onChange={(e) => setSearch(e.target.value)} className="p-2 border rounded-lg w-full" />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="p-2 border rounded-lg">
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="text-center font-semibold">{format(addDays(startWeek, i), "EEE")}</div>
        ))}

        {Array.from({ length: view === "month" ? 42 : 7 }).map((_, i) => {
          const day = addDays(startWeek, i);
          const isCurrentMonth = isSameMonth(day, selectedDate);
          const eventsOnDay = filteredEvents.filter(event => isSameDay(new Date(event.date), day));

          return (
            <div key={i} className={`p-3 border rounded-lg ${isCurrentMonth ? "bg-white" : "bg-gray-200"}`}>
              <p className="text-sm">{format(day, "d")}</p>

              {eventsOnDay.map(event => (
                <div key={event.id} className={`text-xs mt-1 p-1 rounded-lg text-white ${categoryColors[event.category]}`}>
                  {event.name} {rsvpEvents.includes(event.id) && "✅"}
                  <button onClick={() => handleRSVP(event.id)} className="ml-1 text-xs px-1 py-0.5 bg-black rounded">RSVP</button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
