import { fork } from 'redux-saga/effects'
import { watchFetchedScannedId } from './fetchScannedId/fetchScannedId'
import {
  watchLoadListPage,
  watchLoadMoreOnListPage } from './fetchEntity/fetchEntity'

export default function* rootSaga() {
  yield [
    fork(watchFetchedScannedId),
    fork(watchLoadListPage),
    fork(watchLoadMoreOnListPage)
  ]
}
