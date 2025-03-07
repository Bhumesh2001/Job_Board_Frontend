import React from "react";
import { Navigate } from "react-router-dom";

export default function SecureRoute({ children }) {
    const token = localStorage.getItem("token_");

    return token ? children : <Navigate to="/recruiter/login" />;
};
