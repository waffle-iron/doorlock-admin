import { fork } from 'redux-saga/effects'
import { watchFetchedScannedId } from './fetchScannedId'
import { watchShowNotification } from './showNotifications'
import pageEffects from './pageEffects'
import errorEffects from './errorEffects'

export default function* rootSaga() {
  yield [
    fork(watchFetchedScannedId),
    fork(pageEffects),
    fork(errorEffects),
    fork(watchShowNotification)
  ]
}
