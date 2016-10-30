import React, { Component } from 'react';
import LoadingBar from 'react-redux-loading-bar';
import { Grid } from 'react-bootstrap';
import NavBar from '../navbar/NavBar.jsx';
import NotificationStack from '../notifications/NotificationStack.jsx';

import styles from './App-style.css';

const App = ({ login, main, search }) => (
  <div>
    <LoadingBar className={styles.loadingBar} />
    { login ? login
      : <Grid className={search ? styles.withSearch : styles.withoutSearch}>
          <NavBar searchField={search} />{main}
        </Grid> }
    <NotificationStack />
  </div>
)

export default App;
