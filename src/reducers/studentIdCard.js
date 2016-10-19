import {
  SET_NEW_CARD_ID,
  SCAN_ID_CARD,
  SCAN_ID_CARD_SUCCESS,
  SCAN_ID_CARD_ERROR } from '../constants'

export const initialState = {
  isLoading: false
}

const studentIdCard = (state = initialState, action) => {
  switch (action.type) {
    case SCAN_ID_CARD:
      return {
        isLoading: true
      }
    case SCAN_ID_CARD_SUCCESS:
    case SCAN_ID_CARD_ERROR:
      return {
        isLoading: false
      }
    default:
      return state;
  }
}

export default studentIdCard;
