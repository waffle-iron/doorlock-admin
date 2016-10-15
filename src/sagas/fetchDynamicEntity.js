import { put, call } from 'redux-saga/effects';

export default function* fetchDynamicEntity(entity, apiFn, id, filter) {
  yield put( entity.request(id) )
  const {response, error} = yield call(apiFn, filter)
  if(response)
    yield put( entity.success(id, response) )
  else
    yield put( entity.failure(id, error) )
}
