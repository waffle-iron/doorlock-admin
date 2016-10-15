import { ADD_NOTIFICATION } from '../constants';

export const initialState = {
  notification: {}
}

const notification = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        notification: action.notification
      }
    default:
      return state;
  }
}

export default notification;
