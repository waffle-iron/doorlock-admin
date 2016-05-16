import React, { PropTypes } from 'react';
import LoginForm from '../login/Login.jsx';

import styles from './LoginPage-style.css';

class LoginPage extends React.Component {
  render () {
    return (
      <div className={styles.container} >
        <LoginForm {...this.props} />
      </div>
    )
  }
}

export default LoginPage;
