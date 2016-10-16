import { fork } from 'redux-saga/effects'
import { watchFetchedScannedId } from './fetchScannedId/fetchScannedId'
import { watchShowNotification } from './showNotifications';
import {
  watchLoadPageList,
  watchFilterPageList,
  watchLoadMoreOnPageList,
  watchDeleteEntityItem } from './pageLists'

export default function* rootSaga() {
  yield [
    fork(watchFetchedScannedId),
    fork(watchLoadPageList),
    fork(watchFilterPageList),
    fork(watchLoadMoreOnPageList),
    fork(watchDeleteEntityItem),
    fork(watchShowNotification)
  ]
}
