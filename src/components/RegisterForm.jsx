import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "../services/api";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await axios.post("/auth/register", { name, email, password, role: "candidate" });
            alert("Registration Successful");
            window.location.href = "/login";
        } catch (error) {
            alert("Registration Failed");
        }
    };

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="success" className="w-100" onClick={handleRegister}>Sign Up</Button>
        </Form>
    );
};
