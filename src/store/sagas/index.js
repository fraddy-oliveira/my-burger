import { takeEvery } from 'redux-saga/effects';

import { logout, authExpirationTime, auth } from './auth.js';
import * as actionTypes from '../actions/actionTypes.js';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIALIZE_LOGOUT, logout);
  yield takeEvery(actionTypes.AUTH_EXPIRATION_TIME, authExpirationTime);
  yield takeEvery(actionTypes.AUTH_USER, auth);
}
