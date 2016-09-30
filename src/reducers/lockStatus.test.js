import reducer, { initialState } from './lockStatus';
import {
  LOCK_SOCKET_AUTHENTICATE,
  LOCK_ACTIVATE_BTN,
  LOCK_NEW_LOG_DATA,
  LOCK_STATE_UPDATE,
  LOCK_FORCE_OPEN,
  LOCK_FORCE_CLOSE,
  LOCK_SET_AUTH_STATUS,
  LOCK_SET_SOCKET_STATUS } from '../constants';

  describe('lockStatus reducer', () => {

    it('should return initial state', () => {
      expect(reducer(undefined, {}))
        .toEqual(initialState);
    });

    it('should handle LOCK_ACTIVATE_BTN', () => {
      expect(
        reducer(
        {
          isAuthenticated: false,
          log: '',
          socketStatus: 'connecting',
          lockBtnDisabled: true,
          isLocked: true
        },
        {
          type: LOCK_ACTIVATE_BTN
        })
      )
        .toEqual({
          isAuthenticated: false,
          log: '',
          socketStatus: 'connecting',
          lockBtnDisabled: false,
          isLocked: true
        });
    });

    it('should handle LOCK_NEW_LOG_DATA', () => {
      expect(
        reducer(
          {
            isAuthenticated: false,
            log: '<oldlog>',
            socketStatus: 'connecting',
            lockBtnDisabled: false,
            isLocked: true
          },
          {
            type: LOCK_NEW_LOG_DATA,
            log: '<newlog>'
          }
        )
      )
        .toEqual({
          isAuthenticated: false,
          log: '<oldlog><newlog>',
          socketStatus: 'connecting',
          lockBtnDisabled: false,
          isLocked: true
        });
    });

    it('should handle LOCK_FORCE_OPEN', () => {
      expect(
        reducer(
          {
            isAuthenticated: false,
            log: '',
            socketStatus: 'connecting',
            lockBtnDisabled: false,
            isLocked: true
          },
          {
            type: LOCK_FORCE_OPEN,
          }
        )
      )
        .toEqual({
          isAuthenticated: false,
          log: '',
          socketStatus: 'connecting',
          lockBtnDisabled: true,
          isLocked: true
        });
    });

    it('should handle LOCK_FORCE_CLOSE', () => {
      expect(
        reducer(
          {
            isAuthenticated: false,
            log: '',
            socketStatus: 'connecting',
            lockBtnDisabled: false,
            isLocked: true
          },
          {
            type: LOCK_FORCE_CLOSE,
          }
        )
      )
        .toEqual({
          isAuthenticated: false,
          log: '',
          socketStatus: 'connecting',
          lockBtnDisabled: true,
          isLocked: true
        });
    });

    it('should handle LOCK_STATE_UPDATE', () => {
      const lockState = false;
      expect(
        reducer(
          {
            isAuthenticated: false,
            log: '',
            socketStatus: 'connecting',
            lockBtnDisabled: false,
            isLocked: true
          },
          {
            type: LOCK_STATE_UPDATE,
            lockState
          }
        )
      )
        .toEqual({
          isAuthenticated: false,
          log: '',
          socketStatus: 'connecting',
          lockBtnDisabled: false,
          isLocked: lockState
        })
    });

    it('should handle LOCK_SET_AUTH_STATUS', () => {
      const status = true;
      expect(
        reducer(
          {
            isAuthenticated: false,
            log: '',
            socketStatus: 'connecting',
            lockBtnDisabled: false,
            isLocked: false
          },
          {
            type: LOCK_SET_AUTH_STATUS,
            status
          }
        )
      )
        .toEqual({
          isAuthenticated: status,
          log: '',
          socketStatus: 'connecting',
          lockBtnDisabled: false,
          isLocked: false
        });
    });

    it('should handle LOCK_SET_SOCKET_STATUS', () => {
      const status = 'awsomeConnection';
      expect(
        reducer(
          {
            isAuthenticated: false,
            log: '',
            socketStatus: 'connecting',
            lockBtnDisabled: false,
            isLocked: false
          },
          {
            type: LOCK_SET_SOCKET_STATUS,
            status
          }
        )
      )
        .toEqual({
          isAuthenticated: false,
          log: '',
          socketStatus: status,
          lockBtnDisabled: false,
          isLocked: false
        });
    });

  });
