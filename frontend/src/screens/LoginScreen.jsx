import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  console.log("get the redirect", sp);
  const redirect = sp.get("redirect") || "/";

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect, { replace: true });
    }
  }, [userInfo, redirect, navigate]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...result[0] }));
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2">
          Sign In
        </Button>
        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col className="py-3">
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
