import {
  SET_NEW_CARD_ID,
  SCAN_ID_CARD,
  SCAN_ID_CARD_SUCCESS,
  SCAN_ID_CARD_ERROR
} from '../constants';

export const setStudentId = (id) => ({
  type: SET_NEW_CARD_ID,
  id
})

export const scanIdCard = () => ({
  type: SCAN_ID_CARD
})

export const scanIdCardSuccess = (id) => ({
  type: SCAN_ID_CARD_SUCCESS,
  id
})

export const scanIdCardError = (error) => ({
  type: SCAN_ID_CARD_ERROR,
  error
})
