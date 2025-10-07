import React from "react";
import { Badge, Navbar, Nav, Container, NavbarBrand } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
const Header = () => {
  const cartStore = useSelector((state) => state.cart);
  console.log("check the test", cartStore.cartItems);

  const quantiyResultBadge = cartStore.cartItems.reduce(
    (acc, currentItems) => acc + Number(currentItems.qty),
    0
  );
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Nav.Link as={Link} to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart /> Cart
                {quantiyResultBadge > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                    {quantiyResultBadge}
                  </Badge>
                )}
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                <FaUser /> Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
