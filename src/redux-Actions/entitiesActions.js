import {
  MEMBERS,
  LOAD_PAGE_LIST,
  FILTER_PAGE_LIST,
  LOAD_MORE_ON_PAGE_LIST } from '../constants';

const action = (type, payload = {}) => {
  return {type, ...payload}
}

export const members = {
  request: (page) => action(MEMBERS.REQUEST, {page}),
  filter: (page, filter) => action(MEMBERS.FILTER, {page, filter}),
  success: (page, response) => action(MEMBERS.SUCCESS, {page, response}),
  failure: (page) => action(MEMBERS.FAILURE, {page})
}

export const filterMemberPageList = (filter) => action(FILTER_PAGE_LIST, { page: 'members', filter})
export const loadMemberPageList = () => action(LOAD_PAGE_LIST, { page: 'members' })
export const loadMoreMembersOnPageList = () => action(LOAD_MORE_ON_PAGE_LIST, { page: 'members' })
