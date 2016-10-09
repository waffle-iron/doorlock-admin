import { combineReducers } from 'redux';
import lockStatus from './lockStatus';
import studentIdCard from './studentIdCard';
import merge from 'lodash/merge';
import { MEMBERS } from '../constants';
import paginate from './pagination/paginate';

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { users: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

const pagination = combineReducers({
  pageScrolls: paginate({
    mapActionToKey: (action) => action.list,
    types: [
      MEMBERS.REQUEST,
      MEMBERS.SUCCESS,
      MEMBERS.FAILURE
    ]
  })
})

const app = combineReducers({
  entities,
  pagination,
  lockStatus,
  studentIdCard
});

export default app;
