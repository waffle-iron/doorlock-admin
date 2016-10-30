import React, { PropTypes } from 'react';
import { Navbar, Nav, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

const NavBar = ({searchField}) => (
  <Navbar inverse fixedTop collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to='/lock-status'>Hackerspace UI</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      {!!searchField && searchField}
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to='/medlem/liste'>
          <MenuItem eventKey={1.1}>Medlemmer</MenuItem>
        </LinkContainer>
        <LinkContainer to='/medlem/legg-til'>
          <MenuItem eventKey={1.2}>Legg til medlem</MenuItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default NavBar;
