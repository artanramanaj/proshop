import React from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import {
  useGetOrderQuery,
  useMarkDeliverMutation,
} from "../slices/ordersApiSlice";
import { useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Order = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error, refetch } = useGetOrderQuery(orderId);
  const [markDeliver, { isLoading: deliverLoading, error: deliverError }] =
    useMarkDeliverMutation();

  console.log("order", order);
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const { name, email, isAdmin } = userInfo;
  const markAsDelivered = async () => {
    try {
      const result = await markDeliver(orderId).unwrap();
      await refetch();
      toast.success("marked as delivered");
      console.log("result", result);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  if (isLoading || deliverLoading) return <Loader />;
  if (error || deliverError)
    return (
      <Message variant="danger">
        {error?.data?.message ||
          deliverError?.data?.message ||
          "something went wrong"}
      </Message>
    );

  return (
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <h1>Order {orderId}</h1>
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>email:</strong> {email}
            </p>
            <p>
              <strong>address:</strong> {order.shippingAddress.address},{" "}
              {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message variant="success">Delivered</Message>
            ) : (
              <Message variant="danger">Not delivered</Message>
            )}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Payment method</h2>
            <p>
              <strong>Method:</strong> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant="success">Paid</Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
          </ListGroup.Item>

          <h2>Order items</h2>
          <ListGroup>
            {order.orderItems.map((item, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={1}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={4}>
                    {item.qty} x {item.price} = ${item.qty * item.price}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary:</h2>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Items:</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax:</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            {isAdmin && order.isDelivered == false && (
              <ListGroup.Item>
                <Row>
                  <Button
                    type="button"
                    className="btn-block"
                    onClick={() => markAsDelivered()}
                  >
                    Mark as Delivered
                  </Button>
                </Row>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Order;
