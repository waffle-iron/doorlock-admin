import { fork } from 'redux-saga/effects'
import fetchScannedId from './fetchScannedId/fetchScannedId'

export default function* rootSaga() {
  yield fork(fetchScannedId)
}
