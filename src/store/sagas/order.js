import { call, put } from 'redux-saga/effects';

import * as actions from '../actions/index.js';
import axios from '../../axios-orders';

export function* purchaseBurger(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield call(
      axios.post,
      '/orders.json?auth=' + action.token,
      action.orderData
    );

    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (error) {
    yield put(actions.purchaseBurgerFail());
  }
}

export function* fetchOrders(action) {
  yield put(actions.fetchOrdersStart());

  try {
    const res = yield call(axios.get, '/orders.json?auth=' + action.token);

    const fetchedOrders = [];

    for (let key in res.data) {
      fetchedOrders.push({
        ...res.data[key],
        id: key,
      });
    }

    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail('Failed to load orders.'));
  }
}
