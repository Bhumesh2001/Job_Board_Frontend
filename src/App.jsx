import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SecureRoute from "./components/SecureRoute";
import RecruiterDashboard from "./pages/Dashboard";
import RecruiterLogin from "./pages/RecruiterLogin";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recruiter/login" element={<RecruiterLogin />} />
        <Route path="/recruiter/dashboard" element={<SecureRoute><RecruiterDashboard /></SecureRoute>} />
      </Routes>
    </Router>
  );
};
