import React, { Component } from 'react';
import NavBar from './navbar/NavBar.jsx';
import { Grid } from 'react-bootstrap';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Grid>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}
