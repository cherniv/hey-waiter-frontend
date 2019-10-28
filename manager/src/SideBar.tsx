import React from 'react';

import {
  Link
} from "react-router-dom";

import {
  Navbar,
  Nav,
  Container,
} from 'react-bootstrap';

import SidebarLogo from './images/sidebar-logo.png';

const SideBar: React.FC = () => {
  return (
    <Navbar >
      <Container>
      <Navbar.Brand as={Link} to="/">
        <img src={SidebarLogo} className="sidebar-logo d-inline-block" alt="Logo" />
        {' Hey Waiter!'}
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/account">Account</Nav.Link>
        <Nav.Link as={Link} to="/live">Live</Nav.Link>
      </Nav>
      </Container>
    </Navbar>
  )
}

export default SideBar;