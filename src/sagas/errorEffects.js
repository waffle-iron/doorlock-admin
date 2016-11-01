import { take, put, call, fork, select } from 'redux-saga/effects';
import { delay, takeLatest, takeEvery } from 'redux-saga';
import { MEMBER } from '../constants';
import {
  SubmissionError,
  stopSubmit } from 'redux-form';

function* uniqueMemberFailure(formId) {
  yield put(stopSubmit(formId, {
    studentCardId: 'Studentkortet er allerede i bruk'
  }))
}

function* editMemberFailure({error, formId}) {
  if(error.hasOwnProperty('data') && error.data.message === 'Student card already in use') {
    yield uniqueMemberFailure(formId)
  }
  else {
    yield put(stopSubmit(formId))
  }
}

function* createMemberFailure({error, formId}) {
  if(error.hasOwnProperty('data') && error.data.message === 'Student card already in use') {
    yield uniqueMemberFailure(formId)
  }
  else {
    yield put(stopSubmit(formId))
  }
}

export default function* errorEffects() {
  yield [
    takeEvery(MEMBER.EDIT_FAILURE, editMemberFailure),
    takeEvery(MEMBER.CREATE_FAILURE, createMemberFailure),
  ]
}
