import { take, put, call, fork, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { MEMBERS, MEMBER, SCAN_ID_CARD_ERROR } from '../constants';
import { addNotification } from '../actions/notificationActions';

function* showNotification(action) {

  // Return if tokenError, handled by tokenErrorMiddleware.
  if(action.error && (action.error.status === 401 || action.error.status === 403))
    return;

  switch (action.type) {

    case MEMBERS.FAILURE:
      yield put( addNotification.error({
        title: 'Henting av medlemmer',
        message: 'Feil på serveren.'
      }));
      break;

    case MEMBER.CREATE_SUCCESS:
      const newFirstName = action.response.entities.users[action.response.result].firstName
      const newLastName = action.response.entities.users[action.response.result].lastName
      yield put( addNotification.success({
        title: 'Legg til medlem',
        message: `Medlemmet ${newFirstName} ${newLastName} ble lagt til.`
      }));
      break;

    case MEMBER.DELETE_SUCCESS:
      const { firstName, lastName } = yield select((state,id) => state.entities.users[id], action.deleteId)
      yield put( addNotification.success({
        title: 'Slett medlem',
        message: `Medlemmet ${firstName} ${lastName} ble slettet.`
      }));
      break;

    case MEMBER.DELETE_FAILURE:
      yield put( addNotification.error({
        title: 'Slett medlem',
        message: 'Feil på serveren forhindret sletting.'
      }));
      break;

    case SCAN_ID_CARD_ERROR:
      if(action.error.message === 'Scanning brukte for lang tid') {
        yield put( addNotification.error({
          title: 'Scann studentkort',
          message: 'Brukte for lang tid på å scanne nytt kort.'
        }));
      }
      else {
        yield put( addNotification.error({
          title: 'Scann studentkort',
          message: 'Feil på serveren forhindret scanning.'
        }));
      }
      break;

  }
}

const actions = [
  MEMBERS.FAILURE,
  MEMBER.CREATE_SUCCESS,
  MEMBER.DELETE_SUCCESS,
  MEMBER.DELETE_FAILURE,
  SCAN_ID_CARD_ERROR
];

export function* watchShowNotification() {
  yield takeEvery(actions, showNotification)
}
