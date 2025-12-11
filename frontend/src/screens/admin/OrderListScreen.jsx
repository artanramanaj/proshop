import React from "react";
import { Button, Row, Col, Table, Badge } from "react-bootstrap";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Paggination from "../../components/Paggination";
const OrdersListScreen = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetOrdersQuery(
    {
      page: page || 1,
      limit: 10,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const orders = data?.orders || [];
  const currentPage = data?.currentPage || 1;
  const totalPages = data?.totalPages || 1;
  console.log("orders", orders);
  const handleDetails = (id) => {
    navigate(`/order/${id}`);
  };
  const changeCurrentPage = (page) => {
    setPage(page);
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
            {!orders || orders.length === 0 ? (
              <Message>There are no orders</Message>
            ) : (
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
            )}
          </div>
        </Col>
      </Row>
      <Row>
        {orders && orders.length > 0 && (
          <Col md={12} className="d-flex gap-4 justify-content-center">
            <Paggination
              totalPages={totalPages}
              currentPage={currentPage}
              changeCurrentPage={changeCurrentPage}
            />
          </Col>
        )}
      </Row>
    </>
  );
};

export default OrdersListScreen;
