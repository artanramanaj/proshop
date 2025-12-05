import React from "react";
import { Button, Row, Col, Table, Badge } from "react-bootstrap";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useNavigate } from "react-router-dom";

const OrdersListScreen = () => {
  const navigate = useNavigate();
  const {
    data: orders,
    isLoading,
    error,
  } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log("orders", orders);
  const handleDetails = (id) => {
    navigate(`/order/${id}`);
  };
  if (isLoading) return <Loader />;
  if (error)
    return (
      <Message variant="danger">
        {error?.data?.message || "something went wrong"}
      </Message>
    );
  return (
    <>
      <Row>
        <Col md={12}>
          <div className="container mt-4">
            <h2>Orders</h2>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td>{order.user.email}</td>
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
          </div>
        </Col>
      </Row>
    </>
  );
};

export default OrdersListScreen;
