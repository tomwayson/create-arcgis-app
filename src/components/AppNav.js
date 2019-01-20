import React from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

class AppNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const {
      userMenu
    } = this.props;
    return (
      <Navbar color="dark" dark expand="md" fixed="top">
        <NavbarBrand href="#">Ambitious ArcGIS App</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink className="nav-link" exact to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink  className="nav-link" to="/items">Items</NavLink>
            </NavItem>
          </Nav>
          <Nav navbar className="ml-auto">
            {userMenu}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default AppNav;
