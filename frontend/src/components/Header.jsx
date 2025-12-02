import React, { useEffect } from "react";
import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
const Header = () => {
  const cartStore = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const quantiyResultBadge = cartStore.cartItems.reduce(
    (acc, currentItems) => acc + Number(currentItems.qty),
    0
  );
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();

  const logoutFunc = async () => {
    try {
      await logout().unwrap();
      dispatch(setCredentials(null));
      navigate("/login");
    } catch (error) {
      console.log("check the error", error);
    }
  };

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
              {!user ? (
                <Nav.Link as={Link} to="/login">
                  <FaUser /> Sign In
                </Nav.Link>
              ) : (
                <NavDropdown
                  title={userInfo.name || "Account"}
                  id="username"
                  menuVariant="dark"
                  menustyle={{ backgroundColor: "#212529" }}
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutFunc}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
