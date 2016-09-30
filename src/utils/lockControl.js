import NotificationActions from '../actions/NotificationActions';
import io from 'socket.io-client';
import { baseUrl } from 'config';
import tokenErrorHandler from './tokenErrorHandler';
import { LOCK_FORCE_OPEN, LOCK_FORCE_CLOSE, LOCK_SOCKET_AUTHENTICATE } from '../constants';
import {
  setLockSocketStatus,
  setLockAuthStatus,
  newLockLogData,
  activateLockBtn,
  lockStateUpdate,
  lockForceOpen,
  lockForceClose } from '../redux-Actions/lockStatusActions';

let socket = null;

export const lockMiddleware = ({ getState, dispatch }) => (next) => (action) => {
  const result = next(action);
  if( socket && action.type == LOCK_SOCKET_AUTHENTICATE ) {
    socket.emit('authenticate', { token: action.token });
  }
  if( socket && getState().lockStatus.isAuthenticated ) {
    if(action.type === LOCK_FORCE_OPEN) {
      socket.emit('forceOpen', (status) => {
        dispatch(activateLockBtn());
      });
    }
    if(action.type === LOCK_FORCE_CLOSE) {
      socket.emit('forceClose', (status) => {
        dispatch(activateLockBtn());
      });
    }
  }

  return result;
}


const lockControl = ({ dispatch }) => {
  socket = io(baseUrl + ':8080/auth');
  socket.io.reconnectionAttempts(5);

  socket.on('connect', () => {
    dispatch(setLockSocketStatus('connected'));

    // Confirmation of authentication event from server
    socket.on('authenticated', () => {
      dispatch(setLockAuthStatus(true));

      socket.on('logTail', (log) => {
        dispatch(newLockLogData(log));
      });
      socket.on('lockStatus', ({isLocked}) => {
        dispatch(lockStateUpdate(isLocked));
      });

    });

    // Initial authentication attempt if localStorage is present
    if ( localStorage.token ) {
      socket.emit('authenticate', { token: localStorage.token });
    }

    // Socket error handling
    socket.on('unauthorized', (err) => {
      dispatch(setLockAuthStatus(false));

      if (err.message === 'jwt expired' && err.data.code == 'invalid_token') {
        tokenErrorHandler({ status: 401 }, '/status');
      }
      else {
        tokenErrorHandler({ status: 403 }, '/status');
      }
    });
  });

  socket.on('connect_error', () => {
    NotificationActions.warning({
      title: 'Tilkoblingsfeil dørlås',
      message: 'Fikk ikke kontakt med dørlåsserver. Prøver på nytt..',
      autoDismiss: 2
    });
  });

  socket.on('reconnect_failed', () => {
    NotificationActions.error({
      title: 'Tilkoblingsfeil dørlås',
      message: 'Får ikke kontakt med dørlåsserver',
      autoDismiss: 0,
      action: {
        label: 'Prøv å koble til',
        callback() {
          socket.io.connect();
          dispatch(setLockSocketStatus('connecting'));
        }
      }
    });
    dispatch(setLockSocketStatus('failed'));
  });

}

export default lockControl;
