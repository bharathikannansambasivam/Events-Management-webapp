import React from "react";
import Home from "./screens/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./screens/signup/SignUp";
import Signin from "./screens/signin/Signin";
import Dashboard from "./screens/dashboard/Dashboard";
import CreateEvent from "./screens/event/CreateEvent";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-event" element={<CreateEvent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
