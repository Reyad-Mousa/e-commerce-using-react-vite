import { NavLink } from "react-router-dom";
import {
  Badge,
  Navbar,
  Nav,
  Container,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import styles from "./styles.module.css";
import HeaderBasket from "@components/eCommerce/HeaderBasket/HeaderBasket";
import HeaderWishlist from "@components/eCommerce/HeaderWishlist/HeaderWishlist";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { userLogOut } from "@store/auth/authSlice";
import { useEffect } from "react";
import actGetWishlist from "@store/Wishlist/act/actGetWishlist";

const { headerContainer, headerLogo } = styles;

const Header = () => {
  const dispatch = useAppDispatch();

  const { accessToken, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      dispatch(actGetWishlist("ProductIds"));
    }
  }, [dispatch, accessToken]);

  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>our</span> <Badge bg="info">Ecom</Badge>
        </h1>
        <div className=" flex-row d-flex gap-2">
          <HeaderWishlist />
          <span
            style={{ width: "2px", height: "35px" }}
            className=" bg-black"
          ></span>
          <HeaderBasket />
        </div>
      </div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="about-us">
                About
              </Nav.Link>
            </Nav>
            {!accessToken ? (
              <>
                <Nav>
                  <Nav.Link as={NavLink} to="login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="register">
                    Register
                  </Nav.Link>
                </Nav>
              </>
            ) : (
              <>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={`Welcome ${user?.firstName} ${user?.lastName}`}
                >
                  <Dropdown.Item>Action</Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/profile">
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(userLogOut())}
                    to="/"
                    as={NavLink}
                  >
                    Log Out
                  </Dropdown.Item>
                </DropdownButton>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
