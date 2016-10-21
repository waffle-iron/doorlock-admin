import {
  MEMBERS,
  MEMBER,
  LOAD_MEMBER_EDIT_PAGE,
  LOAD_PAGE_LIST,
  FILTER_PAGE_LIST,
  CREATE_ENTITY_ITEM,
  EDIT_ENTITY_ITEM,
  DELETE_ENTITY_ITEM,
  ENTITY_DONT_EXIST,
  LOAD_MORE_ON_PAGE_LIST } from '../constants';
import {
  action,
  listAsyncActions,
  singleAsyncActions,
  entityDontExist } from './actionCreators';


export const members = listAsyncActions(MEMBERS);
export const filterMemberPageList = (filter) => action(FILTER_PAGE_LIST, { service: 'members', filter})
export const loadMemberPageList = () => action(LOAD_PAGE_LIST, { service: 'members' })
export const loadMoreMembersOnPageList = () => action(LOAD_MORE_ON_PAGE_LIST, { service: 'members' })

export const loadMemberEditPage = (id) => action(LOAD_MEMBER_EDIT_PAGE, { id })

export const member = singleAsyncActions(MEMBER);
export const createMember = (formId, newMember) => action(CREATE_ENTITY_ITEM, { service: 'member', formId, newEntity: newMember })
export const editMember = (formId, mutId, mutatedMember) => action(EDIT_ENTITY_ITEM, { service: 'member', formId, mutId, mutatedEntity: mutatedMember })
export const deleteMember = (deleteId) => action(DELETE_ENTITY_ITEM, { service: 'member', deleteId })
export const memberDontExist = (id) => entityDontExist('users', id);
