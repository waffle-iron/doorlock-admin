import LockStatusActions from '../actions/LockStatusActions';
import NotificationActions from '../actions/NotificationActions';
import io from 'socket.io-client';
import { baseUrl } from 'config';
import tokenErrorHandler from './tokenErrorHandler';

const authSocket = io(baseUrl + ':8080/auth');
authSocket.io.reconnectionAttempts(5);

let _isAuthenticated = false;

const LockController = {
  _setAuthentication(state) {
    _isAuthenticated = !!state;
  },
  _newLogUpdate(log) {
    LockStatusActions.logData(log);
  },
  _newLockStatus(status) {
    LockStatusActions.lockStatusUpdate(status);
  },
  _checkAuth() {
    return _isAuthenticated;
  },
  authenticate() {
    authSocket.emit('authenticate', { token: localStorage.token });
  },
  forceOpen() {
    if( this._checkAuth() ) {
      authSocket.emit('forceOpen', (status) => {
        LockStatusActions.activateLockBtn(status);
      });
    }
  },
  forceClose() {
    if( this._checkAuth() ) {
      authSocket.emit('forceClose', (status) => {
        LockStatusActions.activateLockBtn(status);
      });
    }
  },
}


authSocket.on('connect', () => {
  LockStatusActions.setSocketStatus('connected');
  // Confirmation of authentication event from server
  authSocket.on('authenticated', () => {
    LockController._setAuthentication(true);

    authSocket.on('logTail', (log) => {
      LockController._newLogUpdate(log);
    });
    authSocket.on('lockStatus', (status) => {
      LockController._newLockStatus(status);
    });

  });

  // Initial authentication attempt if localStorage is present
  if ( localStorage.token ) {
    authSocket.emit('authenticate', { token: localStorage.token });
  }

  // Socket error handling
  authSocket.on('unauthorized', (err) => {
    LockController._setAuthentication(false);
    if (err.message === 'jwt expired' && err.data.code == 'invalid_token') {
        tokenErrorHandler({ status: 401 }, '/status');
    }
    else {
      tokenErrorHandler({ status: 403 }, '/status');
    }
  });
});

authSocket.on('connect_error', () => {
  NotificationActions.warning({
    title: 'Tilkoblingsfeil dørlås',
    message: 'Fikk ikke kontakt med dørlåsserver. Prøver på nytt..',
    autoDismiss: 2
  });
});

authSocket.on('reconnect_failed', () => {
  NotificationActions.error({
    title: 'Tilkoblingsfeil dørlås',
    message: 'Får ikke kontakt med dørlåsserver',
    autoDismiss: 0,
    action: {
      label: 'Prøv å koble til',
      callback() {
        authSocket.io.connect();
        LockStatusActions.setSocketStatus('connecting');
      }
    }
  });
  LockStatusActions.setSocketStatus('failed');
});

export default LockController;
