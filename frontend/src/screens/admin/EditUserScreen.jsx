import React from "react";
import { useState } from "react";
import { Form, Button, Row, Col, Table, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useEffect } from "react";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
const EditUserScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useGetUserQuery(id);
  const [updateUser, { isLoading: updateUserLoading, error: updateUserError }] =
    useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const updateUserProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser({
        id,
        data: { name, email, isAdmin },
      }).unwrap();
      toast.success(res.message);
      navigate("/admin/userlist");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  if (isLoading || updateUserLoading) return <Loader />;
  if (error || updateUserError)
    return (
      <Message variant="danger">
        {" "}
        {error?.data?.message ||
          updateUserError?.data?.message ||
          "something went wrong"}
      </Message>
    );
  return (
    <>
      <Row>
        <Col md={12}>
          <FormContainer>
            <h1>Update Profile</h1>
            <Form onSubmit={updateUserProfile}>
              <Form.Group controlId="name" className="my-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  value={name}
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

              <Form.Group controlId="isAdmin" className="my-3">
                <Form.Check
                  type="checkbox"
                  id="isAdmin"
                  label="Is Admin"
                  checked={isAdmin ?? false}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="mt-2">
                Update User
              </Button>
            </Form>
          </FormContainer>
        </Col>
      </Row>
    </>
  );
};

export default EditUserScreen;
