import { put, call } from 'redux-saga/effects';


export default function* queryEntity(entity, apiFn, filter) {
  yield put( entity.request() )
  const {response, error} = yield call(apiFn, filter)
  if(response)
    yield put( entity.success(response) )
  else
    yield put( entity.failure(error) )
}
