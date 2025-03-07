import React from "react";
import { Table, Button } from "react-bootstrap";

export default function ApplicationList({ applications }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Candidate Name</th>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Skills</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {applications.map(app => (
                    <tr key={app.id}>
                        <td>{app.candidateName}</td>
                        <td>{app.jobTitle}</td>
                        <td>{app.company}</td>
                        <td>{app.skills}</td>
                        <td>
                            <Button
                                variant="primary"
                                href={app.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download Resume
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};
