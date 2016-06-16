import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

class NavBar extends React.Component {
  render () {
    return(
      <Navbar>
         <Navbar.Header>
           <Navbar.Brand>
             <Link to='/status'>Hackerspace UI</Link>
           </Navbar.Brand>
         </Navbar.Header>
         <Nav>
          <LinkContainer to='/medlem/liste'>
            <NavItem eventKey={1}>Medlemmer</NavItem>
          </LinkContainer>
          <LinkContainer to='/medlem/legg-til'>
            <NavItem eventKey={2}>Legg til medlem</NavItem>
          </LinkContainer>
         </Nav>
       </Navbar>
    );
  }
}

export default NavBar;
