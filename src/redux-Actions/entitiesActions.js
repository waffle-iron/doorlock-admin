import {
  MEMBERS,
  LOAD_LIST_PAGE,
  LOAD_MORE_ON_LIST_PAGE } from '../constants';

const action = (type, payload = {}) => {
  return {type, ...payload}
}

export const members = {
  request: (list, filter) => action(MEMBERS.REQUEST, {list, filter}),
  success: (list, response) => action(MEMBERS.SUCCESS, {list, response}),
  failure: (list) => action(MEMBERS.FAILURE, {list})
}


export const loadMemberListPage = () => action(LOAD_LIST_PAGE, { list: 'members' })
export const loadMoreMembersOnListPage = () => action(LOAD_MORE_ON_LIST_PAGE, { list: 'members' })
