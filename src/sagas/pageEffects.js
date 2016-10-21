import { take, put, call, fork, select } from 'redux-saga/effects';
import { delay, takeLatest, takeEvery } from 'redux-saga';
import * as entitiesActions from '../actions/entitiesActions';
import { getPageList, getUser } from '../reducers/selectors';
import pageService from './pageService';
import {
  LOAD_PAGE_LIST,
  LOAD_MEMBER_EDIT_PAGE,
  CREATE_ENTITY_ITEM,
  EDIT_ENTITY_ITEM,
  DELETE_ENTITY_ITEM,
  FILTER_PAGE_LIST,
  LOAD_MORE_ON_PAGE_LIST } from '../constants';


// List pages ------------------------------------------------

function* loadPageList(service, loadMore) {
  const pagination = yield select(getPageList, service);
  const { filter, limit, nextPageOffset } = pagination;
  if(!pagination.pageCount || loadMore ) {
      yield call(pageService[service].fetch, {
        ...filter,
        offset: nextPageOffset,
        limit
      })
  }
}

function* filterPageList({service, filter}) {
  yield call(delay, 1200)
  yield put( entitiesActions[service].filter(filter) )
  yield fork(loadPageList, service)
}

function* deleteEntityItem({ service, deleteId }) {
    yield call(pageService[service].delete, deleteId)
}

// Create pages ---------------------------------------------

function* createEntityItem({ service, formId, newEntity }) {
  yield call(pageService[service].create, formId, newEntity)
}

// Edit pages ----------------------------------------------

function* loadUserToEditForm(id) {
  const user = yield select(getUser, id);
  if(!user) {
    yield call(pageService.member.fetchToForm, 'editMember', id)
  }
}

function* loadMemberEditPage({id}) {
  yield call(loadUserToEditForm, id);
}

function* editEntityItem({ service, formId, mutId, mutatedEntity }) {
  yield call(pageService[service].edit, formId, mutId, mutatedEntity)
}

// Watchers -------------------------------------------------

function* watchLoadPageList() {
  while(true) {
    const { service } = yield take(LOAD_PAGE_LIST)
    yield fork(loadPageList, service)
  }
}

function* watchFilterPageList() {
  yield takeLatest(FILTER_PAGE_LIST, filterPageList)
}

function* watchLoadMoreOnPageList() {
  while(true) {
    const { service } = yield take(LOAD_MORE_ON_PAGE_LIST)
    yield fork(loadPageList, service, true)
  }
}

function* watchDeleteEntityItem() {
  yield takeLatest(DELETE_ENTITY_ITEM, deleteEntityItem)
}

function* watchCreateEntityItem() {
  yield takeLatest(CREATE_ENTITY_ITEM, createEntityItem)
}

function* watchEditEntityItem() {
  yield takeLatest(EDIT_ENTITY_ITEM, editEntityItem)
}

function* watchLoadMemberEditPage() {
  yield takeEvery(LOAD_MEMBER_EDIT_PAGE, loadMemberEditPage)
}

export default function* pageEffects() {
  yield [
    fork(watchLoadPageList),
    fork(watchFilterPageList),
    fork(watchLoadMoreOnPageList),
    fork(watchDeleteEntityItem),
    fork(watchCreateEntityItem),
    fork(watchEditEntityItem),
    fork(watchLoadMemberEditPage),
  ]
}
