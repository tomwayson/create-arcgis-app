import React from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
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
      currentUser,
      onSignIn,
      onSignOut
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
            <UserNav currentUser={currentUser} signIn={onSignIn} signOut={onSignOut} />
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

function UserNav ({ currentUser, signIn, signOut }) {
  if (!currentUser) {
    // show sign in link
    return (
      <NavItem className="ml-auto">
        <Button color="link" onClick={signIn} className="nav-link">Sign In</Button>
      </NavItem>
    );
  }
  // show user menu
  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        { currentUser.fullName }
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={signOut}>
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

export default AppNav;
