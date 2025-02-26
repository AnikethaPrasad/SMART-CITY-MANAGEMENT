"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface CreateEventProps {
  onCreateEvent: (event: any) => void;
}

export default function CreateEvent({ onCreateEvent }: CreateEventProps) {
  const [eventDetails, setEventDetails] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    category: "General",
    privacy: "Public",
    recurring: "None",
    coHosts: "",
  });

  const [qrCode, setQrCode] = useState<string | null>(null);
  const [draft, setDraft] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleSubmit = () => {
    if (!eventDetails.title || !eventDetails.date || !eventDetails.location) {
      alert("Please fill in all required fields.");
      return;
    }
    
    onCreateEvent(eventDetails);
    
    // Generate QR Code for the event
    setQrCode(`https://myevents.com/event/${eventDetails.title.replace(/\s+/g, "-")}`);
    
    alert("Event Created Successfully!");
    setEventDetails({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      category: "General",
      privacy: "Public",
      recurring: "None",
      coHosts: "",
    });
  };

  const handleSaveDraft = () => {
    setDraft(eventDetails);
    alert("Draft saved successfully!");
  };

  return (
    <div className="border p-6 rounded-lg bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-4">📅 Create a New Event</h2>
      
      {/* Event Title */}
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={eventDetails.title}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
        required
      />

      {/* Event Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          name="date"
          value={eventDetails.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="time"
          name="time"
          value={eventDetails.time}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Location */}
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={eventDetails.location}
        onChange={handleChange}
        className="w-full p-2 border rounded mt-2"
        required
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Event Description"
        value={eventDetails.description}
        onChange={handleChange}
        className="w-full p-2 border rounded mt-2"
      />

      {/* Category Dropdown */}
      <select
        name="category"
        value={eventDetails.category}
        onChange={handleChange}
        className="w-full p-2 border rounded mt-2"
      >
        <option value="General">General</option>
        <option value="Technology">Technology</option>
        <option value="Music">Music</option>
        <option value="Business">Business</option>
        <option value="Health">Health</option>
      </select>

      {/* Privacy Settings */}
      <div className="flex items-center gap-4 mt-2">
        <label className="text-gray-700">Privacy:</label>
        <label className="flex items-center gap-1">
          <input type="radio" name="privacy" value="Public" checked={eventDetails.privacy === "Public"} onChange={handleChange} />
          Public
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" name="privacy" value="Private" checked={eventDetails.privacy === "Private"} onChange={handleChange} />
          Private
        </label>
      </div>

      {/* Recurring Event */}
      <div className="mt-2">
        <label className="block text-gray-700">Recurring:</label>
        <select
          name="recurring"
          value={eventDetails.recurring}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="None">None</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      {/* Co-Hosts */}
      <input
        type="text"
        name="coHosts"
        placeholder="Co-Hosts (comma-separated emails)"
        value={eventDetails.coHosts}
        onChange={handleChange}
        className="w-full p-2 border rounded mt-2"
      />

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ✅ Create Event
        </button>
        <button onClick={handleSaveDraft} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          💾 Save Draft
        </button>
      </div>

      {/* QR Code Display */}
      {qrCode && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold">📌 Event QR Code</h3>
          <QRCodeCanvas value={qrCode} size={150} />
        </div>
      )}

      {/* Draft Preview */}
      {draft && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100">
          <h3 className="text-lg font-semibold">📝 Draft Preview</h3>
          <p><strong>Title:</strong> {draft.title}</p>
          <p><strong>Date:</strong> {draft.date}</p>
          <p><strong>Time:</strong> {draft.time}</p>
          <p><strong>Location:</strong> {draft.location}</p>
          <p><strong>Description:</strong> {draft.description}</p>
          <p><strong>Category:</strong> {draft.category}</p>
          <p><strong>Privacy:</strong> {draft.privacy}</p>
          <p><strong>Recurring:</strong> {draft.recurring}</p>
          <p><strong>Co-Hosts:</strong> {draft.coHosts}</p>
        </div>
      )}
    </div>
  );
}
