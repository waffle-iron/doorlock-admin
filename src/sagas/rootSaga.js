import { fork } from 'redux-saga/effects'
import { watchFetchedScannedId } from './fetchScannedId'
import { watchShowNotification } from './showNotifications';
import pageEffects from './pageEffects'

export default function* rootSaga() {
  yield [
    fork(watchFetchedScannedId),
    fork(pageEffects),
    fork(watchShowNotification)
  ]
}
