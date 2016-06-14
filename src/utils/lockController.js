import StatusActions from '../actions/StatusActions';
import io from 'socket.io-client';
import { baseUrl } from 'config';

const authSocket = io(baseUrl + ':8080/auth');

let _isAuthenticated = false;

const LockController = {
  _setAuthentication(state) {
    _isAuthenticated = !!state;
  },
  _newLogUpdate(log) {
    StatusActions.logData(log);
  },
  _newLockStatus(status) {
    StatusActions.lockStatusUpdate(status.lockState);
  },
  _checkAuth() {
    return _isAuthenticated;
  },
  forceOpen() {
    if( this._checkAuth() ) {
      authSocket.emit('forceOpen');
    }
  },
  forceClose() {
    if( this._checkAuth() ) {
      authSocket.emit('forceClose');
    }
  },
}


authSocket.on('connect', () => {
  // Confirmation of authentication event from server
  authSocket.on('authenticated', () => {
    LockController._setAuthentication(true);

    authSocket.on('logTail', (log) => {
      LockController._newLogUpdate(log);
    });
    authSocket.on('getLockStatus', (status) => {
      LockController._newLockStatus(status);
    });

  });

  // Initial authentication attempt
  authSocket.emit('authenticate', {token: localStorage.token });

  // Socket error handling
  authSocket.on('unauthorized', (err) => {
    if (err.type == 'UnauthorizedError' || err.code == 'invalid_token') {
      LockController._setAuthentication(false);
      // Redirect user to login page perhaps?
      // Token will be verified by router and should redirect for us..
    }
    // TODO: Handle reauth when failed. call method from auth util i guess.
    console.log('authSock error. Stack:');
    console.log(err);
  });
});
