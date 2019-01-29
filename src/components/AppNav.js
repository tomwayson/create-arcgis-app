import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

function AppNav({ title, userMenu }) {
  const [isOpen, setIsOpen] = useState(false);
  function toggle() {
    setIsOpen(!isOpen);
  }
  return (
    <Navbar color="dark" dark expand="md" fixed="top">
      <NavbarBrand href="#">{title}</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink className="nav-link" exact to="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/items">
              Items
            </NavLink>
          </NavItem>
        </Nav>
        <Nav navbar className="ml-auto">
          {userMenu}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default AppNav;
