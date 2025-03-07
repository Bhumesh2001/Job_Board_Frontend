import { Container, Card } from "react-bootstrap";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow w-50">
                <h2 className="text-center">Register</h2>
                <RegisterForm />
            </Card>
        </Container>
    );
};
