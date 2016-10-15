const REQUEST = 'REQUEST'
const FILTER = 'FILTER'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

const createRequestTypes = (base) => {
  return [REQUEST, FILTER, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

const CREATE = 'CREATE'
const EDIT = 'EDIT'
const DELETE = 'DELETE'

const createMutationTypes = (base) => {
  return [CREATE, EDIT, DELETE].reduce((acc, type) => {
    [REQUEST, SUCCESS, FAILURE].forEach((reqType) => {
      acc[`${type}_${reqType}`] = `${base}_${type}_${reqType}`
    })
		return acc
	}, {})
}

export const MEMBERS = {
  ...createRequestTypes('MEMBERS'),
  ...createMutationTypes('MEMBERS')
}

export const LOAD_PAGE_LIST = 'LOAD_PAGE_LIST';
export const FILTER_PAGE_LIST = 'FILTER_PAGE_LIST';
export const LOAD_MORE_ON_PAGE_LIST = 'LOAD_MORE_ON_PAGE_LIST';
export const DELETE_ENTITY_ITEM = 'DELETE_ENTITY_ITEM';

// Lockstatus constants
export const LOCK_SOCKET_AUTHENTICATE = 'LOCK_SOCKET_AUTHENTICATE';
export const LOCK_ACTIVATE_BTN = 'LOCK_ACTIVATE_BTN';
export const LOCK_NEW_LOG_DATA = 'LOCK_NEW_LOG_DATA';
export const LOCK_STATE_UPDATE = 'LOCK_STATE_UPDATE';
export const LOCK_FORCE_OPEN = 'LOCK_FORCE_OPEN';
export const LOCK_FORCE_CLOSE = 'LOCK_FORCE_CLOSE';
export const LOCK_SET_AUTH_STATUS = 'LOCK_SET_AUTH_STATUS';
export const LOCK_SET_SOCKET_STATUS = 'LOCK_SET_SOCKET_STATUS';
export const LOCK_SOCKET_TOKEN_ERROR = 'LOCK_SOCKET_TOKEN_ERROR';

// studentIdCard constants
export const SET_NEW_CARD_ID = 'SET_NEW_ID';
export const SCAN_ID_CARD = 'SCAN_ID_CARD';
export const SCAN_ID_CARD_SUCCESS = 'SCAN_ID_CARD_SUCCESS';
export const SCAN_ID_CARD_ERROR = 'SCAN_ID_CARD_ERROR';

// notification constants
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
