import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

class NavBar extends React.Component {
  render () {
    return(
      <Navbar>
         <Navbar.Header>
           <Navbar.Brand>
             <Link to='/'>Hackerspace UI</Link>
           </Navbar.Brand>
         </Navbar.Header>
         <Nav>
           <NavDropdown eventKey={3} title="Medlemmer" id="basic-nav-dropdown">
              <LinkContainer to='/medlem/liste'>
                <MenuItem eventKey={3.1}>Liste</MenuItem>
              </LinkContainer>
              <LinkContainer to='/medlem/legg-til'>
              <MenuItem eventKey={3.2}>Legg til</MenuItem>
              </LinkContainer>
           </NavDropdown>
         </Nav>
       </Navbar>
    );
  }
}

export default NavBar;
