import { put, delay } from 'redux-saga/effects';

import * as actions from '../actions/index';
import * as ls from '../../utils/localStorage.js';

export function* logout(action) {
  yield ls.resetUserStorage();
  yield put(actions.logoutSuccess());
}

export function* authExpirationTime(action) {
  yield delay(action.expiryTimeSeconds * 1000);
  yield put(actions.logout());
}
