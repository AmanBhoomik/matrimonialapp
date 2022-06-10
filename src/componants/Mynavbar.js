import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "../css/Mynavbar.css";
import { GiCityCar } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function Mynavbar() {
  const navi = useNavigate();

  function goToSignIn() {
    navi("/login");
  }
  function goToSignUP() {
    navi("/register");
  }

  return (
    <div>
      <Navbar
        className="Car-Nav"
        collapseOnSelect
        expand="lg"
        fixed="top"
        variant="dark"
      >
        <Container>
          <Navbar.Brand><h2 className="text-uppercase">Bandhan</h2></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-nav-bar" />
          <Navbar.Collapse id="responsive-nav-bar">
            <Nav className="ms-auto">
              <Nav.Link onClick={goToSignIn} className="text-white font-weight-bold">
                Login
              </Nav.Link>
              <Nav.Link onClick={goToSignUP} className="text-white font-weight-bold" >Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Mynavbar;
