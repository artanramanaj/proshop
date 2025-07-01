import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import products from "../products.js";
const HomeScreen = () => {
  return (
    <>
      <h1>latest products</h1>
      <Row>
        {products.map((product) => (
          <Col
            key={product._id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-4 d-flex"
          >
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
