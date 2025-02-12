import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Dot from "../../components/Dot";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://bharathikannansambasivam-event.onrender.com/events",
        { title, date, time },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Event added successfully:", response.data);

      navigate("/dashboard");
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };
  return (
    <>
      <div>
        <Typography className="text-3xl p-5 absolute">
          <Link to="/">EventFusion</Link>
        </Typography>
      </div>
      <div className="w-screen flex justify-center items-center h-screen">
        <div className="border-2 border-black rounded-xl pb-16 px-10 flex flex-col justify-center w-1/3 items-center">
          <div>
            <Dot />
            <Typography className="text-3xl pb-5">Create Event</Typography>
          </div>
          <form onSubmit={handleSubmit} className="w-full flex gap-4 flex-col">
            <TextField
              label="Event Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <TextField
              label="Time"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
            <Button type="submit" variant="contained">
              + Add Event
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateEvent;
