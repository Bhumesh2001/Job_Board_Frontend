import React, { useState } from "react";
import axios from "axios";
import { Card, Button, Modal, Form } from "react-bootstrap";
const REACT_APP_API_URL = "https://job-board-backend-three.vercel.app";

export default function JobCard({ job }) {
    const [showModal, setShowModal] = useState(false);
    const [resume, setResume] = useState(null);
    const [jobId, setJobId] = useState(null);

    const handleApply = () => {
        if (!job || !job._id) {
            alert("Job ID is missing!");
            return;
        }
        setJobId(job._id);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setJobId(null); // ✅ Reset job ID when closing modal
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resume) {
            alert("Please upload a resume");
            return;
        };

        if (!jobId) {
            alert("Job ID is required but missing!");
            return;
        };

        const formData = new FormData();
        formData.append("jobId", jobId);
        formData.append("resume", resume);

        try {
            const token = localStorage.getItem("token");
            await axios.post(`${REACT_APP_API_URL}/applications`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Application submitted successfully!");
            handleClose();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to submit application");
        }
    };

    return (
        <>
            <Card className="mb-4 shadow" style={{
                width: "100%",
                minHeight: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
                <Card.Body className="d-flex flex-column">
                    <div className="flex-grow-1">
                        <Card.Title>{job.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                        <Card.Text>{job.description}</Card.Text>
                    </div>
                    <Button variant="primary" className="mt-auto w-100" onClick={handleApply}>Apply Now</Button>
                </Card.Body>
            </Card>

            {/* Apply Modal */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Apply for {job.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Upload Resume</Form.Label>
                            <Form.Control type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResume(e.target.files[0])} required />
                        </Form.Group>
                        <Button variant="success" type="submit" className="w-100">Submit Application</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};
