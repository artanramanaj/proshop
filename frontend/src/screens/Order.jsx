import React from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useGetOrderQuery } from "../slices/ordersApiSlice";
import { useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const Order = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error } = useGetOrderQuery(orderId);

  console.log("order", order);
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const { name, email } = userInfo;

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

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
              <Message>Delivered</Message>
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
              <Message>Paid</Message>
            ) : (
              <Message variant="danger">Not delivered</Message>
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
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Order;
