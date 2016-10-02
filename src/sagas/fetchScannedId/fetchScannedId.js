import { race, call, put } from 'redux-saga/effects';
import { delay, takeLatest } from 'redux-saga';
import idFetcher from '../../utils/idFetcher';
import { SCAN_ID_CARD } from '../../constants';
import {
  scanIdCardSuccess,
  scanIdCardError } from '../../redux-Actions/studentIdCardActions';



export function* fetchScannedId(fetchId, waitForTimeout, action) {

    try {
        const {fetchedId, timeout} = yield race({
          fetchedId: call(idFetcher),
          timeout: call(delay, waitForTimeout),
        });
        if(fetchedId) {
          yield put(scanIdCardSuccess(fetchedId));
        }
        else {
          yield put(scanIdCardError({ message: 'Scanning feilet, prøv på nytt'}));
        }
    }
    catch (err) {
        yield put(scanIdCardError({...err}));
    }

}

export default function* watchFetchedScannedId() {
  yield* takeLatest(SCAN_ID_CARD, fetchScannedId, idFetcher, 12000);
}
