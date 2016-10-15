import {
  MEMBERS,
  LOAD_PAGE_LIST,
  FILTER_PAGE_LIST,
  DELETE_ENTITY_ITEM,
  LOAD_MORE_ON_PAGE_LIST } from '../constants';

const action = (type, payload = {}) => {
  return {type, ...payload}
}

export const members = {
  request: (page) => action(MEMBERS.REQUEST, {page}),
  success: (page, response) => action(MEMBERS.SUCCESS, {page, response}),
  failure: (page) => action(MEMBERS.FAILURE, {page}),
  filter: (page, filter) => action(MEMBERS.FILTER, {page, filter}),
  delete: {
    request: () => action(MEMBERS.DELETE_REQUEST, { page: 'members'}),
    success: (page, {deleteId}) => action(MEMBERS.DELETE_SUCCESS, { page: 'members', deleteId }),
    failure: () => action(MEMBERS.DELETE_FAILURE, {}),
  }
}

export const filterMemberPageList = (filter) => action(FILTER_PAGE_LIST, { page: 'members', filter})
export const loadMemberPageList = () => action(LOAD_PAGE_LIST, { page: 'members' })
export const loadMoreMembersOnPageList = () => action(LOAD_MORE_ON_PAGE_LIST, { page: 'members' })
export const deleteMember = (deleteId) => action(DELETE_ENTITY_ITEM, { page: 'members', deleteId })
