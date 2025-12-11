import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { useState } from "react";
const RegisterScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const userRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ name: fullName, email, password }).unwrap();
      toast.success("Successfully Registered!");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "invalid request");
    }
  };
  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={userRegister}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            placeholder="Enter your full name"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account? <Link to="/login">Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
