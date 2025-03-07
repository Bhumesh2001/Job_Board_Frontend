import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

export default function PostJobModal({ show, handleClose, fetchJobs }) {
    const [newJob, setNewJob] = useState({ title: "", description: "", company: "", status: "Open" });
    const [error, setError] = useState("");

    const handlePostJob = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const token = localStorage.getItem("token_");
            await axios.post("http://localhost:5000/jobs", newJob, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchJobs();
            handleClose();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to post job");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Post a New Job</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handlePostJob}>
                    <Form.Group className="mb-3">
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control type="text" required onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control type="text" required onChange={(e) => setNewJob({ ...newJob, company: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Job Description</Form.Label>
                        <Form.Control as="textarea" required onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}>
                            <option value="Open">Open</option>
                            <option value="Closed">Closed</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="success" type="submit">Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
