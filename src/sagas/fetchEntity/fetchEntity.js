import { take, put, call, fork, select } from 'redux-saga/effects';
import { members } from '../../redux-Actions/entitiesActions';
import { fetchUsers } from '../../utils/entitiesApi';
import { getList } from '../../reducers/selectors';
import {
  LOAD_LIST_PAGE,
  LOAD_MORE_ON_LIST_PAGE } from '../../constants';

function* fetchEntity(entity, apiFn, id, filter) {
  yield put( entity.request(id) )
  const {response, error} = yield call(apiFn, filter)
  if(response)
    yield put( entity.success(id, response) )
  else
    yield put( entity.failure(id, error) )
}

export const lists = {
  members: fetchEntity.bind(null, members, fetchUsers)

}

function* loadListPage(list, loadMore) {
  const pagination = yield select(getList, list);
  if(!pagination || !pagination.pageCount || loadMore ) {
    if(pagination) {
      const { filter, nextPage } = pagination;
      yield call(lists[list], list, { ...filter, ...nextPage })
    }
    else {
      yield call(lists[list], list, { limit: 10 })
    }
  }
}

export function* watchLoadListPage() {
  while(true) {
    const { list } = yield take(LOAD_LIST_PAGE)
    yield fork(loadListPage, list)
  }
}

export function* watchLoadMoreOnListPage() {
  while(true) {
    const { list } = yield take(LOAD_MORE_ON_LIST_PAGE)
    yield fork(loadListPage, list, true)
  }
}
