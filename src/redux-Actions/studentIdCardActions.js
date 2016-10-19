import {
  SCAN_ID_CARD,
  SCAN_ID_CARD_SUCCESS,
  SCAN_ID_CARD_ERROR
} from '../constants';


export const scanIdCard = (formId) => ({
  type: SCAN_ID_CARD,
  formId
})

export const scanIdCardSuccess = () => ({
  type: SCAN_ID_CARD_SUCCESS,
})

export const scanIdCardError = (error) => ({
  type: SCAN_ID_CARD_ERROR,
  error
})
