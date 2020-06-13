import { takeEvery, all, takeLatest, fork } from 'redux-saga/effects';

import { logout, authExpirationTime, auth, checkAuthState } from './auth.js';
import { initIngredients } from './burgerBuilder.js';
import { purchaseBurger, fetchOrders } from './order.js';
import * as actionTypes from '../actions/actionTypes.js';

function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIALIZE_LOGOUT, logout);
  yield takeEvery(actionTypes.AUTH_EXPIRATION_TIME, authExpirationTime);
  yield takeEvery(actionTypes.AUTH_USER, auth);
  yield takeEvery(actionTypes.AUTH_STATE_CHECK, checkAuthState);
}

function* watchBurgerBuilder() {
  yield takeLatest(actionTypes.INITIALIZE_INGREDIENTS, initIngredients);
}

function* watchOrders() {
  yield takeEvery(actionTypes.FETCH_ORDERS_INITIALIZE, fetchOrders);
  yield takeEvery(actionTypes.PURCHASE_BURGER_INITIALIZE, purchaseBurger);
}

export function* rootSaga() {
  yield all([fork(watchAuth), fork(watchBurgerBuilder), fork(watchOrders)]);
}
