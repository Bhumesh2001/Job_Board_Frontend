import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import JobCard from "../components/JobCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [jobs, setJobs] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/jobs")
            .then((res) => setJobs(res.data.data))
            .catch(console.error);

        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-center flex-grow-1">Job Board</h1>
                {isLoggedIn ? (
                    <Button variant="danger" onClick={handleLogout}>Logout</Button>
                ) : (
                    <div>
                        <Button variant="primary" className="me-2" onClick={() => navigate("/login")}>Login</Button>
                        <Button variant="success" onClick={() => navigate("/register")}>Sign Up</Button>
                    </div>
                )}
            </div>
            <Row>
                {jobs.map((job) => (
                    <Col md={4} key={job._id}>
                        <JobCard job={job} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
