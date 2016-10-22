import React, { Component } from 'react';
import LoadingBar from 'react-redux-loading-bar';
import NavBar from './navbar/NavBar.jsx';
import NotificationStack from './notifications/NotificationStack.jsx';
import { Grid } from 'react-bootstrap';

import '../styling/globalStyles.scss';

export default class App extends Component {
  render() {
    const location = this.props.location.pathname;
    const loadingBarStyle = {
      zIndex: 2,
      backgroundColor: '#9c27b0',
      height: 4
    }
    return (
      <div>
        <LoadingBar style={loadingBarStyle} />
        { location !== '/logg-inn' ? <NavBar /> : '' }
        <Grid>
          {this.props.children}
        </Grid>
        <NotificationStack />
      </div>
    );
  }
}
