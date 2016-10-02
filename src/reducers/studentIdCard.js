import {
  SET_NEW_CARD_ID,
  SCAN_ID_CARD,
  SCAN_ID_CARD_SUCCESS,
  SCAN_ID_CARD_ERROR } from '../constants'

export const initialState = {
  cardId: '',
  isLoading: false
}

const studentIdCard = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_CARD_ID:
      return {
        ...state,
        cardId: action.id
      }
    case SCAN_ID_CARD:
      return {
        ...state,
        isLoading: true
      }
    case SCAN_ID_CARD_SUCCESS:
      return {
        cardId: action.id,
        isLoading: false
      }
    case SCAN_ID_CARD_ERROR:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state;
  }
}

export default studentIdCard;
