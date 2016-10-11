import merge from 'lodash/merge';
import union from 'lodash/union';

// Heavily based on:
// https://github.com/yelouafi/redux-saga/blob/master/examples/real-world/reducers/paginate.js

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export default function paginate({ types, mapActionToKey }) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }
  if (!types.every((t) => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.');
  }

  const [ requestType, successType, failureType ] = types;
  const updatePagination = (state = {
    pages: 0,
    pageCount: 0,
    nextPageExists: true,
    nextPage: {
      limit: 10,
      offset: 0,
    },
    filter: {},
    ids: [],
    isLoading: false,
  }, action) => {
    switch (action.type) {
      case requestType:
        if(action.filter) {
          return {
            ...state,
            pages: 0,
            pageCount: 0,
            nextPage: {
              ...state.nextPage,
              offset: 0,
            },
            filter: action.filter,
            ids: [],
            isLoading: true,
          }
        }
        return merge({}, state, {
          isLoading: true
        })
      case successType:
        const updatePages = {
          pages: Math.ceil(action.response.count/state.nextPage.limit),
          pageCount: state.pageCount + 1,
        }
        return merge({}, state, {
          ...updatePages,
          isLoading: false,
          ids: union(state.ids, action.response.result),
          nextPageExists: updatePages.pageCount < updatePages.pages,
          nextPage: {
            offset: updatePages.pageCount * state.nextPage.limit
          }
        })
      case failureType:
        return merge({}, state, {
          isLoading: false
        })
      default:
        return state
    }
  }

  return (state = {}, action) => {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const key = mapActionToKey(action);
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.')
        }
        return {
          ...state,
          [key]: updatePagination(state[key], action)
        }
      default:
        return state
    }
  }
}
