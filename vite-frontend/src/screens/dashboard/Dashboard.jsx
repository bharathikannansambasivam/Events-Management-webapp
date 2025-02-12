import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Calendar = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://events-management-webapp.onrender.com/events",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API Response:", response.data);

        const formattedEvents = response.data.map((event) => ({
          title: event.title,
          start: `${event.date}T${event.time}`,
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);
  return (
    <div className="p-4">
      <Button variant="contained" onClick={() => navigate("/create-event")}>
        Create Event
      </Button>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
};

export default Calendar;
