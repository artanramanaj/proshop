import React from "react";
import { Col, Row, Container } from "react-bootstrap";
const Footer = () => {
  const getCurrentYear = new Date().getFullYear();
  return (
    <footer>
      <Row>
        <Col className="text-center py-3">
          <p>
            Proshop @copy <span className="fw-bold">{getCurrentYear}</span>
          </p>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
