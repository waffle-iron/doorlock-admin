import { race, call, put } from 'redux-saga/effects';
import { delay, takeLatest } from 'redux-saga';
import idFetcher from '../utils/idFetcher';
import { SCAN_ID_CARD } from '../constants';
import { change } from 'redux-form';
import {
  scanIdCardSuccess,
  scanIdCardError } from '../actions/studentIdCardActions';

// Only for testing purposes
// const idFetcher = () => {
//   return new Promise( (resolve, reject) => {
//     window.setTimeout( () => resolve(Date.now().toString()), 200)
//   });
// }

export function* fetchScannedId(fetchId, waitForTimeout, { formId }) {

    try {
        const {fetchedId, timeout} = yield race({
          fetchedId: call(idFetcher),
          timeout: call(delay, waitForTimeout),
        });
        if(fetchedId) {
          yield put(scanIdCardSuccess());
          yield put(change(formId, 'studentCardId', fetchedId));
        }
        else {
          yield put(scanIdCardError({ message: 'Scanning feilet, prøv på nytt'}));
        }
    }
    catch (err) {
        yield put(scanIdCardError(err));
    }

}

export function* watchFetchedScannedId() {
  yield* takeLatest(SCAN_ID_CARD, fetchScannedId, idFetcher, 12000);
}
