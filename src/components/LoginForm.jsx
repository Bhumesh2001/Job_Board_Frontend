import React, { useState } from "react";
import axios from "../services/api";
import { Form, Button } from "react-bootstrap";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post("/auth/login", { email, password });                        
            localStorage.setItem("token", res.data.data.token);
            
            alert("Login Successful");
            window.location.href = "/";
        } catch (error) {
            alert("Login Failed");
        }
    };

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" className="w-100" onClick={handleLogin}>Login</Button>
        </Form>
    );
};
