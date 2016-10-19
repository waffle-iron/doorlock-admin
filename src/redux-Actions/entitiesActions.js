import {
  MEMBERS,
  LOAD_PAGE_LIST,
  FILTER_PAGE_LIST,
  CREATE_ENTITY_ITEM,
  DELETE_ENTITY_ITEM,
  LOAD_MORE_ON_PAGE_LIST } from '../constants';

const action = (type, payload = {}) => {
  return {type, ...payload}
}

const pageActions = (asyncActionTypes) => {
  return {
    filter: (filter) => action(asyncActionTypes.FILTER, {filter}),
    get: {
      request: () => action(asyncActionTypes.REQUEST),
      success: (response) => action(asyncActionTypes.SUCCESS, {response}),
      failure: (error) => action(asyncActionTypes.FAILURE, {error}),
    },
    create: {
      request: () => action(asyncActionTypes.CREATE_REQUEST),
      success: (response) => action(asyncActionTypes.CREATE_SUCCESS, {response}),
      failure: (error) => action(asyncActionTypes.CREATE_FAILURE, {error}),
    },
    delete: {
      request: () => action(asyncActionTypes.DELETE_REQUEST),
      success: ({deleteId}) => action(asyncActionTypes.DELETE_SUCCESS, {deleteId}),
      failure: (error) => action(asyncActionTypes.DELETE_FAILURE, {error}),
    }
  }
}

export const members = pageActions(MEMBERS);
export const filterMemberPageList = (filter) => action(FILTER_PAGE_LIST, { page: 'members', filter})
export const loadMemberPageList = () => action(LOAD_PAGE_LIST, { page: 'members' })
export const loadMoreMembersOnPageList = () => action(LOAD_MORE_ON_PAGE_LIST, { page: 'members' })
export const deleteMember = (deleteId) => action(DELETE_ENTITY_ITEM, { page: 'members', deleteId })
export const createMember = (formId, newMember) => action(CREATE_ENTITY_ITEM, { page: 'members', formId, newMember })
