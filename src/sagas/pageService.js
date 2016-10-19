import { put, call } from 'redux-saga/effects';
import * as entitiesActions from '../redux-Actions/entitiesActions';
import {
  reset,
  startSubmit,
  stopSubmit } from 'redux-form';
import {
  fetchUser,
  fetchUsers,
  createUser,
  deleteUser } from '../utils/entitiesApi';


function* queryEntity(entity, apiFn, filter) {
  yield put( entity.request() )
  const {response, error} = yield call(apiFn, filter)
  if(response)
    yield put( entity.success(response) )
  else
    yield put( entity.failure(error) )
}

function* createEntity(entity, apiFn, formId, newEntity) {
  yield put( entity.request() )
  yield put( startSubmit(formId) )
  const {response, error} = yield call(apiFn, newEntity)
  if(response) {
    yield put( entity.success(response) )
    yield put( reset(formId) )
    yield put( stopSubmit(formId) )
  }
  else {
    yield put( entity.failure(error) )
    yield put( stopSubmit(formId) )
  }
}


const pageService = {
  members: {
    fetch: queryEntity.bind(null, entitiesActions.members.get, fetchUsers),
    fetchOne: queryEntity.bind(null, entitiesActions.members.get, fetchUser),
    delete: queryEntity.bind(null, entitiesActions.members.delete, deleteUser),
    create: createEntity.bind(null, entitiesActions.members.create, createUser)
  }
}

export default pageService;
