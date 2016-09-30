import {
  LOCK_SOCKET_AUTHENTICATE,
  LOCK_ACTIVATE_BTN,
  LOCK_NEW_LOG_DATA,
  LOCK_STATE_UPDATE,
  LOCK_FORCE_OPEN,
  LOCK_FORCE_CLOSE,
  LOCK_SET_AUTH_STATUS,
  LOCK_SET_SOCKET_STATUS } from '../constants'

const initialState = {
  isAuthenticated: false,
  log: '',
  socketStatus: 'connecting',
  lockBtnDisabled: false,
  isLocked: true
}

const lockStatus = (state = initialState, action) => {
  switch (action.type) {
    case LOCK_ACTIVATE_BTN:
      return {
        ...state,
        lockBtnDisabled: false
      }
    case LOCK_NEW_LOG_DATA:
      return {
        ...state,
        log: state.log.concat(action.log)
      }
    case LOCK_FORCE_OPEN:
    case LOCK_FORCE_CLOSE:
      return {
        ...state,
        lockBtnDisabled: true
      }
    case LOCK_STATE_UPDATE:
      return {
        ...state,
        isLocked: action.lockState
      }
    case LOCK_SET_AUTH_STATUS:
      return {
        ...state,
        isAuthenticated: action.status
      }
    case LOCK_SET_SOCKET_STATUS:
      return {
        ...state,
        socketStatus: action.status
      }
    default:
      return state
  }
}

export default lockStatus;
