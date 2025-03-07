import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JobList({ jobs, fetchJobs }) {
    const [showModal, setShowModal] = useState(false);
    const [editJob, setEditJob] = useState(null);
    const [updatedJob, setUpdatedJob] = useState({ title: "", description: "", status: "" });
    const navigate = useNavigate();


    const token = localStorage.getItem("token_");
    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("token_");
                    localStorage.removeItem("role");
                    navigate("/recruiter/login");
                }
                return Promise.reject(error);
            }
        );
    }, [navigate]);

    const handleEdit = (job) => {
        setEditJob(job);
        setUpdatedJob({ title: job.title, description: job.description, status: job.status });
        setShowModal(true);
    };

    const handleDelete = async (jobId) => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            await axios.delete(`http://localhost:5000/jobs/${jobId}`, { headers });
            fetchJobs();
        }
    };

    const handleSave = async () => {
        await axios.put(`http://localhost:5000/jobs/${editJob._id}`, updatedJob, { headers });
        fetchJobs();
        setShowModal(false);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job => (
                        <tr key={job._id}>
                            <td>{job.title}</td>
                            <td>{job.description}</td>
                            <td>{job.status}</td>
                            <td>
                                <Button variant="warning" className="me-2 mb-2 btn-sm" onClick={() => handleEdit(job)}>Edit</Button>
                                <Button variant="danger" className="btn-sm mb-2" onClick={() => handleDelete(job._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Job Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Job</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control type="text" value={updatedJob.title} onChange={(e) => setUpdatedJob({ ...updatedJob, title: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Job Description</Form.Label>
                            <Form.Control as="textarea" value={updatedJob.description} onChange={(e) => setUpdatedJob({ ...updatedJob, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select value={updatedJob.status} onChange={(e) => setUpdatedJob({ ...updatedJob, status: e.target.value })}>
                                <option value="Open">Open</option>
                                <option value="Closed">Closed</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="success" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};