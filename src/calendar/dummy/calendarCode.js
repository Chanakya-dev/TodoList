import React, { useState } from "react";
import { generateMonthDates } from "./calendarUtils";
import "./Calendar.css";

// Sample events
const eventsData = [
  {
    title: "React Workshop",
    date: "2024-06-28",
    color: "#F8961E",
    topics: ["Components", "State Management", "Hooks"],
  },
  {
    title: "Python Bootcamp",
    date: "2024-07-10",
    color: "#4D96FF",
    topics: ["Syntax", "OOP", "Libraries"],
  },
  {
    title: "Project Deployment",
    date: "2024-08-05",
    color: "#6BCB77",
    topics: ["CI/CD Pipelines", "Docker", "Kubernetes"],
  },
];

// Months of the year
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CalendarCode = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Get current month and year
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-based index

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-container">
      <h1>Calendar Starting from {months[currentMonth]} {currentYear}</h1>
      {months.slice(currentMonth).map((month, monthIndex) => {
        const actualMonthIndex = currentMonth + monthIndex;
        const monthDates = generateMonthDates(currentYear, actualMonthIndex);

        // Group dates into weeks (7 days each)
        const weeks = [];
        let week = new Array(7).fill(null);
        monthDates.forEach((date) => {
          week[date.dayOfWeek] = date;
          if (date.dayOfWeek === 6 || date === monthDates[monthDates.length - 1]) {
            weeks.push(week);
            week = new Array(7).fill(null);
          }
        });

        return (
          <div key={month} className="month-section">
            <h2>
              {month} {currentYear}
            </h2>
            <table className="calendar-table">
              <thead>
                <tr>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weeks.map((week, index) => (
                  <tr key={index}>
                    {week.map((day, dayIndex) => (
                      <td key={dayIndex} className="calendar-cell">
                        {day ? (
                          <>
                            <div className="date-number">{day.date}</div>
                            {eventsData
                              .filter((event) => event.date === day.fullDate)
                              .map((event, idx) => (
                                <div
                                  key={idx}
                                  className="event"
                                  style={{ backgroundColor: event.color }}
                                  onClick={() => openModal(event)}
                                >
                                  {event.title}
                                </div>
                              ))}
                          </>
                        ) : null}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}


      {/* Modal for Event Details */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedEvent.title}</h2>
            <p>
              <strong>Date:</strong> {selectedEvent.date}
            </p>
            <p>
              <strong>Topics:</strong>
            </p>
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

export default CalendarCode;
