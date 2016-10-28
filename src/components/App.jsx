import React, { Component } from 'react';
import LoadingBar from 'react-redux-loading-bar';
import NavBar from './navbar/NavBar.jsx';
import NotificationStack from './notifications/NotificationStack.jsx';
import { Grid } from 'react-bootstrap';

import '../styling/globalStyles.scss';

const App = ({ login, main, search }) => (
  <div>
    <LoadingBar className='loadingBar' />
    { login ? login
      : <Grid id='main'><NavBar searchField={search} />{main}</Grid> }
    <NotificationStack />
  </div>
)

export default App;
