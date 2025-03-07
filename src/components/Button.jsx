import React from "react";
import { Button } from "react-bootstrap";

const LoginButton = () => {
    return <Button variant="primary" className="m-2">Login</Button>;
};

const SignupButton = () => {
    return <Button variant="success" className="m-2">Sign Up</Button>;
};

export {
    LoginButton,
    SignupButton
};