import { take, put, call, fork, select } from 'redux-saga/effects';
import { delay, takeLatest } from 'redux-saga';
import * as entitiesActions from '../redux-Actions/entitiesActions';
import { getPageList } from '../reducers/selectors';
import pageService from './pageService';
import {
  LOAD_PAGE_LIST,
  DELETE_ENTITY_ITEM,
  FILTER_PAGE_LIST,
  LOAD_MORE_ON_PAGE_LIST } from '../constants';

function* loadPageList(page, loadMore) {
  const pagination = yield select(getPageList, page);
  const { filter, limit, nextPageOffset } = pagination;
  if(!pagination.pageCount || loadMore ) {
      yield call(pageService[page].fetch, {
        ...filter,
        offset: nextPageOffset,
        limit
      })
  }
}

function* filterPageList({page, filter}) {
  yield call(delay, 1200)
  yield put( entitiesActions[page].filter(filter) )
  yield fork(loadPageList, page)
}

function* deleteEntityItem({ page, deleteId }) {
  if( !isNaN(deleteId) ) {
    yield call(pageService[page].delete, deleteId)
  }
}

// Watchers

export function* watchLoadPageList() {
  while(true) {
    const { page } = yield take(LOAD_PAGE_LIST)
    yield fork(loadPageList, page)
  }
}

export function* watchFilterPageList() {
  yield takeLatest(FILTER_PAGE_LIST, filterPageList)
}

export function* watchLoadMoreOnPageList() {
  while(true) {
    const { page } = yield take(LOAD_MORE_ON_PAGE_LIST)
    yield fork(loadPageList, page, true)
  }
}

export function* watchDeleteEntityItem() {
  yield takeLatest(DELETE_ENTITY_ITEM, deleteEntityItem)
}
