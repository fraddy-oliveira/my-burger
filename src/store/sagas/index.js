import { takeEvery } from 'redux-saga/effects';

import { logout } from './auth.js';
import * as actionTypes from '../actions/actionTypes.js';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIALIZE_LOGOUT, logout);
}
