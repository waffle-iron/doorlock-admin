import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

class NavBar extends React.Component {
  render () {
    return(
      <Navbar inverse>
         <Navbar.Header>
           <Navbar.Brand>
             <Link to='/status'>Hackerspace UI</Link>
           </Navbar.Brand>
           <Navbar.Toggle />
         </Navbar.Header>
         <Navbar.Collapse>
           <Nav>
            <LinkContainer to='/medlem/liste'>
              <NavItem eventKey={1}>Medlemmer</NavItem>
            </LinkContainer>
            <LinkContainer to='/medlem/legg-til'>
              <NavItem eventKey={2}>Legg til medlem</NavItem>
            </LinkContainer>
           </Nav>
       </Navbar.Collapse>
       </Navbar>
    );
  }
}

export default NavBar;
