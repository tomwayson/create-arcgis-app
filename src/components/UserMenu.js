import React from 'react';
import {
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

function UserMenu({ currentUser, onSignIn, onSignOut }) {
  if (!currentUser) {
    // show sign in link
    return (
      <NavItem className="ml-auto">
        <Button color="link" onClick={onSignIn} className="nav-link">
          Sign In
        </Button>
      </NavItem>
    );
  }
  // show user menu
  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        {currentUser.fullName}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={onSignOut}>Sign Out</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

export default UserMenu;
