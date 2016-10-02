import { fetchScannedId } from './fetchScannedId';
import idFetcher from '../../utils/idFetcher';
import { SCAN_ID_CARD } from '../../constants';
import { race, takeLatest, call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga';
import {
  scanIdCardSuccess,
  scanIdCardError } from '../../redux-Actions/studentIdCardActions';

describe('fetchScannedId saga', () => {
  const action = {
    type: SCAN_ID_CARD
  }
  const newId = 'ecae3431';
  const wtimeout = 5;
  let ret;

  describe('If fetchId is working properly', () => {
    const generator = fetchScannedId(idFetcher, wtimeout, action);

    it('should fetch new id before timeout', () => {
      ret = generator.next();
      expect(ret.value).toEqual(
        race({
          fetchedId: call(idFetcher),
          timeout: call(delay, wtimeout),
        })
      );
    });

    it('should dispatch SCAN_ID_CARD_SUCCESS with new id', () => {
      ret = generator.next({fetchedId: newId});
      expect(ret.value).toEqual(put(scanIdCardSuccess(newId)));
    });

  });

  describe('If something is wrong', () => {
    let generator;
    beforeEach(() => {
      generator = fetchScannedId(idFetcher, wtimeout, action);
      ret = generator.next();
    });

    it('should dispatch SCAN_ID_CARD_ERROR on timeout', () => {

      ret = generator.next({ timeout: undefined });
      expect(ret.value).toEqual(
        put(
          scanIdCardError({ message: 'Scanning feilet, prøv på nytt'})
        )
      );
    });

    it('should dispatch SCAN_ID_CARD_ERROR on error', () => {
      const errMsg = 'Oops';

      ret = generator.throw(errMsg);
      expect(ret.value).toEqual(
        put(
          scanIdCardError({ message: errMsg})
        )
      );
    });

  });
});
