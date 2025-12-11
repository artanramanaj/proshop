import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Col, Button } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethods } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethods(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1={true} step2={true} step3={true} />
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="Cash"
              id="cash"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "Cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
