import { Form, Button, Row, Col, Table, Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { useUpdateProfileMutation } from "../slices/usersApiSlice";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import Paggination from "../components/Paggination";
const Profile = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log("userInfo", userInfo);
  const [fullName, setFullName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfrimPassword] = useState(null);
  const [page, setPage] = useState(1);
  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();

  const {
    data,
    isLoading: mineIsLoading,
    error: mineError,
  } = useGetMyOrdersQuery(
    {
      page: page || 1,
      limit: 5,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const mineOrders = data?.orders || [];
  const currentPage = data?.currentPage || 1;
  const totalPages = data?.totalPages || 1;
  console.log("mineOrders", mineOrders);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const handleDetails = (id) => {
    navigate(`/order/${id}`);
  };
  const changeCurrentPage = (page) => {
    setPage(page);
  };
  if (isLoading) return <Loader />;
  if (mineIsLoading) return <Loader />;
  if (error)
    return (
      <Message variant="danger">
        {error?.data?.message || "something went wrong"}
      </Message>
    );
  if (mineError)
    return (
      <Message variant="danger">
        {mineError?.data?.message || "something went wrong"}
      </Message>
    );
  return (
    <>
      <Row>
        <Col md={userInfo.isAdmin ? 12 : 6}>
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

        {!userInfo.isAdmin && mineOrders && mineOrders.length > 0 && (
          <Col md={6}>
            <div className="container mt-4">
              <h2>My Orders</h2>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {mineOrders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.split("T")[0]}</td>
                      <td>${order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          <Badge bg="success">✓</Badge>
                        ) : (
                          <Badge bg="danger">✗</Badge>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <Badge bg="success">✓</Badge>
                        ) : (
                          <Badge bg="danger">✗</Badge>
                        )}
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleDetails(order._id)}
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Row>
                <Col md={12} className="d-flex gap-4 justify-content-center">
                  <Paggination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    changeCurrentPage={changeCurrentPage}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        )}
        {!mineOrders ||
          (mineOrders.length === 0 && !userInfo.isAdmin && (
            <Col md={6}>
              <Message>You have no orders !</Message>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Profile;
