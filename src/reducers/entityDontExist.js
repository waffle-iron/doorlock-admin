import merge from 'lodash/merge';
import { ENTITY_DONT_EXIST } from '../constants';

const entityDontExist = (state = { users: {} }, action) => {
  if(action.type === ENTITY_DONT_EXIST && action.entity && action.dontExist) {
    return merge({}, state, {
      [action.entity]: {
        ...state[action.entity],
        [action.dontExist]: true
      }
    })
  }
  return state;
}

export default entityDontExist;
