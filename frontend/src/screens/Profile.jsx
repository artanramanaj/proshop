import {
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from "react-bootstrap";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { useUpdateProfileMutation } from "../slices/usersApiSlice";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
const Profile = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log("userInfo", userInfo);
  const [fullName, setFullName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfrimPassword] = useState(null);
  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();
  const dispatch = useDispatch();
  const passwordsMatch = useMemo(() => {
    return password && confirmpassword && password === confirmpassword;
  }, [password, confirmpassword]);
  const updateProfileFunc = async (e) => {
    e.preventDefault();
    try {
      const { message, user } = await updateProfile({
        name: fullName,
        email: email,
        password: password,
      }).unwrap();
      toast.success(message);
      dispatch(setCredentials(user));
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;
  return (
    <>
      <Row>
        <Col md={6}>
          <FormContainer>
            <h1>Update Profile</h1>
            <Form onSubmit={updateProfileFunc}>
              <Form.Group controlId="name" className="my-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  type="text"
                  placeholder="Enter your full name"
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email" className="my-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  placeholder="Enter your email"
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

              <Form.Group controlId="confirmpassword" className="my-3">
                <Form.Label>Confrim Password</Form.Label>
                <Form.Control
                  disabled={!password}
                  type="password"
                  placeholder="Confrim Password"
                  onChange={(e) => setConfrimPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {password && confirmpassword && !passwordsMatch && (
                <p style={{ color: "red" }}>Passwords do not match</p>
              )}

              <Button
                type="submit"
                variant="primary"
                className="mt-2"
                disabled={!passwordsMatch && password}
              >
                Update Profile
              </Button>
            </Form>
          </FormContainer>
        </Col>

        <Col md={6}>ORDERS</Col>
      </Row>
    </>
  );
};

export default Profile;
