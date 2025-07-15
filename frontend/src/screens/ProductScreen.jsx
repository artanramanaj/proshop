import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Message from "../components/Message.jsx";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
const ProductScreen = () => {
  const { id: productId } = useParams();
  const { data: product, isLoading, error } = useGetProductQuery(productId);

  if (isLoading) return <Loader />;
  if (error)
    return (
      <Message variant="danger">
        Error loading product: {error?.data?.message || "Unknown error"}
      </Message>
    );
  if (!product) return <p>Product not found</p>;

  return (
    <div className="d-flex flex-column gap-4">
      <Button variant="light" className="py-2 align-self-start">
        Go Back
      </Button>

      <Row>
        <Col md={5}>
          <Image src={product.image} fluid alt="productimage" />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>

            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>

            <ListGroupItem>
              <h5>Price: ${product.price} </h5>
            </ListGroupItem>
            <ListGroupItem>{product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <h5>${product.price}</h5>
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <h5>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </h5>
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Button
                  className={`btn-block ${
                    product.countInStock === 0
                      ? "pe-none cursor-not-allowed"
                      : ""
                  }`}
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
