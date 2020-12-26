import React, { useState } from "react";

import {
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NavBar = (props) => {
  const [authed, setAuthed] = useState(true);
  const history = useHistory();
  const linkChange = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case "home":
        history.push("/");
        break;
      case "login":
        history.push("/login");
        break;
      case "news":
        history.push("/news");
        break;
      case "account":
        history.push("/account");
        break;
      case "profile":
        history.push("/profile");
        break;
      case "logout":
        toast.warn("Auth Functions Not Ready!");
        break;
      default:
        break;
    }
  };
  return (
    <Navbar bg="dark" expand="sm">
      <Navbar.Brand className="text-white ml-5">
        <Nav.Link className="text-white" name="home" onClick={linkChange}>
          QuickSocial
        </Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto mr-5 ">
          <Nav.Link className="text-primary" name="home" onClick={linkChange}>
            Home
          </Nav.Link>
          {authed ? (
            <>
              <Nav.Link
                className="text-primary"
                name="news"
                onClick={linkChange}
              >
                News
              </Nav.Link>
              <Nav.Link
                className="text-primary"
                name="profile"
                onClick={linkChange}
              >
                Profile
              </Nav.Link>
              <Nav.Link
                className="text-primary"
                name="account"
                onClick={linkChange}
              >
                Account
              </Nav.Link>
              <Nav.Link
                className="text-primary"
                name="login"
                onClick={linkChange}
              >
                Sign Out
              </Nav.Link>
            </>
          ) : (
            /*  <Nav.Link
              className="text-primary"
              name="login"
              onClick={linkChange}
            >
              LogIn
            </Nav.Link> */
            ""
          )}
        </Nav>
      </Navbar.Collapse>
      <ToastContainer />
    </Navbar>
  );
};

export default NavBar;
