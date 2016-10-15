import { take, put, call, fork, select } from 'redux-saga/effects';
import { delay, takeLatest } from 'redux-saga';
import * as entitiesActions from '../../redux-Actions/entitiesActions';
import { fetchUsers, deleteUser } from '../../utils/entitiesApi';
import { getPageList } from '../../reducers/selectors';
import {
  LOAD_PAGE_LIST,
  DELETE_ENTITY_ITEM,
  FILTER_PAGE_LIST,
  LOAD_MORE_ON_PAGE_LIST } from '../../constants';

function* fetchDynamicEntity(entity, apiFn, id, filter) {
  yield put( entity.request(id) )
  const {response, error} = yield call(apiFn, filter)
  if(response)
    yield put( entity.success(id, response) )
  else
    yield put( entity.failure(id, error) )
}

function* queryPageEntity(entity, apiFn, filter) {
  yield put( entity.request() )
  const {response, error} = yield call(apiFn, filter)
  if(response)
    yield put( entity.success(response) )
  else
    yield put( entity.failure(error) )
}


export const pageService = {
  members: {
    fetch: queryPageEntity.bind(null, entitiesActions.members.get, fetchUsers),
    delete: queryPageEntity.bind(null, entitiesActions.members.delete, deleteUser)
  }
}

function* deleteEntityItem({ page, deleteId }) {
  if( !isNaN(deleteId) ) {
    yield call(pageService[page].delete, deleteId)
  }
}

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
