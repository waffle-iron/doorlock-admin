import {
  LOCK_SOCKET_AUTHENTICATE,
  LOCK_ACTIVATE_BTN,
  LOCK_NEW_LOG_DATA,
  LOCK_STATE_UPDATE,
  LOCK_FORCE_OPEN,
  LOCK_FORCE_CLOSE,
  LOCK_SET_AUTH_STATUS,
  LOCK_SET_SOCKET_STATUS,
  LOCK_SOCKET_TOKEN_ERROR } from '../constants'

export const authenticateLockSocket = (token) => ({
  type: LOCK_SOCKET_AUTHENTICATE,
  token
})

export const activateLockBtn = () => ({
  type: LOCK_ACTIVATE_BTN
})

export const newLockLogData = (logData) => ({
  type: LOCK_NEW_LOG_DATA,
  log: logData
})

export const lockStateUpdate = (isLocked) => ({
  type: LOCK_STATE_UPDATE,
  lockState: isLocked
})

export const lockForceOpen = () => ({
  type: LOCK_FORCE_OPEN,
})

export const lockForceClose = () => ({
  type: LOCK_FORCE_CLOSE,
})

export const setLockAuthStatus = (status) => ({
  type: LOCK_SET_AUTH_STATUS,
  status
})

export const setLockSocketStatus = (status) => ({
  type: LOCK_SET_SOCKET_STATUS,
  status
})

export const lockSocketTokenError = (statusCode, returnPath) => ({
  type: LOCK_SOCKET_TOKEN_ERROR,
  error: {
    status: statusCode,
    returnPath
  }
})
