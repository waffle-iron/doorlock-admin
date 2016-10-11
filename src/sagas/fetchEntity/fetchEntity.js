import { take, put, call, fork, select } from 'redux-saga/effects';
import { delay, takeLatest } from 'redux-saga';
import { members } from '../../redux-Actions/entitiesActions';
import { fetchUsers } from '../../utils/entitiesApi';
import { getPageList } from '../../reducers/selectors';
import {
  LOAD_PAGE_LIST,
  FILTER_PAGE_LIST,
  LOAD_MORE_ON_PAGE_LIST } from '../../constants';

function* fetchEntity(entity, apiFn, id, filter) {
  yield put( entity.request(id) )
  const {response, error} = yield call(apiFn, filter)
  if(response)
    yield put( entity.success(id, response) )
  else
    yield put( entity.failure(id, error) )
}

export const pageService = {
  members: fetchEntity.bind(null, members, fetchUsers)
}

function* loadPageList(page, loadMore) {
  const pagination = yield select(getPageList, page);
  const { filter, limit, nextPageOffset } = pagination;
  if(!pagination.pageCount || loadMore ) {
      yield call(pageService[page], page, {
        ...filter,
        offset: nextPageOffset,
        limit
      })
  }
}

function* filterPageList({page, filter}) {
  yield call(delay, 1200)
  yield put( members.filter(page, filter) )
  yield fork(loadPageList, page)
}

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
