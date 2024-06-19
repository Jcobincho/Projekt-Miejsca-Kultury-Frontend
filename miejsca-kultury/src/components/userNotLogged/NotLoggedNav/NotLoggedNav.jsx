import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Button from "react-bootstrap/Button";
import { Outlet, Link } from "react-router-dom";

export default function NotLoggedNav() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="fixed top">
        <Container>
          <Navbar.Brand>
            <Link className="link-light link-underline-opacity-0" to={"/"}>
              {" "}
              Miejsca Kultury{" "}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link>
                <Link
                  className="link-danger link-underline-opacity-0"
                  to={"/login"}
                >
                  <Button variant="primary">Zaloguj się!</Button>
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
