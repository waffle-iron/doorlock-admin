import { put, call } from 'redux-saga/effects';
import * as entityActions from '../actions/entitiesActions';
import {
  reset,
  startSubmit,
  stopSubmit } from 'redux-form';
import {
  fetchUser,
  fetchUsers,
  createUser,
  editUser,
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

function* fetchOneToForm(entity, apiFn, formId, id) {
  yield put( entity.request() )
  yield put( startSubmit(formId) )
  const {response, error} = yield call(apiFn, id)
  if(response === 'does not exist') {
    yield put(entityActions.memberDontExist(id));
  }
  else if(response) {
    yield put( entity.success(response) )
    yield put( stopSubmit(formId) )
  }
  else {
    yield put( entity.failure(error) )
    yield put( stopSubmit(formId) )
  }
}

function* editEntity(entity, apiFn, formId, mutId, mutatedEntity) {
  yield put( entity.request() )
  yield put( startSubmit(formId) )
  const {response, error} = yield call(apiFn, mutId, mutatedEntity)
  if(response) {
    yield put( entity.success(response) )
  }
  else {
    yield put( entity.failure(error) )
  }
  yield put( stopSubmit(formId) )
}

const pageService = {
  members: {
    fetch: queryEntity.bind(null, entityActions.members.get, fetchUsers),
  },
  member: {
    fetchToForm: fetchOneToForm.bind(null, entityActions.member.get, fetchUser),
    create: createEntity.bind(null, entityActions.member.create, createUser),
    edit: editEntity.bind(null, entityActions.member.edit, editUser),
    delete: queryEntity.bind(null, entityActions.member.delete, deleteUser),
  }
}

export default pageService;
