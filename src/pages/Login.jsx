import { Container, Card } from "react-bootstrap";
import LoginForm from "../components/LoginForm";

export default function Login() {
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow w-50">
                <h2 className="text-center">Login</h2>
                <LoginForm />
            </Card>
        </Container>
    );
};
