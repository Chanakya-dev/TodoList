import React, { useState } from "react";
import "./Calendar.css";

// Sample Calendar Data
const calendarData = [
  {
    id: 1,
    title: "Git / HTML, CSS",
    day: "Mon",
    time: "10:00 AM to 11:00 AM",
    color: "#6BCB77",
    topics: ["Introduction to Git", "HTML Basics", "CSS Selectors"],
  },
  {
    id: 2,
    title: "Python I",
    day: "Mon",
    time: "11:00 AM to 1:00 PM",
    color: "#4D96FF",
    topics: ["Python Syntax", "Data Types", "Loops and Conditionals"],
  },
  {
    id: 3,
    title: "React I",
    day: "Mon",
    time: "8:30 AM to 10:00 AM",
    color: "#F8961E",
    topics: ["JSX", "Components", "Props"],
  },
  {
    id: 4,
    title: "React II",
    day: "Wed",
    time: "8:30 AM to 10:00 AM",
    color: "#F8961E",
    topics: ["State Management", "Hooks", "Lifecycle Methods"],
  },
  {
    id: 5,
    title: "React IV",
    day: "Thu",
    time: "8:30 AM to 10:00 AM",
    color: "#F8961E",
    topics: ["Routing", "React Router", "Deployment"],
  },
];

const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null); // Store clicked event data

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Function to open event details in modal
  const openModal = (event) => {
    setSelectedEvent(event);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-container">
      <table className="calendar-table">
        <thead>
          <tr>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 4 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {days.map((day) => (
                <td key={day} className="calendar-cell">
                  {calendarData
                    .filter((item) => item.day === day)
                    .map((event) => (
                      <div
                        key={event.id}
                        className="event"
                        style={{ backgroundColor: event.color }}
                        onClick={() => openModal(event)}
                      >
                        <div className="event-title">{event.title}</div>
                        <div className="event-time">{event.time}</div>
                      </div>
                    ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Event Details */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedEvent.title}</h2>
            <p><strong>Time:</strong> {selectedEvent.time}</p>
            <p><strong>Topics to Cover:</strong></p>
            <ul>
              {selectedEvent.topics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
