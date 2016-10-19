import merge from 'lodash/merge';
import union from 'lodash/union';

// Heavily based on:
// https://github.com/yelouafi/redux-saga/blob/master/examples/real-world/reducers/paginate.js

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export default function paginatePage({ types, perPage = 10 }) {
  if (!Array.isArray(types) || types.length !== 6) {
    throw new Error('Expected types to be an array of six elements.');
  }
  if (!types.every((t) => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }

  const [
    requestType,
    filterType,
    successType,
    failureType,
    createItemSuccessType,
    deleteItemSuccessType ] = types;

  return (state = {
    pages: 0,
    pageCount: 0,
    limit: perPage,
    nextPageExists: true,
    nextPageOffset: 0,
    filter: {},
    ids: [],
    isLoading: false,
  }, action) => {
    switch (action.type) {
      case requestType:
        return merge({}, state, {
          isLoading: true
        })
      case filterType:
        return {
          ...state,
          pages: 0,
          pageCount: 0,
          nextPageExists: true,
          nextPageOffset: 0,
          filter: action.filter,
          ids: []
        }
      case successType:
        const updatePages = {
          pages: Math.ceil(action.response.count/state.limit),
          pageCount: state.pageCount + 1,
        }
        return merge({}, state, {
          ...updatePages,
          isLoading: false,
          ids: union(state.ids, action.response.result),
          nextPageExists: updatePages.pageCount < updatePages.pages,
          nextPageOffset: updatePages.pageCount * state.limit
        })
      case failureType:
        return merge({}, state, {
          isLoading: false
        })
      case createItemSuccessType:
        return {
          ...state,
          ids: [action.response.result, ...state.ids]
        }
      case deleteItemSuccessType:
        return {
          ...state,
          ids: state.ids.filter( (id) => id !== action.deleteId )
        }
      default:
        return state
    }
  }
}
