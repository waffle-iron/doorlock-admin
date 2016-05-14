import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class NavBar extends React.Component {
  render () {
    return(
      <Navbar>
         <Navbar.Header>
           <Navbar.Brand>
             <a href="#">Hackerspace UI</a>
           </Navbar.Brand>
         </Navbar.Header>
         <Nav>
           <NavDropdown eventKey={3} title="Medlemmer" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Liste</MenuItem>
              <MenuItem eventKey={3.2}>Legg til</MenuItem>
           </NavDropdown>
           <NavItem eventKey={2} href="#">Status lås</NavItem>
         </Nav>
       </Navbar>
    );
  }
}

export default NavBar;
