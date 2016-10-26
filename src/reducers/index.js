import { combineReducers } from 'redux';
import lockStatus from './lockStatus';
import notification from './notification';
import studentIdCard from './studentIdCard';
import entityDontExist from './entityDontExist';
import merge from 'lodash/merge';
import { MEMBERS, MEMBER } from '../constants';
import paginatePage from './pagination/paginatePage';
import { reducer as formReducer } from 'redux-form';
import { loadingBarReducer } from 'react-redux-loading-bar';

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { users: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
}

const pagination = combineReducers({
  members: paginatePage({
    types: [
      MEMBERS.REQUEST,
      MEMBERS.FILTER,
      MEMBERS.SUCCESS,
      MEMBERS.FAILURE,
      MEMBER.CREATE_SUCCESS,
      MEMBER.DELETE_SUCCESS
    ],
    perPage: 20,
    defaultFilter: {
      orderBy: 'firstName'
    }
  })
})

const app = combineReducers({
  entities,
  entityDontExist,
  pagination,
  notification,
  lockStatus,
  studentIdCard,
  form: formReducer,
  loadingBar: loadingBarReducer,
});

export default app;
