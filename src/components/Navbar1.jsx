import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

class Navbar1 extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="apt">Venkateshwara Kuteer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="flat">Flats</Nav.Link>
            <Nav.Link href="people">People</Nav.Link>
            <Nav.Link href="vehicles">Vehicles</Nav.Link>
            <NavDropdown title="Maintenence" id="basic-nav-dropdown">
              <NavDropdown.Item href="maintenenceItems">
                Maintenence Items
              </NavDropdown.Item>
              <NavDropdown.Item href="maintenence">
                Maintenence
              </NavDropdown.Item>
              <NavDropdown.Item href="concerns">Concerns</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navbar1;
