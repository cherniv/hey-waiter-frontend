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
import Avatar from './components/Avatar';

const SideBar: React.FC = () => {
  return (
    <Navbar >
      <Container className="justify-content-between">
      <Navbar.Brand as={Link} to="/manager/">
        <img src={SidebarLogo} className="sidebar-logo d-inline-block" alt="Logo" />
        {' Waiter.Live'}
      </Navbar.Brand>
      
        <Nav.Link as={Link} to="/manager/account" >
            <Avatar size={32} />
        </Nav.Link>
      
      </Container>
    </Navbar>
  )
}

export default SideBar;