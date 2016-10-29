import React, { PropTypes } from 'react';
import LoginForm from '../../components/login/LoginForm.jsx';
import auth from '../../utils/auth';
import Promise from 'bluebird';
import { withRouter } from 'react-router';
import { SubmissionError } from 'redux-form';
import { authenticateLockSocket } from '../../actions/lockStatusActions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import styles from './LoginPage-style.scss';

class LoginPage extends React.Component {
  componentWillMount() {
    delete localStorage.token;
  }
  onLogin(credentials, dispatch) {
    const { location, router } = this.props;
    dispatch(showLoading());

    return new Promise( (resolve, reject) => {

      auth.login(credentials, (status) => {
        dispatch(hideLoading());
        if( status !== true ) {
          switch (status) {
            case 'Authentication failed. User not found':
              return reject(new SubmissionError({
                username: 'Brukernavn finnes ikke',
                _error: 'Ikke godkjent'
              }));
            case 'Authentication failed. Password incorrect':
              return reject(new SubmissionError({
                userpass: 'Passordet er feil',
                _error: 'Ikke godkjent'
              }));
            default:
              return reject(new SubmissionError({
                _error: 'Fikk ikke kontakt med serveren'
              }));
          }
        }

        // Authenticate socket.io handler for the locksystem
        dispatch(authenticateLockSocket(localStorage.token));

        if (location.state && location.state.nextPathname) {
          router.replace(location.state.nextPathname);
        } else {
          router.replace('/');
        }
      });
    });
  }
  render () {
    return (
      <div className={styles.container} >
        <LoginForm onSubmit={this.onLogin.bind(this)} />
      </div>
    )
  }
}

export default withRouter(LoginPage);
