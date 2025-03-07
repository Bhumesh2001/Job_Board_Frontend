import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, Tab, Tabs, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JobList from "../components/JobList";
import ApplicationList from "../components/ApplicationList";
import PostJobModal from "../components/PostJobModal";

export default function RecruiterDashboard() {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [showJobModal, setShowJobModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobs();
        fetchApplications();
    }, []);

    const fetchJobs = async () => {
        const token = localStorage.getItem("token_");
        const res = await axios.get("http://localhost:5000/jobs/my-jobs", {
            headers: { Authorization: `Bearer ${token}` }
        });
        setJobs(res.data.data);
    };

    const fetchApplications = async () => {
        const token = localStorage.getItem("token_");
        const res = await axios.get("http://localhost:5000/applications/view", {
            headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(res.data.data);
    };

    const handleLogout = () => {
        localStorage.removeItem("token_");
        localStorage.removeItem('role');
        navigate("/recruiter/login");
    };

    return (
        <Container>
            <Navbar bg="dark" variant="dark" expand="lg" className="my-3 p-3 rounded">
                <Navbar.Brand>Recruiter Dashboard</Navbar.Brand>
                <Nav className="ms-auto">
                    <Button variant="success" className="me-2 mb-lg-0 mb-2" onClick={() => setShowJobModal(true)}>Post a New Job</Button>
                    <Button variant="danger" onClick={handleLogout}>Logout</Button>
                </Nav>
            </Navbar>
            <Tabs defaultActiveKey="jobs" className="mb-3">
                <Tab eventKey="jobs" title="Posted Jobs">
                    <JobList jobs={jobs} fetchJobs={fetchJobs} />
                </Tab>
                <Tab eventKey="applications" title="View Applications">
                    <ApplicationList applications={applications} />
                </Tab>
            </Tabs>
            <PostJobModal show={showJobModal} handleClose={() => setShowJobModal(false)} fetchJobs={fetchJobs} />
        </Container>
    );
};
